const express = require('express');
const initSqlJs = require('sql.js');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'driveease.db');

// ─── MIDDLEWARE ───
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// ─── HELPERS ───
function hashPassword(p) { return crypto.createHash('sha256').update(p).digest('hex'); }
function genToken() { return crypto.randomBytes(32).toString('hex'); }
function genOTP() { return String(Math.floor(100000 + Math.random() * 900000)); }
function genAppNum(type) {
    const pre = type === 'learner' ? 'LL' : type === 'driving' ? 'DL' : 'APP';
    return `${pre}${new Date().getFullYear()}/${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`;
}

// Save DB to disk
function saveDB() { fs.writeFileSync(DB_PATH, Buffer.from(db.export())); }

let db;

async function main() {
    const SQL = await initSqlJs();

    // Load existing DB or create new
    if (fs.existsSync(DB_PATH)) {
        const buf = fs.readFileSync(DB_PATH);
        db = new SQL.Database(buf);
    } else {
        db = new SQL.Database();
    }

    db.run("PRAGMA foreign_keys = ON");

    // ─── TABLES ───
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        mobile TEXT UNIQUE NOT NULL,
        email TEXT DEFAULT '',
        password_hash TEXT NOT NULL,
        state TEXT DEFAULT '',
        session_token TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT DEFAULT '',
        mobile TEXT DEFAULT '',
        subject TEXT DEFAULT '',
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS otp_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mobile TEXT NOT NULL,
        otp_code TEXT NOT NULL,
        expires_at DATETIME NOT NULL,
        verified INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS licence_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        application_number TEXT UNIQUE NOT NULL,
        type TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        dob TEXT DEFAULT '',
        gender TEXT DEFAULT '',
        state TEXT DEFAULT '',
        rto_office TEXT DEFAULT '',
        vehicle_category TEXT DEFAULT '',
        ll_number TEXT DEFAULT '',
        status TEXT DEFAULT 'submitted',
        fee_amount REAL DEFAULT 0,
        fee_paid INTEGER DEFAULT 0,
        payment_gateway TEXT DEFAULT '',
        slot_date TEXT DEFAULT '',
        slot_time TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        application_id INTEGER,
        appointment_type TEXT NOT NULL,
        full_name TEXT NOT NULL,
        mobile TEXT DEFAULT '',
        email TEXT DEFAULT '',
        rto_office TEXT DEFAULT '',
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        service_type TEXT DEFAULT '',
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        application_id INTEGER,
        doc_type TEXT NOT NULL,
        file_name TEXT NOT NULL,
        file_size INTEGER DEFAULT 0,
        status TEXT DEFAULT 'uploaded',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS chat_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    saveDB();

    // Helper: run query and return results as array of objects
    function queryAll(sql, params = []) {
        const stmt = db.prepare(sql);
        stmt.bind(params);
        const rows = [];
        while (stmt.step()) rows.push(stmt.getAsObject());
        stmt.free();
        return rows;
    }

    function queryOne(sql, params = []) {
        const rows = queryAll(sql, params);
        return rows.length > 0 ? rows[0] : null;
    }

    function runSql(sql, params = []) {
        db.run(sql, params);
        saveDB();
        return { lastId: db.exec("SELECT last_insert_rowid() as id")[0]?.values[0]?.[0] || 0 };
    }

    // Auth middleware
    function auth(req, res, next) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) return res.status(401).json({ error: 'Authentication required' });
        const user = queryOne('SELECT id, first_name, last_name, mobile, email, state FROM users WHERE session_token = ?', [token]);
        if (!user) return res.status(401).json({ error: 'Invalid or expired session' });
        req.user = user;
        next();
    }

    // ═══════════════════════════════════════
    // ─── AUTH ───
    // ═══════════════════════════════════════

    app.post('/api/register', (req, res) => {
        try {
            const { first_name, last_name, mobile, email, password, state } = req.body;
            if (!first_name || !last_name || !mobile || !password)
                return res.status(400).json({ error: 'first_name, last_name, mobile, and password are required' });
            if (!/^\d{10}$/.test(mobile))
                return res.status(400).json({ error: 'Mobile must be a 10-digit number' });

            const existing = queryOne('SELECT id FROM users WHERE mobile = ?', [mobile]);
            if (existing) return res.status(409).json({ error: 'User with this mobile number already exists' });

            const token = genToken();
            runSql('INSERT INTO users (first_name, last_name, mobile, email, password_hash, state, session_token) VALUES (?,?,?,?,?,?,?)',
                [first_name, last_name, mobile, email || '', hashPassword(password), state || '', token]);

            const user = queryOne('SELECT id, first_name, last_name, mobile FROM users WHERE mobile = ?', [mobile]);
            res.status(201).json({ message: 'User registered successfully', user, token });
        } catch (e) { res.status(500).json({ error: 'Registration failed: ' + e.message }); }
    });

    app.post('/api/login', (req, res) => {
        try {
            const { mobile, password } = req.body;
            if (!mobile || !password) return res.status(400).json({ error: 'Mobile and password are required' });

            const user = queryOne('SELECT id, first_name, last_name, mobile, email, state FROM users WHERE mobile = ? AND password_hash = ?',
                [mobile, hashPassword(password)]);
            if (!user) return res.status(401).json({ error: 'Invalid mobile number or password' });

            const token = genToken();
            runSql('UPDATE users SET session_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [token, user.id]);
            res.json({ message: 'Login successful', user, token });
        } catch (e) { res.status(500).json({ error: 'Login failed: ' + e.message }); }
    });

    app.get('/api/session', auth, (req, res) => { res.json({ user: req.user }); });

    app.post('/api/logout', auth, (req, res) => {
        runSql('UPDATE users SET session_token = NULL WHERE id = ?', [req.user.id]);
        res.json({ message: 'Logged out successfully' });
    });

    // ═══════════════════════════════════════
    // ─── OTP ───
    // ═══════════════════════════════════════

    app.post('/api/otp/send', (req, res) => {
        try {
            const { mobile } = req.body;
            if (!mobile || !/^\d{10}$/.test(mobile))
                return res.status(400).json({ error: 'Valid 10-digit mobile number required' });

            const otp = genOTP();
            const expires = new Date(Date.now() + 5 * 60 * 1000).toISOString();

            runSql('DELETE FROM otp_sessions WHERE mobile = ?', [mobile]);
            runSql('INSERT INTO otp_sessions (mobile, otp_code, expires_at) VALUES (?,?,?)', [mobile, otp, expires]);

            console.log(`📱 OTP for ${mobile}: ${otp}`);
            res.json({ message: 'OTP sent successfully', mobile: mobile.slice(0, 2) + '******' + mobile.slice(8), demo_otp: otp });
        } catch (e) { res.status(500).json({ error: 'Failed to send OTP: ' + e.message }); }
    });

    app.post('/api/otp/verify', (req, res) => {
        try {
            const { mobile, otp, name } = req.body;
            if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP are required' });

            const session = queryOne('SELECT * FROM otp_sessions WHERE mobile = ? AND otp_code = ? AND verified = 0 AND expires_at > datetime("now")', [mobile, otp]);
            if (!session) return res.status(401).json({ error: 'Invalid or expired OTP' });

            runSql('UPDATE otp_sessions SET verified = 1 WHERE id = ?', [session.id]);

            let user = queryOne('SELECT * FROM users WHERE mobile = ?', [mobile]);
            let token = genToken();

            if (user) {
                runSql('UPDATE users SET session_token = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [token, user.id]);
            } else {
                const fName = name ? name.split(' ')[0] : 'User';
                const lName = name && name.split(' ').length > 1 ? name.split(' ').slice(1).join(' ') : (name ? '' : mobile.slice(-4));
                runSql('INSERT INTO users (first_name, last_name, mobile, password_hash, session_token) VALUES (?,?,?,?,?)',
                    [fName, lName, mobile, hashPassword(crypto.randomBytes(16).toString('hex')), token]);
                user = queryOne('SELECT * FROM users WHERE mobile = ?', [mobile]);
            }

            res.json({ message: 'OTP verified', user: { id: user.id, first_name: user.first_name, last_name: user.last_name, mobile: user.mobile }, token });
        } catch (e) { res.status(500).json({ error: 'OTP verification failed: ' + e.message }); }
    });

    // ═══════════════════════════════════════
    // ─── APPLICATIONS ───
    // ═══════════════════════════════════════

    app.post('/api/applications', (req, res) => {
        try {
            const { type, first_name, last_name, dob, gender, state, rto_office, vehicle_category, ll_number, fee_amount, payment_gateway, slot_date, slot_time, user_id } = req.body;
            if (!type || !first_name || !last_name)
                return res.status(400).json({ error: 'type, first_name, and last_name are required' });

            const appNum = genAppNum(type);
            runSql(`INSERT INTO licence_applications (user_id, application_number, type, first_name, last_name, dob, gender, state, rto_office, vehicle_category, ll_number, fee_amount, fee_paid, payment_gateway, slot_date, slot_time, status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,1,?,?,?,'submitted')`,
                [user_id || null, appNum, type, first_name, last_name, dob || '', gender || '', state || '', rto_office || '', vehicle_category || '', ll_number || '', fee_amount || 0, payment_gateway || '', slot_date || '', slot_time || '']);

            res.status(201).json({ message: 'Application submitted', application: { application_number: appNum, type, status: 'submitted', first_name, last_name } });
        } catch (e) { res.status(500).json({ error: 'Application failed: ' + e.message }); }
    });

    app.get('/api/applications', (req, res) => {
        try {
            const { user_id } = req.query;
            const apps = user_id
                ? queryAll('SELECT * FROM licence_applications WHERE user_id = ? ORDER BY created_at DESC', [user_id])
                : queryAll('SELECT * FROM licence_applications ORDER BY created_at DESC LIMIT 50');
            res.json({ applications: apps });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    app.get('/api/applications/:id', (req, res) => {
        const app = queryOne('SELECT * FROM licence_applications WHERE id = ?', [req.params.id]);
        app ? res.json({ application: app }) : res.status(404).json({ error: 'Application not found' });
    });

    app.get('/api/track/:appNum', (req, res) => {
        const app = queryOne('SELECT * FROM licence_applications WHERE application_number = ?', [req.params.appNum]);
        if (!app) return res.status(404).json({ error: 'Application not found. Check the number and try again.' });

        const statusMap = {
            submitted: { step: 1, label: 'Application Submitted', color: '#3B82F6' },
            under_review: { step: 2, label: 'Under Review', color: '#F59E0B' },
            slot_booked: { step: 3, label: 'Slot Booked', color: '#8B5CF6' },
            test_scheduled: { step: 4, label: 'Test Scheduled', color: '#0EA5E9' },
            approved: { step: 5, label: 'Approved', color: '#10B981' },
            rejected: { step: 5, label: 'Rejected', color: '#EF4444' },
            completed: { step: 6, label: 'Completed', color: '#10B981' }
        };
        res.json({ application: app, tracking: statusMap[app.status] || statusMap.submitted });
    });

    // ═══════════════════════════════════════
    // ─── APPOINTMENTS ───
    // ═══════════════════════════════════════

    app.post('/api/appointments', (req, res) => {
        try {
            const { user_id, application_id, appointment_type, full_name, mobile, email, rto_office, appointment_date, appointment_time, service_type } = req.body;
            if (!appointment_type || !full_name || !appointment_date || !appointment_time)
                return res.status(400).json({ error: 'appointment_type, full_name, date, and time required' });

            runSql(`INSERT INTO appointments (user_id, application_id, appointment_type, full_name, mobile, email, rto_office, appointment_date, appointment_time, service_type) VALUES (?,?,?,?,?,?,?,?,?,?)`,
                [user_id || null, application_id || null, appointment_type, full_name, mobile || '', email || '', rto_office || '', appointment_date, appointment_time, service_type || '']);

            res.status(201).json({ message: 'Appointment booked', appointment: { appointment_type, full_name, appointment_date, appointment_time, status: 'confirmed' } });
        } catch (e) { res.status(500).json({ error: 'Booking failed: ' + e.message }); }
    });

    app.get('/api/appointments', (req, res) => {
        const { user_id } = req.query;
        const appts = user_id
            ? queryAll('SELECT * FROM appointments WHERE user_id = ? ORDER BY appointment_date DESC', [user_id])
            : queryAll('SELECT * FROM appointments ORDER BY appointment_date DESC LIMIT 50');
        res.json({ appointments: appts });
    });

    app.delete('/api/appointments/:id', (req, res) => {
        const appt = queryOne('SELECT * FROM appointments WHERE id = ?', [req.params.id]);
        if (!appt) return res.status(404).json({ error: 'Appointment not found' });
        runSql('UPDATE appointments SET status = "cancelled" WHERE id = ?', [req.params.id]);
        res.json({ message: 'Appointment cancelled' });
    });

    app.get('/api/slots', (req, res) => {
        const { date, rto_office } = req.query;
        if (!date) return res.status(400).json({ error: 'date required' });

        const allSlots = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '02:00 - 03:00', '03:00 - 04:00', '04:00 - 05:00', '05:00 - 06:00'];
        const booked = rto_office
            ? queryAll('SELECT appointment_time FROM appointments WHERE appointment_date = ? AND rto_office = ? AND status = "confirmed"', [date, rto_office])
            : queryAll('SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status = "confirmed"', [date]);
        const bookedTimes = booked.map(b => b.appointment_time);
        res.json({ date, slots: allSlots.map(s => ({ time: s, available: !bookedTimes.includes(s) })) });
    });

    // ═══════════════════════════════════════
    // ─── DOCUMENTS ───
    // ═══════════════════════════════════════

    app.post('/api/documents', (req, res) => {
        try {
            const { user_id, application_id, doc_type, file_name, file_size } = req.body;
            if (!doc_type || !file_name) return res.status(400).json({ error: 'doc_type and file_name required' });
            runSql('INSERT INTO documents (user_id, application_id, doc_type, file_name, file_size) VALUES (?,?,?,?,?)',
                [user_id || null, application_id || null, doc_type, file_name, file_size || 0]);
            res.status(201).json({ message: 'Document recorded', document: { doc_type, file_name, status: 'uploaded' } });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // ─── CONTACT ───
    app.post('/api/contact', (req, res) => {
        try {
            const { name, email, mobile, subject, message } = req.body;
            if (!name || !message) return res.status(400).json({ error: 'name and message required' });
            runSql('INSERT INTO contact_messages (name, email, mobile, subject, message) VALUES (?,?,?,?,?)',
                [name, email || '', mobile || '', subject || '', message]);
            res.status(201).json({ message: 'Message sent successfully' });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // ═══════════════════════════════════════
    // ─── CHAT ───
    // ═══════════════════════════════════════

    // Simple NLP knowledge base for server-side responses
    const chatKnowledge = {
        learner: {
            keywords: ['learner', 'learner licence', 'll', 'learner\'s'],
            response: '### Learner Licence\n\nTo apply for a **Learner Licence**, follow these steps:\n\n1. Fill Application Form (Form 1/1A)\n2. Upload Photo & Signature\n3. Pay Fee Online (₹200 for 2-wheeler, ₹300 for LMV)\n4. Book LL Test Slot\n5. Appear for LL Test & Get Certificate\n\n• **Age Requirement:** 16 years (with gear) or 18 years (without gear/LMV)\n• **Documents:** Aadhaar Card, Age Proof, Address Proof\n• **Validity:** 6 months from date of issue\n\n[Apply Now](learners-licence.html)',
            suggestions: ['Driving Licence', 'Required Documents', 'Fee Structure', 'Book Appointment']
        },
        driving: {
            keywords: ['driving licence', 'dl', 'driving license', 'permanent licence'],
            response: '### Driving Licence\n\nTo apply for a **Driving Licence**:\n\n1. Must hold a valid LL for 30+ days\n2. Fill DL Application Form 9\n3. Upload Medical Certificate\n4. Book Driving Test Slot\n5. Pass driving skill test\n6. DL dispatched to your address\n\n• **Fee:** ₹200–₹500 depending on vehicle class\n• **Documents:** LL Certificate, Medical Certificate, Form 1A\n\n[Apply Now](driving-licence.html)',
            suggestions: ['Learner Licence', 'Fee Structure', 'Book Appointment']
        },
        fees: {
            keywords: ['fee', 'fees', 'cost', 'price', 'charge', 'payment', 'how much'],
            response: '### Fee Structure\n\n• **Learner Licence:** ₹200 (2-wheeler) / ₹300 (LMV)\n• **Driving Licence:** ₹200–₹500 per vehicle class\n• **DL Renewal:** ₹200 per class\n• **International Permit:** ₹1,000\n• **Duplicate DL:** ₹200\n\n**Payment Methods:** UPI, Net Banking, Debit/Credit Card\n\n[View Full Fee Guide](pricing.html)',
            suggestions: ['Apply for LL', 'Apply for DL', 'Book Appointment']
        },
        documents: {
            keywords: ['document', 'documents', 'required', 'papers', 'aadhaar', 'proof'],
            response: '### Required Documents\n\n**For Learner Licence:**\n• Aadhaar Card (mandatory)\n• Age Proof (Birth Certificate / 10th Marksheet)\n• Address Proof\n• Passport-size Photo\n• Signature Scan\n\n**For Driving Licence:**\n• Valid Learner Licence\n• Medical Certificate (Form 1A)\n• Address Proof',
            suggestions: ['Fee Structure', 'Apply for LL', 'Apply for DL']
        },
        appointment: {
            keywords: ['appointment', 'book', 'slot', 'test slot', 'booking', 'schedule'],
            response: '### Book Appointment\n\nYou can book a test slot directly through our portal:\n\n1. Go to **Appointments** section\n2. Select your RTO office\n3. Choose your preferred date & time\n4. Confirm booking\n\n**Available Slots:** 8 AM – 6 PM (Mon–Sat)\n\n[Book Now](appointment-enhanced.html)',
            suggestions: ['Learner Licence', 'Driving Licence', 'Fee Structure']
        },
        renewal: {
            keywords: ['renew', 'renewal', 'expired', 'expire'],
            response: '### DL Renewal\n\nRenewal can be done **completely online** via eKYC:\n\n1. Check DL expiry date\n2. eKYC verification (contactless – no RTO visit!)\n3. Pay renewal fee (₹200 per class)\n4. Renewed DL delivered to your door in 7–10 days\n\n• Apply within 1 year before or up to 5 years after expiry\n• Medical Certificate needed for age 40+',
            suggestions: ['Fee Structure', 'Required Documents', 'Book Appointment']
        },
        international: {
            keywords: ['international', 'idp', 'abroad', 'foreign', 'international driving permit'],
            response: '### International Driving Permit (IDP)\n\n1. Must hold a valid Indian DL\n2. Fill Form 4A online\n3. Upload passport & visa documents\n4. Pay ₹1,000 fee\n5. Visit RTO once for collection (same-day issue)\n\n• **Validity:** 1 year or until DL expiry\n• **Documents:** Valid DL, Passport, Visa',
            suggestions: ['Driving Licence', 'Fee Structure', 'Required Documents']
        },
        track: {
            keywords: ['track', 'status', 'tracking', 'application status', 'check status'],
            response: '### Track Application\n\nTo track your application status:\n\n1. Go to the **Portal** page\n2. Enter your Application Number\n3. Enter Date of Birth\n4. Click **Track Now**\n\nYou can also track via the DriveEase mobile app.\n\n[Track Now](portal.html#track-section)',
            suggestions: ['Apply for LL', 'Apply for DL', 'Book Appointment']
        }
    };

    function processChat(message) {
        const lower = message.toLowerCase().trim();

        // Greeting
        if (/^(hi|hello|hey|namaste|good\s*(morning|afternoon|evening))/.test(lower)) {
            return {
                reply: 'Hello! 👋 I\'m **DEVA** (DriveEase Virtual Assistant). How can I help you today?\n\nI can assist with:\n• Applying for Learner or Driving Licence\n• Fee information\n• Required documents\n• Booking appointments\n• Tracking applications',
                suggestions: ['Learner Licence', 'Driving Licence', 'Fee Structure', 'Book Appointment']
            };
        }

        // Thank you
        if (/^(thank|thanks|thx|ty|great|awesome|perfect)/.test(lower)) {
            return {
                reply: 'You\'re welcome! 😊 Is there anything else I can help you with?',
                suggestions: ['Learner Licence', 'Fee Structure', 'Track Application']
            };
        }

        // Match against knowledge base
        let bestMatch = null;
        let bestScore = 0;

        for (const [key, entry] of Object.entries(chatKnowledge)) {
            for (const keyword of entry.keywords) {
                if (lower.includes(keyword)) {
                    const score = keyword.length;
                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = entry;
                    }
                }
            }
        }

        if (bestMatch) {
            return { reply: bestMatch.response, suggestions: bestMatch.suggestions };
        }

        // Fallback
        return {
            reply: 'I\'m not sure about that specific query. Here are some things I can help with:\n\n• **Learner Licence** – Application process & requirements\n• **Driving Licence** – How to apply\n• **Fee Structure** – All service fees\n• **Appointments** – Book a test slot\n• **Track Application** – Check your status\n\nPlease try asking about any of these topics!',
            suggestions: ['Learner Licence', 'Driving Licence', 'Fee Structure', 'Book Appointment']
        };
    }

    app.post('/api/chat', (req, res) => {
        try {
            const { message, session_id } = req.body;
            if (!message) return res.status(400).json({ error: 'message is required' });

            const sid = session_id || crypto.randomBytes(16).toString('hex');

            // Store user message
            runSql('INSERT INTO chat_history (session_id, role, message) VALUES (?,?,?)', [sid, 'user', message]);

            // Process and generate response
            const result = processChat(message);

            // Store bot response
            runSql('INSERT INTO chat_history (session_id, role, message) VALUES (?,?,?)', [sid, 'bot', result.reply]);

            res.json({ reply: result.reply, suggestions: result.suggestions, session_id: sid });
        } catch (e) { res.status(500).json({ error: 'Chat failed: ' + e.message }); }
    });

    app.get('/api/chat/history/:sessionId', (req, res) => {
        try {
            const messages = queryAll('SELECT role, message, created_at FROM chat_history WHERE session_id = ? ORDER BY created_at ASC', [req.params.sessionId]);
            res.json({ session_id: req.params.sessionId, messages });
        } catch (e) { res.status(500).json({ error: e.message }); }
    });

    // ─── ADMIN ───
    app.get('/api/users', (req, res) => {
        res.json({ users: queryAll('SELECT id, first_name, last_name, mobile, email, state, created_at FROM users ORDER BY created_at DESC') });
    });

    app.get('/api/users/:id', (req, res) => {
        const user = queryOne('SELECT id, first_name, last_name, mobile, email, state, created_at FROM users WHERE id = ?', [req.params.id]);
        user ? res.json({ user }) : res.status(404).json({ error: 'User not found' });
    });

    app.get('/api/health', (req, res) => {
        const c = (t) => queryOne(`SELECT COUNT(*) as count FROM ${t}`)?.count || 0;
        res.json({ status: 'healthy', uptime: process.uptime(), database: 'connected', counts: { users: c('users'), applications: c('licence_applications'), appointments: c('appointments'), chat_messages: c('chat_history') } });
    });

    // ─── START ───
    app.listen(PORT, () => {
        console.log(`\n🚀 DriveEase Backend running on http://localhost:${PORT}`);
        console.log(`💾 Database: ${DB_PATH}`);
        console.log(`📁 Static files: ${path.join(__dirname, '..')}`);
        console.log(`\n📖 API Endpoints:`);
        console.log(`   AUTH:   POST /api/register | /api/login | /api/logout | GET /api/session`);
        console.log(`   OTP:    POST /api/otp/send | /api/otp/verify`);
        console.log(`   APPS:   POST|GET /api/applications | GET /api/applications/:id | /api/track/:appNum`);
        console.log(`   APPTS:  POST|GET /api/appointments | DEL /api/appointments/:id | GET /api/slots`);
        console.log(`   CHAT:   POST /api/chat | GET /api/chat/history/:sessionId`);
        console.log(`   OTHER:  POST /api/documents | /api/contact | GET /api/users | /api/health\n`);
    });
}

main().catch(err => { console.error('Failed to start server:', err); process.exit(1); });
