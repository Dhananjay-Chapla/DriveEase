import codecs

try:
    with codecs.open('c:/Users/Hemanshu/Downloads/DriveEase/index.html', 'r', 'utf-8') as f:
        html = f.read()
    
    # Insert About Us preview just before "<!-- Quick Services -->"
    quick_services_marker = "<!-- Quick Services -->"
    idx = html.find(quick_services_marker)
    
    if idx != -1:
        about_preview = """
        <!-- About DriveEase Preview -->
        <div style="background:linear-gradient(135deg,rgba(26,79,214,0.05),rgba(16,185,129,0.05));border-radius:24px;padding:40px;margin-bottom:48px;display:flex;align-items:center;gap:40px" class="about-preview">
            <div style="flex:1">
                <div class="hero-tag" style="background:white;color:var(--navy);border-color:#E2E8F0;margin-bottom:16px">About the Initiative</div>
                <h2 style="font-size:2rem;color:var(--navy);font-family:'Sora',sans-serif;margin-bottom:16px">Transforming Transport<br>in Gujarat</h2>
                <p style="color:var(--gray);line-height:1.7;margin-bottom:24px;font-size:1rem">DriveEase is a citizen-first digital initiative by the Transport Department, designed to bring all RTO services directly to your fingertips. From contactless DL renewals to instant Learner Licence approvals driven by Aadhaar eKYC, we've eliminated the queues and the paperwork.</p>
                <a href="about.html" class="btn btn-primary" style="background:#1E293B;border-color:#1E293B">Learn more about our Vision &rarr;</a>
            </div>
            <div style="flex:1;position:relative;display:none;@media(min-width:768px){display:block}">
                <div style="aspect-ratio:16/9;background:#E2E8F0;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1)">
                    <img src="https://images.unsplash.com/photo-1510166089176-b57564d5b92d?q=80&w=1471&auto=format&fit=crop" style="width:100%;height:100%;object-fit:cover" alt="Digital Transport">
                </div>
            </div>
        </div>
        """
        html = html[:idx] + about_preview + html[idx:]
        
        # Modify topbar links (Sitemap / Contact Us) to include About Us
        html = html.replace('<a href="#">Contact Us</a>', '<a href="#">Contact Us</a>\n            <a href="about.html">About DriveEase</a>')
        
        # Modify footer resources to include About Us
        html = html.replace('<h5>Resources</h5>', '<h5>Resources</h5>\n                <a href="about.html">About DriveEase</a>')
        
        with codecs.open('c:/Users/Hemanshu/Downloads/DriveEase/index.html', 'w', 'utf-8') as f:
            f.write(html)
        print("Updated index.html")
    else:
        print("Could not find quick services marker")
except Exception as e:
    print("Error:", str(e))
