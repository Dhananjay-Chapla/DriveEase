// ══════════════════════════════════════════════════════════
// DriveEase – RAG Knowledge Base  (COMPLETE EDITION)
// Covers EVERY page, feature, and corner of the website
// ══════════════════════════════════════════════════════════

const DRIVEEASE_KNOWLEDGE = {

    // ─── SERVICES ─────────────────────────────────────────
    services: [
        {
            id: "learner_licence",
            title: "Apply for Learner Licence (LL)",
            keywords: ["learner", "licence", "ll", "learning", "learners", "lerner", "licens", "apply", "new ll", "get ll", "learner license", "learner permit"],
            description: "Apply for a new Learner Licence online through DriveEase. The LL allows you to practice driving on public roads under supervision.",
            link: "learners-licence.html",
            linkText: "Go to Learner Licence Page",
            navigation: "From the portal, click 'Apply for Learner Licence' in the Quick Services grid, or go to Learner Licence → New Learner Licence in the top menu.",
            fee: "Application Fee ₹150 + LL Test Fee ₹50 + Smart Card Fee ₹200 = **Total ₹400**. Pay via UPI, Net Banking, or Debit/Credit Card.",
            documents: ["Aadhaar Card", "Age Proof (birth certificate / 10th marksheet)", "Address Proof", "Passport-size photo (white background)", "Scanned signature (JPG)"],
            eligibility: "Minimum age: 16 years for gearless 2-wheeler, 18 years for geared vehicles / LMV / car.",
            process: [
                "Fill Application Form (Form 1 / 1A) with personal details, address, and vehicle class",
                "Upload Photo & Signature (passport-size photo with white background, signature in JPG)",
                "Pay Application Fee Online (₹400 via UPI/Net Banking/Card)",
                "Book LL Test Slot at your nearest RTO",
                "Appear for LL Test (computerised MCQ test) & Get Certificate — valid for 6 months"
            ],
            validity: "Learner Licence is valid for 6 months from the date of issue.",
            processingTime: "24–48 hours after test",
            category: "licence"
        },
        {
            id: "driving_licence",
            title: "Apply for Driving Licence (DL)",
            keywords: ["driving", "licence", "dl", "permanent", "drive", "driving license", "apply dl", "new dl", "get dl", "perm", "full licence"],
            description: "Apply for a permanent Driving Licence after holding a valid Learner Licence for at least 30 days. Available with eKYC verification.",
            link: "driving-licence.html",
            linkText: "Go to Driving Licence Page",
            navigation: "From the portal, click 'Apply for Driving Licence' in the Quick Services grid, or go to Driving Licence → New Driving Licence in the top menu.",
            fee: "Application Fee ₹200 + DL Test Fee ₹300 + Smart Card Fee ₹200 = **Total ₹700**. Pay via UPI, Net Banking, or Debit/Credit Card.",
            documents: ["Valid Learner Licence (LL Certificate)", "Medical Certificate (Form 1A)", "Aadhaar Card", "Address Proof", "Passport-size photo"],
            eligibility: "Must hold a valid Learner Licence that is at least 30 days old. Minimum age: 18 for LMV/car, 20 for commercial/transport vehicles.",
            process: [
                "Prerequisite: Hold a valid Learner Licence for 30+ days",
                "Fill DL Application Form 9 — enter LL number, personal details, select vehicle class (LMV, MCWG, HMV)",
                "Book Driving Test Slot at nearest RTO",
                "Pay Fee & Appear for Driving Skill Test — inspector evaluates your driving skills",
                "DL Dispatched via Speed Post to registered address within 7–10 working days (smart card)"
            ],
            validity: "Non-transport DL valid for 20 years or until age 50 (whichever earlier). Transport DL valid for 3 years.",
            processingTime: "7–15 working days",
            category: "licence"
        },
        {
            id: "dl_renewal",
            title: "DL Renewal",
            keywords: ["renew", "renewal", "expired", "expiry", "expire", "extend", "dl renewal", "driving licence renewal", "renew dl", "renew licence"],
            description: "Renew your expired or expiring Driving Licence online. With eKYC, the process can be completely contactless — no RTO visit needed!",
            link: "service-form.html?service=Renewal+Duplicate+DL",
            linkText: "Go to DL Renewal Form",
            navigation: "From the portal, click 'DL Renewal' in the Quick Services grid, or go to Driving Licence → DL Renewal in the top menu.",
            fee: "Renewal Fee ₹200 + Smart Card Fee ₹200 = **Total ₹400**. Late fee ₹300 extra if expired over 1 year. Pay via UPI or Net Banking.",
            documents: ["Aadhaar Card", "Existing DL (or DL number)", "Medical Certificate (mandatory for age 40+)"],
            eligibility: "You can apply within 1 year before expiry or up to 5 years after expiry.",
            process: [
                "Check DL Expiry Date — apply within 1 year before or up to 5 years after expiry",
                "eKYC Verification (contactless) — if Aadhaar matches DL records, no RTO visit needed",
                "Pay Renewal Fee Online — ₹400 via UPI/Net Banking",
                "Renewed DL smart card dispatched to your address in 7–10 days"
            ],
            processingTime: "7–10 working days",
            category: "licence"
        },
        {
            id: "duplicate_dl",
            title: "Duplicate DL",
            keywords: ["duplicate", "lost", "damaged", "stolen", "copy", "duplicate dl", "dl lost", "replacement"],
            description: "Apply for a duplicate Driving Licence if your original DL is lost, damaged, or stolen. Duplicate Issue Fee ₹200 + Smart Card Fee ₹200 = Total ₹400.",
            link: "service-form.html?service=Duplicate+LL",
            linkText: "Apply for Duplicate DL",
            navigation: "From the portal, click 'Duplicate DL' in the Quick Services grid. You'll need to login first.",
            fee: "Duplicate Issue Fee ₹200 + Smart Card Fee ₹200 = **Total ₹400**.",
            documents: ["FIR copy (if stolen)", "Aadhaar Card", "Passport-size photo", "Affidavit/declaration"],
            process: ["Login to DriveEase portal", "Select 'Duplicate DL' service", "Upload required documents", "Pay fee online", "DL dispatched in 7-10 days"],
            processingTime: "7–10 working days",
            category: "licence"
        },
        {
            id: "international_permit",
            title: "International Driving Permit (IDP)",
            keywords: ["international", "idp", "abroad", "foreign", "overseas", "international driving permit", "drive abroad", "permit"],
            description: "Apply for an International Driving Permit if you wish to drive in other countries. IDP Application Fee ₹500 + Booklet Fee ₹500 = Total ₹1,000. Valid for 1 year or until DL expiry.",
            link: "service-form.html?service=Display+IDP",
            linkText: "Apply for IDP",
            navigation: "From the portal, go to Driving Licence → International Driving Permit in the top menu, or go to Others → Display IDP Details.",
            fee: "IDP Application Fee ₹500 + Booklet Fee ₹500 = **Total ₹1,000**.",
            documents: ["Valid Indian Driving Licence", "Passport (valid)", "Visa copy", "Passport-size photos", "Address proof"],
            eligibility: "Must hold a valid Indian Driving Licence. IDP valid in 150+ countries.",
            process: [
                "Eligibility Check — must hold a valid Indian DL. IDP valid for 1 year or until DL expiry",
                "Fill IDP Application Form online",
                "Upload supporting documents (Passport, Visa, DL copy, photos)",
                "Pay IDP Fee (₹1,000) online",
                "Collect IDP from RTO or receive by post"
            ],
            validity: "Valid for 1 year from date of issue or until DL expiry, whichever is earlier.",
            processingTime: "3–5 working days",
            category: "licence"
        },
        {
            id: "change_address",
            title: "Change of Address on DL",
            keywords: ["address", "change", "update", "shift", "moved", "change address", "address change", "update address"],
            description: "Update your residential address on your Driving Licence online. Fee: ₹200.",
            link: "service-form.html?service=Duplicate+LL",
            linkText: "Apply for Address Change",
            navigation: "From the portal, click 'Change of Address' in the Quick Services grid. Login required.",
            fee: "₹200 for address change.",
            documents: ["Aadhaar Card (with new address)", "Address proof (utility bill/bank statement)", "Existing DL"],
            category: "licence"
        },
        {
            id: "add_vehicle_class",
            title: "Add Vehicle Class to DL",
            keywords: ["add class", "vehicle class", "add vehicle", "additional class", "hmv", "lmv", "mcwg", "new class"],
            description: "Add a new vehicle class (e.g., HMV, LMV, MCWG) to your existing Driving Licence.",
            link: "service-form.html?service=Add+Class+Vehicles",
            linkText: "Add Vehicle Class",
            navigation: "From the portal or profile page, click 'Add Vehicle Class' in Quick Actions.",
            fee: "₹200–₹500 depending on vehicle class.",
            documents: ["Existing DL", "Medical Certificate", "Aadhaar Card", "Vehicle class-specific requirements"],
            category: "licence"
        },
        {
            id: "print_dl",
            title: "Print DL / Download DL",
            keywords: ["print", "download", "print dl", "download dl", "digital dl", "dl copy", "print licence"],
            description: "Print or download a digital copy of your Driving Licence from the DriveEase portal.",
            link: "service-form.html?service=Print+DL",
            linkText: "Print Your DL",
            navigation: "From the portal, go to Others → Print DL, or from your profile page click 'Print DL' in Quick Actions.",
            category: "licence"
        },
        {
            id: "appointment_booking",
            title: "Book Appointment / Test Slot",
            keywords: ["appointment", "slot", "book", "booking", "test", "schedule", "test slot", "book slot", "ll test", "dl test", "driving test", "rto appointment"],
            description: "Book test slots for Learner Licence test, Driving Licence test, or DL services at your preferred RTO. Appointment booking and rescheduling is FREE.",
            link: "appointment-enhanced.html",
            linkText: "Go to Appointment Booking",
            navigation: "From the portal, click 'Book LL / DL Test Slot' in Quick Services, or go to Appointments menu → select test type (LL/DL/Services).",
            fee: "Appointment booking is **FREE**. Rescheduling is also free.",
            types: ["LL Test Slot Booking", "DL Test Slot Booking", "DL Services Slot Booking", "Cancel LL/DL/Services Slot"],
            process: [
                "Login to your DriveEase account",
                "Select appointment type (LL Test / DL Test / DL Services)",
                "Choose your RTO and preferred date-time slot",
                "Confirm booking — you'll receive a booking confirmation via SMS & email"
            ],
            processingTime: "Instant booking confirmation",
            category: "appointment"
        },
        {
            id: "track_application",
            title: "Track Application Status",
            keywords: ["track", "status", "check", "application", "progress", "where", "track application", "application status", "check status"],
            description: "Check the real-time status of your licence application using your application number.",
            link: "portal.html",
            linkText: "Go to Portal → Track Application",
            navigation: "On the portal page, use the 'Quick Check' widget in the hero section (enter application number & DOB), or click 'Track Application' button in the header, or scroll to the Track Application section.",
            process: ["Enter your Application Number", "Enter Date of Birth", "Click 'Check Status' to see the current status"],
            category: "tracking"
        },
        {
            id: "fee_payments",
            title: "Fee Payments & Pricing",
            keywords: ["fee", "payment", "pay", "cost", "price", "charges", "amount", "money", "how much", "fees", "pricing", "service fee", "total cost"],
            description: "Make online fee payments for various licence and transport services. Supports UPI, Net Banking, Debit/Credit Cards. Visit the Pricing page for detailed fee breakdown.",
            link: "pricing.html",
            linkText: "View Full Pricing Guide",
            navigation: "Go to the Pricing page from the header nav, or go to Others → Fee Payments in the portal menu.",
            feeDetails: {
                "Learner Licence (Total)": "₹400 (App ₹150 + Test ₹50 + Card ₹200)",
                "Driving Licence (Total)": "₹700 (App ₹200 + Test ₹300 + Card ₹200)",
                "DL Renewal": "₹400 (Renewal ₹200 + Card ₹200) + Late fee ₹300 if applicable",
                "Duplicate DL": "₹400 (Issue ₹200 + Card ₹200)",
                "International Driving Permit": "₹1,000 (App ₹500 + Booklet ₹500)",
                "Change of Address": "₹200",
                "RTO Appointment": "FREE",
                "Mobile Number Update": "Varies"
            },
            category: "payment"
        },
        {
            id: "upload_documents",
            title: "Upload Documents",
            keywords: ["upload", "document", "documents", "attach", "file", "upload documents", "submit documents"],
            description: "Upload required documents for your pending licence applications. Supports Aadhaar, address proof, photos, and signatures.",
            link: "portal.html",
            linkText: "Login to Upload Documents",
            navigation: "From the portal, click 'Upload Documents' in the Quick Services grid. Login required.",
            category: "documents"
        },
        {
            id: "mobile_update",
            title: "Mobile Number Update",
            keywords: ["mobile", "phone", "number", "update mobile", "change number", "phone number", "mobile update"],
            description: "Update the mobile number linked to your driving licence records.",
            link: "service-form.html?service=Mobile+Number+Update",
            linkText: "Update Mobile Number",
            navigation: "From the portal, click 'Mobile Number Update' in Quick Services, or go to Settings → Account → Update Mobile Number.",
            category: "other"
        },
        {
            id: "conductor_licence",
            title: "Conductor Licence",
            keywords: ["conductor", "conductor licence", "cl", "bus conductor", "new conductor"],
            description: "Apply for, renew, or manage your Conductor Licence for public service vehicles.",
            link: "portal.html",
            linkText: "Go to Portal → Conductor Licence",
            navigation: "From the portal, go to Conductor Licence menu in the top nav. Options include: New CL, Temporary CL, Services on CL, Online CL Test, Print CL.",
            category: "licence"
        },
        {
            id: "ekyc",
            title: "eKYC Verification",
            keywords: ["ekyc", "kyc", "aadhaar", "aadhar", "verification", "contactless", "biometric", "identity"],
            description: "eKYC (electronic Know Your Customer) allows contactless verification using your Aadhaar. Services like DL renewal can be completed without visiting the RTO. Your profile shows whether eKYC is verified with a ✅ badge.",
            link: "portal.html",
            linkText: "Learn more on Portal",
            navigation: "eKYC-enabled services are marked with an 'eKYC' badge in the Quick Services grid (DL Application, DL Renewal). Your eKYC status is also visible on your Profile page.",
            category: "other"
        },
        {
            id: "ll_test",
            title: "Online LL Test (STALL)",
            keywords: ["stall", "online test", "ll test", "learner test", "mcq", "computerised test", "practice test"],
            description: "Take the online Learner Licence computerised test (STALL — Sarathi Learner Licence). It's an MCQ-based test at the RTO.",
            link: "portal.html",
            linkText: "Go to Online LL Test",
            navigation: "From the portal, click 'Online LL Test (STALL)' in Quick Services.",
            category: "test"
        },
        // ─── NEW: PROFILE PAGE ───
        {
            id: "my_profile",
            title: "My Profile",
            keywords: ["profile", "my profile", "personal details", "personal info", "user profile", "account info", "my details", "my information", "bio", "about me"],
            description: "View and manage your personal details, contact info, identification documents, and licence information all in one place.",
            link: "profile.html",
            linkText: "Go to My Profile",
            navigation: "Click your profile picture / name in the top-right corner to open the sidebar, then click 'My Profile'. Or navigate directly to profile.html.",
            details: {
                "Personal Info": "Full Name, Date of Birth, Gender, Blood Group, Father's Name",
                "Contact Details": "Mobile Number, Email, Address, Pin Code, RTO Office",
                "Identification": "Aadhaar (masked), eKYC Status, PAN, Passport",
                "Licence Details": "DL Number, Issue Date, Valid Until, Vehicle Class, Status (Active/Expired), Visual Licence Card"
            },
            quickActions: ["Renew Licence", "Address Change", "Add Vehicle Class", "Update Mobile", "Print DL", "International Permit", "Payment History", "Settings"],
            category: "account"
        },
        // ─── NEW: MY APPLICATIONS ───
        {
            id: "my_applications",
            title: "My Applications",
            keywords: ["my applications", "application history", "applications", "applied", "submitted", "my requests", "application list", "past applications", "pending applications"],
            description: "Track the status of ALL your licence and RTO service applications in one place. Filter by status: All, Approved ✅, Pending ⏳, Under Review 🔍, or Rejected ❌.",
            link: "my-applications.html",
            linkText: "Go to My Applications",
            navigation: "Click your profile picture / name in the top-right corner to open the sidebar, then click 'My Applications'. Or navigate directly to my-applications.html.",
            features: ["View all submitted applications", "Filter by status (All / Approved / Pending / Under Review / Rejected)", "See application ID, RTO, vehicle class, and date", "Track each application in real-time"],
            category: "account"
        },
        // ─── NEW: PAYMENT HISTORY ───
        {
            id: "payment_history",
            title: "Payment History",
            keywords: ["payment history", "transaction", "transactions", "receipt", "receipts", "billing", "paid", "payment record", "invoice", "payment status", "txn"],
            description: "View all your fee payments, transaction receipts, and billing history. Includes total paid summary, successful transactions count, search, and downloadable receipts.",
            link: "payment-history.html",
            linkText: "Go to Payment History",
            navigation: "Click your profile picture / name in the top-right corner to open the sidebar, then click 'Payment History'. Or navigate directly to payment-history.html.",
            features: ["Summary cards: Total Paid, Successful Transactions, Last Payment Date", "Full transaction table with search functionality", "Download PDF receipts for each payment", "Shows Transaction ID, Service, Amount, Payment Method, Date, Status"],
            category: "account"
        },
        // ─── NEW: SETTINGS ───
        {
            id: "settings",
            title: "Settings",
            keywords: ["settings", "preferences", "account settings", "notification", "notifications", "privacy", "security", "language", "accessibility", "font size", "dark mode", "high contrast", "two factor", "2fa", "password", "change password", "delete account"],
            description: "Manage your account preferences, notifications, privacy, security, and accessibility settings.",
            link: "settings.html",
            linkText: "Go to Settings",
            navigation: "Click your profile picture / name in the top-right corner to open the sidebar, then click 'Settings'. Or navigate directly to settings.html.",
            sections: {
                "Notifications": "SMS Notifications, Email Notifications, Payment Receipts, Promotional Updates — all toggle on/off",
                "Language & Accessibility": "Language (English/Gujarati/Hindi), Font Size, High Contrast Mode, Screen Reader Support",
                "Privacy & Security": "Two-Factor Authentication (OTP), Login Alerts, Change Password, Active Sessions management",
                "Account": "Update Mobile Number, Download/Export Account Data as PDF, Delete Account"
            },
            category: "account"
        },
        // ─── LOGIN / REGISTER / OTP ───
        {
            id: "login",
            title: "Login to DriveEase",
            keywords: ["login", "sign in", "log in", "signin", "access account", "enter portal"],
            description: "Login to your DriveEase account using your registered email/mobile and password, or use OTP-based login for passwordless access.",
            link: "login.html",
            linkText: "Go to Login Page",
            navigation: "Click the 'Login / Register' button in the top-right corner of the portal header. You can also access login.html directly.",
            process: ["Go to login.html", "Enter your registered email or mobile number", "Enter your password (or click 'Login with OTP' for passwordless)", "Click 'Login' to access your dashboard"],
            category: "auth"
        },
        {
            id: "register",
            title: "Create a New Account (Register)",
            keywords: ["register", "sign up", "signup", "create account", "new account", "join", "registration"],
            description: "Create a new DriveEase account to access all services. Register with your name, email, mobile number, and Aadhaar.",
            link: "register.html",
            linkText: "Go to Registration Page",
            navigation: "Click 'Create Account' on the login page, or go directly to register.html.",
            process: ["Go to register.html", "Enter your full name, email, mobile number", "Verify with Aadhaar OTP", "Set a password", "Account created — you can now login and use all services"],
            category: "auth"
        },
        {
            id: "otp_login",
            title: "OTP Login (Passwordless)",
            keywords: ["otp", "otp login", "one time password", "passwordless", "mobile otp", "sms otp", "verify otp"],
            description: "Login without a password using OTP (One-Time Password) sent to your registered mobile number.",
            link: "otp-login.html",
            linkText: "Go to OTP Login",
            navigation: "From the login page, click 'Login with OTP' to switch to OTP-based authentication.",
            process: ["Go to otp-login.html (or click 'Login with OTP' on login page)", "Enter your registered mobile number", "Receive OTP via SMS", "Enter the 6-digit OTP to login instantly"],
            category: "auth"
        },
        // ─── WEBSITE PAGES ───
        {
            id: "about_page",
            title: "About DriveEase",
            keywords: ["about", "about driveease", "who made", "team", "vision", "mission", "government", "ministry", "initiative"],
            description: "DriveEase is the official digital portal of the Ministry of Road Transport & Highways, Government of India. The About page covers the initiative's vision, mission, team, milestones, and Government backing.",
            link: "about.html",
            linkText: "Visit About Page",
            navigation: "Click 'About DriveEase' in the topbar or header navigation on any page.",
            category: "info"
        },
        {
            id: "product_page",
            title: "Product Details / What is DriveEase",
            keywords: ["product", "what is driveease", "features", "platform", "technology", "tech stack", "how it works", "problem", "solution"],
            description: "DriveEase is a fully digital driving licence portal that replaces outdated, paper-heavy RTO processes. It solves problems like manual paperwork, long queues, multiple RTO visits, and lack of transparency. Core features include: Online Application, Appointment Booking, OTP-based Login, Dashboard Tracking, Document Upload, and AI Chatbot.",
            link: "product.html",
            linkText: "Visit Product Page",
            navigation: "Click 'Product' in the topbar or header navigation.",
            stats: {
                "Faster Processing": "80%",
                "Less Paperwork": "60%",
                "Digital Workflow": "100%",
                "Pages Built": "15+"
            },
            category: "info"
        },
        {
            id: "pricing_page",
            title: "Service Pricing Guide",
            keywords: ["pricing", "price", "service fee", "fee structure", "fee guide", "how much cost", "total fee", "pricing page", "compare fees", "comparison"],
            description: "The Pricing page shows transparent, government-mandated fees for all RTO services with detailed breakdowns. View fee cards for Learner Licence (₹400), Driving Licence (₹700), Renewal (₹400+), International Permit (₹1,000), Duplicate (₹400), and Appointment (Free). Also includes a service comparison table.",
            link: "pricing.html",
            linkText: "View Full Pricing Page",
            navigation: "Click 'Pricing' in the header navigation, or from the portal footer.",
            category: "info"
        },
        {
            id: "sitemap_page",
            title: "Sitemap",
            keywords: ["sitemap", "site map", "all pages", "page list", "website map", "navigation map"],
            description: "View the complete sitemap of the DriveEase website with links to all pages and services.",
            link: "sitemap.html",
            linkText: "View Sitemap",
            navigation: "Click 'Sitemap' in the topbar on any page.",
            category: "info"
        },
        {
            id: "portal_dashboard",
            title: "Portal Dashboard (Home)",
            keywords: ["portal", "dashboard", "home", "main page", "home page", "quick services", "service grid"],
            description: "The main DriveEase dashboard/portal is your central hub. It features: Quick Status Check widget, Quick Services grid (12+ services), Step-by-Step Process guide with videos, Track Application section, Announcements & Updates, and the user sidebar with profile access.",
            link: "portal.html",
            linkText: "Go to Portal Dashboard",
            navigation: "Click the DriveEase logo or 'Portal' link from any page to go to the dashboard.",
            category: "info"
        },
        // ─── CHATBOT / AI ───
        {
            id: "chatbot_deva",
            title: "DEVA – AI Virtual Assistant (Chatbot)",
            keywords: ["chatbot", "deva", "virtual assistant", "ai", "bot", "chat", "help bot", "assistant", "nlp", "rag"],
            description: "DEVA (DriveEase Virtual Assistant) is the AI-powered chatbot available on every page. It uses NLP (Natural Language Processing) and RAG (Retrieval-Augmented Generation) to answer questions about licences, fees, documents, navigation, profile, payments, and all website features. Click the chat icon in the bottom-right corner to start.",
            link: "#",
            linkText: "You're already talking to me! 😊",
            navigation: "Click the floating chat button (blue circle) in the bottom-right corner of any page.",
            category: "info"
        },
        // ─── SIDEBAR ───
        {
            id: "user_sidebar",
            title: "User Sidebar / Account Menu",
            keywords: ["sidebar", "side bar", "menu", "navigation menu", "account menu", "user menu", "hamburger menu"],
            description: "The sliding sidebar gives quick access to your account pages. It opens when you click your profile button in the header. Contains links to: My Profile, My Applications, Payment History, Settings, and Logout.",
            link: "portal.html",
            linkText: "Open sidebar from any page",
            navigation: "Click your name/avatar in the top-right header to open the sidebar. Available on portal, about, service-form, and all new pages (profile, applications, payments, settings).",
            category: "info"
        }
    ],

    // ─── PAGES & NAVIGATION ──────────────────────────────
    pages: [
        { name: "Portal / Dashboard", url: "portal.html", description: "Main dashboard with all services, quick status check, process guides, and announcements." },
        { name: "Landing Page", url: "index.html", description: "DriveEase landing/welcome page with overview of the platform." },
        { name: "Learner Licence", url: "learners-licence.html", description: "Step-by-step wizard to apply for a new Learner Licence." },
        { name: "Driving Licence", url: "driving-licence.html", description: "Step-by-step wizard to apply for a permanent Driving Licence." },
        { name: "Appointments", url: "appointment-enhanced.html", description: "Book or cancel LL test, DL test, or DL services slots at your preferred RTO." },
        { name: "About DriveEase", url: "about.html", description: "Learn about the DriveEase initiative, vision, team, and Government backing." },
        { name: "Product Details", url: "product.html", description: "What DriveEase is, problem it solves, core features, tech stack, and impact stats." },
        { name: "Service Pricing", url: "pricing.html", description: "Detailed fee breakdown for all services with comparison table." },
        { name: "Service Forms", url: "service-form.html", description: "General service application forms for various DL/CL services (renewal, duplicate, address change, etc.)." },
        { name: "My Profile", url: "profile.html", description: "Personal details, contact info, identification, licence details with visual DL card, and quick actions." },
        { name: "My Applications", url: "my-applications.html", description: "Track all your submitted applications with status filters (Approved, Pending, Under Review, Rejected)." },
        { name: "Payment History", url: "payment-history.html", description: "View transactions, download receipts, search payments, and see summary stats." },
        { name: "Settings", url: "settings.html", description: "Manage notifications, language, accessibility, privacy, security, and account preferences." },
        { name: "Login", url: "login.html", description: "Login with email/mobile and password." },
        { name: "Register", url: "register.html", description: "Create a new DriveEase account." },
        { name: "OTP Login", url: "otp-login.html", description: "Passwordless login using mobile OTP." },
        { name: "Sitemap", url: "sitemap.html", description: "Complete sitemap with links to all pages." },
        { name: "Usability Report", url: "usability-report.html", description: "Usability testing report and findings for the DriveEase portal." }
    ],

    // ─── FREQUENTLY ASKED QUESTIONS ──────────────────────
    faqs: [
        {
            question: "What is DriveEase?",
            keywords: ["what", "driveease", "about", "portal", "website", "what is this", "what is driveease"],
            answer: "DriveEase is the official digital portal of the Ministry of Road Transport & Highways, Government of India. It allows you to apply, renew, track, and manage all your driving and transport documents completely online — without repeated RTO visits. Features include: Learner/Driving Licence applications, DL renewal, appointments, fee payments, profile management, application tracking, and an AI chatbot (DEVA) for instant help."
        },
        {
            question: "What all can I do on this website?",
            keywords: ["what can", "features", "services", "everything", "all services", "full list", "what all", "capabilities"],
            answer: "DriveEase covers **everything** transport-related:\n\n**🪪 Licence Services:** Apply for Learner Licence, Driving Licence, DL Renewal, Duplicate DL, International Permit, Address Change, Add Vehicle Class, Print DL, Mobile Number Update, Conductor Licence\n\n**📅 Appointments:** Book/cancel LL Test, DL Test, and service slots\n\n**📊 Tracking:** Track application status in real-time\n\n**👤 Account:** My Profile (personal info, licence card), My Applications (status filters), Payment History (receipts), Settings (notifications, privacy, accessibility)\n\n**📄 Pages:** Portal Dashboard, About, Product, Pricing, Sitemap, Login/Register/OTP Login\n\n**🤖 AI Chatbot (DEVA):** Available on every page for instant answers!"
        },
        {
            question: "What are the office/helpline hours?",
            keywords: ["office", "hours", "helpline", "timing", "contact", "phone", "call", "when open", "support", "customer service"],
            answer: "The DriveEase Helpline is available at **0120-4925505**, Monday to Saturday, 8 AM to 8 PM (toll-free for transport queries). You can also submit feedback or grievances online through the portal."
        },
        {
            question: "How do I login or register?",
            keywords: ["login", "register", "sign up", "sign in", "account", "create account", "log in", "how to login", "how to register"],
            answer: "**To Login:** Go to login.html → enter email/mobile + password → click Login. Or use **OTP Login** (otp-login.html) for passwordless access via mobile OTP.\n\n**To Register:** Go to register.html → enter name, email, mobile → verify with Aadhaar OTP → set password → done!\n\n🔗 [**Go to Login**](login.html) · [**Go to Register**](register.html) · [**OTP Login**](otp-login.html)"
        },
        {
            question: "How do I track my application?",
            keywords: ["track", "status", "check application", "where is my", "application number", "track application"],
            answer: "You can track your application in multiple ways:\n\n1. **Portal Quick Check:** On portal.html, use the 'Quick Check' widget in the hero section — enter Application Number & DOB, click 'Check Status'\n2. **My Applications page:** Go to my-applications.html to see ALL your applications with status filters (Approved/Pending/Under Review/Rejected)\n3. **Header button:** Click 'Track Application' in the portal header\n\n🔗 [**Go to My Applications**](my-applications.html)"
        },
        {
            question: "What documents are needed for a learner licence?",
            keywords: ["documents", "learner", "ll documents", "required documents ll", "papers ll"],
            answer: "For a Learner Licence, you need:\n• Aadhaar Card\n• Age Proof (birth certificate or 10th marksheet)\n• Address Proof\n• Passport-size photo (white background)\n• Scanned signature in JPG format\n\n**Total Fee: ₹400** (Application ₹150 + Test ₹50 + Smart Card ₹200)"
        },
        {
            question: "What documents are needed for a driving licence?",
            keywords: ["documents", "driving", "dl documents", "required documents dl", "papers dl"],
            answer: "For a Driving Licence, you need:\n• Valid Learner Licence (LL Certificate) — must be 30+ days old\n• Medical Certificate (Form 1A)\n• Aadhaar Card\n• Address Proof\n• Passport-size photo\n\n**Total Fee: ₹700** (Application ₹200 + Test ₹300 + Smart Card ₹200)"
        },
        {
            question: "What is the minimum age for a driving licence?",
            keywords: ["age", "minimum", "years old", "how old", "eligible age", "age limit"],
            answer: "Minimum age requirements:\n• **16 years** — Gearless 2-wheeler (scooter/moped)\n• **18 years** — Geared vehicle, LMV (car), motorcycle\n• **20 years** — Commercial/transport vehicles (HMV, bus, truck)"
        },
        {
            question: "How long does it take to get my DL?",
            keywords: ["how long", "time", "days", "when", "receive", "dispatch", "delivery", "processing time"],
            answer: "Processing times vary by service:\n• **Learner Licence:** 24–48 hours after test\n• **Driving Licence:** 7–15 working days after test\n• **DL Renewal:** 7–10 working days\n• **Duplicate DL:** 7–10 working days\n• **International Permit:** 3–5 working days\n• **Appointment Booking:** Instant confirmation\n\nSmart card DL is dispatched via Speed Post to your registered address."
        },
        {
            question: "Can I renew my DL without visiting the RTO?",
            keywords: ["without rto", "contactless", "online renewal", "no visit", "from home"],
            answer: "Yes! With **eKYC verification**, if your Aadhaar details match your DL records, the renewal is completely contactless — no RTO visit needed. Just apply online, do eKYC, pay ₹400, and your renewed DL will be delivered to your door in 7–10 days."
        },
        {
            question: "What payment methods are accepted?",
            keywords: ["payment method", "upi", "net banking", "card", "debit", "credit", "how to pay", "gpay", "paytm"],
            answer: "DriveEase accepts:\n• **UPI** (Google Pay, PhonePe, Paytm, etc.)\n• **Net Banking** (all major banks)\n• **Debit Cards** (Visa, Mastercard, RuPay)\n• **Credit Cards** (Visa, Mastercard)\n\nAll payments are secure and you receive instant confirmation. View your payment history at payment-history.html."
        },
        {
            question: "What is the validity of a Learner Licence?",
            keywords: ["validity", "valid", "ll valid", "how long ll", "ll expire", "learner valid"],
            answer: "A Learner Licence is valid for **6 months** from the date of issue. During this period, you should practice driving and apply for a permanent Driving Licence (after 30 days minimum)."
        },
        {
            question: "How to cancel a booked test slot?",
            keywords: ["cancel", "slot", "cancel appointment", "cancel test", "cancel booking", "reschedule"],
            answer: "Go to the **Appointments page** (appointment-enhanced.html) → select 'Cancel LL Test Slot', 'Cancel DL Test Slot', or 'Cancel DL Services Slot' from the top menu. Enter your application number to cancel. Cancellation and rescheduling are **FREE**."
        },
        {
            question: "How do I view my profile?",
            keywords: ["view profile", "see profile", "my details", "personal information", "where is profile", "open profile"],
            answer: "Click your **name/avatar** in the top-right corner of any page to open the sidebar, then click **'My Profile'**. Or go directly to profile.html.\n\nYour profile shows: Personal Info (name, DOB, gender, blood group), Contact Details (mobile, email, address), Identification (Aadhaar, eKYC, PAN), Licence Details with a visual DL card, and Quick Actions for common services.\n\n🔗 [**Go to My Profile**](profile.html)"
        },
        {
            question: "How do I see my payment history?",
            keywords: ["see payments", "view payments", "download receipt", "transaction history", "where payment"],
            answer: "Go to **Payment History** (payment-history.html) from the sidebar or navigate directly. You'll see:\n• Summary cards (Total Paid, Successful Transactions, Last Payment Date)\n• Searchable transaction table with all payments\n• Download PDF receipts for each transaction\n\n🔗 [**Go to Payment History**](payment-history.html)"
        },
        {
            question: "How do I change settings?",
            keywords: ["change settings", "update settings", "notification settings", "language change", "font size", "dark mode", "accessibility"],
            answer: "Go to **Settings** (settings.html) from the sidebar. You can manage:\n• **Notifications:** SMS, Email, Payment Receipts, Promotions\n• **Language:** English, Gujarati, Hindi\n• **Accessibility:** Font Size, High Contrast, Screen Reader\n• **Privacy:** Two-Factor Auth, Login Alerts, Password Change\n• **Account:** Update Mobile, Export Data, Delete Account\n\n🔗 [**Go to Settings**](settings.html)"
        },
        {
            question: "How do I check my application status?",
            keywords: ["application status", "check application", "approved", "pending", "rejected", "under review"],
            answer: "Go to **My Applications** (my-applications.html) to see all your applications. Use the filter buttons to view:\n• ✅ **Approved** — Application completed successfully\n• ⏳ **Pending** — Waiting for processing\n• 🔍 **Under Review** — Being reviewed by RTO\n• ❌ **Rejected** — Application rejected (reapply)\n\n🔗 [**Go to My Applications**](my-applications.html)"
        },
        {
            question: "Where can I see all service fees?",
            keywords: ["all fees", "fee list", "fee comparison", "every fee", "complete fee", "fee table"],
            answer: "Visit the **Pricing Page** (pricing.html) for a complete fee guide:\n• Learner Licence: **₹400**\n• Driving Licence: **₹700**\n• DL Renewal: **₹400+**\n• Duplicate DL: **₹400**\n• International Permit: **₹1,000**\n• Appointment: **FREE**\n\nIncludes detailed breakdowns and a comparison table!\n\n🔗 [**View Full Pricing**](pricing.html)"
        },
        {
            question: "What is the sidebar?",
            keywords: ["what sidebar", "sidebar menu", "sidebar work", "how open sidebar", "profile sidebar"],
            answer: "The **User Sidebar** is a sliding menu that opens when you click your name/avatar in the top-right header. It provides quick access to:\n• 👤 **My Profile** — Personal details & licence info\n• 📄 **My Applications** — Track all applications\n• 💳 **Payment History** — Transactions & receipts\n• ⚙️ **Settings** — Notifications, privacy, accessibility\n• 🚪 **Logout** — Sign out of your account\n\nThe sidebar works on all major pages: Portal, About, Service Form, Profile, Applications, Payments, and Settings."
        },
        {
            question: "How do I logout?",
            keywords: ["logout", "log out", "sign out", "signout", "exit account"],
            answer: "To logout: Click your **name/avatar** in the top-right corner → the sidebar opens → click the red **'🚪 Logout'** button at the bottom. You'll be redirected to the login page."
        },
        {
            question: "Which languages are supported?",
            keywords: ["language", "hindi", "gujarati", "english", "multilingual", "bhasha"],
            answer: "DriveEase supports **3 languages**:\n• 🌐 **English** (default)\n• 🇮🇳 **ગુજરાતી (Gujarati)**\n• 🇮🇳 **हिंदी (Hindi)**\n\nYou can switch languages from the language dropdown in the header, or change your default language in Settings → Language & Accessibility."
        }
    ],

    // ─── GREETINGS & SMALL TALK ──────────────────────────
    greetings: {
        patterns: ["hi", "hello", "hey", "hola", "good morning", "good afternoon", "good evening", "sup", "yo", "namaste", "greetings"],
        responses: [
            "Hello! 👋 I'm **DEVA** (DriveEase Virtual Assistant). I know everything about this website! Ask me about licences, profile, payments, settings, or anything else. How can I help you today?",
            "Hi there! 🙏 Welcome to DriveEase. I can help with licence applications, renewals, appointments, profile, payment history, settings, navigation, and more. What do you need?",
            "Hey! 👋 I'm here to assist you with ALL DriveEase services — from applying for a licence to checking your payment history. Ask me anything!"
        ]
    },

    thanks: {
        patterns: ["thank", "thanks", "thankyou", "thank you", "thx", "appreciated", "helpful"],
        responses: [
            "You're welcome! 😊 Feel free to ask if you need anything else — I cover every feature on this website!",
            "Happy to help! 🙏 Is there anything else I can assist you with?",
            "Glad I could help! Don't hesitate to ask more questions — profile, payments, settings, licences, anything! 😊"
        ]
    },

    goodbye: {
        patterns: ["bye", "goodbye", "see you", "quit", "exit", "close", "done"],
        responses: [
            "Goodbye! 👋 Have a great day! Visit DriveEase anytime you need help.",
            "See you later! 🚗 Safe driving and feel free to come back anytime.",
            "Bye! 👋 All the best with your licence journey!"
        ]
    },

    // ─── SUGGESTION CHIPS ────────────────────────────────
    quickSuggestions: [
        "Apply for Learner Licence",
        "Apply for Driving Licence",
        "How to renew DL?",
        "View my profile",
        "Check my applications",
        "Payment history",
        "Fee information",
        "Book test appointment",
        "Track my application",
        "Change settings"
    ]
};
