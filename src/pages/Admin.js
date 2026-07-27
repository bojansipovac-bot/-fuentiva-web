import React, { useState, useEffect } from 'react';
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

  tr.client-row { cursor: pointer; }

  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center; z-index: 100; padding: 24px;
  }
  .modal-box {
    width: 100%; max-width: 720px; max-height: 85vh; overflow-y: auto;
    background: var(--gray1); border: 1px solid var(--gray2); padding: 32px;
  }
  .modal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
  .modal-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; }
  .modal-subtitle { font-size: 13px; color: var(--muted); margin-top: 4px; }
  .modal-close { background: none; border: none; color: var(--muted); font-size: 20px; cursor: pointer; padding: 0 4px; }
  .modal-close:hover { color: var(--white); }

  .modal-section-label { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; margin: 24px 0 12px; }
  .modal-section-label:first-of-type { margin-top: 0; }

  .note-card { background: var(--black); border: 1px solid var(--gray2); padding: 16px 18px; margin-bottom: 10px; }
  .note-card-header { display: flex; justify-content: space-between; margin-bottom: 8px; }
  .note-date { font-size: 12px; color: var(--muted); }
  .note-type { font-size: 10px; color: var(--orange); text-transform: uppercase; letter-spacing: 1px; }
  .note-text { font-size: 13px; color: var(--light); line-height: 1.6; white-space: pre-wrap; }

  .payment-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--gray2); font-size: 13px; }
  .payment-row:last-child { border-bottom: none; }
  .payment-type { color: var(--light); }
  .payment-amount { color: var(--white); font-weight: 600; }

  .empty-note { font-size: 13px; color: var(--muted); }

  .report-bar { display: flex; align-items: flex-end; gap: 14px; margin-bottom: 32px; }
  .report-field label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; color: var(--muted); display: block; margin-bottom: 6px; }
  .report-field input { background: var(--gray1); border: 1px solid var(--gray2); color: var(--white); font-size: 13px; padding: 9px 12px; font-family: 'Inter', sans-serif; }
  .btn-report { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 18px; border: none; cursor: pointer; }
  .btn-report:hover { background: var(--orange2); }

  .report-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; align-items: center; justify-content: center; z-index: 200; padding: 24px;
  }
  .report-box {
    width: 100%; max-width: 800px; max-height: 88vh; overflow-y: auto;
    background: #ffffff; color: #111111; padding: 40px;
  }
  .report-box h1 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; margin-bottom: 4px; }
  .report-box .report-range { font-size: 13px; color: #555; margin-bottom: 24px; }
  .report-box h2 { font-family: 'Space Grotesk', sans-serif; font-size: 15px; margin: 24px 0 10px; }
  .report-table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
  .report-table th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #777; padding: 8px 10px; border-bottom: 1px solid #ddd; }
  .report-table td { font-size: 13px; padding: 8px 10px; border-bottom: 1px solid #eee; color: #222; }
  .report-total { font-weight: 700; }
  .report-actions { display: flex; gap: 10px; margin-top: 28px; }
  .report-actions button { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; padding: 10px 18px; border: none; cursor: pointer; }
  .btn-print { background: #FF5500; color: #fff; }
  .btn-print-close { background: #eee; color: #222; }

  .report-logo { margin-bottom: 20px; }
  .report-signature { margin-top: 48px; }
  .report-signature-name { font-size: 14px; color: #111; margin-bottom: 44px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; }
  .report-signature-line { border-top: 1px solid #333; width: 260px; }

  @media print {
    .no-print { display: none !important; }
    .report-overlay { position: static; background: none; padding: 0; }
    .report-box { max-height: none; overflow: visible; box-shadow: none; max-width: 100%; }
    .report-actions { display: none !important; }
  }
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
  const [sessionNotes, setSessionNotes] = useState([]);
  const [emails, setEmails] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [reportFrom, setReportFrom] = useState('');
  const [reportTo, setReportTo] = useState('');
  const [reportOpen, setReportOpen] = useState(false);

  // Parses "dd.mm.yyyy" typed by the user into an ISO "yyyy-mm-dd" string for filtering
  const parseDDMMYYYY = (value) => {
    if (!value) return null;
    const match = value.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (!match) return null;
    const [, dd, mm, yyyy] = match;
    const d = parseInt(dd, 10), m = parseInt(mm, 10);
    if (d < 1 || d > 31 || m < 1 || m > 12) return null;
    return `${yyyy}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  const reportFromISO = parseDDMMYYYY(reportFrom);
  const reportToISO = parseDDMMYYYY(reportTo);

  useEffect(() => {
    if (reportOpen) {
      document.title = 'Fuentiva Financial Report';
    } else {
      document.title = 'Fuentiva';
    }
  }, [reportOpen]);

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
    const [profilesRes, paymentsRes, sesijeRes, sessionNotesRes, emailsRes] = await Promise.all([
      supabase.from('profili').select('*'),
      supabase.from('payments').select('*'),
      supabase.from('sesije').select('*'),
      supabase.from('session_notes').select('*'),
      fetch(`${RAILWAY_URL}/admin/user-emails`).then(r => r.json()).catch(() => ({ emails: {} })),
    ]);
    setProfiles(profilesRes.data || []);
    setPayments(paymentsRes.data || []);
    setSesije(sesijeRes.data || []);
    setSessionNotes(sessionNotesRes.data || []);
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

  // ---- Financial report: filter payments by date range, group by day and by user ----
  const reportPayments = (reportFromISO && reportToISO)
    ? payments.filter(p => {
        if (!p.created_at) return false;
        const d = p.created_at.slice(0, 10); // YYYY-MM-DD
        return d >= reportFromISO && d <= reportToISO;
      })
    : [];

  const byDay = {};
  reportPayments.forEach(p => {
    const day = p.created_at.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + (Number(p.amount_eur) || 0);
  });
  const byDayRows = Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0]));

  const byUser = {};
  reportPayments.forEach(p => {
    const key = p.user_id;
    if (!byUser[key]) byUser[key] = { total: 0, count: 0 };
    byUser[key].total += Number(p.amount_eur) || 0;
    byUser[key].count += 1;
  });
  const byUserRows = Object.entries(byUser).map(([uid, v]) => {
    const profile = profiles.find(p => p.user_id === uid);
    const name = (profile && profile.ime) || emails[uid] || uid;
    return { uid, name, ...v };
  }).sort((a, b) => b.total - a.total);

  const reportGrandTotal = reportPayments.reduce((sum, p) => sum + (Number(p.amount_eur) || 0), 0);

  const statusClass = (status) => {
    if (status === 'active') return 'status-active';
    if (status === 'inactive' || !status) return 'status-inactive';
    return 'status-other';
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return '—';
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return dateInput;
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
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
      <div className="admin-page no-print">
        <div className="admin-title">Admin Overview</div>
        <div className="admin-subtitle">
          {loadingData ? 'Loading data…' : `Platform usage as of ${formatDate(now)}`}
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

        <div className="section-label">Financial Report</div>
        <div className="report-bar">
          <div className="report-field">
            <label>From</label>
            <input type="text" placeholder="dd.mm.yyyy" value={reportFrom} onChange={e => setReportFrom(e.target.value)} />
          </div>
          <div className="report-field">
            <label>To</label>
            <input type="text" placeholder="dd.mm.yyyy" value={reportTo} onChange={e => setReportTo(e.target.value)} />
          </div>
          <button
            className="btn-report"
            disabled={!reportFromISO || !reportToISO}
            onClick={() => setReportOpen(true)}
          >
            Generate Report
          </button>
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
              <tr key={row.user_id} className="client-row" onClick={() => setSelectedUserId(row.user_id)}>
                <td>{row.ime}</td>
                <td>{row.industry}</td>
                <td><span className={`status-pill ${statusClass(row.subscription_status)}`}>{row.subscription_status}</span></td>
                <td>{row.messageCount}</td>
                <td>{row.lastActivity ? formatDate(row.lastActivity) : '—'}</td>
                <td>€{row.totalSpend.toFixed(0)}</td>
                <td>{row.paymentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUserId && (() => {
        const user = profiles.find(p => p.user_id === selectedUserId);
        const userNotes = sessionNotes
          .filter(n => n.user_id === selectedUserId)
          .sort((a, b) => new Date(b.session_date) - new Date(a.session_date));
        const userPayments = payments
          .filter(p => p.user_id === selectedUserId)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const displayName = (user && user.ime) || emails[selectedUserId] || 'Unknown client';

        return (
          <div className="modal-overlay no-print" onClick={() => setSelectedUserId(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <div className="modal-title">{displayName}</div>
                  <div className="modal-subtitle">
                    {user ? user.industry || '—' : '—'} · {user ? (user.subscription_status || 'inactive') : '—'}
                  </div>
                </div>
                <button className="modal-close" onClick={() => setSelectedUserId(null)}>✕</button>
              </div>

              <div className="modal-section-label">Session History</div>
              {userNotes.length === 0 && <div className="empty-note">No session notes yet.</div>}
              {userNotes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-card-header">
                    <span className="note-date">{formatDate(note.session_date)}</span>
                    {note.session_type && <span className="note-type">{note.session_type}</span>}
                  </div>
                  <div className="note-text">{note.note}</div>
                </div>
              ))}

              <div className="modal-section-label">Payment History</div>
              {userPayments.length === 0 && <div className="empty-note">No payments yet.</div>}
              {userPayments.map(p => (
                <div key={p.id} className="payment-row">
                  <span className="payment-type">
                    {p.type} — {p.created_at ? formatDate(p.created_at) : '—'}
                  </span>
                  <span className="payment-amount">€{Number(p.amount_eur || 0).toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {reportOpen && (
        <div className="report-overlay">
          <div className="report-box">
            <div className="report-logo">
              <svg width="150" height="36" viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="5" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <line x1="5" y1="14" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <line x1="5" y1="22" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <line x1="5" y1="30" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <line x1="5" y1="38" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <line x1="5" y1="46" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <line x1="5" y1="55" x2="65" y2="30" stroke="#444" strokeWidth="1.5" />
                <circle cx="65" cy="30" r="5" fill="#FF5500" />
                <text x="82" y="41" fontSize="32" fontWeight="700" fill="#111111" fontFamily="Arial, sans-serif">Fuen</text>
                <text x="150" y="41" fontSize="32" fontWeight="700" fill="#FF5500" fontFamily="Arial, sans-serif">tiva</text>
              </svg>
            </div>
            <h1>Fuentiva Financial Report</h1>
            <div className="report-range">{reportFrom} to {reportTo} · Generated {formatDate(now)}</div>

            <h2>Revenue by Day</h2>
            <table className="report-table">
              <thead>
                <tr><th>Date</th><th>Revenue</th></tr>
              </thead>
              <tbody>
                {byDayRows.length === 0 && (
                  <tr><td colSpan="2">No payments in this range.</td></tr>
                )}
                {byDayRows.map(([day, total]) => (
                  <tr key={day}><td>{formatDate(day)}</td><td>€{total.toFixed(0)}</td></tr>
                ))}
              </tbody>
            </table>

            <h2>Revenue by Client</h2>
            <table className="report-table">
              <thead>
                <tr><th>Client</th><th>Payments</th><th>Total</th></tr>
              </thead>
              <tbody>
                {byUserRows.length === 0 && (
                  <tr><td colSpan="3">No payments in this range.</td></tr>
                )}
                {byUserRows.map(row => (
                  <tr key={row.uid}><td>{row.name}</td><td>{row.count}</td><td>€{row.total.toFixed(0)}</td></tr>
                ))}
              </tbody>
            </table>

            <table className="report-table">
              <tbody>
                <tr>
                  <td className="report-total">Grand Total</td>
                  <td></td>
                  <td className="report-total">€{reportGrandTotal.toFixed(0)}</td>
                </tr>
              </tbody>
            </table>

            <div className="report-signature">
              <div className="report-signature-name">Bojan Sipovac</div>
              <div className="report-signature-line"></div>
            </div>

            <div className="report-actions">
              <button className="btn-print" onClick={() => window.print()}>Print / Save as PDF</button>
              <button className="btn-print-close" onClick={() => setReportOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
