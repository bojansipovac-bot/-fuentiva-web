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
  .panel-career-item { display: flex; gap: 14px; align-items: baseline; padding: 11px 0; border-bottom: 1px solid var(--gray2); }
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
  .section { padding: 96px 48px; }
  .section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 16px; }
  .section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 4vw, 48px); font-weight: 700; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 64px; max-width: 600px; }
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--gray2); border: 1px solid var(--gray2); }
  .service-card { background: var(--black); padding: 36px 32px; transition: background 0.2s; position: relative; }
  .service-card:hover { background: var(--gray1); }
  .service-card.featured { background: var(--gray1); border: 1px solid rgba(255,85,0,0.3); margin: -1px; grid-column: span 3; }
  .service-card.featured::before { content: 'AI-POWERED'; position: absolute; top: 20px; right: 20px; font-size: 9px; font-weight: 700; letter-spacing: 2px; color: var(--orange); background: var(--oglow); padding: 4px 8px; border: 1px solid rgba(255,85,0,0.3); }
  .service-icon { font-size: 28px; margin-bottom: 20px; }
  .service-name { font-family: 'Space Grotesk', sans-serif; font-size: 19px; font-weight: 600; letter-spacing: -0.5px; margin-bottom: 10px; }
  .service-desc { font-size: 13.5px; color: var(--muted); line-height: 1.65; }
 
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
  .about-section { padding: 96px 48px; display: grid; grid-template-columns: 1fr 2fr; gap: 80px; }
  .about-label { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--orange); margin-bottom: 12px; }
  .about-name { font-family: 'Space Grotesk', sans-serif; font-size: 36px; font-weight: 700; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 6px; }
  .about-title { font-size: 14px; color: var(--muted); }
  .about-bio { font-size: 16px; color: var(--light); line-height: 1.75; margin-bottom: 20px; }
  .about-bio strong { color: var(--white); }
  .expertise-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
  .tag { font-size: 11.5px; font-weight: 500; padding: 5px 12px; border: 1px solid var(--gray3); color: var(--muted); }

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
          <li><a href="#services">Services</a></li>
          <li><a href="#coaching">AI Coaching</a></li>
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
            <a href="#services" className="btn-ghost">Explore services</a>
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
                <div className="panel-career-year">2010–2018</div>
                <div className="panel-career-role">Global Sourcing Team <span>— Telenor Group, TPC Singapore</span></div>
              </div>
              <div className="panel-career-item">
                <div className="panel-career-year">2015–Present</div>
                <div className="panel-career-role">Director for Sourcing <span>— Telenor / Yettel</span></div>
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
      <section className="section" id="services">
        <div className="section-eyebrow">What I Do</div>
        <h2 className="section-title">Seven domains.<br />One expert.</h2>
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
            <p className="service-desc">Fleet procurement, TCO analysis, policy design, and vendor management. Optimizing cost and compliance across your vehicle assets.</p>
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
 
      {/* COACHING */}
      <section className="coaching-section" id="coaching">
        <div className="coaching-inner">
          <div>
            <div className="section-eyebrow">Coaching Portal</div>
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
      </section>
 
      {/* ABOUT */}
      <section className="about-section" id="about">
        <div>
          <div className="about-label">About</div>
          <div className="about-name">Bojan<br />Šipovac</div>
          <div className="about-title">Sourcing Director · AI Builder</div>
        </div>
        <div>
          <p className="about-bio">I spent <strong>26 years</strong> inside major telecommunications companies — managing sourcing, real estate, facility management, fleet, and teams at scale. I've negotiated contracts worth hundreds of millions, built procurement functions from scratch, and run multi-country category strategies.</p>
          <p className="about-bio">My career started in <strong>public procurement at Telekom Srbija</strong>, where I learned the discipline of regulated, high-stakes tendering. I then moved into corporate procurement at Yettel, leading sourcing across five domains simultaneously.</p>
          <p className="about-bio">Now I combine that hands-on expertise with <strong>AI systems I build myself</strong> — to help procurement professionals move faster and smarter. Fuentiva is that combination.</p>
          <div className="expertise-tags">
            <span className="tag">Strategic Sourcing</span>
            <span className="tag">Vendor Negotiation</span>
            <span className="tag">Contract Strategy</span>
            <span className="tag">RFQ Design</span>
            <span className="tag">TCO Analysis</span>
            <span className="tag">Facility Management</span>
            <span className="tag">Real Estate</span>
            <span className="tag">Car Fleet</span>
            <span className="tag">Public Procurement</span>
            <span className="tag">Team Leadership</span>
            <span className="tag">AI Implementation</span>
          </div>
        </div>
      </section>

      {/* PROFESSIONAL TIMELINE */}
      <section className="timeline-section">
        <div className="section-eyebrow">Career Path</div>
        <h2 className="section-title">26 years, built<br />step by step.</h2>
        <div className="timeline-list">
          <div className="timeline-item">
            <div className="timeline-year">1998</div>
            <div className="timeline-text">
              <strong>Graduated as a Mechanical Engineer</strong>
              <p>Built a career from there in sourcing, real estate, facility management, and car fleet — mostly within the telecom sector.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">1999 – 2009</div>
            <div className="timeline-text">
              <strong>Telekom Srbija</strong>
              <p>10 years at the state-owned operator, including hands-on experience in public procurement.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2010</div>
            <div className="timeline-text">
              <strong>Key Account Manager, start-up</strong>
              <p>Led 5 major client engagements — direct experience in sales and account management.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2010 – 2012</div>
            <div className="timeline-text">
              <strong>Council of Europe</strong>
              <p>Freelance engagement alongside corporate work.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2010 – Present</div>
            <div className="timeline-text">
              <strong>Yettel (formerly Telenor)</strong>
              <p>Joined the company in 2010.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2015 – Present</div>
            <div className="timeline-text">
              <strong>Director for Sourcing, Telenor / Yettel</strong>
              <p>Took on the role of Director for Sourcing in 2015.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2011 – 2018</div>
            <div className="timeline-text">
              <strong>Global Sourcing Team, Telenor Group</strong>
              <p>Representative for Telenor Serbia & Montenegro on the global sourcing team; contributed to establishing TPC (Telenor Procurement Company) in Singapore — direct experience with centralized sourcing and international environments. The same approach, on a smaller scale, applies within Yettel as part of the PPF/e& group today.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2016</div>
            <div className="timeline-text">
              <strong>Nelt</strong>
              <p>Freelance sourcing consultant for one of Serbia's largest private distribution and freight-forwarding companies.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">Ongoing</div>
            <div className="timeline-text">
              <strong>Continuous technical education</strong>
              <p>Numerous courses and industry events in IT and telecom, alongside formal studies.</p>
            </div>
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="cta-section" id="contact">
        <h2>Ready to upgrade<br />your sourcing game?</h2>
        <p>Start with a free 30-minute intro call. No pitch — just sourcing talk.</p>
        <a href="mailto:bojan.sipovac@gmail.com" className="btn-primary" style={{fontSize:'15px', padding:'16px 36px'}}>Book intro call →</a>
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
