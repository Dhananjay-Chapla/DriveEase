import codecs
import re
import os

os.chdir("c:/Users/Hemanshu/OneDrive/Desktop/SEM 6/UIUX/DriveEase")

# 1. Edit login.html
with codecs.open("login.html", "r", "utf-8") as f:
    text = f.read()

# Replace tabs with header
text = re.sub(
    r'<div class="tabs">.*?</div>',
    '<div style="margin-bottom: 25px;">\n                <h3 style="font-size: 1.8rem; color: var(--dark); font-weight: 700;">Welcome Back</h3>\n                <p style="color: var(--gray); margin-top: 5px;">Login to access your DriveEase services</p>\n            </div>',
    text, flags=re.DOTALL
)

# Remove REGISTER FORM block
text = re.sub(
    r'<!-- REGISTER FORM -->.*?</div>\s+<!-- OTP FORM -->',
    '<!-- OTP FORM -->',
    text, flags=re.DOTALL
)

# Remove OTP FORM block. It matches from <!-- OTP FORM --> until <div style="text-align:center; margin-top:30px;">
text = re.sub(
    r'<!-- OTP FORM -->.*?</div>\s+</div>\s+<div style="text-align:center; margin-top:30px;">',
    '</div>\n            <div style="text-align:center; margin-top:30px;">',
    text, flags=re.DOTALL
)

# Switch OTP tab link
text = text.replace("switchTab('otp')", "window.location.href='otp-login.html'")

# Add register link
text = text.replace(
    '''<button class="social-btn" onclick="window.location.href='otp-login.html'">📱 SMS OTP</button>
                    </div>''',
    '''<button class="social-btn" onclick="window.location.href='otp-login.html'">📱 SMS OTP</button>
                    </div>
                    <div style="text-align:center; margin-top:20px;">
                        <a href="register.html" style="color:var(--blue); font-weight:600; text-decoration:none;">Don't have an account? Register here</a>
                    </div>'''
)

with codecs.open("login.html", "w", "utf-8") as f:
    f.write(text)

# 2. Edit register.html
with codecs.open("register.html", "r", "utf-8") as f:
    text = f.read()

text = text.replace("<title>Login - ", "<title>Register - ")

text = re.sub(
    r'<div class="tabs">.*?</div>',
    '<div style="margin-bottom: 25px;">\n                <h3 style="font-size: 1.8rem; color: var(--dark); font-weight: 700;">Create an Account</h3>\n                <p style="color: var(--gray); margin-top: 5px;">Join DriveEase to manage your transport services</p>\n            </div>',
    text, flags=re.DOTALL
)

# Remove LOGIN FORM block
text = re.sub(
    r'<!-- LOGIN FORM -->.*?<!-- REGISTER FORM -->',
    '<!-- REGISTER FORM -->',
    text, flags=re.DOTALL
)

text = text.replace('class="form-content" id="form-register"', 'class="form-content active" id="form-register"')

# Remove OTP FORM block
text = re.sub(
    r'<!-- OTP FORM -->.*?</div>\s+</div>\s+(<div style="text-align:center; margin-top:30px;">)',
    r'\1',
    text, flags=re.DOTALL
)

# Add login link
text = text.replace(
    '''<button class="btn-primary" onclick="doRegister()">Create Account &rarr;</button>
                </div>''',
    '''<button class="btn-primary" onclick="doRegister()">Create Account &rarr;</button>
                    <div style="text-align:center; margin-top:20px;">
                        <a href="login.html" style="color:var(--blue); font-weight:600; text-decoration:none;">Already have an account? Login here</a>
                    </div>
                </div>'''
)

# Update switchTab for register completion
text = text.replace("switchTab('login');", "window.location.href='login.html';")

with codecs.open("register.html", "w", "utf-8") as f:
    f.write(text)

# 3. Edit otp-login.html
with codecs.open("otp-login.html", "r", "utf-8") as f:
    text = f.read()

text = text.replace("<title>Login - ", "<title>OTP Login - ")

text = re.sub(
    r'<div class="tabs">.*?</div>',
    '<div style="margin-bottom: 25px;">\n                <h3 style="font-size: 1.8rem; color: var(--dark); font-weight: 700;">Login with OTP</h3>\n                <p style="color: var(--gray); margin-top: 5px;">We will send a code to your registered mobile number</p>\n            </div>',
    text, flags=re.DOTALL
)

# Remove LOGIN and REGISTER form blocks
text = re.sub(
    r'<!-- LOGIN FORM -->.*?<!-- OTP FORM -->',
    '<!-- OTP FORM -->',
    text, flags=re.DOTALL
)

text = text.replace('class="form-content" id="form-otp"', 'class="form-content active" id="form-otp"')

# Replace resend link component
text = re.sub(
    r'<div class="resend-link">.*?</div>',
    '<div class="resend-link">Didn\'t get code? <a onclick="sendOTP()">Resend</a> or <a href="otp-login.html">Change Number</a></div>\n                    <div style="text-align:center; margin-top:20px;">\n                        <a href="login.html" style="color:var(--blue); font-weight:600; text-decoration:none;">Use Password Instead</a>\n                    </div>',
    text, flags=re.DOTALL
)

with codecs.open("otp-login.html", "w", "utf-8") as f:
    f.write(text)

print("Done")
