import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #080808; --gray1: #111111; --gray2: #1C1C1C; --gray3: #2E2E2E;
    --muted: #6B6B6B; --light: #A0A0A0; --white: #F2F2F0;
    --orange: #FF5500; --orange2: #FF7733;
  }
  body { background: var(--black); color: var(--white); font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }

  .ob-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: var(--black); position: relative; overflow: hidden; padding: 24px;
  }
  .ob-page::before {
    content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .ob-box {
    width: 100%; max-width: 520px;
    background: var(--gray1); border: 1px solid var(--gray2);
    padding: 48px 40px; position: relative; z-index: 1;
  }

  .ob-logo {
    font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700;
    letter-spacing: -0.5px; color: var(--white); margin-bottom: 28px;
  }
  .ob-logo span { color: var(--orange); }

  .ob-dots { display: flex; gap: 8px; margin-bottom: 32px; }
  .ob-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gray3); transition: background 0.2s; }
  .ob-dot.active { background: var(--orange); }
  .ob-dot.done { background: var(--orange2); }

  .ob-title {
    font-family: 'Space Grotesk', sans-serif; font-size: 26px; font-weight: 700;
    letter-spacing: -1px; margin-bottom: 8px;
  }
  .ob-subtitle { font-size: 14px; color: var(--muted); margin-bottom: 32px; line-height: 1.5; }

  .ob-back {
    background: none; border: none; color: var(--muted); font-size: 13px;
    cursor: pointer; margin-bottom: 20px; padding: 0; display: flex; align-items: center; gap: 6px;
    transition: color 0.2s;
  }
  .ob-back:hover { color: var(--white); }

  .form-group { margin-bottom: 22px; }
  .form-label { font-size: 12px; font-weight: 600; letter-spacing: 0.5px; color: var(--light); display: block; margin-bottom: 8px; text-transform: uppercase; }
  .form-select, .form-input {
    width: 100%; background: var(--black); border: 1px solid var(--gray3);
    color: var(--white); font-family: 'Inter', sans-serif; font-size: 14px;
    padding: 12px 16px; outline: none; transition: border-color 0.2s; cursor: pointer;
  }
  .form-input { cursor: text; }
  .form-select:focus, .form-input:focus { border-color: var(--orange); }

  .chip-group { display: flex; flex-wrap: wrap; gap: 10px; }
  .chip {
    background: var(--black); border: 1px solid var(--gray3); color: var(--light);
    font-size: 13px; padding: 10px 16px; cursor: pointer; transition: all 0.15s;
    user-select: none;
  }
  .chip:hover { border-color: var(--orange2); }
  .chip.selected { background: rgba(255,85,0,0.12); border-color: var(--orange); color: var(--white); }

  .btn-primary {
    width: 100%; background: var(--orange); color: #fff;
    font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600;
    padding: 14px; border: none; cursor: pointer; transition: background 0.2s;
    margin-top: 12px; letter-spacing: 0.2px;
  }
  .btn-primary:hover { background: var(--orange2); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

  .ob-skip {
    display: block; text-align: center; font-size: 12px; color: var(--muted);
    background: none; border: none; cursor: pointer; margin-top: 18px; width: 100%;
    transition: color 0.2s;
  }
  .ob-skip:hover { color: var(--white); }

  .review-item {
    display: flex; justify-content: space-between; align-items: flex-start;
    padding: 12px 0; border-bottom: 1px solid var(--gray2); font-size: 13px; gap: 16px;
  }
  .review-item:last-child { border-bottom: none; }
  .review-label { color: var(--muted); white-space: nowrap; }
  .review-value { color: var(--white); text-align: right; font-weight: 500; }

  .alert {
    padding: 12px 16px; font-size: 13px; margin-bottom: 20px; border: 1px solid;
  }
  .alert-error { background: rgba(255,50,50,0.08); border-color: rgba(255,50,50,0.3); color: #FF6B6B; }
`;

const INDUSTRIES = ['Telecom', 'Manufacturing', 'Retail', 'Healthcare', 'Financial Services', 'Public Sector', 'Other'];
const COUNTRIES = ['Serbia', 'Montenegro', 'Croatia', 'Bosnia and Herzegovina', 'North Macedonia', 'Slovenia', 'Spain', 'Germany', 'Austria', 'Other'];
const EDUCATION = ["Bachelor's", "Master's", 'MBA', 'PhD', 'Other'];
const POSITIONS = ['C-level/Director', 'Head of Procurement', 'Procurement Manager', 'Facility Manager', 'Specialist', 'Expert', 'Clerk', 'Other'];

const PAIN_POINTS = [
  'Sourcing organization and KPIs', 'Team lead', 'RFQ/RFP process and documentation',
  'Internal stakeholder alignment', 'RFQ/RFP timeline optimization', 'Sourcing strategy',
  'Contract management', 'Supplier risk assessment', 'Vendor management', 'Negotiation skills', 'Other'
];
const EXPECTATIONS = [
  'On-live ad hoc advisory', 'Team development', 'Negotiation skills',
  'AI tools & automation', 'Process design', 'Other'
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [education, setEducation] = useState('');
  const [position, setPosition] = useState('');
  const [positionOther, setPositionOther] = useState('');

  const [painPoints, setPainPoints] = useState([]);
  const [painPointOther, setPainPointOther] = useState('');
  const [expectations, setExpectations] = useState([]);
  const [expectationOther, setExpectationOther] = useState('');

  useEffect(() => {
    // Best-effort locale-based country guess, user can still change it
    const locale = navigator.language || '';
    if (locale.includes('sr') || locale.includes('RS')) setCountry('Serbia');
    else if (locale.includes('es') || locale.includes('ES')) setCountry('Spain');
  }, []);

  const toggleChip = (list, setList, value) => {
    setList(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const goNext = () => setStep(s => Math.min(s + 1, 4));
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSkip = () => {
    // Skip leaves onboarding_completed as false; user can resume later from the dashboard
    goNext();
  };

  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      setError('Session expired — please log in again.');
      setLoading(false);
      return;
    }

    const payload = {
      user_id: user.id,
      industry: industry || null,
      country: country || null,
      education: education || null,
      position: position === 'Other' ? (positionOther || 'Other') : (position || null),
      pain_points: painPoints.includes('Other') && painPointOther
        ? [...painPoints.filter(p => p !== 'Other'), painPointOther]
        : painPoints,
      expectations: expectations.includes('Other') && expectationOther
        ? [...expectations.filter(e => e !== 'Other'), expectationOther]
        : expectations,
      onboarding_completed: true,
    };

    const { error: upsertError } = await supabase
      .from('profili')
      .upsert(payload, { onConflict: 'user_id' });

    if (upsertError) {
      setError(upsertError.message);
      setLoading(false);
      return;
    }

    window.location.href = '/dashboard';
  };

  return (
    <>
      <style>{css}</style>
      <div className="ob-page">
        <div className="ob-box">
          <div className="ob-logo">Fuen<span>tiva</span></div>

          <div className="ob-dots">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className={`ob-dot ${n === step ? 'active' : n < step ? 'done' : ''}`} />
            ))}
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          {step === 1 && (
            <>
              <div className="ob-title">Welcome to Fuentiva</div>
              <div className="ob-subtitle">
                3 quick questions, about 1 minute — this helps us tailor your coaching and dashboard.
              </div>
              <button className="btn-primary" onClick={goNext}>Let's go</button>
            </>
          )}

          {step === 2 && (
            <>
              <button className="ob-back" onClick={goBack}>← Back</button>
              <div className="ob-title">About you</div>
              <div className="ob-subtitle">Pick what applies — takes a few taps.</div>

              <div className="form-group">
                <label className="form-label">Industry</label>
                <select className="form-select" value={industry}
                  onChange={e => { setIndustry(e.target.value); }}>
                  <option value="">Select...</option>
                  {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Country / Market</label>
                <select className="form-select" value={country}
                  onChange={e => setCountry(e.target.value)}>
                  <option value="">Select...</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Education</label>
                <select className="form-select" value={education}
                  onChange={e => setEducation(e.target.value)}>
                  <option value="">Select...</option>
                  {EDUCATION.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Current Position</label>
                <select className="form-select" value={position}
                  onChange={e => setPosition(e.target.value)}>
                  <option value="">Select...</option>
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {position === 'Other' && (
                  <input
                    type="text" className="form-input" style={{ marginTop: '10px' }}
                    placeholder="Your position"
                    value={positionOther} onChange={e => setPositionOther(e.target.value)}
                  />
                )}
              </div>

              <button className="btn-primary" onClick={goNext}>Continue</button>
              <button className="ob-skip" onClick={handleSkip}>Skip for now</button>
            </>
          )}

          {step === 3 && (
            <>
              <button className="ob-back" onClick={goBack}>← Back</button>
              <div className="ob-title">What you need</div>
              <div className="ob-subtitle">Select all that apply.</div>

              <div className="form-group">
                <label className="form-label">Biggest pain point</label>
                <div className="chip-group">
                  {PAIN_POINTS.map(p => (
                    <div key={p} className={`chip ${painPoints.includes(p) ? 'selected' : ''}`}
                      onClick={() => toggleChip(painPoints, setPainPoints, p)}>
                      {p}
                    </div>
                  ))}
                </div>
                {painPoints.includes('Other') && (
                  <input
                    type="text" className="form-input" style={{ marginTop: '12px' }}
                    placeholder="Describe your pain point"
                    value={painPointOther} onChange={e => setPainPointOther(e.target.value)}
                  />
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Expectations from Fuentiva</label>
                <div className="chip-group">
                  {EXPECTATIONS.map(ex => (
                    <div key={ex} className={`chip ${expectations.includes(ex) ? 'selected' : ''}`}
                      onClick={() => toggleChip(expectations, setExpectations, ex)}>
                      {ex}
                    </div>
                  ))}
                </div>
                {expectations.includes('Other') && (
                  <input
                    type="text" className="form-input" style={{ marginTop: '12px' }}
                    placeholder="Describe your expectations"
                    value={expectationOther} onChange={e => setExpectationOther(e.target.value)}
                  />
                )}
              </div>

              <button className="btn-primary" onClick={goNext}>Continue</button>
              <button className="ob-skip" onClick={handleSkip}>Skip for now</button>
            </>
          )}

          {step === 4 && (
            <>
              <button className="ob-back" onClick={goBack}>← Back</button>
              <div className="ob-title">All set</div>
              <div className="ob-subtitle">Here's what we've got — hit Complete to enter your dashboard.</div>

              <div style={{ marginBottom: '20px' }}>
                <div className="review-item">
                  <span className="review-label">Industry</span>
                  <span className="review-value">{industry || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Country</span>
                  <span className="review-value">{country || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Education</span>
                  <span className="review-value">{education || '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Position</span>
                  <span className="review-value">{position === 'Other' ? (positionOther || 'Other') : (position || '—')}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Pain points</span>
                  <span className="review-value">{painPoints.length ? painPoints.join(', ') : '—'}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Expectations</span>
                  <span className="review-value">{expectations.length ? expectations.join(', ') : '—'}</span>
                </div>
              </div>

              <button className="btn-primary" onClick={handleComplete} disabled={loading}>
                {loading ? 'Saving...' : 'Complete Setup'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}