import React, { useState } from 'react';

// Real Railway backend URL used for Stripe checkout / Retainer intake / other API calls
const BACKEND_URL = 'https://procurement-coach-production.up.railway.app';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #080808;
    --gray1: #111111;
    --gray2: #1C1C1C;
    --gray3: #2E2E2E;
    --muted: #6B6B6B;
    --light: #A0A0A0;
    --white: #F2F2F0;
    --orange: #FF5500;
    --orange2: #FF7733;
    --oglow: rgba(255, 85, 0, 0.10);
  }

  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  /* NAV */
  .nav {
    position: sticky; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 68px;
    background: rgba(8,8,8,0.92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--gray2);
  }
  .logo { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: var(--white); text-decoration: none; }
  .logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a { font-size: 13.5px; font-weight: 500; color: var(--light); text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: var(--white); }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .nav-cta { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 13.5px; font-weight: 600; padding: 9px 22px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; }
  .nav-cta:hover { background: var(--orange2); }
  .nav-burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 6px; }
  .nav-burger span { width: 22px; height: 2px; background: var(--white); display: block; }
  .nav-mobile { display: none; flex-direction: column; background: var(--gray1); border-bottom: 1px solid var(--gray2); padding: 8px 24px 20px; }
  .nav-mobile.open { display: flex; }
  .nav-mobile a { color: var(--light); text-decoration: none; font-size: 15px; padding: 12px 0; border-bottom: 1px solid var(--gray2); }
  .nav-mobile a:last-child { border-bottom: none; }

  @media (max-width: 860px) {
    .nav-links { display: none; }
    .nav-burger { display: flex; }
    .nav-cta { display: none; }
    .nav { padding: 0 20px; }
  }

  #domains, #coaching, #pricing, #about, #contact { scroll-margin-top: 84px; }

  /* HERO */
  .hero-wrap { min-height: 88vh; display: flex; flex-direction: column; }
  .hero {
    flex: 1; display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 60px; padding: 64px 48px 32px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -200px; right: -200px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(255,85,0,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 24px; }
  .hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(38px, 5vw, 60px); font-weight: 700; line-height: 1.08; letter-spacing: -2px; margin-bottom: 24px; }
  .hero h1 em { font-style: normal; color: var(--orange); }
  .hero-sub { font-size: 16px; color: var(--light); line-height: 1.7; max-width: 440px; }
  .btn-primary { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; padding: 14px 28px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; display: inline-block; }
  .btn-primary:hover { background: var(--orange2); }

  .ai-panel { background: var(--gray1); border: 1px solid var(--gray2); }
  .panel-header { display: flex; align-items: center; gap: 8px; padding: 14px 20px; border-bottom: 1px solid var(--gray2); background: var(--gray2); }
  .panel-dot { width: 9px; height: 9px; border-radius: 50%; }
  .panel-title { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-left: 4px; }
  .panel-body { padding: 20px 24px; }
  .panel-career-item { display: flex; gap: 14px; align-items: baseline; padding: 7px 0; border-bottom: 1px solid var(--gray2); }
  .panel-career-item:last-child { border-bottom: none; }
  .panel-career-year { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; color: var(--orange); flex: 0 0 78px; }
  .panel-career-role { font-size: 12px; color: var(--white); font-weight: 500; }
  .panel-career-role span { color: var(--muted); font-weight: 400; }

  @media (max-width: 860px) {
    .hero { grid-template-columns: 1fr; padding: 40px 20px; gap: 36px; }
  }

  /* STATS */
  .stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--gray2); border-bottom: 1px solid var(--gray2); }
  .stat-item { padding: 28px 24px; border-right: 1px solid var(--gray2); }
  .stat-item:last-child { border-right: none; }
  .stat-number { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; letter-spacing: -2px; line-height: 1; margin-bottom: 6px; }
  .stat-number span { color: var(--orange); }
  .stat-desc { font-size: 12px; color: var(--muted); }
  @media (max-width: 640px) {
    .stats-strip { grid-template-columns: repeat(2, 1fr); }
    .stat-item { border-bottom: 1px solid var(--gray2); }
  }

  /* SECTION SHARED */
  .section { padding: 72px 48px; }
  .section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 12px; }
  .section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 3.2vw, 38px); font-weight: 700; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 36px; max-width: 700px; }
  @media (max-width: 640px) { .section { padding: 48px 20px; } }

  /* DOMAINS */
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--gray2); border: 1px solid var(--gray2); }
  .service-card { background: var(--black); padding: 22px 24px; transition: background 0.2s; position: relative; }
  .service-card:hover { background: var(--gray1); }
  .service-card.featured { background: var(--gray1); border: 1px solid rgba(255,85,0,0.3); margin: -1px; grid-column: span 3; }
  .service-mono { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: var(--gray2); border: 1px solid var(--gray3); font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; color: var(--orange); margin-bottom: 14px; }
  .service-card.featured .service-mono { background: var(--oglow); border-color: rgba(255,85,0,0.4); }
  .service-name { font-family: 'Space Grotesk', sans-serif; font-size: 15.5px; font-weight: 600; letter-spacing: -0.3px; margin-bottom: 6px; }
  .service-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
  @media (max-width: 860px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
    .service-card.featured { grid-column: span 2; }
  }
  @media (max-width: 560px) {
    .services-grid { grid-template-columns: 1fr; }
    .service-card.featured { grid-column: span 1; }
  }

  /* COACHING SHOWCASE */
  .coaching-section { padding: 80px 48px; background: var(--gray1); border-top: 1px solid var(--gray2); border-bottom: 1px solid var(--gray2); }
  .coaching-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
  .coaching-features { margin-top: 28px; }
  .feature-item { display: flex; gap: 14px; margin-bottom: 22px; }
  .feature-bullet { width: 6px; height: 6px; background: var(--orange); margin-top: 8px; flex-shrink: 0; }
  .feature-text strong { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 600; display: block; margin-bottom: 3px; }
  .feature-text p { font-size: 13px; color: var(--muted); line-height: 1.55; }
  .chat-mockup { background: var(--black); border: 1px solid var(--gray2); }
  .chat-header { padding: 14px 20px; background: var(--gray2); border-bottom: 1px solid var(--gray3); display: flex; align-items: center; gap: 10px; }
  .chat-avatar { width: 30px; height: 30px; background: var(--orange); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Space Grotesk', sans-serif; font-size: 12px; font-weight: 700; color: #fff; }
  .chat-name { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 600; }
  .chat-status { font-size: 11px; color: #4ADE80; }
  .chat-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
  .chat-msg { max-width: 80%; padding: 10px 14px; font-size: 13px; line-height: 1.55; }
  .chat-msg.bot { background: var(--gray2); color: var(--light); align-self: flex-start; }
  .chat-msg.user { background: var(--orange); color: #fff; align-self: flex-end; }
  .chat-time { font-size: 10px; color: var(--gray3); margin-top: 4px; }
  .cursor { display: inline-block; width: 2px; height: 13px; background: var(--orange); animation: blink 1s step-end infinite; vertical-align: middle; margin-left: 2px; }
  @keyframes blink { 50% { opacity: 0; } }
  .coaching-cta { text-align: center; margin-top: 48px; }
  @media (max-width: 860px) {
    .coaching-inner { grid-template-columns: 1fr; }
    .coaching-section { padding: 48px 20px; }
  }

  /* PRICING — TWO COLUMN */
  .pricing-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--gray2); border: 1px solid var(--gray2); }
  .pricing-col { background: var(--black); padding: 32px; display: flex; flex-direction: column; }
  .pricing-col.b2b { background: var(--gray1); }
  .col-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 18px; }

  .price-line { display: flex; justify-content: space-between; align-items: baseline; padding: 16px 0; border-top: 1px solid var(--gray2); gap: 16px; }
  .price-line:first-of-type { border-top: none; }
  .price-line-left strong { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 600; display: block; margin-bottom: 3px; }
  .price-line-left p { font-size: 12px; color: var(--muted); line-height: 1.5; }
  .price-line-right { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 700; color: var(--orange); white-space: nowrap; text-align: right; }
  .price-line-right span { display: block; font-size: 10.5px; font-weight: 500; color: var(--muted); margin-top: 2px; }

  .tier-mini { display: flex; justify-content: space-between; font-size: 12.5px; padding: 6px 0; color: var(--light); }
  .tier-mini strong { color: var(--white); font-weight: 600; }

  .col-cta { margin-top: auto; padding-top: 24px; }

  /* Retainer accordion */
  .retainer-toggle { background: none; border: 1px solid var(--gray3); color: var(--orange); font-family: 'Space Grotesk', sans-serif; font-size: 12.5px; font-weight: 600; padding: 10px 16px; cursor: pointer; margin-top: 8px; transition: all 0.2s; }
  .retainer-toggle:hover { background: var(--orange); color: #fff; border-color: var(--orange); }
  .retainer-panel { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; }
  .retainer-panel.open { max-height: 900px; }

  .vat-note { font-size: 11px; color: var(--muted); margin-top: 16px; }
  @media (max-width: 860px) { .pricing-split { grid-template-columns: 1fr; } }

  /* SOURCING RETAINER FORM (used inside the accordion panel above) */
  .retainer-form { max-width: 100%; display: flex; flex-direction: column; gap: 14px; padding-top: 20px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-field { display: flex; flex-direction: column; gap: 5px; }
  .form-field label { font-size: 11.5px; color: var(--muted); font-weight: 500; }
  .form-field input, .form-field textarea, .form-field select {
    background: var(--gray2); border: 1px solid var(--gray3); color: var(--white);
    padding: 9px 11px; font-size: 13px; font-family: 'Inter', sans-serif;
  }
  .form-field input:focus, .form-field textarea:focus, .form-field select:focus { outline: none; border-color: var(--orange); }
  .form-field textarea { resize: vertical; min-height: 70px; }
  .form-submit { margin-top: 4px; align-self: flex-start; }
  .form-status { font-size: 12.5px; margin-top: 10px; }
  .form-status.success { color: #4ADE80; }
  .form-status.error { color: var(--orange); }
  @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }

  /* ABOUT — "How I Work" */
  .about-section { padding: 56px 48px; display: flex; align-items: baseline; gap: 40px; flex-wrap: wrap; border-top: 1px solid var(--gray2); }
  .about-name { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; white-space: nowrap; }
  .about-bio { font-size: 13.5px; color: var(--muted); line-height: 1.65; max-width: 620px; }
  @media (max-width: 640px) { .about-section { padding: 40px 20px; } }

  /* CTA */
  .cta-section { padding: 88px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(255,85,0,0.08) 0%, transparent 70%); pointer-events: none; }
  .cta-section h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(30px, 4.5vw, 48px); font-weight: 700; letter-spacing: -1.5px; line-height: 1.08; margin-bottom: 18px; }
  .cta-section p { font-size: 15px; color: var(--muted); margin-bottom: 36px; max-width: 480px; margin-left: auto; margin-right: auto; }
  @media (max-width: 640px) { .cta-section { padding: 56px 20px; } }

  /* FOOTER */
  footer { border-top: 1px solid var(--gray2); padding: 28px 48px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
  .footer-copy { font-size: 12px; color: var(--muted); }
  .footer-links { display: flex; gap: 24px; }
  .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--white); }
`;

function RetainerInquiryForm() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    challenge: '', spend_range: '', urgency: '', preferred_cadence: ''
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${BACKEND_URL}/retainer-inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', company: '', email: '', phone: '', challenge: '', spend_range: '', urgency: '', preferred_cadence: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="retainer-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label>Name *</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Company *</label>
          <input type="text" name="company" value={form.company} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <label>Phone (optional)</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="form-field">
        <label>What's the challenge you'd like help with? *</label>
        <textarea name="challenge" value={form.challenge} onChange={handleChange} required placeholder="e.g. our fleet contract renews in 3 months and we're not sure we're getting a fair deal..." />
      </div>
      <div className="form-row">
        <div className="form-field">
          <label>Approx. annual spend in this area (optional)</label>
          <select name="spend_range" value={form.spend_range} onChange={handleChange}>
            <option value="">Prefer not to say</option>
            <option value="<50k">Under €50k</option>
            <option value="50-200k">€50k - €200k</option>
            <option value="200k+">€200k+</option>
          </select>
        </div>
        <div className="form-field">
          <label>Urgency (optional)</label>
          <select name="urgency" value={form.urgency} onChange={handleChange}>
            <option value="">Not sure yet</option>
            <option value="immediate">Immediate</option>
            <option value="within_month">Within a month</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>
      <div className="form-field">
        <label>Preferred cadence (optional)</label>
        <select name="preferred_cadence" value={form.preferred_cadence} onChange={handleChange}>
          <option value="">Not sure — recommend one</option>
          <option value="standard">Standard (3x/week)</option>
          <option value="intensive">Intensive (daily)</option>
        </select>
      </div>
      <button type="submit" className="btn-primary form-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send my request'}
      </button>
      {status === 'success' && <p className="form-status success">Thanks — check your email shortly for a tailored proposal.</p>}
      {status === 'error' && <p className="form-status error">Something went wrong. Please try again or email us directly.</p>}
    </form>
  );
}

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [retainerOpen, setRetainerOpen] = useState(false);

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <a href="/" className="logo">Fuen<span>tiva</span></a>
        <ul className="nav-links">
          <li><a href="#domains">Domains</a></li>
          <li><a href="#coaching">Coaching</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#about">Approach</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-right">
          <a href="/login" className="nav-cta">Client Login</a>
          <button className="nav-burger" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <div className={`nav-mobile${mobileNavOpen ? ' open' : ''}`}>
        <a href="#domains" onClick={() => setMobileNavOpen(false)}>Domains</a>
        <a href="#coaching" onClick={() => setMobileNavOpen(false)}>Coaching</a>
        <a href="#pricing" onClick={() => setMobileNavOpen(false)}>Pricing</a>
        <a href="#about" onClick={() => setMobileNavOpen(false)}>Approach</a>
        <a href="#contact" onClick={() => setMobileNavOpen(false)}>Contact</a>
        <a href="/login">Client Login</a>
      </div>

      {/* HERO */}
      <div className="hero-wrap">
        <section className="hero">
          <div>
            <div className="hero-eyebrow">Sourcing, RE, FM &amp; CF Intelligence · AI-Powered</div>
            <h1>Where deep<br />expertise meets<br /><em>AI precision</em></h1>
            <p className="hero-sub">26 years in sourcing, real estate, facility management, and car fleet — now amplified by AI. Real answers, not generic advice.</p>
          </div>

          <div className="ai-panel">
            <div className="panel-header">
              <div className="panel-dot" style={{background:'#FF5500'}}></div>
              <div className="panel-dot" style={{background:'#2E2E2E'}}></div>
              <div className="panel-dot" style={{background:'#2E2E2E'}}></div>
              <span className="panel-title">Bojan Šipovac</span>
            </div>
            <div className="panel-body">
              <div className="panel-career-item"><div className="panel-career-year">1998</div><div className="panel-career-role">Mechanical Engineer <span>— career start</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">1999–2009</div><div className="panel-career-role">Telekom Srbija <span>— public sourcing</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">2010</div><div className="panel-career-role">Key Account Manager <span>— start-up</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">2010–2012</div><div className="panel-career-role">Council of Europe <span>— freelance</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">2011–2018</div><div className="panel-career-role">Global Sourcing Team <span>— Telenor Group, TPC Singapore</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">2015–Present</div><div className="panel-career-role">Director, Sourcing/RE/FM/Fleet <span>— Telenor / Yettel</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">2016</div><div className="panel-career-role">Nelt <span>— freelance consultant</span></div></div>
              <div className="panel-career-item"><div className="panel-career-year">Today</div><div className="panel-career-role">Fuentiva <span>— AI-powered coaching</span></div></div>
            </div>
          </div>
        </section>

        <div className="stats-strip">
          <div className="stat-item"><div className="stat-number">26<span>+</span></div><div className="stat-desc">Years in sourcing &amp; ops</div></div>
          <div className="stat-item"><div className="stat-number">€<span>2B</span></div><div className="stat-desc">Contracts managed</div></div>
          <div className="stat-item"><div className="stat-number">7<span>x</span></div><div className="stat-desc">Domains, one expert</div></div>
          <div className="stat-item"><div className="stat-number">24<span>/7</span></div><div className="stat-desc">AI availability</div></div>
        </div>
      </div>

      {/* DOMAINS */}
      <section className="section" id="domains">
        <div className="section-eyebrow">What I Do</div>
        <h2 className="section-title">Expert domains.</h2>
        <div className="services-grid">
          <div className="service-card"><div className="service-mono">SS</div><div className="service-name">Strategic Sourcing</div><p className="service-desc">Category strategy, RFQ design, vendor evaluation, savings realization.</p></div>
          <div className="service-card"><div className="service-mono">RE</div><div className="service-name">Real Estate</div><p className="service-desc">Site selection, lease negotiation, portfolio optimization.</p></div>
          <div className="service-card"><div className="service-mono">FM</div><div className="service-name">Facility Management</div><p className="service-desc">Vendor governance, SLA design, OPEX control.</p></div>
          <div className="service-card"><div className="service-mono">CF</div><div className="service-name">Car Fleet</div><p className="service-desc">Fleet sourcing, TCO analysis, policy design.</p></div>
          <div className="service-card"><div className="service-mono">TL</div><div className="service-name">Team Leadership</div><p className="service-desc">Building and scaling teams.</p></div>
          <div className="service-card"><div className="service-mono">PP</div><div className="service-name">Public Sourcing</div><p className="service-desc">Compliant, efficient public tenders.</p></div>
          <div className="service-card featured"><div className="service-mono">AI</div><div className="service-name">AI in Sourcing</div><p className="service-desc">Practical AI systems for sourcing teams — deployed, not theoretical.</p></div>
        </div>
      </section>

      {/* COACHING SHOWCASE */}
      <section className="coaching-section" id="coaching">
        <div className="coaching-inner">
          <div>
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-title" style={{marginBottom:0}}>Your sourcing expert. Always on.</h2>
            <div className="coaching-features">
              <div className="feature-item"><div className="feature-bullet"></div><div className="feature-text"><strong>AI Coaching, 24/7</strong><p>WhatsApp, text &amp; voice — always in context.</p></div></div>
              <div className="feature-item"><div className="feature-bullet"></div><div className="feature-text"><strong>Quick Win sessions</strong><p>15–30 min live with Bojan, for decisions that can't wait.</p></div></div>
              <div className="feature-item"><div className="feature-bullet"></div><div className="feature-text"><strong>For you or your whole team</strong><p>Same expertise, individually or under one company account.</p></div></div>
            </div>
          </div>
          <div className="chat-mockup">
            <div className="chat-header">
              <div className="chat-avatar">B</div>
              <div><div className="chat-name">Bojan · Sourcing Coach</div><div className="chat-status">● Online</div></div>
            </div>
            <div className="chat-body">
              <div><div className="chat-msg bot">Ready for today's session. What's the biggest challenge on your plate right now?</div><div className="chat-time">09:02</div></div>
              <div style={{alignSelf:'flex-end'}}><div className="chat-msg user">We're renewing a major contract and the vendor is pushing back on our price benchmarks.</div><div className="chat-time" style={{textAlign:'right'}}>09:03</div></div>
              <div><div className="chat-msg bot">Classic anchor move. Do you have at least 2 alternative quotes in hand? That's your leverage.<span className="cursor"></span></div><div className="chat-time">09:03</div></div>
            </div>
          </div>
        </div>
        <div className="coaching-cta"><a href="/login" className="btn-primary" style={{fontSize:'16px', padding:'18px 44px'}}>Let's start</a></div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="section-eyebrow">Pricing</div>
        <h2 className="section-title" style={{marginBottom:'8px'}}>Straightforward pricing.</h2>
        <p className="vat-note" style={{margin:'0 0 36px'}}>Prices excl. VAT.</p>

        <div className="pricing-split">
          <div className="pricing-col">
            <div className="col-eyebrow">For Individuals</div>

            <div className="price-line">
              <div className="price-line-left"><strong>AI Coaching</strong><p>Unlimited WhatsApp coaching, text &amp; voice.</p></div>
              <div className="price-line-right">€99<span>/mo</span></div>
            </div>
            <div className="price-line">
              <div className="price-line-left">
                <strong>Quick Win Session</strong>
                <p>Live with Bojan, for decisions that can't wait.</p>
                <div style={{marginTop:'10px'}}>
                  <div className="tier-mini"><span>15 min</span><strong>€25</strong></div>
                  <div className="tier-mini"><span>20 min</span><strong>€28</strong></div>
                  <div className="tier-mini"><span>25 min</span><strong>€31</strong></div>
                  <div className="tier-mini"><span>30 min</span><strong>€34</strong></div>
                </div>
              </div>
            </div>

            <div className="col-cta"><a href="/login" className="btn-primary">Start AI Coaching</a></div>
          </div>

          <div className="pricing-col b2b">
            <div className="col-eyebrow">For Teams &amp; Companies</div>

            <div className="price-line">
              <div className="price-line-left">
                <strong>Team Subscription</strong>
                <p>Unlimited AI coaching + live group sessions, one company account.</p>
                <div style={{marginTop:'10px'}}>
                  <div className="tier-mini"><span>Starter · up to 5</span><strong>€349/mo</strong></div>
                  <div className="tier-mini"><span>Growth · up to 15</span><strong>€799/mo</strong></div>
                  <div className="tier-mini"><span>Scale · up to 30</span><strong>€1,490/mo</strong></div>
                  <div className="tier-mini"><span>Enterprise · 30+</span><strong>Let's talk</strong></div>
                </div>
              </div>
            </div>

            <div className="price-line">
              <div className="price-line-left"><strong>On-site Workshop</strong><p>Half-day (4h) / full-day (8h), built around your team's real challenges.</p></div>
              <div className="price-line-right">€1,800<span>–€3,200</span></div>
            </div>

            <div className="price-line">
              <div className="price-line-left">
                <strong>Sourcing Retainer</strong>
                <p>Dedicated senior sourcing support, fixed weekly schedule, 2-month minimum.</p>
                <button type="button" className="retainer-toggle" onClick={() => setRetainerOpen(!retainerOpen)}>
                  {retainerOpen ? 'Hide form' : 'Get a tailored quote'}
                </button>
                <div className={`retainer-panel${retainerOpen ? ' open' : ''}`}>
                  <RetainerInquiryForm />
                </div>
              </div>
              <div className="price-line-right">€3,000<span>–€5,000</span></div>
            </div>

            <div className="price-line">
              <div className="price-line-left"><strong>Automation Scripts</strong><p>A custom script or bot for one specific manual task — delivered as ready-to-use files.</p></div>
              <div className="price-line-right">from €750</div>
            </div>

            <div className="col-cta"><a href="#contact" className="btn-primary">Book a scoping call</a></div>
          </div>
        </div>
      </section>

      {/* APPROACH ("How I Work") */}
      <section className="about-section" id="about">
        <div className="about-name">How I Work</div>
        <p className="about-bio">Flexibility, integrity, concreteness. Real risks, weighed openly — no dressing up, no generic frameworks.</p>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Ready to upgrade<br />your current skills?</h2>
        <p>Book a free 15-minute call — we'll pinpoint where you (or your team) are stuck and whether coaching is the right fit. No pitch, no obligation.</p>
        <a href="https://calendly.com/bojan-sipovac/intro-call-15-min" target="_blank" rel="noreferrer" className="btn-primary" style={{fontSize:'15px', padding:'16px 36px'}}>Book intro call →</a>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-copy">© 2026 Fuentiva. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">LinkedIn</a>
          <a href="#">fuentiva.es</a>
        </div>
      </footer>
    </>
  );
}
