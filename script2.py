import codecs
import re

with codecs.open('c:/Users/Hemanshu/Downloads/DriveEase/index.html', 'r', 'utf-8') as f:
    html = f.read()

hero_start = html.find('<!-- HERO -->')
main_end_match = re.search(r'</main>', html[hero_start:])
if hero_start != -1 and main_end_match:
    main_end = hero_start + main_end_match.end()
    
    about_content = """    <main class="main-wrap">
        <div class="service-header" style="text-align:center;padding:40px 0;background:linear-gradient(135deg,rgba(26,79,214,0.05),rgba(16,185,129,0.05));border-radius:24px;margin-bottom:40px">
            <h1 class="section-title" style="justify-content:center;font-size:2.5rem;margin-bottom:16px">About <span style="color:var(--teal);margin-left:8px">DriveEase</span></h1>
            <p style="font-size:1.125rem;color:var(--gray);max-width:700px;margin:0 auto;line-height:1.6">Empowering citizens through seamless, transparent, and fully digital transport and driving licence services.</p>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-bottom:60px">
            <div>
                <h2 style="font-size:1.875rem;color:var(--navy);font-family:'Sora',sans-serif;margin-bottom:20px">Our Vision</h2>
                <p style="color:var(--gray);line-height:1.7;margin-bottom:16px;font-size:1rem">The vision of the Ministry of Road Transport &amp; Highways (MoRTH) and the Government of Gujarat is to provide contactless, faceless, and transparent transport services to the citizens directly at their doorstep.</p>
                <p style="color:var(--gray);line-height:1.7;font-size:1rem">By leveraging eKYC and modern digital infrastructure, <strong>DriveEase</strong> acts as a bridge between the Regional Transport Offices (RTOs) and the people, ensuring that bureaucratic delays are eliminated and data is strictly protected under Aadhaar privacy laws.</p>
                
                <div style="display:flex;gap:20px;margin-top:30px">
                    <div style="background:#F0FDF4;padding:16px;border-radius:12px;border:1px solid #DCFCE7;flex:1">
                        <div style="font-size:1.5rem;margin-bottom:8px">🎯</div>
                        <h4 style="color:var(--navy);margin-bottom:4px">Zero Visits</h4>
                        <div style="font-size:0.875rem;color:var(--gray)">For 16+ faceless services.</div>
                    </div>
                    <div style="background:#EFF6FF;padding:16px;border-radius:12px;border:1px solid #DBEAFE;flex:1">
                        <div style="font-size:1.5rem;margin-bottom:8px">⏱️</div>
                        <h4 style="color:var(--navy);margin-bottom:4px">Instant Sync</h4>
                        <div style="font-size:0.875rem;color:var(--gray)">Real-time VAHAN/SARATHI updates.</div>
                    </div>
                </div>
            </div>
            <div style="position:relative">
                <div style="aspect-ratio:4/3;background:#E2E8F0;border-radius:24px;overflow:hidden;position:relative;box-shadow:0 10px 40px rgba(13,27,62,0.1)">
                    <img src="https://images.unsplash.com/photo-1631522219430-c5980072b8ce?q=80&w=1470&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover" alt="Modern Highway in India" />
                </div>
                <div style="position:absolute;bottom:-20px;left:-20px;background:white;padding:24px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
                    <div style="font-size:1.5rem;font-weight:700;color:var(--blue);font-family:'Sora',sans-serif">98%</div>
                    <div style="font-size:0.875rem;color:var(--gray)">Aadhaar Authentication Rate</div>
                </div>
            </div>
        </div>

        <div style="background:var(--navy);padding:60px;border-radius:24px;color:white;margin-bottom:60px">
            <h2 style="font-family:'Sora',sans-serif;font-size:1.875rem;text-align:center;margin-bottom:48px">The DriveEase Promise</h2>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px">
                <div style="text-align:center">
                    <div style="width:64px;height:64px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 20px">🛡️</div>
                    <h3 style="font-size:1.125rem;margin-bottom:12px">Secure &amp; Reliable</h3>
                    <p style="font-size:0.9375rem;color:rgba(255,255,255,0.7);line-height:1.6">Hosted on NIC Cloud infrastructure with 256-bit encryption for all citizen data and documents.</p>
                </div>
                <div style="text-align:center">
                    <div style="width:64px;height:64px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 20px">♿</div>
                    <h3 style="font-size:1.125rem;margin-bottom:12px">Fully Accessible</h3>
                    <p style="font-size:0.9375rem;color:rgba(255,255,255,0.7);line-height:1.6">WCAG 2.1 compliant portal with high-contrast modes, font scaling, and screen reader friendliness.</p>
                </div>
                <div style="text-align:center">
                    <div style="width:64px;height:64px;background:rgba(255,255,255,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin:0 auto 20px">🌍</div>
                    <h3 style="font-size:1.125rem;margin-bottom:12px">Multilingual</h3>
                    <p style="font-size:0.9375rem;color:rgba(255,255,255,0.7);line-height:1.6">Native support for English, Gujarati, and Hindi to serve both urban and rural demographics effortlessly.</p>
                </div>
            </div>
        </div>

        <div style="text-align:center;margin-bottom:60px">
            <h2 style="font-size:1.875rem;color:var(--navy);font-family:'Sora',sans-serif;margin-bottom:16px">Leadership</h2>
            <p style="color:var(--gray);margin-bottom:40px;max-width:600px;margin-left:auto;margin-right:auto">Guiding the transformation of public transport services across the nation.</p>
            
            <div style="display:flex;justify-content:center;gap:40px;flex-wrap:wrap">
                <div style="background:white;border:1px solid #E2E8F0;border-radius:16px;padding:32px;width:280px;box-shadow:0 4px 14px rgba(0,0,0,0.03)">
                    <div style="width:100px;height:100px;background:#F1F5F9;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:2rem">👨🏽‍💼</div>
                    <h4 style="color:var(--navy);font-size:1.125rem;margin-bottom:4px">Hon'ble Minister</h4>
                    <div style="font-size:0.875rem;color:var(--gray)">Ministry of Road Transport</div>
                </div>
                <div style="background:white;border:1px solid #E2E8F0;border-radius:16px;padding:32px;width:280px;box-shadow:0 4px 14px rgba(0,0,0,0.03)">
                    <div style="width:100px;height:100px;background:#F1F5F9;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:2rem">👩🏽‍💼</div>
                    <h4 style="color:var(--navy);font-size:1.125rem;margin-bottom:4px">Transport Commissioner</h4>
                    <div style="font-size:0.875rem;color:var(--gray)">Government of Gujarat</div>
                </div>
            </div>
        </div>

    </main>"""
    
    html = html[:hero_start] + about_content + html[main_end:]

with codecs.open('c:/Users/Hemanshu/Downloads/DriveEase/about.html', 'w', 'utf-8') as f:
    f.write(html)
