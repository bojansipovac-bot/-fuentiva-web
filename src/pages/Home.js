<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fuentiva — Redesign Demo</title>
<style>
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

  /* DEMO BANNER */
  .demo-banner {
    background: var(--orange); color: #fff; text-align: center;
    font-family: 'Space Grotesk', sans-serif; font-size: 12.5px; font-weight: 600;
    letter-spacing: 0.5px; padding: 8px; position: relative; z-index: 200;
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
  .hero-wrap { min-height: 92vh; display: flex; flex-direction: column; }
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
  .hero-sub { font-size: 16px; color: var(--light); line-height: 1.7; max-width: 440px; margin-bottom: 40px; }
  .hero-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
  .btn-primary { background: var(--orange); color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; font-weight: 600; padding: 14px 28px; border: none; cursor: pointer; text-decoration: none; transition: background 0.2s; display: inline-block; }
  .btn-primary:hover { background: var(--orange2); }
  .btn-ghost { color: var(--light); font-size: 14px; font-weight: 500; text-decoration: none; border-bottom: 1px solid var(--gray3); padding-bottom: 2px; transition: color 0.2s; }
  .btn-ghost:hover { color: var(--white); }

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
  .retainer-panel { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
  .retainer-panel.open { max-height: 600px; }
  .retainer-form { padding-top: 20px; display: flex; flex-direction: column; gap: 14px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .form-field { display: flex; flex-direction: column; gap: 5px; }
  .form-field label { font-size: 11.5px; color: var(--muted); font-weight: 500; }
  .form-field input, .form-field textarea {
    background: var(--gray2); border: 1px solid var(--gray3); color: var(--white);
    padding: 9px 11px; font-size: 13px; font-family: 'Inter', sans-serif;
  }
  .form-field input:focus, .form-field textarea:focus { outline: none; border-color: var(--orange); }
  .form-field textarea { resize: vertical; min-height: 70px; }
  @media (max-width: 640px) { .form-row { grid-template-columns: 1fr; } }

  .vat-note { font-size: 11px; color: var(--muted); margin-top: 16px; }
  @media (max-width: 860px) { .pricing-split { grid-template-columns: 1fr; } }

  /* ABOUT — trimmed */
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
  .footer-links a { font-size: 12px; color: var(--muted); text-decoration: none; }
  .footer-links a:hover { color: var(--white); }
</style>
</head>
<body>

<div class="demo-banner">DEMO — layout &amp; content only, not wired to the real site</div>

<nav class="nav">
  <a href="#" class="logo">Fuen<span>tiva</span></a>
  <ul class="nav-links">
    <li><a href="#domains">Domains</a></li>
    <li><a href="#coaching">Coaching</a></li>
    <li><a href="#pricing">Pricing</a></li>
    <li><a href="#about">Approach</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="nav-right">
    <a href="#" class="nav-cta">Client Login</a>
    <button class="nav-burger" onclick="document.getElementById('navMobile').classList.toggle('open')">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-mobile" id="navMobile">
  <a href="#domains">Domains</a>
  <a href="#coaching">Coaching</a>
  <a href="#pricing">Pricing</a>
  <a href="#about">Approach</a>
  <a href="#contact">Contact</a>
  <a href="#">Client Login</a>
</div>

<div class="hero-wrap">
  <section class="hero">
    <div>
      <div class="hero-eyebrow">Sourcing, RE, FM & CF Intelligence · AI-Powered</div>
      <h1>Where deep<br>expertise meets<br><em>AI precision</em></h1>
      <p class="hero-sub">26 years in sourcing, real estate, facility management, and car fleet — now amplified by AI. Real answers, not generic advice.</p>
    </div>
    <div class="ai-panel">
      <div class="panel-header">
        <div class="panel-dot" style="background:#FF5500"></div>
        <div class="panel-dot" style="background:#2E2E2E"></div>
        <div class="panel-dot" style="background:#2E2E2E"></div>
        <span class="panel-title">Bojan Šipovac</span>
      </div>
      <div class="panel-body">
        <div class="panel-career-item"><div class="panel-career-year">1998</div><div class="panel-career-role">Mechanical Engineer <span>— career start</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">1999–2009</div><div class="panel-career-role">Telekom Srbija <span>— public sourcing</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">2010</div><div class="panel-career-role">Key Account Manager <span>— start-up</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">2010–2012</div><div class="panel-career-role">Council of Europe <span>— freelance</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">2011–2018</div><div class="panel-career-role">Global Sourcing Team <span>— Telenor Group, TPC Singapore</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">2015–Present</div><div class="panel-career-role">Director, Sourcing/RE/FM/Fleet <span>— Telenor / Yettel</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">2016</div><div class="panel-career-role">Nelt <span>— freelance consultant</span></div></div>
        <div class="panel-career-item"><div class="panel-career-year">Today</div><div class="panel-career-role">Fuentiva <span>— AI-powered coaching</span></div></div>
      </div>
    </div>
  </section>

  <div class="stats-strip">
    <div class="stat-item"><div class="stat-number">26<span>+</span></div><div class="stat-desc">Years in sourcing &amp; ops</div></div>
    <div class="stat-item"><div class="stat-number">€<span>2B</span></div><div class="stat-desc">Contracts managed</div></div>
    <div class="stat-item"><div class="stat-number">7<span>x</span></div><div class="stat-desc">Domains, one expert</div></div>
    <div class="stat-item"><div class="stat-number">24<span>/7</span></div><div class="stat-desc">AI availability</div></div>
  </div>
</div>

<section class="section" id="domains">
  <div class="section-eyebrow">What I Do</div>
  <h2 class="section-title">Expert domains.</h2>
  <div class="services-grid">
    <div class="service-card"><div class="service-mono">SS</div><div class="service-name">Strategic Sourcing</div><p class="service-desc">Category strategy, RFQ design, vendor evaluation, savings realization.</p></div>
    <div class="service-card"><div class="service-mono">RE</div><div class="service-name">Real Estate</div><p class="service-desc">Site selection, lease negotiation, portfolio optimization.</p></div>
    <div class="service-card"><div class="service-mono">FM</div><div class="service-name">Facility Management</div><p class="service-desc">Vendor governance, SLA design, OPEX control.</p></div>
    <div class="service-card"><div class="service-mono">CF</div><div class="service-name">Car Fleet</div><p class="service-desc">Fleet sourcing, TCO analysis, policy design.</p></div>
    <div class="service-card"><div class="service-mono">TL</div><div class="service-name">Team Leadership</div><p class="service-desc">Building and scaling teams.</p></div>
    <div class="service-card"><div class="service-mono">PP</div><div class="service-name">Public Sourcing</div><p class="service-desc">Compliant, efficient public tenders.</p></div>
    <div class="service-card featured"><div class="service-mono">AI</div><div class="service-name">AI in Sourcing</div><p class="service-desc">Practical AI systems for sourcing teams — deployed, not theoretical.</p></div>
  </div>
</section>

<section class="coaching-section" id="coaching">
  <div class="coaching-inner">
    <div>
      <div class="section-eyebrow">How It Works</div>
      <h2 class="section-title" style="margin-bottom:0">Your sourcing expert. Always on.</h2>
      <div class="coaching-features">
        <div class="feature-item"><div class="feature-bullet"></div><div class="feature-text"><strong>AI Coaching, 24/7</strong><p>WhatsApp, text &amp; voice — always in context.</p></div></div>
        <div class="feature-item"><div class="feature-bullet"></div><div class="feature-text"><strong>Quick Win sessions</strong><p>15–30 min live with Bojan, for decisions that can't wait.</p></div></div>
        <div class="feature-item"><div class="feature-bullet"></div><div class="feature-text"><strong>For you or your whole team</strong><p>Same expertise, individually or under one company account.</p></div></div>
      </div>
    </div>
    <div class="chat-mockup">
      <div class="chat-header">
        <div class="chat-avatar">B</div>
        <div><div class="chat-name">Bojan · Sourcing Coach</div><div class="chat-status">● Online</div></div>
      </div>
      <div class="chat-body">
        <div><div class="chat-msg bot">Ready for today's session. What's the biggest challenge on your plate right now?</div><div class="chat-time">09:02</div></div>
        <div style="align-self:flex-end"><div class="chat-msg user">We're renewing a major contract and the vendor is pushing back on our price benchmarks.</div><div class="chat-time" style="text-align:right">09:03</div></div>
        <div><div class="chat-msg bot">Classic anchor move. Do you have at least 2 alternative quotes in hand? That's your leverage.<span class="cursor"></span></div><div class="chat-time">09:03</div></div>
      </div>
    </div>
  </div>
  <div class="coaching-cta"><a href="#" class="btn-primary" style="font-size:16px;padding:18px 44px">Let's start</a></div>
</section>

<section class="section" id="pricing">
  <div class="section-eyebrow">Pricing</div>
  <h2 class="section-title" style="margin-bottom:8px">Straightforward pricing.</h2>
  <p class="vat-note" style="margin:0 0 36px">Prices excl. VAT.</p>

  <div class="pricing-split">
    <div class="pricing-col">
      <div class="col-eyebrow">For Individuals</div>

      <div class="price-line">
        <div class="price-line-left"><strong>AI Coaching</strong><p>Unlimited WhatsApp coaching, text &amp; voice.</p></div>
        <div class="price-line-right">€99<span>/mo</span></div>
      </div>
      <div class="price-line">
        <div class="price-line-left">
          <strong>Quick Win Session</strong>
          <p>Live with Bojan, for decisions that can't wait.</p>
          <div style="margin-top:10px">
            <div class="tier-mini"><span>15 min</span><strong>€25</strong></div>
            <div class="tier-mini"><span>20 min</span><strong>€28</strong></div>
            <div class="tier-mini"><span>25 min</span><strong>€31</strong></div>
            <div class="tier-mini"><span>30 min</span><strong>€34</strong></div>
          </div>
        </div>
      </div>

      <div class="col-cta"><a href="#" class="btn-primary">Start AI Coaching</a></div>
    </div>

    <div class="pricing-col b2b">
      <div class="col-eyebrow">For Teams &amp; Companies</div>

      <div class="price-line">
        <div class="price-line-left">
          <strong>Team Subscription</strong>
          <p>Unlimited AI coaching + live group sessions, one company account.</p>
          <div style="margin-top:10px">
            <div class="tier-mini"><span>Starter · up to 5</span><strong>€349/mo</strong></div>
            <div class="tier-mini"><span>Growth · up to 15</span><strong>€799/mo</strong></div>
            <div class="tier-mini"><span>Scale · up to 30</span><strong>€1,490/mo</strong></div>
            <div class="tier-mini"><span>Enterprise · 30+</span><strong>Let's talk</strong></div>
          </div>
        </div>
      </div>

      <div class="price-line">
        <div class="price-line-left"><strong>On-site Workshop</strong><p>Half-day (4h) / full-day (8h), built around your team's real challenges.</p></div>
        <div class="price-line-right">€1,800<span>–€3,200</span></div>
      </div>

      <div class="price-line">
        <div class="price-line-left">
          <strong>Sourcing Retainer</strong>
          <p>Dedicated senior sourcing support, fixed weekly schedule, 2-month minimum.</p>
          <button class="retainer-toggle" onclick="document.getElementById('retainerPanel').classList.toggle('open')">Get a tailored quote</button>
          <div class="retainer-panel" id="retainerPanel">
            <div class="retainer-form">
              <div class="form-row">
                <div class="form-field"><label>Name</label><input type="text"></div>
                <div class="form-field"><label>Company</label><input type="text"></div>
              </div>
              <div class="form-row">
                <div class="form-field"><label>Email</label><input type="email"></div>
                <div class="form-field"><label>Phone (optional)</label><input type="tel"></div>
              </div>
              <div class="form-field"><label>What's the challenge?</label><textarea></textarea></div>
              <button class="btn-primary" style="align-self:flex-start">Send request</button>
            </div>
          </div>
        </div>
        <div class="price-line-right">€3,000<span>–€5,000</span></div>
      </div>

      <div class="price-line">
        <div class="price-line-left"><strong>Automation Scripts</strong><p>A custom script or bot for one specific manual task — delivered as ready-to-use files.</p></div>
        <div class="price-line-right">from €750</div>
      </div>

      <div class="col-cta"><a href="#" class="btn-primary">Book a scoping call</a></div>
    </div>
  </div>
</section>

<section class="about-section" id="about">
  <div class="about-name">How I Work</div>
  <p class="about-bio">Flexibility, integrity, concreteness. Real risks, weighed openly — no dressing up, no generic frameworks.</p>
</section>

<section class="cta-section" id="contact">
  <h2>Ready to upgrade<br>your current skills?</h2>
  <p>Book a free 15-minute call — we'll pinpoint where you (or your team) are stuck and whether coaching is the right fit. No pitch, no obligation.</p>
  <a href="#" class="btn-primary" style="font-size:15px;padding:16px 36px">Book intro call →</a>
</section>

<footer>
  <div class="footer-copy">© 2026 Fuentiva. All rights reserved.</div>
  <div class="footer-links">
    <a href="#">Privacy</a>
    <a href="#">LinkedIn</a>
    <a href="#">fuentiva.es</a>
  </div>
</footer>

</body>
</html>
