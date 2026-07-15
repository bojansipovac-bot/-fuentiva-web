import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #080808; --gray1: #111111; --gray2: #1C1C1C; --gray3: #2E2E2E;
    --muted: #6B6B6B; --light: #A0A0A0; --white: #F2F2F0;
    --orange: #FF5500; --orange2: #FF7733; --oglow: rgba(255,85,0,0.10);
  }
  body { background: var(--black); color: var(--white); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  .dashboard { min-height: 100vh; display: flex; }

  .sidebar {
    width: 260px; background: var(--gray1); border-right: 1px solid var(--gray2);
    display: flex; flex-direction: column; padding: 0; flex-shrink: 0; position: fixed;
    top: 0; left: 0; height: 100vh;
  }
  .sidebar-logo { padding: 24px 28px; border-bottom: 1px solid var(--gray2); font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; letter-spacing: -0.5px; text-decoration: none; color: var(--white); display: block; }
  .sidebar-logo span { color: var(--orange); }
  .sidebar-user { padding: 20px 28px; border-bottom: 1px solid var(--gray2); }
  .sidebar-user-label { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .sidebar-user-email { font-size: 13px; color: var(--light); }
  .sidebar-nav { padding: 16px 0; flex: 1; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 28px; font-size: 14px; font-weight: 500; color: var(--muted); cursor: pointer; transition: all 0.2s; border-left: 2px solid transparent; text-decoration: none; }
  .nav-item:hover { color: var(--white); background: var(--gray2); }
  .nav-item.active { color: var(--white); border-left-color: var(--orange); background: rgba(255,85,0,0.06); }
  .nav-item-icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-footer { padding: 20px 28px; border-top: 1px solid var(--gray2); }
  .btn-logout { width: 100%; background: none; border: 1px solid var(--gray3); color: var(--muted); font-size: 13px; font-weight: 500; padding: 10px; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
  .btn-logout:hover { border-color: var(--orange); color: var(--orange); }

  .main { margin-left: 260px; flex: 1; padding: 48px; }
  .page-title { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px; }
  .page-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 40px; }

  .cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 40px; }
  .card { background: var(--gray1); border: 1px solid var(--gray2); padding: 28px 32px; cursor: pointer; transition: all 0.2s; position: relative; }
  .card:hover { border-color: var(--orange); background: rgba(255,85,0,0.04); }
  .card.featured { border-color: rgba(255,85,0,0.4); }
  .card-badge { position: absolute; top: 16px; right: 16px; font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); background: var(--oglow); padding: 3px 8px; border: 1px solid rgba(255,85,0,0.3); }
  .card-icon { font-size: 32px; margin-bottom: 16px; }
  .card-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 8px; }
  .card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
  .card-meta { font-size: 12px; color: var(--muted); display: flex; gap: 16px; }
  .btn-card { display: inline-block; margin-top: 20px; background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 20px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; }
  .btn-card:hover { background: var(--orange2); }
  .btn-card.ghost { background: none; border: 1px solid var(--gray3); color: var(--light); }
  .btn-card.ghost:hover { border-color: var(--white); color: var(--white); }

  .section-label { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 16px; }
  .empty-state { text-align: center; padding: 48px; color: var(--muted); font-size: 14px; }

  /* PROFILE FORM */
  .profile-form { max-width: 600px; }
  .form-group { margin-bottom: 24px; }
  .form-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; color: var(--muted); display: block; margin-bottom: 8px; text-transform: uppercase; }
  .form-input { width: 100%; background: var(--gray1); border: 1px solid var(--gray3); color: var(--white); font-family: 'Inter', sans-serif; font-size: 14px; padding: 12px 16px; outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--orange); }
  .form-input::placeholder { color: var(--muted); }
  select.form-input { cursor: pointer; }
  .btn-save { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; padding: 12px 28px; border: none; cursor: pointer; transition: background 0.2s; }
  .btn-save:hover { background: var(--orange2); }
  .btn-save:disabled { opacity: 0.6; cursor: not-allowed; }
  .alert-success { background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.3); color: #4ADE80; padding: 12px 16px; font-size: 13px; margin-bottom: 24px; }
  .alert-error { background: rgba(255,50,50,0.08); border: 1px solid rgba(255,50,50,0.3); color: #FF6B6B; padding: 12px 16px; font-size: 13px; margin-bottom: 24px; }
`;

const DIAL_CODES = [
  { code: '+381', label: 'Serbia (+381)' },
  { code: '+382', label: 'Montenegro (+382)' },
  { code: '+385', label: 'Croatia (+385)' },
  { code: '+387', label: 'Bosnia and Herzegovina (+387)' },
  { code: '+389', label: 'North Macedonia (+389)' },
  { code: '+386', label: 'Slovenia (+386)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+43', label: 'Austria (+43)' },
];

const splitPhone = (fullPhone) => {
  if (!fullPhone) return { dialCode: '+381', phoneNumber: '' };
  const match = DIAL_CODES.find(d => fullPhone.startsWith(d.code));
  if (match) return { dialCode: match.code, phoneNumber: fullPhone.slice(match.code.length) };
  return { dialCode: '+381', phoneNumber: fullPhone.replace(/^\+/, '') };
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [profile, setProfile] = useState({ ime: '', kompanija: '', pozicija: '', cilj: '', nivo: '' });
  const [dialCode, setDialCode] = useState('+381');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sessionNotes, setSessionNotes] = useState([]);

  const cleanLocalNumber = (value) => value.replace(/[\s\-()]/g, '').replace(/^0+/, '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState(null);
  const [saveErr, setSaveErr] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        window.location.href = '/login';
        return;
      }

      setUser(data.user);

      const { data: profileData } = await supabase
        .from('profili')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      // No profile row yet, or onboarding not finished -> send to the onboarding wizard
      if (!profileData || profileData.onboarding_completed !== true) {
        window.location.href = '/onboarding';
        return;
      }

      setProfile(profileData);
      const { dialCode: loadedDialCode, phoneNumber: loadedPhoneNumber } = splitPhone(profileData.telefon);
      setDialCode(loadedDialCode);
      setPhoneNumber(loadedPhoneNumber);
      setCheckingOnboarding(false);
    });
  }, []);

  const saveProfile = async () => {
    setSaving(true);
    setSaveMsg(null);
    setSaveErr(null);

    const dataToSave = {
      ...profile,
      telefon: phoneNumber ? `${dialCode}${cleanLocalNumber(phoneNumber)}` : null,
    };

    const { data: existing } = await supabase.from('profili').select('id').eq('user_id', user.id).single();

    if (existing) {
      const { error } = await supabase.from('profili').update(dataToSave).eq('user_id', user.id);
      if (error) setSaveErr('Error saving profile.');
      else setSaveMsg('Profile saved!');
    } else {
      const { error } = await supabase.from('profili').insert({ ...dataToSave, user_id: user.id });
      if (error) setSaveErr('Error saving profile.');
      else setSaveMsg('Profile saved!');
    }
    setSaving(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const loadSessionNotes = async () => {
    const { data, error } = await supabase
      .from('session_notes')
      .select('*')
      .eq('user_id', user.id)
      .order('session_date', { ascending: false });
    console.log('session_notes query -> user.id:', user.id, 'data:', data, 'error:', error);
    setSessionNotes(data || []);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'history') {
      loadSessionNotes();
    }
  };

  if (!user || checkingOnboarding) return null;

  return (
    <>
      <style>{css}</style>
      <div className="dashboard">

        <div className="sidebar">
          <a href="/" className="sidebar-logo">Fuen<span>tiva</span></a>
          <div className="sidebar-user">
            <div className="sidebar-user-label">Signed in as</div>
            <div className="sidebar-user-email">{user.email}</div>
          </div>
          <nav className="sidebar-nav">
            <div className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
              <span className="nav-item-icon">🏠</span> Dashboard
            </div>
            <div className={`nav-item ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>
              <span className="nav-item-icon">🤖</span> AI Coaching
            </div>
            <div className={`nav-item ${activeTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTab('live')}>
              <span className="nav-item-icon">⚡</span> Quick Win
            </div>
            <div className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => handleTabClick('history')}>
              <span className="nav-item-icon">📋</span> Session History
            </div>
            <div className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
              <span className="nav-item-icon">👤</span> My Profile
            </div>
          </nav>
          <div className="sidebar-footer">
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>

        <div className="main">

          {activeTab === 'home' && (
            <>
              <div className="page-title">Welcome back{profile.ime ? `, ${profile.ime}` : ''}!</div>
              <div className="page-subtitle">Choose how you want to work today.</div>
              <div className="cards-grid">
                <div className="card featured" onClick={() => setActiveTab('ai')}>
                  <div className="card-badge">24/7 Available</div>
                  <div className="card-icon">🤖</div>
                  <div className="card-title">AI Coaching Session</div>
                  <div className="card-desc">Chat with Bojan's AI — trained on 26 years of sourcing expertise. Voice and text supported via WhatsApp.</div>
                  <div className="card-meta"><span>💬 Text & Voice</span><span>⏱ Async</span></div>
                  <button className="btn-card">Start AI Session</button>
                </div>
                <div className="card" onClick={() => setActiveTab('live')}>
                  <div className="card-icon">⚡</div>
                  <div className="card-title">Quick Win Session</div>
                  <div className="card-desc">Live chat directly with Bojan. 15–30 minutes for complex decisions that need real expertise, fast.</div>
                  <div className="card-meta"><span>👤 Live with Bojan</span><span>⏱ 15–30 min</span></div>
                  <button className="btn-card ghost">Book Session</button>
                </div>
              </div>
              <div className="section-label">Recent Sessions</div>
              <div className="empty-state">No sessions yet. Start your first AI coaching session above.</div>
            </>
          )}

          {activeTab === 'ai' && (
            <>
              <div className="page-title">AI Coaching</div>
              <div className="page-subtitle">Continue your coaching conversation via WhatsApp.</div>
              <div className="card" style={{maxWidth: 560}}>
                <div className="card-icon">📱</div>
                <div className="card-title">Connect on WhatsApp</div>
                <div className="card-desc">Your AI coaching session happens on WhatsApp — send text or voice messages and get responses in Bojan's voice.</div>
                <a href="https://wa.me/16592712148" target="_blank" rel="noreferrer" className="btn-card">Open WhatsApp →</a>
              </div>
            </>
          )}

          {activeTab === 'live' && (
            <>
              <div className="page-title">Quick Win Session</div>
              <div className="page-subtitle">Book a live 15–30 min session directly with Bojan.</div>
              <div className="card" style={{maxWidth: 560}}>
                <div className="card-icon">⚡</div>
                <div className="card-title">Book Your Session</div>
                <div className="card-desc">Quick Win sessions are for when you need a fast, expert answer to a specific procurement challenge. Premium rate applies — minimum 15 minutes.</div>
                <a href="mailto:bojan.sipovac@gmail.com?subject=Quick Win Session Request" className="btn-card">Request Session →</a>
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <>
              <div className="page-title">Session History</div>
              <div className="page-subtitle">Your past coaching sessions.</div>
              {sessionNotes.length === 0 ? (
                <div className="empty-state">Your session history will appear here once you complete your first session.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 700 }}>
                  {sessionNotes.map(note => (
                    <div key={note.id} className="card" style={{ cursor: 'default' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{note.session_date}</span>
                        {note.session_type && (
                          <span style={{ fontSize: '11px', color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '1px' }}>{note.session_type}</span>
                        )}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--light)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{note.note}</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'profile' && (
            <>
              <div className="page-title">My Profile</div>
              <div className="page-subtitle">Your information helps personalize every coaching session.</div>

              <div className="profile-form">
                {saveMsg && <div className="alert-success">{saveMsg}</div>}
                {saveErr && <div className="alert-error">{saveErr}</div>}

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input className="form-input" placeholder="John Smith" value={profile.ime || ''} onChange={e => setProfile({...profile, ime: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input className="form-input" placeholder="Acme Corp" value={profile.kompanija || ''} onChange={e => setProfile({...profile, kompanija: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Position</label>
                  <input className="form-input" placeholder="Procurement Manager" value={profile.pozicija || ''} onChange={e => setProfile({...profile, pozicija: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone (WhatsApp)</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select className="form-input" style={{ flex: '0 0 190px' }}
                      value={dialCode} onChange={e => setDialCode(e.target.value)}>
                      {DIAL_CODES.map(d => <option key={d.code} value={d.code}>{d.label}</option>)}
                    </select>
                    <input
                      className="form-input" type="tel" placeholder="63 230 395"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      onBlur={e => setPhoneNumber(cleanLocalNumber(e.target.value))}
                    />
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '6px' }}>
                    Don't type the leading 0 — just the number after it (e.g. for 064 987 6532, type 64 987 6532).
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Coaching Goal</label>
                  <input className="form-input" placeholder="What do you want to achieve?" value={profile.cilj || ''} onChange={e => setProfile({...profile, cilj: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Experience Level</label>
                  <select className="form-input" value={profile.nivo || ''} onChange={e => setProfile({...profile, nivo: e.target.value})}>
                    <option value="">Select level</option>
                    <option value="beginner">Beginner (0-3 years)</option>
                    <option value="intermediate">Intermediate (3-8 years)</option>
                    <option value="senior">Senior (8-15 years)</option>
                    <option value="expert">Expert (15+ years)</option>
                  </select>
                </div>
                <button className="btn-save" onClick={saveProfile} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}