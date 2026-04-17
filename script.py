import codecs
import re

with codecs.open('c:/Users/Hemanshu/Downloads/DriveEase/index.html', 'r', 'utf-8') as f:
    html = f.read()

# 1. Replace the inner <!-- HERO --> to </main> section
hero_start = html.find('<!-- HERO -->')
main_end_match = re.search(r'</main>', html[hero_start:])
if hero_start != -1 and main_end_match:
    main_end = hero_start + main_end_match.end()
    
    appointment_content = """    <main class="main-wrap">
        <div class="service-header" style="text-align:center;margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid var(--gray-light)">
            <h1 class="section-title" style="justify-content:center"><span id="apt-type">Slot Booking</span></h1>
            <p style="font-size:0.9375rem;color:var(--gray)">Select your preferred RTO office, date, and a convenient available time slot.</p>
        </div>

        <div class="appointment-container">
            <!-- Left side: Calendar -->
            <div class="calendar-section">
                <div class="form-group" style="margin-bottom:24px">
                    <label>Select RTO Office</label>
                    <select class="form-control" style="appearance:auto">
                        <option>Ahmedabad (GJ-01)</option>
                        <option>Surat (GJ-05)</option>
                        <option>Vadodara (GJ-06)</option>
                        <option>Rajkot (GJ-03)</option>
                    </select>
                </div>

                <div class="calendar-wrapper">
                    <div class="calendar-header">
                        <button class="cal-btn">&lt;</button>
                        <div class="cal-month-year">March 2026</div>
                        <button class="cal-btn">&gt;</button>
                    </div>
                    <div class="calendar-grid">
                        <div class="cal-day-header">Su</div>
                        <div class="cal-day-header">Mo</div>
                        <div class="cal-day-header">Tu</div>
                        <div class="cal-day-header">We</div>
                        <div class="cal-day-header">Th</div>
                        <div class="cal-day-header">Fr</div>
                        <div class="cal-day-header">Sa</div>
                        
                        <div class="cal-day disabled">1</div>
                        <div class="cal-day disabled">2</div>
                        <div class="cal-day past">3</div>
                        <div class="cal-day past">4</div>
                        <div class="cal-day past">5</div>
                        <div class="cal-day past">6</div>
                        <div class="cal-day disabled">7</div>
                        
                        <div class="cal-day disabled">8</div>
                        <div class="cal-day available active">9</div>
                        <div class="cal-day available">10</div>
                        <div class="cal-day available">11</div>
                        <div class="cal-day limited">12</div>
                        <div class="cal-day full">13</div>
                        <div class="cal-day disabled">14</div>
                        
                        <div class="cal-day disabled">15</div>
                        <div class="cal-day available">16</div>
                        <div class="cal-day available">17</div>
                        <div class="cal-day limited">18</div>
                        <div class="cal-day available">19</div>
                        <div class="cal-day available">20</div>
                        <div class="cal-day disabled">21</div>

                        <div class="cal-day disabled">22</div>
                        <div class="cal-day available">23</div>
                        <div class="cal-day available">24</div>
                        <div class="cal-day available">25</div>
                        <div class=\"cal-day available\">26</div>
                        <div class="cal-day available">27</div>
                        <div class="cal-day disabled">28</div>

                        <div class="cal-day disabled">29</div>
                        <div class="cal-day available">30</div>
                        <div class="cal-day available">31</div>
                        <div class="cal-day disabled"></div>
                        <div class="cal-day disabled"></div>
                        <div class="cal-day disabled"></div>
                        <div class="cal-day disabled"></div>
                    </div>
                    
                    <div class="cal-legend">
                        <div class="legend-item"><div class="legend-dot" style="background:var(--green)"></div> Available</div>
                        <div class="legend-item"><div class="legend-dot" style="background:#F59E0B"></div> Limited</div>
                        <div class="legend-item"><div class="legend-dot" style="background:#EF4444"></div> Full</div>
                        <div class="legend-item"><div class="legend-dot" style="background:#E5E7EB"></div> Holiday</div>
                    </div>
                </div>
            </div>

            <!-- Right side: Time Slots -->
            <div class="slots-section">
                <h4 style="margin-bottom:6px">Available Time Slots</h4>
                <p style="font-size:0.875rem;color:var(--gray);margin-bottom:20px">For selected date: <strong>9 March 2026</strong></p>
                
                <div class="time-grid">
                    <button class="time-btn" onclick="selectSlot(this)">09:00 AM - 10:00 AM</button>
                    <button class="time-btn active" onclick="selectSlot(this)">10:00 AM - 11:00 AM</button>
                    <button class="time-btn" onclick="selectSlot(this)">11:00 AM - 12:00 PM</button>
                    <button class="time-btn disabled" disabled>12:00 PM - 01:00 PM</button>
                    <button class="time-btn disabled" disabled>01:00 PM - 02:00 PM (Lunch)</button>
                    <button class="time-btn" onclick="selectSlot(this)">02:00 PM - 03:00 PM</button>
                    <button class="time-btn" onclick="selectSlot(this)">03:00 PM - 04:00 PM</button>
                    <button class="time-btn" onclick="selectSlot(this)">04:00 PM - 05:00 PM</button>
                </div>
                
                <div style="margin-top:40px;padding:20px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px">
                    <h5 style="margin-bottom:10px;font-size:0.9375rem;color:var(--navy)">Booking Summary</h5>
                    <div style="display:flex;justify-content:space-between;font-size:0.875rem;margin-bottom:6px">
                        <span style="color:var(--gray)">Location</span>
                        <strong style="color:var(--navy)">Ahmedabad (GJ-01)</strong>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:0.875rem;margin-bottom:6px">
                        <span style="color:var(--gray)">Date &amp; Time</span>
                        <strong style="color:var(--navy)">09 Mar 2026, 10:00 AM</strong>
                    </div>
                    
                    <button class="btn btn-primary" style="width:100%;justify-content:center;margin-top:16px;background:#10B981;box-shadow:0 4px 14px rgba(16,185,129,0.3)" onclick="confirmBooking()">Confirm Appointment →</button>
                </div>
            </div>
        </div>
    </main>"""
    
    html = html[:hero_start] + appointment_content + html[main_end:]

# 2. Add CSS before </head>
css = """
        /* ─── APPOINTMENT STYLES ─── */
        .appointment-container { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; background: var(--white); border-radius: 20px; box-shadow: 0 4px 20px rgba(13, 27, 62, 0.05); padding: 32px; border: 1px solid var(--gray-light); }
        .calendar-wrapper { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 16px; padding: 24px; }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .cal-month-year { font-size: 1.125rem; font-weight: 700; color: var(--navy); font-family: 'Sora', sans-serif; }
        .cal-btn { background: white; border: 1px solid var(--gray-light); width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-weight: bold; color: var(--navy); transition: all 0.2s; }
        .cal-btn:hover { background: var(--blue-light); color: var(--blue); border-color: var(--blue-light); }
        .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; text-align: center; }
        .cal-day-header { font-size: 0.8125rem; font-weight: 600; color: var(--gray); margin-bottom: 8px; }
        .cal-day { aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 0.9375rem; font-weight: 500; border-radius: 8px; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
        .cal-day.disabled { color: var(--gray-light); cursor: not-allowed; background: #F1F5F9; }
        .cal-day.past { color: var(--gray); cursor: not-allowed; }
        .cal-day.available { background: white; border-color: #D1D5DB; color: var(--navy); }
        .cal-day.available:hover { border-color: var(--blue); color: var(--blue); }
        .cal-day.limited { background: white; border-color: #FCD34D; color: #D97706; position: relative; }
        .cal-day.limited::after { content:''; position: absolute; bottom: 4px; width: 4px; height: 4px; background: #F59E0B; border-radius: 50%; }
        .cal-day.full { background: #FEE2E2; color: #EF4444; cursor: not-allowed; }
        .cal-day.active { background: var(--blue); color: white; border-color: var(--blue); box-shadow: 0 4px 12px rgba(26, 79, 214, 0.25); }
        .cal-day.active.limited::after { background: white; }
        .cal-legend { display: flex; gap: 16px; margin-top: 24px; justify-content: center; flex-wrap: wrap; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.8125rem; color: var(--gray); }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
        .time-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .time-btn { background: white; border: 1px solid var(--gray-light); padding: 14px 12px; border-radius: 10px; font-size: 0.875rem; font-weight: 500; color: var(--navy); cursor: pointer; transition: all 0.2s; text-align: center; }
        .time-btn:hover:not(.disabled) { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
        .time-btn.active { background: var(--blue); color: white; border-color: var(--blue); box-shadow: 0 4px 12px rgba(26, 79, 214, 0.25); }
        .time-btn.disabled { background: #F1F5F9; color: var(--gray); cursor: not-allowed; border-color: #E2E8F0; }
        @media (max-width: 768px) { .appointment-container { grid-template-columns: 1fr; } }
"""
html = html.replace('</head>', css + '\n</head>')

# 3. Add JS
js = """
        // ─── INIT APPOINTMENT ───
        window.addEventListener('load', function() {
            const params = new URLSearchParams(window.location.search);
            const type = params.get('type') || params.get('action');
            if (type) {
                document.getElementById('apt-type').textContent = type.replace(/\+/g, ' ') + ' Slot Booking';
            }
        });

        function selectSlot(btn) {
            if (btn.classList.contains('disabled')) return;
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        function confirmBooking() {
            alert('Appointment Confirmed!\\nYour appointment ID is: APT-' + Math.floor(Math.random() * 90000 + 10000) + '\\n\\nAn SMS confirmation has been sent to your registered mobile number.');
            window.location.href = 'index.html';
        }
"""
html = html.replace('// ─── FONT SIZE', js + '\n        // ─── FONT SIZE')

with codecs.open('c:/Users/Hemanshu/Downloads/DriveEase/appointment.html', 'w', 'utf-8') as f:
    f.write(html)
