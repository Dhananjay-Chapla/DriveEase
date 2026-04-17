// ══════════════════════════════════════════════════════════
// DriveEase – Chat Widget UI Controller
// Beautiful, modern chat panel with animations
// ══════════════════════════════════════════════════════════

const DriveEaseChatUI = (function () {

    let chatOpen = false;
    let chatInitialized = false;
    let messageHistory = [];

    // ─── INJECT STYLES ───────────────────────────────────
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
        /* ─── CHAT PANEL ─── */
        .de-chat-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(13,27,62,0.18);
            z-index: 2999;
            opacity: 0;
            transition: opacity 0.25s;
        }
        .de-chat-overlay.open { display: block; opacity: 1; }

        .de-chat-panel {
            position: fixed;
            bottom: 96px;
            right: 28px;
            width: 400px;
            max-width: calc(100vw - 40px);
            height: 560px;
            max-height: calc(100vh - 140px);
            background: #FFFFFF;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(13,27,62,0.25), 0 0 0 1px rgba(26,79,214,0.08);
            display: flex;
            flex-direction: column;
            z-index: 3001;
            overflow: hidden;
            transform: scale(0.9) translateY(20px);
            opacity: 0;
            pointer-events: none;
            transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s;
        }
        .de-chat-panel.open {
            transform: scale(1) translateY(0);
            opacity: 1;
            pointer-events: all;
        }

        /* ─── CHAT HEADER ─── */
        .de-chat-header {
            background: linear-gradient(135deg, #0D1B3E 0%, #1A4FD6 100%);
            color: white;
            padding: 18px 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            flex-shrink: 0;
        }
        .de-chat-avatar {
            width: 44px;
            height: 44px;
            background: rgba(255,255,255,0.15);
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }
        .de-chat-header-info { flex: 1; }
        .de-chat-header-title {
            font-family: 'Sora', sans-serif;
            font-size: 1rem;
            font-weight: 700;
        }
        .de-chat-header-sub {
            font-size: 0.72rem;
            opacity: 0.7;
            margin-top: 2px;
        }
        .de-chat-header-status {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.68rem;
            background: rgba(16,185,129,0.2);
            color: #6EE7B7;
            padding: 2px 10px;
            border-radius: 100px;
            font-weight: 600;
        }
        .de-chat-header-status::before {
            content: '';
            width: 6px; height: 6px;
            background: #10B981;
            border-radius: 50%;
            animation: de-blink 1.5s infinite;
        }
        @keyframes de-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        .de-chat-close {
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            width: 32px; height: 32px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.15s;
            flex-shrink: 0;
        }
        .de-chat-close:hover { background: rgba(255,255,255,0.2); }

        /* ─── MESSAGES AREA ─── */
        .de-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 16px 16px 8px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
            background: #F8FAFC;
        }
        .de-chat-messages::-webkit-scrollbar { width: 5px; }
        .de-chat-messages::-webkit-scrollbar-track { background: transparent; }
        .de-chat-messages::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 10px; }

        /* ─── MESSAGE BUBBLE ─── */
        .de-msg {
            max-width: 88%;
            animation: de-msgIn 0.3s ease;
        }
        @keyframes de-msgIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .de-msg-bot { align-self: flex-start; }
        .de-msg-user { align-self: flex-end; }

        .de-msg-bubble {
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 0.875rem;
            line-height: 1.6;
            word-wrap: break-word;
        }
        .de-msg-bot .de-msg-bubble {
            background: #FFFFFF;
            color: #1E293B;
            border: 1px solid #E2E8F0;
            border-bottom-left-radius: 6px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
        }
        .de-msg-user .de-msg-bubble {
            background: linear-gradient(135deg, #1A4FD6, #3B82F6);
            color: white;
            border-bottom-right-radius: 6px;
            box-shadow: 0 2px 8px rgba(26,79,214,0.2);
        }
        .de-msg-time {
            font-size: 0.62rem;
            color: #94A3B8;
            margin-top: 4px;
            padding: 0 4px;
        }
        .de-msg-user .de-msg-time { text-align: right; }

        /* ─── MARKDOWN IN BOT MESSAGES ─── */
        .de-msg-bot .de-msg-bubble h3 {
            font-family: 'Sora', sans-serif;
            font-size: 0.95rem;
            font-weight: 700;
            color: #0D1B3E;
            margin-bottom: 6px;
        }
        .de-msg-bot .de-msg-bubble strong { color: #1A4FD6; }
        .de-msg-bot .de-msg-bubble a {
            color: #1A4FD6;
            text-decoration: none;
            font-weight: 600;
            border-bottom: 1.5px solid rgba(26,79,214,0.3);
            transition: border-color 0.15s;
        }
        .de-msg-bot .de-msg-bubble a:hover { border-color: #1A4FD6; }

        /* ─── SUGGESTION CHIPS ─── */
        .de-suggestions {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            padding: 4px 0;
        }
        .de-chip {
            background: #EFF6FF;
            border: 1.5px solid #BFDBFE;
            border-radius: 100px;
            padding: 6px 14px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #1A4FD6;
            cursor: pointer;
            transition: all 0.15s;
            font-family: 'DM Sans', sans-serif;
            white-space: nowrap;
        }
        .de-chip:hover {
            background: #1A4FD6;
            color: white;
            border-color: #1A4FD6;
            transform: translateY(-1px);
        }

        /* ─── TYPING INDICATOR ─── */
        .de-typing {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 12px 16px;
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 18px;
            border-bottom-left-radius: 6px;
            align-self: flex-start;
            max-width: 80px;
        }
        .de-typing-dot {
            width: 7px; height: 7px;
            background: #94A3B8;
            border-radius: 50%;
            animation: de-typeBounce 1.2s infinite;
        }
        .de-typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .de-typing-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes de-typeBounce {
            0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
            30% { transform: translateY(-6px); opacity: 1; }
        }

        /* ─── INPUT AREA ─── */
        .de-chat-input-wrap {
            padding: 12px 16px 16px;
            background: white;
            border-top: 1px solid #E5EDF8;
            display: flex;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
        }
        .de-chat-input {
            flex: 1;
            border: 1.5px solid #E2E8F0;
            border-radius: 14px;
            padding: 11px 16px;
            font-size: 0.875rem;
            font-family: 'DM Sans', sans-serif;
            color: #1E293B;
            outline: none;
            transition: border-color 0.15s, box-shadow 0.15s;
            background: #F8FAFC;
        }
        .de-chat-input::placeholder { color: #94A3B8; }
        .de-chat-input:focus {
            border-color: #3B82F6;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
            background: white;
        }
        .de-chat-send {
            width: 42px; height: 42px;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, #1A4FD6, #3B82F6);
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.15s, box-shadow 0.15s;
            flex-shrink: 0;
        }
        .de-chat-send:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(26,79,214,0.3);
        }
        .de-chat-send:active { transform: scale(0.96); }
        .de-chat-send svg { width: 20px; height: 20px; }

        /* ─── POWERED BY ─── */
        .de-chat-footer {
            text-align: center;
            font-size: 0.62rem;
            color: #94A3B8;
            padding: 0 0 10px;
            background: white;
        }

        /* ─── RESPONSIVE ─── */
        @media (max-width: 480px) {
            .de-chat-panel {
                bottom: 0;
                right: 0;
                width: 100vw;
                height: 100vh;
                max-height: 100vh;
                border-radius: 0;
            }
        }
        `;
        document.head.appendChild(style);
    }

    // ─── CREATE CHAT DOM ─────────────────────────────────
    function createChatDOM() {
        // Overlay
        const overlay = document.createElement('div');
        overlay.className = 'de-chat-overlay';
        overlay.onclick = () => toggleChat();
        document.body.appendChild(overlay);

        // Panel
        const panel = document.createElement('div');
        panel.className = 'de-chat-panel';
        panel.id = 'de-chat-panel';
        panel.innerHTML = `
            <div class="de-chat-header">
                <div class="de-chat-avatar">
                    <img src="chatbot-logo.svg" alt="DEVA Logo" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div class="de-chat-header-info">
                    <div class="de-chat-header-title">DEVA – Virtual Assistant</div>
                    <div class="de-chat-header-sub">DriveEase AI · NLP + RAG Powered</div>
                </div>
                <div class="de-chat-header-status">Online</div>
                <button class="de-chat-close" onclick="DriveEaseChatUI.toggle()" title="Close chat">✕</button>
            </div>
            <div class="de-chat-messages" id="de-chat-messages"></div>
            <div class="de-chat-input-wrap">
                <input class="de-chat-input" id="de-chat-input" type="text" placeholder="Ask about licences, services, fees..." autocomplete="off" />
                <button class="de-chat-send" id="de-chat-send" onclick="DriveEaseChatUI.sendMessage()" title="Send">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 2L11 13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                </button>
            </div>
            <div class="de-chat-footer">Powered by DriveEase NLP Engine · RAG Knowledge Base</div>
        `;
        document.body.appendChild(panel);

        // Enter key handler
        document.getElementById('de-chat-input').addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                DriveEaseChatUI.sendMessage();
            }
        });
    }

    // ─── SIMPLE MARKDOWN PARSER ──────────────────────────
    function parseMarkdown(text) {
        return text
            // Headers
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h3>$1</h3>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Links [text](url)
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_self">$1</a>')
            // Bullet points
            .replace(/^• (.+)$/gm, '<div style="padding-left:12px;margin:2px 0">• $1</div>')
            // Numbered list
            .replace(/^(\d+)\. (.+)$/gm, '<div style="padding-left:12px;margin:3px 0"><strong>$1.</strong> $2</div>')
            // Line breaks
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    // ─── GET TIMESTAMP ───────────────────────────────────
    function getTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    // ─── ADD MESSAGE ─────────────────────────────────────
    function addMessage(text, isUser, suggestions = []) {
        const container = document.getElementById('de-chat-messages');
        const msgDiv = document.createElement('div');
        msgDiv.className = `de-msg ${isUser ? 'de-msg-user' : 'de-msg-bot'}`;

        const bubble = document.createElement('div');
        bubble.className = 'de-msg-bubble';
        bubble.innerHTML = isUser ? text : parseMarkdown(text);
        msgDiv.appendChild(bubble);

        const time = document.createElement('div');
        time.className = 'de-msg-time';
        time.textContent = getTime();
        msgDiv.appendChild(time);

        // Suggestions
        if (!isUser && suggestions.length > 0) {
            const sugDiv = document.createElement('div');
            sugDiv.className = 'de-suggestions';
            suggestions.forEach(s => {
                const chip = document.createElement('button');
                chip.className = 'de-chip';
                chip.textContent = s;
                chip.onclick = () => {
                    document.getElementById('de-chat-input').value = s;
                    DriveEaseChatUI.sendMessage();
                };
                sugDiv.appendChild(chip);
            });
            msgDiv.appendChild(sugDiv);
        }

        container.appendChild(msgDiv);
        container.scrollTop = container.scrollHeight;

        messageHistory.push({ text, isUser, time: getTime() });
    }

    // ─── SHOW TYPING INDICATOR ───────────────────────────
    function showTyping() {
        const container = document.getElementById('de-chat-messages');
        const typing = document.createElement('div');
        typing.className = 'de-typing';
        typing.id = 'de-typing-indicator';
        typing.innerHTML = '<div class="de-typing-dot"></div><div class="de-typing-dot"></div><div class="de-typing-dot"></div>';
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }

    function hideTyping() {
        const el = document.getElementById('de-typing-indicator');
        if (el) el.remove();
    }

    // ─── WELCOME MESSAGE ─────────────────────────────────
    function showWelcome() {
        const welcomeText = "Hello! 👋 I'm **DEVA** (DriveEase Virtual Assistant).\n\nI know **everything** about this website! Ask me about:\n• 🪪 Licence applications, renewals, fees & documents\n• 👤 Your profile, applications & payment history\n• ⚙️ Settings, notifications & security\n• 📅 Appointments, tracking & navigation\n• 📄 About, Product, Pricing & all pages\n\nJust type your question below, or tap a suggestion! 👇";
        addMessage(welcomeText, false, DRIVEEASE_KNOWLEDGE.quickSuggestions.slice(0, 4));
    }

    // ─── TOGGLE CHAT ─────────────────────────────────────
    function toggleChat() {
        if (!chatInitialized) {
            injectStyles();
            createChatDOM();
            chatInitialized = true;
            // Show welcome after panel animation
            setTimeout(showWelcome, 400);
        }

        chatOpen = !chatOpen;
        const panel = document.getElementById('de-chat-panel');
        const overlay = document.querySelector('.de-chat-overlay');

        if (chatOpen) {
            panel.classList.add('open');
            overlay.classList.add('open');
            setTimeout(() => document.getElementById('de-chat-input').focus(), 350);
        } else {
            panel.classList.remove('open');
            overlay.classList.remove('open');
        }
    }

    // ─── SEND MESSAGE ────────────────────────────────────
    function sendMessage() {
        const input = document.getElementById('de-chat-input');
        const text = input.value.trim();
        if (!text) return;

        // Add user message
        addMessage(text, true);
        input.value = '';

        // Show typing
        showTyping();

        // Process with NLP engine (simulated delay for realism)
        const delay = 400 + Math.random() * 600;
        setTimeout(() => {
            hideTyping();
            const response = DriveEaseNLP.processQuery(text);
            addMessage(response.text, false, response.suggestions);
        }, delay);
    }

    // Public API
    return {
        toggle: toggleChat,
        sendMessage: sendMessage
    };
})();

// ─── OVERRIDE toggleChat() GLOBALLY ──────────────────────
function toggleChat() {
    DriveEaseChatUI.toggle();
}
