// ══════════════════════════════════════════════════════════
// DriveEase – NLP & RAG Engine  (COMPLETE EDITION)
// Client-side Natural Language Processing + Retrieval
// Handles ALL website content and features
// ══════════════════════════════════════════════════════════

const DriveEaseNLP = (function () {

    // ─── STOP WORDS ──────────────────────────────────────
    const STOP_WORDS = new Set([
        'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'you', 'your', 'he',
        'she', 'it', 'its', 'they', 'them', 'what', 'which', 'who', 'whom',
        'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were',
        'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
        'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because',
        'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about',
        'between', 'to', 'from', 'in', 'on', 'then', 'than', 'too', 'very',
        'can', 'will', 'just', 'should', 'now', 'so', 'some', 'such', 'no',
        'not', 'only', 'own', 'same', 'also', 'into', 'could', 'would',
        'there', 'when', 'up', 'out', 'all', 'each', 'every', 'both',
        'few', 'more', 'most', 'other', 'any', 'here', 'please', 'tell',
        'want', 'need', 'know', 'like', 'give', 'show', 'let', 'us'
    ]);

    // ─── SIMPLE STEMMER ──────────────────────────────────
    function stem(word) {
        word = word.toLowerCase().trim();
        if (word.endsWith('ing') && word.length > 5) word = word.slice(0, -3);
        if (word.endsWith('tion') && word.length > 5) word = word.slice(0, -4);
        if (word.endsWith('ment') && word.length > 5) word = word.slice(0, -4);
        if (word.endsWith('ness') && word.length > 5) word = word.slice(0, -4);
        if (word.endsWith('able') && word.length > 5) word = word.slice(0, -4);
        if (word.endsWith('ies') && word.length > 4) word = word.slice(0, -3) + 'y';
        if (word.endsWith('es') && word.length > 4) word = word.slice(0, -2);
        else if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) word = word.slice(0, -1);
        if (word.endsWith('ed') && word.length > 4) word = word.slice(0, -2);
        if (word.endsWith('ly') && word.length > 4) word = word.slice(0, -2);
        return word;
    }

    // ─── TOKENIZER ───────────────────────────────────────
    function tokenize(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9₹\s]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length > 1)
            .map(w => stem(w));
    }

    function tokenizeKeepStopwords(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9₹\s]/g, ' ')
            .split(/\s+/)
            .filter(w => w.length > 1);
    }

    function removeStopWords(tokens) {
        return tokens.filter(t => !STOP_WORDS.has(t));
    }

    // ─── LEVENSHTEIN DISTANCE (Fuzzy Matching) ───────────
    function levenshtein(a, b) {
        const m = a.length, n = b.length;
        const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                dp[i][j] = a[i - 1] === b[j - 1]
                    ? dp[i - 1][j - 1]
                    : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
        return dp[m][n];
    }

    function fuzzyMatch(token, keyword, threshold = 2) {
        if (keyword.includes(token) || token.includes(keyword)) return true;
        if (Math.abs(token.length - keyword.length) > threshold) return false;
        return levenshtein(token, keyword) <= threshold;
    }

    // ─── INTENT DETECTION ────────────────────────────────
    const INTENT_PATTERNS = {
        apply: ['apply', 'new', 'get', 'start', 'begin', 'obtain', 'create', 'fresh', 'first time'],
        renew: ['renew', 'renewal', 'extend', 'expired', 'expiry', 'expire'],
        navigate: ['where', 'how to go', 'find', 'navigate', 'page', 'link', 'open', 'go to', 'take me', 'redirect', 'direct', 'which page', 'where is'],
        track: ['track', 'status', 'check', 'progress', 'where is my', 'application status'],
        fee: ['fee', 'cost', 'price', 'charges', 'payment', 'how much', 'amount', 'pay', 'money', '₹', 'pricing', 'total'],
        document: ['document', 'documents', 'papers', 'required', 'need', 'bring', 'attach', 'upload', 'proof'],
        process: ['how', 'process', 'steps', 'procedure', 'guide', 'way', 'method', 'what to do', 'how to'],
        help: ['help', 'support', 'contact', 'helpline', 'phone', 'call', 'assistance', 'customer service'],
        eligibility: ['eligible', 'eligibility', 'qualify', 'age', 'minimum', 'can i', 'allowed'],
        cancel: ['cancel', 'delete', 'remove', 'withdraw'],
        validity: ['valid', 'validity', 'expire', 'how long', 'duration', 'period'],
        profile: ['profile', 'my profile', 'personal', 'my details', 'my info', 'account', 'bio'],
        applications: ['application', 'applications', 'my application', 'submitted', 'applied', 'past application', 'history'],
        payments: ['payment history', 'transaction', 'receipt', 'billing', 'paid', 'invoice'],
        settings: ['setting', 'settings', 'preference', 'notification', 'privacy', 'security', 'language', 'accessibility', 'font', 'contrast', 'password'],
        login: ['login', 'sign in', 'register', 'sign up', 'account', 'otp', 'logout', 'log out'],
        sidebar: ['sidebar', 'side bar', 'menu', 'navigation menu'],
        website: ['website', 'site', 'portal', 'driveease', 'about', 'product', 'what is']
    };

    function detectIntents(tokens) {
        const rawText = tokens.join(' ');
        const intents = {};

        for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
            let score = 0;
            for (const pattern of patterns) {
                // Check exact phrase match in raw text
                if (rawText.includes(pattern)) {
                    score += 3;
                    continue;
                }
                // Check individual tokens
                const stemmedPattern = stem(pattern);
                for (const token of tokens) {
                    if (token === stemmedPattern) {
                        score += 2;
                    } else if (fuzzyMatch(token, stemmedPattern, 1)) {
                        score += 1;
                    }
                }
            }
            if (score > 0) intents[intent] = score;
        }

        return intents;
    }

    // ─── RAG RETRIEVER (TF-IDF-style Scoring) ────────────
    function scoreService(service, queryTokens, intents) {
        let score = 0;

        for (const token of queryTokens) {
            // Exact keyword match
            for (const kw of service.keywords) {
                const stemmedKw = stem(kw);
                if (token === stemmedKw) {
                    score += 5;
                } else if (fuzzyMatch(token, stemmedKw, 1)) {
                    score += 2;
                }
            }

            // Multi-word keyword match
            const queryStr = queryTokens.join(' ');
            for (const kw of service.keywords) {
                if (kw.includes(' ') && queryStr.includes(kw)) {
                    score += 8;
                }
            }

            // Title match
            const titleTokens = tokenize(service.title);
            for (const tt of titleTokens) {
                if (token === tt) score += 3;
                else if (fuzzyMatch(token, tt, 1)) score += 1;
            }
        }

        return score;
    }

    function scoreFAQ(faq, queryTokens) {
        let score = 0;
        const queryStr = queryTokens.join(' ');

        for (const kw of faq.keywords) {
            const stemmedKw = stem(kw);
            if (queryStr.includes(kw)) {
                score += 6;
            }
            for (const token of queryTokens) {
                if (token === stemmedKw) score += 4;
                else if (fuzzyMatch(token, stemmedKw, 1)) score += 2;
            }
        }

        return score;
    }

    // ─── RESPONSE GENERATOR ──────────────────────────────
    function generateResponse(service, intents, queryTokens) {
        const parts = [];
        const topIntent = Object.keys(intents).sort((a, b) => intents[b] - intents[a])[0] || 'process';

        // Title introduction
        parts.push(`### ${service.title}\n`);

        // Description
        parts.push(service.description + '\n');

        // Intent-specific content
        if (topIntent === 'fee' && service.fee) {
            parts.push(`**💰 Fee:** ${service.fee}\n`);
        } else if (topIntent === 'fee' && service.feeDetails) {
            parts.push('**💰 Fee Details:**');
            for (const [svc, fee] of Object.entries(service.feeDetails)) {
                parts.push(`• ${svc}: **${fee}**`);
            }
            parts.push('');
        }

        if (topIntent === 'document' && service.documents) {
            parts.push('**📋 Required Documents:**');
            service.documents.forEach(doc => parts.push(`• ${doc}`));
            parts.push('');
        }

        if (topIntent === 'eligibility' && service.eligibility) {
            parts.push(`**✅ Eligibility:** ${service.eligibility}\n`);
        }

        if (topIntent === 'validity' && service.validity) {
            parts.push(`**📅 Validity:** ${service.validity}\n`);
        }

        if ((topIntent === 'process' || topIntent === 'apply') && service.process) {
            parts.push('**📝 Step-by-Step Process:**');
            service.process.forEach((step, i) => parts.push(`${i + 1}. ${step}`));
            parts.push('');
        }

        if (topIntent === 'navigate' || topIntent === 'apply') {
            if (service.navigation) {
                parts.push(`**🧭 How to get there:** ${service.navigation}\n`);
            }
        }

        // Profile-specific content
        if ((topIntent === 'profile' || topIntent === 'navigate') && service.details) {
            parts.push('**📋 What you\'ll find:**');
            for (const [section, info] of Object.entries(service.details)) {
                parts.push(`• **${section}:** ${info}`);
            }
            parts.push('');
        }

        // Settings-specific content
        if ((topIntent === 'settings' || topIntent === 'navigate') && service.sections) {
            parts.push('**⚙️ Settings Sections:**');
            for (const [section, info] of Object.entries(service.sections)) {
                parts.push(`• **${section}:** ${info}`);
            }
            parts.push('');
        }

        // Applications-specific content
        if ((topIntent === 'applications' || topIntent === 'track') && service.features) {
            parts.push('**📄 Features:**');
            service.features.forEach(f => parts.push(`• ${f}`));
            parts.push('');
        }

        // Payment-specific content
        if ((topIntent === 'payments') && service.features) {
            parts.push('**💳 Features:**');
            service.features.forEach(f => parts.push(`• ${f}`));
            parts.push('');
        }

        // Product stats
        if (service.stats) {
            parts.push('**📈 Impact Stats:**');
            for (const [stat, val] of Object.entries(service.stats)) {
                parts.push(`• ${stat}: **${val}**`);
            }
            parts.push('');
        }

        // Quick actions (for profile)
        if (service.quickActions && (topIntent === 'profile' || topIntent === 'navigate')) {
            parts.push(`**⚡ Quick Actions:** ${service.quickActions.join(', ')}\n`);
        }

        // Processing time
        if (service.processingTime && (topIntent === 'process' || topIntent === 'apply' || topIntent === 'fee')) {
            parts.push(`**⏱️ Processing Time:** ${service.processingTime}\n`);
        }

        // Always show link
        if (service.link && service.link !== '#') {
            parts.push(`🔗 [**${service.linkText || 'Go to this service'}**](${service.link})`);
        }

        return parts.join('\n');
    }

    // ─── PAGE FINDER ─────────────────────────────────────
    function findPage(queryTokens) {
        const queryStr = queryTokens.join(' ');
        let bestMatch = null;
        let bestScore = 0;

        for (const page of DRIVEEASE_KNOWLEDGE.pages) {
            let score = 0;
            const nameTokens = tokenize(page.name);

            for (const qt of queryTokens) {
                for (const nt of nameTokens) {
                    if (qt === nt) score += 5;
                    else if (fuzzyMatch(qt, nt, 1)) score += 2;
                }
            }

            // Check description
            const descTokens = tokenize(page.description);
            for (const qt of queryTokens) {
                for (const dt of descTokens) {
                    if (qt === dt) score += 1;
                }
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = page;
            }
        }

        return bestScore >= 4 ? bestMatch : null;
    }

    // ─── GET USER DATA FROM LOCALSTORAGE ───────────────
    function getUserData() {
        return {
            isLoggedIn: localStorage.getItem('driveease_logged_in') === 'true',
            name: localStorage.getItem('driveease_user_name') || null,
            mobile: localStorage.getItem('driveease_user_mobile') || null,
            userId: localStorage.getItem('driveease_user_id') || null
        };
    }

    // ─── PERSONAL QUERY PATTERNS ─────────────────────────
    const PERSONAL_PATTERNS = [
        { patterns: ['my name', 'what is my name', 'who am i', 'what am i called', 'whats my name'], type: 'name' },
        { patterns: ['am i logged', 'login status', 'am i signed', 'logged in'], type: 'login_status' },
        { patterns: ['my mobile', 'my phone', 'my number', 'my contact', 'what is my number', 'my phone number'], type: 'mobile' },
        { patterns: ['my account', 'my details', 'my info', 'my data', 'my user id', 'my id', 'about me', 'my account details', 'my information'], type: 'account' },
        { patterns: ['my email', 'what is my email'], type: 'email' },
        { patterns: ['my licence', 'my dl', 'my driving licence', 'my dl number', 'licence number', 'dl number'], type: 'licence' }
    ];

    function detectPersonalQuery(rawLower) {
        for (const pq of PERSONAL_PATTERNS) {
            for (const p of pq.patterns) {
                if (rawLower.includes(p)) return pq.type;
            }
        }
        return null;
    }

    function handlePersonalQuery(type) {
        const user = getUserData();

        if (!user.isLoggedIn) {
            return {
                text: "You are not currently logged in. 🔒 Please login first to access your personal information.\n\n🔗 [**Go to Login**](login.html) · [**OTP Login**](otp-login.html) · [**Register**](register.html)",
                suggestions: ["How to login?", "How to register?", "Apply for Learner Licence"]
            };
        }

        const name = user.name || 'Not available';
        const mobile = user.mobile || 'Not stored in this session';
        const userId = user.userId || 'Not available';

        switch (type) {
            case 'name':
                return {
                    text: `Your name is **${name}** 👋\n\nThis is from your logged-in session. To view or update your full profile details, visit the Profile page.\n\n🔗 [**Go to My Profile**](profile.html)`,
                    suggestions: ["View my profile", "My account details", "Change settings"]
                };
            case 'login_status':
                return {
                    text: `✅ Yes, you are **currently logged in** as **${name}**.\n\nYou have full access to all services and features.\n\n🔗 [**Go to My Profile**](profile.html) · [**Dashboard**](portal.html)`,
                    suggestions: ["View my profile", "Check my applications", "Payment history"]
                };
            case 'mobile':
                return {
                    text: `📱 Your registered mobile number: **${mobile}**\n\nLogged in as: **${name}**\n\nTo update your mobile number, go to Settings → Account → Update Mobile Number.\n\n🔗 [**Update Mobile**](service-form.html?service=Mobile+Number+Update) · [**Settings**](settings.html)`,
                    suggestions: ["Change settings", "View my profile", "Payment history"]
                };
            case 'email':
                return {
                    text: `📧 Your email is visible on your **Profile page**.\n\nLogged in as: **${name}**\n\n🔗 [**Go to My Profile**](profile.html)`,
                    suggestions: ["View my profile", "My account details", "Change settings"]
                };
            case 'licence':
                return {
                    text: `🪪 Your Driving Licence details are available on your **Profile page**, including:\n• DL Number\n• Issue Date & Validity\n• Vehicle Class (LMV, MCWG, etc.)\n• Status (Active/Expired)\n• A visual licence card\n\nLogged in as: **${name}**\n\n🔗 [**View Licence Details on Profile**](profile.html)`,
                    suggestions: ["View my profile", "Renew Licence", "Print DL", "Check my applications"]
                };
            case 'account':
            default:
                return {
                    text: `### 👤 Your Account Details\n\n• **Name:** ${name}\n• **Mobile:** ${mobile}\n• **User ID:** ${userId}\n• **Status:** ✅ Logged In\n\nFor full details (DOB, address, Aadhaar, licence info), visit your Profile page.\n\n🔗 [**My Profile**](profile.html) · [**My Applications**](my-applications.html) · [**Payment History**](payment-history.html) · [**Settings**](settings.html)`,
                    suggestions: ["View my profile", "Check my applications", "Payment history", "Change settings"]
                };
        }
    }

    // ─── MAIN PROCESS FUNCTION ───────────────────────────
    function processQuery(userMessage) {
        const rawLower = userMessage.toLowerCase().trim();

        // ── CHECK PERSONAL QUERIES FIRST ──
        const personalType = detectPersonalQuery(rawLower);
        if (personalType) {
            return handlePersonalQuery(personalType);
        }

        // Check greeting
        if (DRIVEEASE_KNOWLEDGE.greetings.patterns.some(p => rawLower.includes(p)) && rawLower.length < 30) {
            const resps = DRIVEEASE_KNOWLEDGE.greetings.responses;
            return {
                text: resps[Math.floor(Math.random() * resps.length)],
                suggestions: DRIVEEASE_KNOWLEDGE.quickSuggestions.slice(0, 4)
            };
        }

        // Check thanks
        if (DRIVEEASE_KNOWLEDGE.thanks.patterns.some(p => rawLower.includes(p))) {
            const resps = DRIVEEASE_KNOWLEDGE.thanks.responses;
            return {
                text: resps[Math.floor(Math.random() * resps.length)],
                suggestions: ["View my profile", "Check my applications", "Payment history", "Fee information"]
            };
        }

        // Check goodbye
        if (DRIVEEASE_KNOWLEDGE.goodbye.patterns.some(p => rawLower.includes(p)) && rawLower.length < 20) {
            const resps = DRIVEEASE_KNOWLEDGE.goodbye.responses;
            return {
                text: resps[Math.floor(Math.random() * resps.length)],
                suggestions: []
            };
        }

        // Tokenize & process
        const allTokens = tokenizeKeepStopwords(rawLower);
        const queryTokens = removeStopWords(tokenize(rawLower));

        if (queryTokens.length === 0) {
            return {
                text: "I'm sorry, I didn't quite understand that. Could you rephrase? You can ask me about licence applications, renewals, fees, documents, profile, payments, settings, or how to navigate the website. 😊",
                suggestions: DRIVEEASE_KNOWLEDGE.quickSuggestions.slice(0, 4)
            };
        }

        // Detect intents
        const intents = detectIntents(allTokens);

        // Score all services (RAG retrieval)
        const serviceScores = DRIVEEASE_KNOWLEDGE.services.map(svc => ({
            service: svc,
            score: scoreService(svc, queryTokens, intents)
        })).filter(s => s.score > 0).sort((a, b) => b.score - a.score);

        // Score all FAQs
        const faqScores = DRIVEEASE_KNOWLEDGE.faqs.map(faq => ({
            faq: faq,
            score: scoreFAQ(faq, queryTokens)
        })).filter(f => f.score > 0).sort((a, b) => b.score - a.score);

        // If FAQ is top match and has higher confidence
        if (faqScores.length > 0 && (serviceScores.length === 0 || faqScores[0].score >= serviceScores[0].score)) {
            const topFAQ = faqScores[0].faq;
            const suggestions = [];

            // Find related services for suggestion chips
            if (serviceScores.length > 0) {
                suggestions.push(serviceScores[0].service.title);
            }
            // Add contextual suggestions based on topic
            if (topFAQ.keywords.some(k => ['profile', 'personal', 'details'].includes(k))) {
                suggestions.push('Check my applications', 'Payment history', 'Change settings');
            } else if (topFAQ.keywords.some(k => ['payment', 'transaction', 'receipt'].includes(k))) {
                suggestions.push('View my profile', 'Fee information', 'Check my applications');
            } else if (topFAQ.keywords.some(k => ['settings', 'notification', 'language'].includes(k))) {
                suggestions.push('View my profile', 'Payment history', 'Check my applications');
            } else {
                suggestions.push(...DRIVEEASE_KNOWLEDGE.quickSuggestions.slice(0, 3));
            }

            return {
                text: topFAQ.answer,
                suggestions: [...new Set(suggestions)].slice(0, 4)
            };
        }

        // If service match found
        if (serviceScores.length > 0) {
            const topService = serviceScores[0].service;
            const responseText = generateResponse(topService, intents, queryTokens);

            // Build contextual suggestions based on category
            const otherSuggestions = [];

            if (topService.category === 'account') {
                // For account pages, suggest other account pages
                const accountPages = ['View my profile', 'Check my applications', 'Payment history', 'Change settings'];
                otherSuggestions.push(...accountPages.filter(s => !s.includes(topService.title)));
            } else if (topService.category === 'auth') {
                otherSuggestions.push('View my profile', 'Apply for Learner Licence', 'Track my application');
            } else {
                // For services, suggest related services
                const others = serviceScores.slice(1, 4).map(s => s.service.title);
                otherSuggestions.push(...others);
            }

            if (otherSuggestions.length < 3) {
                otherSuggestions.push(...DRIVEEASE_KNOWLEDGE.quickSuggestions.slice(0, 3 - otherSuggestions.length));
            }

            return {
                text: responseText,
                suggestions: [...new Set(otherSuggestions)].slice(0, 4)
            };
        }

        // Direct fee-related query without specific service
        if (intents.fee) {
            const feeSvc = DRIVEEASE_KNOWLEDGE.services.find(s => s.id === 'fee_payments');
            if (feeSvc) {
                return {
                    text: generateResponse(feeSvc, intents, queryTokens),
                    suggestions: ["Apply for Learner Licence", "DL Renewal", "Track my application", "View my profile"]
                };
            }
        }

        // Try page finder as last resort
        const pageFallback = findPage(queryTokens);
        if (pageFallback) {
            return {
                text: `### ${pageFallback.name}\n\n${pageFallback.description}\n\n🔗 [**Go to ${pageFallback.name}**](${pageFallback.url})`,
                suggestions: DRIVEEASE_KNOWLEDGE.quickSuggestions.slice(0, 4)
            };
        }

        // Fallback
        return {
            text: "I'm not sure I found the right answer for that. 🤔 Here are the things I can help with — I cover **every page** on this website:\n\n**🪪 Licences:** Apply for Learner/Driving Licence, Renewal, Duplicate, International Permit\n**📅 Appointments:** Book or cancel test slots\n**📊 Tracking:** Check application status\n**👤 Account:** Profile, Applications, Payment History, Settings\n**💰 Fees:** Detailed pricing for all services\n**🔐 Auth:** Login, Register, OTP Login\n**📄 Pages:** Portal, About, Product, Pricing, Sitemap\n\nTry asking something like *\"How to apply for a learner licence?\"*, *\"Show my profile\"*, or *\"What are the fees?\"*",
            suggestions: ["View my profile", "Fee information", "Apply for Learner Licence", "Track my application"]
        };
    }

    // Public API
    return { processQuery };
})();
