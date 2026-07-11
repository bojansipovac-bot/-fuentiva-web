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

  /* SIDEBAR */
  .sidebar {
    width: 260px; background: var(--gray1); border-right: 1px solid var(--gray2);
    display: flex; flex-direction: column; padding: 0; flex-shrink: 0; position: fixed;
    top: 0; left: 0; height: 100vh;
  }
  .sidebar-logo {
    padding: 24px 28px; border-bottom: 1px solid var(--gray2);
    font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700;
    letter-spacing: -0.5px; text-decoration: none; color: var(--white); display: block;
  }
  .sidebar-logo span { color: var(--orange); }
  .sidebar-user {
    padding: 20px 28px; border-bottom: 1px solid var(--gray2);
  }
  .sidebar-user-label { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
  .sidebar-user-email { font-size: 13px; color: var(--light); }
  .sidebar-nav { padding: 16px 0; flex: 1; }
  .nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 12px 28px; font-size: 14px; font-weight: 500;
    color: var(--muted); cursor: pointer; transition: all 0.2s;
    border-left: 2px solid transparent; text-decoration: none;
  }
  .nav-item:hover { color: var(--white); background: var(--gray2); }
  .nav-item.active { color: var(--white); border-left-color: var(--orange); background: rgba(255,85,0,0.06); }
  .nav-item-icon { font-size: 16px; width: 20px; text-align: center; }
  .sidebar-footer {
    padding: 20px 28px; border-top: 1px solid var(--gray2);
  }
  .btn-logout {
    width: 100%; background: none; border: 1px solid var(--gray3);
    color: var(--muted); font-size: 13px; font-weight: 500;
    padding: 10px; cursor: pointer; transition: all 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .btn-logout:hover { border-color: var(--orange); color: var(--orange); }

  /* MAIN */
  .main { margin-left: 260px; flex: 1; padding: 48px; }
  .page-title { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -1px; margin-bottom: 8px; }
  .page-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 40px; }

  /* CARDS */
  .cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 40px; }
  .card {
    background: var(--gray1); border: 1px solid var(--gray2);
    padding: 28px 32px; cursor: pointer; transition: all 0.2s; position: relative;
  }
  .card:hover { border-color: var(--orange); background: rgba(255,85,0,0.04); }
  .card.featured { border-color: rgba(255,85,0,0.4); }
  .card-badge {
    position: absolute; top: 16px; right: 16px;
    font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: var(--orange); background: var(--oglow); padding: 3px 8px;
    border: 1px solid rgba(255,85,0,0.3);
  }
  .card-icon { font-size: 32px; margin-bottom: 16px; }
  .card-title { font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 8px; }
  .card-desc { font-size: 13.5px; color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
  .card-meta { font-size: 12px; color: var(--muted); display: flex; gap: 16px; }
  .card-meta span { display: flex; align-items: center; gap: 4px; }
  .btn-card {
    display: inline-block; margin-top: 20px;
    background: var(--orange); color: #fff;
    font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600;
    padding: 10px 20px; border: none; cursor: pointer; text-decoration: none;
    transition: background 0.2s;
  }
  .btn-card:hover { background: var(--orange2); }
  .btn-card.ghost {
    background: none; border: 1px solid var(--gray3); color: var(--light);
  }
  .btn-card.ghost:hover { border-color: var(--white); color: var(--white); }

  /* HISTORY */
  .section-label { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 16px; }
  .history-list { display: flex; flex-direction: column; gap: 1px; background: var(--gray2); border: 1px solid var(--gray2); }
  .history-item { background: var(--black); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
  .history-item:hover { background: var(--gray1); }
  .history-type { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
  .history-type.ai { color: var(--orange); }
  .history-type.live { color: #4ADE80; }
  .history-date { font-size: 12px; color: var(--muted); }
  .history-summary { font-size: 13px; color: var(--light); margin-top: 4px; }
  .history-duration { font-size: 12px; color: var(--muted); }

  .empty-state { text-align: center; padding: 48px; color: var(--muted); font-size: 14px; }
`;

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        window.location.href = '/login';
      } else {
        setUser(data.user);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (!user) return null;

  return (
    <>
      <style>{css}</style>
      <div className="dashboard">

        {/* SIDEBAR */}
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
            <div className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              <span className="nav-item-icon">📋</span> Session History
            </div>
          </nav>
          <div className="sidebar-footer">
            <button className="btn-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main">

          {activeTab === 'home' && (
            <>
              <div className="page-title">Welcome back</div>
              <div className="page-subtitle">Choose how you want to work today.</div>

              <div className="cards-grid">
                <div className="card featured" onClick={() => setActiveTab('ai')}>
                  <div className="card-badge">24/7 Available</div>
                  <div className="card-icon">🤖</div>
                  <div className="card-title">AI Coaching Session</div>
                  <div className="card-desc">Chat with Bojan's AI — trained on 26 years of sourcing expertise. Voice and text supported via WhatsApp.</div>
                  <div className="card-meta">
                    <span>💬 Text & Voice</span>
                    <span>⏱ Async</span>
                  </div>
                  <button className="btn-card" onClick={() => setActiveTab('ai')}>Start AI Session</button>
                </div>

                <div className="card" onClick={() => setActiveTab('live')}>
                  <div className="card-icon">⚡</div>
                  <div className="card-title">Quick Win Session</div>
                  <div className="card-desc">Live chat directly with Bojan. 15–30 minutes for complex decisions that need real expertise, fast.</div>
                  <div className="card-meta">
                    <span>👤 Live with Bojan</span>
                    <span>⏱ 15–30 min</span>
                  </div>
                  <button className="btn-card ghost" onClick={() => setActiveTab('live')}>Book Session</button>
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
              <div className="empty-state">Your session history will appear here once you complete your first session.</div>
            </>
          )}

        </div>
      </div>
    </>
  );
}