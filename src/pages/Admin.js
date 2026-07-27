import React, { useState } from 'react';
import { supabase } from '../supabase';

const RAILWAY_URL = 'https://procurement-coach-production.up.railway.app';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #080808; --gray1: #111111; --gray2: #1C1C1C; --gray3: #2E2E2E;
    --muted: #6B6B6B; --light: #A0A0A0; --white: #F2F2F0;
    --orange: #FF5500; --orange2: #FF7733; --oglow: rgba(255,85,0,0.10);
  }
  body { background: var(--black); color: var(--white); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  .pin-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
  .pin-box { width: 100%; max-width: 380px; background: var(--gray1); border: 1px solid var(--gray2); padding: 40px; }
  .pin-title { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px; }
  .pin-input { width: 100%; background: var(--black); border: 1px solid var(--gray3); color: var(--white); font-size: 20px; letter-spacing: 6px; text-align: center; padding: 14px; outline: none; margin-bottom: 16px; }
  .pin-input:focus { border-color: var(--orange); }
  .pin-btn { width: 100%; background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; padding: 12px; border: none; cursor: pointer; }
  .pin-btn:hover { background: var(--orange2); }
  .pin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .pin-error { color: #FF6B6B; font-size: 13px; margin-bottom: 14px; }

  .admin-page { min-height: 100vh; padding: 40px 48px; }
  .admin-title { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 700; letter-spacing: -1px; margin-bottom: 6px; }
  .admin-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 32px; }

  .highlights-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 40px; }
  .hl-card { background: var(--gray1); border: 1px solid var(--gray2); padding: 20px 22px; }
  .hl-label { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
  .hl-value { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; color: var(--white); }
  .hl-value.accent { color: var(--orange); }

  .section-label { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 600; margin-bottom: 14px; }

  .pain-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
  .pain-chip { background: var(--gray1); border: 1px solid var(--gray2); padding: 8px 14px; font-size: 12.5px; color: var(--light); }
  .pain-chip b { color: var(--orange); }

  table.users-table { width: 100%; border-collapse: collapse; }
  table.users-table th { text-align: left; font-size: 11px; letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted); padding: 10px 14px; border-bottom: 1px solid var(--gray2); }
  table.users-table td { padding: 12px 14px; font-size: 13.5px; border-bottom: 1px solid var(--gray2); color: var(--light); }
  table.users-table tr:hover td { background: rgba(255,85,0,0.03); }
  .status-pill { font-size: 11px; padding: 3px 10px; font-weight: 600; text-transform: uppercase; }
  .status-active { background: rgba(74,222,128,0.12); color: #4ADE80; }
  .status-inactive { background: rgba(255,255,255,0.06); color: var(--muted); }
  .status-other { background: rgba(255,85,0,0.12); color: var(--orange); }
`;

export default function Admin() {
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(null);
  const [checking, setChecking] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [payments, setPayments] = useState([]);
  const [sesije, setSesije] = useState([]);
  const [emails, setEmails] = useState({});

  const checkPin = async (e) => {
    e.preventDefault();
    setChecking(true);
    setPinError(null);
    try {
      const res = await fetch(`${RAILWAY_URL}/admin/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();
      if (data.valid) {
        setAuthenticated(true);
        loadData();
      } else {
        setPinError('Incorrect PIN.');
      }
    } catch (err) {
      setPinError('Could not verify PIN. Try again.');
    }
    setChecking(false);
  };

  const loadData = async () => {
    setLoadingData(true);
    const [profilesRes, paymentsRes, sesijeRes, emailsRes] = await Promise.all([
      supabase.from('profili').select('*'),
      supabase.from('payments').select('*'),
      supabase.from('sesije').select('*'),
      fetch(`${RAILWAY_URL}/admin/user-emails`).then(r => r.json()).catch(() => ({ emails: {} })),
    ]);
    setProfiles(profilesRes.data || []);
    setPayments(paymentsRes.data || []);
    setSesije(sesijeRes.data || []);
    setEmails(emailsRes.emails || {});
    setLoadingData(false);
  };

  // ---- Compute highlights ----
  const now = new Date();
  const isThisMonth = (dateStr) => {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  };

  const revenueThisMonth = payments
    .filter(p => isThisMonth(p.created_at))
    .reduce((sum, p) => sum + (Number(p.amount_eur) || 0), 0);

  const activeSubscribers = profiles.filter(p => p.subscription_status === 'active').length;
  const newSignupsThisMonth = profiles.filter(p => isThisMonth(p.created_at)).length;

  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const phoneToLastActivity = {};
  sesije.forEach(s => { phoneToLastActivity[s.telefon] = s.updated_at; });

  const atRiskCount = profiles.filter(p => {
    if (p.subscription_status === 'past_due' || p.subscription_status === 'canceled') return true;
    const lastActive = phoneToLastActivity[p.telefon];
    if (p.subscription_status === 'active' && lastActive) {
      return new Date(lastActive) < thirtyDaysAgo;
    }
    return false;
  }).length;

  // ---- Top pain points ----
  const painCounts = {};
  profiles.forEach(p => {
    (p.pain_points || []).forEach(pt => {
      painCounts[pt] = (painCounts[pt] || 0) + 1;
    });
  });
  const topPains = Object.entries(painCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  // ---- Per-user table ----
  const paymentsByUser = {};
  payments.forEach(p => {
    if (!paymentsByUser[p.user_id]) paymentsByUser[p.user_id] = { total: 0, count: 0 };
    paymentsByUser[p.user_id].total += Number(p.amount_eur) || 0;
    paymentsByUser[p.user_id].count += 1;
  });

  const userRows = profiles.map(p => {
    const session = sesije.find(s => s.telefon === p.telefon);
    let messageCount = 0;
    if (session) {
      try {
        const msgs = JSON.parse(session.poruke || '[]');
        messageCount = msgs.length;
      } catch (e) { /* ignore */ }
    }
    const spend = paymentsByUser[p.user_id] || { total: 0, count: 0 };
    return {
      user_id: p.user_id,
      ime: p.ime || emails[p.user_id] || '—',
      industry: p.industry || '—',
      subscription_status: p.subscription_status || 'inactive',
      messageCount,
      lastActivity: session ? session.updated_at : null,
      totalSpend: spend.total,
      paymentCount: spend.count,
    };
  }).sort((a, b) => b.totalSpend - a.totalSpend);

  const statusClass = (status) => {
    if (status === 'active') return 'status-active';
    if (status === 'inactive' || !status) return 'status-inactive';
    return 'status-other';
  };

  if (!authenticated) {
    return (
      <>
        <style>{css}</style>
        <div className="pin-page">
          <div className="pin-box">
            <div className="pin-title">Admin Access</div>
            {pinError && <div className="pin-error">{pinError}</div>}
            <form onSubmit={checkPin}>
              <input
                type="password" inputMode="numeric" className="pin-input" placeholder="••••"
                value={pin} onChange={e => setPin(e.target.value)} autoFocus
              />
              <button type="submit" className="pin-btn" disabled={checking}>
                {checking ? 'Checking...' : 'Enter'}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="admin-page">
        <div className="admin-title">Admin Overview</div>
        <div className="admin-subtitle">
          {loadingData ? 'Loading data…' : `Platform usage as of ${now.toLocaleDateString()}`}
        </div>

        <div className="highlights-grid">
          <div className="hl-card">
            <div className="hl-label">Revenue This Month</div>
            <div className="hl-value accent">€{revenueThisMonth.toFixed(0)}</div>
          </div>
          <div className="hl-card">
            <div className="hl-label">Active Subscribers</div>
            <div className="hl-value">{activeSubscribers}</div>
          </div>
          <div className="hl-card">
            <div className="hl-label">New Signups This Month</div>
            <div className="hl-value">{newSignupsThisMonth}</div>
          </div>
          <div className="hl-card">
            <div className="hl-label">At-Risk Clients</div>
            <div className="hl-value" style={{ color: atRiskCount > 0 ? '#FF6B6B' : undefined }}>{atRiskCount}</div>
          </div>
        </div>

        <div className="section-label">Top Pain Points Across Clients</div>
        <div className="pain-chips">
          {topPains.length === 0 && <div style={{ color: '#6B6B6B', fontSize: 13 }}>No data yet.</div>}
          {topPains.map(([pain, count]) => (
            <div key={pain} className="pain-chip"><b>{count}×</b> &nbsp;{pain}</div>
          ))}
        </div>

        <div className="section-label">Clients</div>
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Subscription</th>
              <th>AI Messages</th>
              <th>Last Activity</th>
              <th>Total Spend</th>
              <th>Payments</th>
            </tr>
          </thead>
          <tbody>
            {userRows.map(row => (
              <tr key={row.user_id}>
                <td>{row.ime}</td>
                <td>{row.industry}</td>
                <td><span className={`status-pill ${statusClass(row.subscription_status)}`}>{row.subscription_status}</span></td>
                <td>{row.messageCount}</td>
                <td>{row.lastActivity ? new Date(row.lastActivity).toLocaleDateString() : '—'}</td>
                <td>€{row.totalSpend.toFixed(0)}</td>
                <td>{row.paymentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
