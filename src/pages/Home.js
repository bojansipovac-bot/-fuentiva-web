import React from 'react';
 
const styles = {
  '@import': 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap',
};
 
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
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; height: 68px;
    background: rgba(8,8,8,0.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--gray2);
  }
  .logo { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; color: var(--white); text-decoration: none; }
  .logo span { color: var(--orange); }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a { font-size: 13.5px; font-weight: 500; color: var(--light); text-decoration: none; transition: color 0.2s; }
  .nav-links a:hover { color: var(--white); }
  .nav-cta { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 13.5px; font-weight: 600; padding: 9px 22px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; }
  .nav-cta:hover { background: var(--orange2); }
 
  /* HERO */
  .hero-wrap {
    min-height: 100vh;
    display: flex; flex-direction: column;
  }
  .hero {
    flex: 1;
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 60px;
    padding: 108px 48px 32px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -200px; right: -200px;
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(255,85,0,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 24px; }
  .hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(42px, 5vw, 64px); font-weight: 700; line-height: 1.08; letter-spacing: -2px; margin-bottom: 28px; }
  .hero h1 em { font-style: normal; color: var(--orange); }
  .hero-sub { font-size: 17px; color: var(--light); line-height: 1.7; max-width: 460px; margin-bottom: 44px; }
  .hero-actions { display: flex; gap: 16px; align-items: center; }
  .btn-primary { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; padding: 14px 28px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; display: inline-block; }
  .btn-primary:hover { background: var(--orange2); }
  .btn-ghost { color: var(--light); font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 1px solid var(--gray3); padding-bottom: 2px; transition: color 0.2s; }
  .btn-ghost:hover { color: var(--white); }
 
  /* AI PANEL */
  .ai-panel { background: var(--gray1); border: 1px solid var(--gray2); }
  .panel-header { display: flex; align-items: center; gap: 8px; padding: 14px 20px; border-bottom: 1px solid var(--gray2); background: var(--gray2); }
  .panel-dot { width: 9px; height: 9px; border-radius: 50%; }
  .panel-title { font-family: 'Space Grotesk', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); margin-left: 4px; }
  .panel-body { padding: 24px; }
  .metric-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--gray2); }
  .metric-row:last-of-type { border-bottom: none; }
  .metric-label { font-size: 12px; color: var(--muted); font-weight: 500; }
  .metric-value { font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; color: var(--white); }
  .metric-value.positive { color: #4ADE80; }
  .metric-value.orange { color: var(--orange); }
  .pb-wrap { margin-top: 20px; }
  .pb-label { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-bottom: 6px; }
  .pb-track { height: 3px; background: var(--gray3); }
  .pb-fill { height: 100%; background: var(--orange); transition: width 2s ease; }
  .ai-insight { margin-top: 20px; background: var(--oglow); border: 1px solid rgba(255,85,0,0.2); padding: 14px 16px; }
  .ai-insight-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; }
  .ai-insight p { font-size: 12.5px; color: var(--light); line-height: 1.6; }
  .cursor { display: inline-block; width: 2px; height: 13px; background: var(--orange); animation: blink 1s step-end infinite; vertical-align: middle; margin-left: 2px; }
  @keyframes blink { 50% { opacity: 0; } }

  .panel-career-list { display: flex; flex-direction: column; }
  .panel-career-item { display: flex; gap: 14px; align-items: baseline; padding: 8px 0; border-bottom: 1px solid var(--gray2); }
  .panel-career-item:last-child { border-bottom: none; }
  .panel-career-year { font-family: 'Space Grotesk', sans-serif; font-size: 11.5px; font-weight: 700; color: var(--orange); flex: 0 0 82px; }
  .panel-career-role { font-size: 12.5px; color: var(--white); font-weight: 500; }
  .panel-career-role span { color: var(--muted); font-weight: 400; }
 
  /* STATS */
  .stats-strip { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid var(--gray2); border-bottom: 1px solid var(--gray2); }
  .stat-item { padding: 36px 48px; border-right: 1px solid var(--gray2); }
  .stat-item:last-child { border-right: none; }
  .stat-number { font-family: 'Space Grotesk', sans-serif; font-size: 42px; font-weight: 700; letter-spacing: -2px; line-height: 1; margin-bottom: 6px; }
  .stat-number span { color: var(--orange); }
  .stat-desc { font-size: 13px; color: var(--muted); }
 
  /* SERVICES */
  .section { padding: 56px 48px 40px; }
  .section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 12px; }
  .section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(28px, 3.4vw, 42px); font-weight: 700; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 32px; max-width: 700px; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--gray2); border: 1px solid var(--gray2); }

  /* SERVICES SPLIT (B2C / B2B) */
  .services-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--gray2); border: 1px solid var(--gray2); }
  .services-col { background: var(--black); padding: 32px; display: flex; flex-direction: column; }
  .services-col.b2b { background: var(--gray1); }
  .col-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .col-heading { font-family: 'Space Grotesk', sans-serif; font-size: 21px; font-weight: 700; letter-spacing: -0.5px; margin-bottom: 8px; }
  .col-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 22px; }
  .mini-service { display: flex; gap: 12px; padding: 11px 0; border-top: 1px solid var(--gray2); }
  .mini-icon { font-size: 17px; flex-shrink: 0; width: 22px; }
  .mini-name { font-family: 'Space Grotesk', sans-serif; font-size: 13.5px; font-weight: 600; margin-bottom: 2px; }
  .mini-desc { font-size: 11.5px; color: var(--muted); line-height: 1.5; }
  .offer-card { border-top: 1px solid var(--gray3); padding: 16px 0; }
  .offer-name { font-family: 'Space Grotesk', sans-serif; font-size: 14.5px; font-weight: 600; margin-bottom: 4px; }
  .offer-price { font-size: 11.5px; color: var(--orange); font-weight: 600; margin-bottom: 6px; }
  .offer-desc { font-size: 12px; color: var(--muted); line-height: 1.55; }
  .col-cta { margin-top: 24px; }
  .service-card { background: var(--black); padding: 22px 24px; transition: background 0.2s; position: relative; }
  .service-card:hover { background: var(--gray1); }
  .service-card.featured { background: var(--gray1); border: 1px solid rgba(255,85,0,0.3); margin: -1px; grid-column: span 3; }
  .service-card.featured::before { content: 'AI-POWERED'; position: absolute; top: 16px; right: 20px; font-size: 9px; font-weight: 700; letter-spacing: 2px; color: var(--orange); background: var(--oglow); padding: 4px 8px; border: 1px solid rgba(255,85,0,0.3); }
  .service-icon { font-size: 22px; margin-bottom: 10px; }
  .service-name { font-family: 'Space Grotesk', sans-serif; font-size: 16.5px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 6px; }
  .service-desc { font-size: 12.5px; color: var(--muted); line-height: 1.5; }
 
  /* COACHING */
  .coaching-section { padding: 96px 48px; background: var(--gray1); border-top: 1px solid var(--gray2); border-bottom: 1px solid var(--gray2); }
  .coaching-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .coaching-features { margin-top: 36px; }
  .feature-item { display: flex; gap: 16px; margin-bottom: 28px; }
  .feature-bullet { width: 6px; height: 6px; background: var(--orange); margin-top: 8px; flex-shrink: 0; }
  .feature-text strong { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; display: block; margin-bottom: 4px; }
  .feature-text p { font-size: 13.5px; color: var(--muted); line-height: 1.6; }
 
  /* CHAT MOCKUP */
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
 
  /* ABOUT */
  .about-section { padding: 150px 48px; display: grid; grid-template-columns: minmax(360px, 420px) 1fr; gap: 60px; }
  .about-name { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 14px; }
  .about-title { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; line-height: 1.25; color: var(--white); }

  .milestone-list { max-width: 780px; }
  .milestone-item { display: flex; gap: 20px; align-items: baseline; padding: 19px 0; border-bottom: 1px solid var(--gray2); }
  .milestone-item:last-child { border-bottom: none; }
  .milestone-year { font-family: 'Space Grotesk', sans-serif; font-size: 12.5px; font-weight: 700; color: var(--orange); flex: 0 0 110px; }
  .milestone-role { font-size: 14px; color: var(--white); font-weight: 500; }
  .milestone-role span { color: var(--muted); font-weight: 400; }

  /* TIMELINE */
  .timeline-section { padding: 0 48px 96px; }
  .timeline-list { max-width: 780px; }
  .timeline-item { display: flex; gap: 24px; margin-bottom: 30px; }
  .timeline-year { font-family: 'Space Grotesk', sans-serif; font-size: 13px; font-weight: 700; color: var(--orange); flex: 0 0 130px; padding-top: 2px; }
  .timeline-text strong { font-family: 'Space Grotesk', sans-serif; font-size: 15px; font-weight: 600; display: block; margin-bottom: 4px; color: var(--white); }
  .timeline-text p { font-size: 13.5px; color: var(--muted); line-height: 1.65; }
 
  /* CTA */
  .cta-section { padding: 96px 48px; text-align: center; position: relative; overflow: hidden; }
  .cta-section::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 400px; background: radial-gradient(ellipse, rgba(255,85,0,0.08) 0%, transparent 70%); pointer-events: none; }
  .cta-section h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(36px, 5vw, 58px); font-weight: 700; letter-spacing: -2px; line-height: 1.05; margin-bottom: 20px; }
  .cta-section p { font-size: 16px; color: var(--muted); margin-bottom: 44px; }
 
  /* FOOTER */
  footer { border-top: 1px solid var(--gray2); padding: 32px 48px; display: flex; justify-content: space-between; align-items: center; }
  .footer-copy { font-size: 12px; color: var(--muted); }
  .footer-links { display: flex; gap: 28px; }
  .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--white); }
`;
 
export default function Home() {
  return (
    <>
      <style>{css}</style>
 
      {/* NAV */}
      <nav className="nav">
        <a href="/" className="logo">Fuen<span>tiva</span></a>
        <ul className="nav-links">
          <li><a href="#domains">Expert Domains</a></li>
          <li><a href="#offers">Offers</a></li>
          <li><a href="#coaching">Personal Coach</a></li>
          <li><a href="#company-coaching">Company Coach</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="/login" className="nav-cta">Client Login</a>
      </nav>
 
      {/* HERO */}
      <div className="hero-wrap">
      <section className="hero">
        <div>
          <div className="hero-eyebrow">Procurement Intelligence · AI-Powered</div>
          <h1>Where deep<br />expertise meets<br /><em>AI precision</em></h1>
          <p className="hero-sub">26 years of sourcing, facility management, and real estate expertise — now amplified by AI. Built for professionals who need real answers, not generic advice.</p>
          <div className="hero-actions">
            <a href="#coaching" className="btn-primary">Start AI Coaching</a>
            <a href="#domains" className="btn-ghost">Explore services</a>
          </div>
        </div>
 
        <div className="ai-panel">
          <div className="panel-header">
            <div className="panel-dot" style={{background:'#FF5500'}}></div>
            <div className="panel-dot" style={{background:'#2E2E2E'}}></div>
            <div className="panel-dot" style={{background:'#2E2E2E'}}></div>
            <span className="panel-title">Bojan Šipovac</span>
          </div>
          <div className="panel-body">
            <div className="panel-career-list">
              <div className="panel-career-item">
                <div className="panel-career-year">1998</div>
                <div className="panel-career-role">Mechanical Engineer <span>— career start</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">1999–2009</div>
                <div className="panel-career-role">Telekom Srbija <span>— public procurement</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">2010</div>
                <div className="panel-career-role">Key Account Manager <span>— start-up</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">2010–2012</div>
                <div className="panel-career-role">Council of Europe <span>— freelance</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">2011–2018</div>
                <div className="panel-career-role">Global Sourcing Team <span>— Telenor Group, TPC Singapore</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">2015–Present</div>
                <div className="panel-career-role">Director for Sourcing, RE & FM, Car Fleet <span>— Telenor / Yettel</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">2016</div>
                <div className="panel-career-role">Nelt <span>— freelance sourcing consultant</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">Today</div>
                <div className="panel-career-role">Fuentiva <span>— AI-powered coaching</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stat-item"><div className="stat-number">26<span>+</span></div><div className="stat-desc">Years in sourcing & operations</div></div>
        <div className="stat-item"><div className="stat-number">€<span>2B</span></div><div className="stat-desc">In contracts managed</div></div>
        <div className="stat-item"><div className="stat-number">7<span>x</span></div><div className="stat-desc">Domains. One integrated view.</div></div>
        <div className="stat-item"><div className="stat-number">24<span>/7</span></div><div className="stat-desc">AI coaching availability</div></div>
      </div>
      </div>
 
      {/* SERVICES */}
      <section className="section" id="domains">
        <div className="section-eyebrow">What I Do</div>
        <h2 className="section-title">Expert Domains</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <div className="service-name">Strategic Sourcing</div>
            <p className="service-desc">Category strategy, RFQ design, vendor evaluation frameworks, and savings realization. Built from real telecom-scale experience.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏢</div>
            <div className="service-name">Real Estate</div>
            <p className="service-desc">Site acquisition, lease negotiation, portfolio optimization. Aligning real estate strategy with business operations at scale.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <div className="service-name">Facility Management</div>
            <p className="service-desc">FM strategy, vendor governance, SLA design, and OPEX control. From single sites to multi-country portfolios.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🚗</div>
            <div className="service-name">Car Fleet</div>
            <p className="service-desc">Car Fleet procurement, TCO analysis, policy design, and vendor management. Optimizing cost and compliance across your vehicle assets.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">👥</div>
            <div className="service-name">Team Leadership & Management</div>
            <p className="service-desc">Building and scaling procurement teams. Organizational design, KPI frameworks, coaching managers to lead with clarity and results.</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🏛️</div>
            <div className="service-name">Public Procurement</div>
            <p className="service-desc">Deep expertise in public tender processes from Telekom Srbija. Compliance, strategy, and efficiency in regulated procurement environments.</p>
          </div>
          <div className="service-card featured">
            <div className="service-icon">🤖</div>
            <div className="service-name">AI in Procurement</div>
            <p className="service-desc">Practical AI implementation for sourcing teams — from automated RFQ analysis to AI coaching agents. Not theory. Deployed systems that work in the real world of enterprise procurement.</p>
          </div>
        </div>
      </section>

      <section className="section" id="offers">
        <div className="section-eyebrow">Offers</div>
        <h2 className="section-title">Two ways to work with Fuentiva.</h2>
        <div className="services-split">

          <div className="services-col">
            <div className="col-eyebrow">For Individuals</div>
            <div className="col-heading">Personal Coaching</div>
            <p className="col-desc">AI coaching 24/7, or live Quick Win sessions with Bojan — across sourcing, real estate, facility management, team leadership, and car fleet.</p>

            <div className="mini-service">
              <div className="mini-icon">🤖</div>
              <div>
                <div className="mini-name">AI Coaching — 99€/month</div>
                <div className="mini-desc">Unlimited text & voice coaching via WhatsApp.</div>
              </div>
            </div>
            <div className="mini-service">
              <div className="mini-icon">⚡</div>
              <div>
                <div className="mini-name">Quick Win Sessions — from 25€</div>
                <div className="mini-desc">15–30 min live with Bojan, for decisions that need real expertise, fast.</div>
              </div>
            </div>
            <div className="mini-service">
              <div className="mini-icon">📋</div>
              <div>
                <div className="mini-name">7 domains, one expert</div>
                <div className="mini-desc">Sourcing, RE, FM, Car Fleet, Team Leadership, Public Procurement, AI implementation.</div>
              </div>
            </div>

            <div className="col-cta"><a href="#coaching" className="btn-primary">Start AI Coaching</a></div>
          </div>

          <div className="services-col b2b">
            <div className="col-eyebrow">For Teams & Companies</div>
            <div className="col-heading">Corporate Programs</div>
            <p className="col-desc">Bring Fuentiva's expertise to your whole team — flat-rate coaching access, or a live training session for a specific topic.</p>

            <div className="offer-card">
              <div className="offer-name">Team Subscription</div>
              <div className="offer-price">Flat rate — priced by team size</div>
              <div className="offer-desc">Give your whole procurement, RE/FM, or fleet team ongoing access to AI coaching, under one company account.</div>
            </div>
            <div className="offer-card">
              <div className="offer-name">Corporate Training</div>
              <div className="offer-price">Priced per engagement</div>
              <div className="offer-desc">A live 30-minute session with Bojan for your team — team leadership, negotiation, or any of the 5 core domains.</div>
            </div>

            <div className="col-cta"><a href="#company-coaching" className="btn-primary">Start Corporate Session</a></div>
          </div>

        </div>
      </section>
 
      {/* COACHING */}
      <section className="coaching-section" id="coaching">
        <div className="coaching-inner">
          <div>
            <div className="section-eyebrow">Personal Coach</div>
            <h2 className="section-title" style={{marginBottom:0}}>Your personal procurement expert. Always available.</h2>
            <div className="coaching-features">
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">
                  <strong>AI Coaching — 24/7</strong>
                  <p>Async sessions via WhatsApp. The AI knows your context, your goals, your history. Voice and text supported.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">
                  <strong>Quick Win Sessions — Live with Bojan</strong>
                  <p>15–30 min live chat directly with me. For complex decisions that need real expertise, fast. Premium rate applies.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">
                  <strong>Personalized to your situation</strong>
                  <p>Every session builds on the last. Your challenges, your industry, your goals — always in context.</p>
                </div>
              </div>
            </div>
          </div>
 
          <div className="chat-mockup">
            <div className="chat-header">
              <div className="chat-avatar">B</div>
              <div>
                <div className="chat-name">Bojan · Sourcing Coach</div>
                <div className="chat-status">● Online</div>
              </div>
            </div>
            <div className="chat-body">
              <div>
                <div className="chat-msg bot">Ready for today's session. What's the biggest sourcing challenge on your plate right now?</div>
                <div className="chat-time">09:02</div>
              </div>
              <div style={{alignSelf:'flex-end'}}>
                <div className="chat-msg user">We're renewing a major IT contract and the vendor is pushing back on our price benchmarks.</div>
                <div className="chat-time" style={{textAlign:'right'}}>09:03</div>
              </div>
              <div>
                <div className="chat-msg bot">Classic anchor move. Before their next call — do you have at least 2 alternative quotes in hand, even informal ones? That's your leverage.<span className="cursor"></span></div>
                <div className="chat-time">09:03</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{textAlign: 'center', marginTop: '56px'}}>
          <a href="/login" className="btn-primary" style={{fontSize: '18px', padding: '20px 52px'}}>Let's start</a>
        </div>
      </section>

      {/* COMPANY COACH */}
      <section className="coaching-section" id="company-coaching">
        <div className="coaching-inner">
          <div>
            <div className="section-eyebrow">Company Coach</div>
            <h2 className="section-title" style={{marginBottom:0}}>Give your whole team access to expert guidance.</h2>
            <div className="coaching-features">
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">
                  <strong>Team-wide AI Coaching</strong>
                  <p>Every employee gets 24/7 access to the same AI coaching, under one company account.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">
                  <strong>Corporate Training Sessions</strong>
                  <p>A live 30-minute session with Bojan for your team — team leadership, negotiation, or any of the 5 core domains.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-bullet"></div>
                <div className="feature-text">
                  <strong>One consistent standard</strong>
                  <p>The same expertise and approach applied across your whole organization — not fragmented, one-off advice.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-mockup">
            <div className="chat-header">
              <div className="chat-avatar">B</div>
              <div>
                <div className="chat-name">Bojan · Company Coach</div>
                <div className="chat-status">● Online</div>
              </div>
            </div>
            <div className="chat-body">
              <div>
                <div className="chat-msg bot">Ready for your team's session. Which of the 5 domains should we focus on today?</div>
                <div className="chat-time">09:02</div>
              </div>
              <div style={{alignSelf:'flex-end'}}>
                <div className="chat-msg user">Our facility management team keeps missing SLA targets with our cleaning vendor.</div>
                <div className="chat-time" style={{textAlign:'right'}}>09:03</div>
              </div>
              <div>
                <div className="chat-msg bot">Before renewing, pull the last two quarters of SLA breach data — that's your leverage in the vendor conversation.<span className="cursor"></span></div>
                <div className="chat-time">09:03</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{textAlign: 'center', marginTop: '56px'}}>
          <a href="/login" className="btn-primary" style={{fontSize: '18px', padding: '20px 52px'}}>Let's start</a>
        </div>
      </section>
 
      {/* ABOUT */}
      <section className="about-section" id="about">
        <div>
          <div className="about-name">Bojan Šipovac</div>
          <div className="about-title">26 years, built step by step.</div>
        </div>
        <div className="milestone-list">
          <div className="milestone-item">
            <div className="milestone-year">1998</div>
            <div className="milestone-role">Mechanical Engineer <span>— career start</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">1999–2009</div>
            <div className="milestone-role">Telekom Srbija <span>— public procurement</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">2010</div>
            <div className="milestone-role">Key Account Manager <span>— start-up, 5 major clients</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">2010–2012</div>
            <div className="milestone-role">Council of Europe <span>— freelance</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">2010–Present</div>
            <div className="milestone-role">Yettel <span>— formerly Telenor</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">2011–2018</div>
            <div className="milestone-role">Global Sourcing Team <span>— Telenor Group, TPC Singapore</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">2015–Present</div>
            <div className="milestone-role">Director, Sourcing/RE/FM/Car Fleet <span>— Telenor / Yettel</span></div>
          </div>
          <div className="milestone-item">
            <div className="milestone-year">2016</div>
            <div className="milestone-role">Nelt <span>— freelance sourcing consultant</span></div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Ready to upgrade<br />your sourcing game?</h2>
        <p>Start with a free 15-minute intro call. No pitch — just sourcing talk.</p>
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
