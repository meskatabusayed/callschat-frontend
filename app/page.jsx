/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: { home:"Home", about:"About", features:"Features", privacy:"Privacy & Security", download:"Download", business:"Business", community:"Community", pricing:"Pricing", faq:"FAQ", contact:"Contact", blog:"Blog", terms:"Terms", privacyPolicy:"Privacy Policy", cookies:"Cookie Policy" },
    hero: { tag:"Next-Gen Communication", title1:"Calls & Chats", title2:"Reimagined.", sub:"Fast. Private. Beautiful. CallsChat keeps your phone number hidden while delivering crystal-clear calls and lightning-fast messaging.", cta1:"Join Waitlist", cta2:"Watch Preview", badge:"Launching 2025" },
    features: { title:"Everything You Need", sub:"Built for the next generation of communication", items:[
      { icon:"🔒", t:"Phone Number Hidden", d:"Share your CallsChat ID — never your real number." },
      { icon:"🤖", t:"AI-Powered Chat", d:"Smart replies, translations, and summaries built-in." },
      { icon:"📞", t:"Crystal Clear Calls", d:"HD voice & video calls over encrypted channels." },
      { icon:"🌍", t:"Community Channels", d:"Create public or private communities & channels." },
      { icon:"💼", t:"Business Tools", d:"CRM-ready messaging for teams and brands." },
      { icon:"⚡", t:"Blazing Fast", d:"Sub-100ms message delivery worldwide." },
    ]},
    download: { title:"Get CallsChat", sub:"Available on Android & iOS", android:"Download on Android", ios:"Download on iOS", qr:"Scan QR to download", soon:"Coming Soon to App Stores" },
    waitlist: { title:"Get Early Access", sub:"Be the first to experience CallsChat", name:"Full Name", email:"Email Address", phone:"Phone (optional)", btn:"Join Waitlist", success:"🎉 You're on the list!", privacy:"We respect your privacy. No spam." },
    about: { title:"About CallsChat", sub:"We're reimagining how the world communicates.", mission:"Our Mission", missionText:"Communication should be fast, private, and beautiful. We built CallsChat to give everyone — individuals, creators, and businesses — a platform that respects their privacy while delivering a world-class experience.", team:"Built by a passionate team of engineers and designers committed to open, secure, and joyful communication." },
    pricing: { title:"Simple Pricing", sub:"Start free. Scale as you grow.", plans:[
      { name:"Free", price:"$0", period:"/mo", features:["Unlimited messages","5 GB storage","HD voice calls","Basic AI features","1 community"], cta:"Get Started", highlight:false },
      { name:"Pro", price:"$5", period:"/mo", features:["Everything in Free","50 GB storage","AI smart replies","Priority support","10 communities","Business card"], cta:"Start Free Trial", highlight:true },
      { name:"Business", price:"$15", period:"/mo", features:["Everything in Pro","Unlimited storage","Team workspace","CRM integration","Analytics","Dedicated support"], cta:"Contact Sales", highlight:false },
    ]},
    faq: { title:"Frequently Asked Questions", items:[
      { q:"How is my phone number kept hidden?", a:"CallsChat assigns you a unique @username. All communication goes through our encrypted relay — no one ever sees your real number." },
      { q:"Is CallsChat end-to-end encrypted?", a:"Yes. All messages and calls use E2E encryption by default. Not even we can read your messages." },
      { q:"When does CallsChat launch?", a:"We're targeting a 2025 launch. Join the waitlist to get early access." },
      { q:"Is there a free plan?", a:"Yes! The free plan includes unlimited messaging, HD calls, and 5 GB of storage." },
      { q:"Can businesses use CallsChat?", a:"Absolutely. We have dedicated business tools including team workspaces, CRM integration, and analytics." },
    ]},
    contact: { title:"Get In Touch", sub:"We'd love to hear from you.", name:"Your Name", email:"Email", subject:"Subject", message:"Message", btn:"Send Message", success:"Message sent! We'll get back to you soon.", address:"support@callschat.com" },
    business: { title:"CallsChat for Business", sub:"Powerful tools for teams and brands.", features:["Team messaging workspace","CRM integration","Branded business profile","Analytics & reporting","API access","Priority support"], cta:"Apply for Business Account", form:{ company:"Company Name", name:"Your Name", email:"Business Email", size:"Team Size", btn:"Submit Application", success:"Application received! We'll contact you within 48 hours." } },
    community: { title:"Creators & Communities", sub:"Build your audience on CallsChat.", features:["Create public channels","Monetize your community","Live audio rooms","Custom community bots","Subscriber analytics","Verified creator badge"], cta:"Apply as Creator", form:{ name:"Your Name", handle:"@Handle", category:"Category", followers:"Current Following", btn:"Apply Now", success:"Application submitted! We'll review it shortly." } },
    blog: { title:"Blog & News", sub:"Latest updates from CallsChat.", posts:[
      { date:"May 2025", tag:"Announcement", title:"CallsChat is Coming — Here's Everything You Need to Know", excerpt:"We've been building in stealth for two years. Today, we're ready to share our vision for the future of private communication." },
      { date:"Apr 2025", tag:"Privacy", title:"Why We Built Phone Number Hiding From Day One", excerpt:"Privacy isn't a feature we added — it's the foundation we built on. Here's the story behind our core privacy architecture." },
      { date:"Mar 2025", tag:"Technology", title:"How Our AI Makes Your Conversations Smarter", excerpt:"A deep dive into the AI-powered features that make CallsChat feel like it reads your mind — without actually reading your messages." },
    ]},
    terms: { title:"Terms & Conditions", updated:"Last updated: January 2025" },
    privacyPolicy: { title:"Privacy Policy", updated:"Last updated: January 2025" },
    cookies: { title:"Cookie Policy", updated:"Last updated: January 2025" },
    footer: { tagline:"The future of private communication.", links:"Quick Links", legal:"Legal", connect:"Connect", rights:"© 2026 CallsChat. All rights reserved." },
    admin: { title:"Admin Panel", tabs:["Waitlist","Messages","Business","Creators","Blog","Analytics"] },
  },
  bn: {
    nav: { home:"হোম", about:"সম্পর্কে", features:"বৈশিষ্ট্য", privacy:"গোপনীয়তা", download:"ডাউনলোড", business:"ব্যবসা", community:"কমিউনিটি", pricing:"মূল্য", faq:"সাহায্য", contact:"যোগাযোগ", blog:"ব্লগ", terms:"শর্তাবলী", privacyPolicy:"গোপনীয়তা নীতি", cookies:"কুকি নীতি" },
    hero: { tag:"নেক্সট-জেন যোগাযোগ", title1:"কল ও চ্যাট", title2:"নতুনভাবে।", sub:"দ্রুত। ব্যক্তিগত। সুন্দর। CallsChat আপনার ফোন নম্বর লুকিয়ে রাখে।", cta1:"ওয়েটলিস্টে যোগ দিন", cta2:"প্রিভিউ দেখুন", badge:"২০২৫ সালে আসছে" },
    features: { title:"সব কিছু যা আপনার দরকার", sub:"পরবর্তী প্রজন্মের যোগাযোগের জন্য", items:[
      { icon:"🔒", t:"ফোন নম্বর লুকানো", d:"আপনার CallsChat ID শেয়ার করুন — কখনো আসল নম্বর নয়।" },
      { icon:"🤖", t:"AI চ্যাট", d:"স্মার্ট উত্তর, অনুবাদ এবং সারসংক্ষেপ।" },
      { icon:"📞", t:"HD কল", d:"এনক্রিপ্টেড চ্যানেলে HD ভয়েস ও ভিডিও কল।" },
      { icon:"🌍", t:"কমিউনিটি", d:"পাবলিক বা প্রাইভেট কমিউনিটি তৈরি করুন।" },
      { icon:"💼", t:"ব্যবসায়িক টুলস", d:"টিম ও ব্র্যান্ডের জন্য মেসেজিং।" },
      { icon:"⚡", t:"অতি দ্রুত", d:"বিশ্বজুড়ে ১০০ms এর কম বার্তা ডেলিভারি।" },
    ]},
    download: { title:"CallsChat পান", sub:"Android ও iOS এ পাওয়া যাবে", android:"Android এ ডাউনলোড করুন", ios:"iOS এ ডাউনলোড করুন", qr:"QR স্ক্যান করুন", soon:"শীঘ্রই আসছে" },
    waitlist: { title:"আর্লি অ্যাক্সেস পান", sub:"CallsChat প্রথম অনুভব করুন", name:"পূর্ণ নাম", email:"ইমেইল ঠিকানা", phone:"ফোন (ঐচ্ছিক)", btn:"যোগ দিন", success:"🎉 আপনি তালিকায় আছেন!", privacy:"আমরা আপনার গোপনীয়তা সম্মান করি।" },
    footer: { tagline:"ব্যক্তিগত যোগাযোগের ভবিষ্যৎ।", links:"দ্রুত লিঙ্ক", legal:"আইনি", connect:"সংযোগ", rights:"© ২০২৬ CallsChat। সর্বস্বত্ব সংরক্ষিত।" },
  },
  pt: {
    nav: { home:"Início", about:"Sobre", features:"Recursos", privacy:"Privacidade", download:"Baixar", business:"Empresas", community:"Comunidade", pricing:"Preços", faq:"FAQ", contact:"Contato", blog:"Blog", terms:"Termos", privacyPolicy:"Política de Privacidade", cookies:"Política de Cookies" },
    hero: { tag:"Comunicação de Nova Geração", title1:"Chamadas e Chats", title2:"Reinventados.", sub:"Rápido. Privado. Bonito. O CallsChat esconde seu número de telefone.", cta1:"Entrar na Lista de Espera", cta2:"Ver Prévia", badge:"Lançando em 2025" },
    features: { title:"Tudo Que Você Precisa", sub:"Construído para a próxima geração de comunicação", items:[
      { icon:"🔒", t:"Número Oculto", d:"Compartilhe seu ID CallsChat — nunca seu número real." },
      { icon:"🤖", t:"Chat com IA", d:"Respostas inteligentes, traduções e resumos integrados." },
      { icon:"📞", t:"Chamadas HD", d:"Chamadas de voz e vídeo HD em canais criptografados." },
      { icon:"🌍", t:"Comunidades", d:"Crie comunidades e canais públicos ou privados." },
      { icon:"💼", t:"Ferramentas Business", d:"Mensagens prontas para CRM para equipes e marcas." },
      { icon:"⚡", t:"Ultra Rápido", d:"Entrega de mensagens abaixo de 100ms em todo o mundo." },
    ]},
    download: { title:"Baixe o CallsChat", sub:"Disponível para Android e iOS", android:"Baixar no Android", ios:"Baixar no iOS", qr:"Escaneie o QR para baixar", soon:"Em breve nas lojas de apps" },
    waitlist: { title:"Acesso Antecipado", sub:"Seja o primeiro a experimentar o CallsChat", name:"Nome Completo", email:"Endereço de Email", phone:"Telefone (opcional)", btn:"Entrar na Lista", success:"🎉 Você está na lista!", privacy:"Respeitamos sua privacidade. Sem spam." },
    footer: { tagline:"O futuro da comunicação privada.", links:"Links Rápidos", legal:"Legal", connect:"Conectar", rights:"© 2026 CallsChat. Todos os direitos reservados." },
  }
};

const lang = (l , key , fallback="en") => {
  const keys = key.split(".");
  let cur = T[l]  || T[fallback];
  for (const k of keys) { cur = cur?.[k]; }
  if (cur === undefined) { cur = T[fallback]; for (const k of keys) cur = cur?.[k]; }
  return cur;
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');
  :root {
    --bg: #050a14;
    --bg2: #080f1f;
    --bg3: #0d1626;
    --card: #0f1a2e;
    --card2: #13203a;
    --border: rgba(99,179,237,0.12);
    --accent: #3b9eff;
    --accent2: #00d4ff;
    --accent3: #7c3aed;
    --green: #10b981;
    --text: #e8f4ff;
    --muted: #6b8fb5;
    --radius: 16px;
    --font-display: 'Clash Display', 'Cabinet Grotesk', sans-serif;
    --font-body: 'Cabinet Grotesk', sans-serif;
  }
  * { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; }
  body { background:var(--bg); color:var(--text); font-family:var(--font-body); overflow-x:hidden; }
  ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:var(--bg2); } ::-webkit-scrollbar-thumb { background:var(--accent); border-radius:3px; }
  .app { min-height:100vh; }
  .nav { position:fixed; top:0; left:0; right:0; z-index:100; background:rgba(5,10,20,0.85); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); padding:0 24px; height:64px; display:flex; align-items:center; justify-content:space-between; }
  .nav-logo { font-family:var(--font-display); font-size:22px; font-weight:700; background:linear-gradient(135deg,var(--accent),var(--accent2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; cursor:pointer; white-space:nowrap; }
  .nav-links { display:flex; gap:4px; align-items:center; flex-wrap:wrap; }
  .nav-link { background:none; border:none; color:var(--muted); font-family:var(--font-body); font-size:13px; padding:6px 10px; border-radius:8px; cursor:pointer; transition:all .2s; white-space:nowrap; }
  .nav-link:hover,.nav-link.active { color:var(--text); background:rgba(59,158,255,0.1); }
  .nav-right { display:flex; align-items:center; gap:10px; }
  .lang-select { background:var(--card); border:1px solid var(--border); color:var(--text); font-family:var(--font-body); font-size:12px; padding:5px 8px; border-radius:8px; cursor:pointer; }
  .btn-nav { background:var(--accent); color:#fff; border:none; font-family:var(--font-body); font-weight:700; font-size:13px; padding:8px 16px; border-radius:10px; cursor:pointer; white-space:nowrap; transition:all .2s; }
  .btn-nav:hover { background:var(--accent2); transform:translateY(-1px); }
  .hamburger { display:none; background:none; border:none; color:var(--text); font-size:22px; cursor:pointer; }
  .page { padding-top:64px; min-height:100vh; }
  .hero { min-height:calc(100vh - 64px); display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; padding:60px 24px; }
  .hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,158,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.12) 0%, transparent 60%); pointer-events:none; }
  .hero-grid { position:absolute; inset:0; background-image:linear-gradient(rgba(59,158,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,158,255,0.04) 1px,transparent 1px); background-size:60px 60px; pointer-events:none; }
  .hero-content { max-width:800px; text-align:center; position:relative; z-index:1; }
  .hero-tag { display:inline-block; background:rgba(59,158,255,0.12); border:1px solid rgba(59,158,255,0.3); color:var(--accent); font-size:12px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:6px 16px; border-radius:20px; margin-bottom:24px; }
  .hero-title { font-family:var(--font-display); font-size:clamp(48px,8vw,96px); font-weight:700; line-height:1.0; margin-bottom:24px; }
  .hero-title span { background:linear-gradient(135deg,var(--accent),var(--accent2),var(--accent3)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
  .hero-sub { font-size:clamp(16px,2vw,20px); color:var(--muted); max-width:560px; margin:0 auto 40px; line-height:1.7; }
  .hero-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .btn-primary { background:linear-gradient(135deg,var(--accent),var(--accent2)); color:#fff; border:none; font-family:var(--font-body); font-weight:700; font-size:16px; padding:14px 32px; border-radius:12px; cursor:pointer; transition:all .3s; box-shadow:0 0 30px rgba(59,158,255,0.3); }
  .btn-primary:hover { transform:translateY(-2px); box-shadow:0 0 50px rgba(59,158,255,0.5); }
  .btn-secondary { background:rgba(255,255,255,0.05); color:var(--text); border:1px solid var(--border); font-family:var(--font-body); font-weight:600; font-size:16px; padding:14px 32px; border-radius:12px; cursor:pointer; transition:all .3s; }
  .btn-secondary:hover { background:rgba(255,255,255,0.1); border-color:var(--accent); }
  .hero-badges { display:flex; gap:20px; justify-content:center; margin-top:50px; flex-wrap:wrap; }
  .hero-badge { display:flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--border); border-radius:12px; padding:10px 18px; font-size:13px; color:var(--muted); }
  .hero-badge-dot { width:8px; height:8px; border-radius:50%; background:var(--green); box-shadow:0 0 10px var(--green); animation:pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }
  .section { padding:100px 24px; max-width:1200px; margin:0 auto; }
  .section-full { padding:100px 24px; background:var(--bg2); }
  .section-inner { max-width:1200px; margin:0 auto; }
  .section-tag { display:inline-block; background:rgba(59,158,255,0.1); color:var(--accent); font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border-radius:20px; margin-bottom:16px; }
  .section-title { font-family:var(--font-display); font-size:clamp(32px,4vw,52px); font-weight:700; margin-bottom:16px; }
  .section-sub { font-size:18px; color:var(--muted); max-width:560px; }
  .features-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; margin-top:60px; }
  .feature-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:32px; transition:all .3s; position:relative; overflow:hidden; }
  .feature-card::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(59,158,255,0.05),transparent); opacity:0; transition:opacity .3s; }
  .feature-card:hover { border-color:rgba(59,158,255,0.4); transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,0.4); }
  .feature-card:hover::before { opacity:1; }
  .feature-icon { font-size:36px; margin-bottom:16px; }
  .feature-title { font-family:var(--font-display); font-size:20px; font-weight:600; margin-bottom:10px; }
  .feature-desc { color:var(--muted); line-height:1.6; font-size:15px; }
  .screenshots { display:flex; justify-content:center; gap:20px; margin-top:60px; flex-wrap:wrap; }
  .phone-mock { width:200px; background:var(--card); border:1px solid var(--border); border-radius:32px; padding:16px; display:flex; flex-direction:column; gap:10px; box-shadow:0 40px 80px rgba(0,0,0,0.5); }
  .phone-status { display:flex; justify-content:space-between; font-size:10px; color:var(--muted); padding:0 4px; }
  .phone-chat { display:flex; flex-direction:column; gap:8px; }
  .chat-msg { padding:8px 12px; border-radius:12px; font-size:11px; max-width:80%; }
  .chat-msg.in { background:var(--card2); color:var(--text); align-self:flex-start; }
  .chat-msg.out { background:var(--accent); color:#fff; align-self:flex-end; }
  .phone-mock.center { transform:scale(1.08); z-index:2; }
  .download-section { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
  .download-btns { display:flex; flex-direction:column; gap:14px; margin-top:32px; }
  .btn-store { display:flex; align-items:center; gap:14px; background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px 24px; cursor:pointer; transition:all .3s; text-align:left; color:var(--text); font-family:var(--font-body); }
  .btn-store:hover { border-color:var(--accent); background:var(--card2); transform:translateX(4px); }
  .btn-store-icon { font-size:28px; }
  .btn-store-text { display:flex; flex-direction:column; }
  .btn-store-sub { font-size:11px; color:var(--muted); }
  .btn-store-main { font-size:16px; font-weight:700; }
  .qr-box { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:32px; display:flex; flex-direction:column; align-items:center; gap:16px; }
  .waitlist-form { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:48px; max-width:560px; margin:60px auto 0; }
  .form-group { margin-bottom:20px; }
  .form-label { display:block; font-size:13px; font-weight:600; color:var(--muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px; }
  .form-input,.form-select,.form-textarea { width:100%; background:var(--bg3); border:1px solid var(--border); color:var(--text); font-family:var(--font-body); font-size:15px; padding:12px 16px; border-radius:10px; transition:border-color .2s; outline:none; }
  .form-input:focus,.form-select:focus,.form-textarea:focus { border-color:var(--accent); }
  .form-textarea { resize:vertical; min-height:120px; }
  .form-select option { background:var(--bg3); }
  .form-success { background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); color:var(--green); border-radius:10px; padding:14px; text-align:center; margin-top:16px; font-weight:600; }
  .pricing-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:24px; margin-top:60px; }
  .price-card { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:36px; position:relative; transition:all .3s; }
  .price-card.highlight { border-color:var(--accent); background:linear-gradient(135deg,rgba(59,158,255,0.08),var(--card)); box-shadow:0 0 40px rgba(59,158,255,0.15); }
  .price-card.highlight::before { content:'Most Popular'; position:absolute; top:-14px; left:50%; transform:translateX(-50%); background:var(--accent); color:#fff; font-size:11px; font-weight:700; padding:5px 14px; border-radius:20px; white-space:nowrap; }
  .price-name { font-family:var(--font-display); font-size:22px; font-weight:600; margin-bottom:8px; }
  .price-amount { font-family:var(--font-display); font-size:48px; font-weight:700; color:var(--accent); }
  .price-period { font-size:14px; color:var(--muted); }
  .price-features { list-style:none; margin:24px 0 32px; display:flex; flex-direction:column; gap:10px; }
  .price-feature { display:flex; align-items:center; gap:10px; font-size:14px; color:var(--muted); }
  .price-feature::before { content:'✓'; color:var(--green); font-weight:700; flex-shrink:0; }
  .faq-list { max-width:720px; margin:60px auto 0; display:flex; flex-direction:column; gap:12px; }
  .faq-item { background:var(--card); border:1px solid var(--border); border-radius:14px; overflow:hidden; }
  .faq-q { width:100%; background:none; border:none; color:var(--text); font-family:var(--font-body); font-size:15px; font-weight:600; padding:20px 24px; text-align:left; cursor:pointer; display:flex; justify-content:space-between; align-items:center; transition:background .2s; }
  .faq-q:hover { background:rgba(59,158,255,0.05); }
  .faq-a { padding:0 24px 20px; color:var(--muted); line-height:1.7; font-size:14px; }
  .blog-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:24px; margin-top:60px; }
  .blog-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); overflow:hidden; transition:all .3s; cursor:pointer; }
  .blog-card:hover { border-color:var(--accent); transform:translateY(-4px); }
  .blog-img { height:180px; background:linear-gradient(135deg,var(--bg3),var(--card2)); display:flex; align-items:center; justify-content:center; font-size:48px; }
  .blog-body { padding:24px; }
  .blog-tag { display:inline-block; background:rgba(59,158,255,0.1); color:var(--accent); font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:3px 10px; border-radius:6px; margin-bottom:10px; }
  .blog-date { font-size:12px; color:var(--muted); margin-bottom:8px; }
  .blog-title { font-family:var(--font-display); font-size:18px; font-weight:600; margin-bottom:10px; line-height:1.4; }
  .blog-excerpt { font-size:13px; color:var(--muted); line-height:1.6; }
  .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
  .about-visual { background:var(--card); border:1px solid var(--border); border-radius:24px; padding:48px; display:flex; flex-direction:column; gap:20px; }
  .stat-row { display:flex; gap:20px; }
  .stat-box { flex:1; background:var(--bg3); border:1px solid var(--border); border-radius:14px; padding:24px; text-align:center; }
  .stat-num { font-family:var(--font-display); font-size:36px; font-weight:700; color:var(--accent); }
  .stat-label { font-size:13px; color:var(--muted); margin-top:4px; }
  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:60px; margin-top:60px; }
  .contact-info { display:flex; flex-direction:column; gap:24px; }
  .contact-item { display:flex; align-items:flex-start; gap:16px; }
  .contact-icon { width:44px; height:44px; background:rgba(59,158,255,0.1); border:1px solid rgba(59,158,255,0.2); border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .legal-content { max-width:800px; margin:60px auto 0; }
  .legal-section { margin-bottom:40px; }
  .legal-h2 { font-family:var(--font-display); font-size:22px; font-weight:600; margin-bottom:14px; color:var(--text); }
  .legal-p { color:var(--muted); line-height:1.8; margin-bottom:12px; font-size:15px; }
  .admin-layout { display:grid; grid-template-columns:220px 1fr; min-height:calc(100vh - 64px); }
  .admin-sidebar { background:var(--bg2); border-right:1px solid var(--border); padding:24px 0; }
  .admin-logo { font-family:var(--font-display); font-size:16px; font-weight:700; color:var(--accent); padding:0 20px 24px; border-bottom:1px solid var(--border); margin-bottom:16px; }
  .admin-nav-item { width:100%; background:none; border:none; color:var(--muted); font-family:var(--font-body); font-size:14px; padding:10px 20px; text-align:left; cursor:pointer; display:flex; align-items:center; gap:10px; transition:all .2s; }
  .admin-nav-item:hover,.admin-nav-item.active { color:var(--text); background:rgba(59,158,255,0.1); border-left:3px solid var(--accent); }
  .admin-main { padding:32px; overflow:auto; }
  .admin-title { font-family:var(--font-display); font-size:28px; font-weight:700; margin-bottom:24px; }
  .admin-cards { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; margin-bottom:32px; }
  .admin-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:20px; }
  .admin-card-num { font-family:var(--font-display); font-size:32px; font-weight:700; color:var(--accent); }
  .admin-card-label { font-size:13px; color:var(--muted); margin-top:4px; }
  .admin-table { width:100%; border-collapse:collapse; }
  .admin-table th { text-align:left; padding:12px 16px; font-size:12px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid var(--border); }
  .admin-table td { padding:12px 16px; font-size:14px; border-bottom:1px solid rgba(99,179,237,0.06); vertical-align:middle; }
  .admin-table tr:hover td { background:rgba(59,158,255,0.03); }
  .badge { display:inline-block; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700; text-transform:uppercase; }
  .badge-new { background:rgba(59,158,255,0.15); color:var(--accent); }
  .badge-pending { background:rgba(251,191,36,0.15); color:#fbbf24; }
  .badge-approved { background:rgba(16,185,129,0.15); color:var(--green); }
  .badge-rejected { background:rgba(239,68,68,0.15); color:#ef4444; }
  .admin-btn { background:var(--accent); color:#fff; border:none; font-family:var(--font-body); font-size:12px; font-weight:600; padding:6px 12px; border-radius:7px; cursor:pointer; }
  .footer { background:var(--bg2); border-top:1px solid var(--border); padding:80px 24px 40px; }
  .footer-inner { max-width:1200px; margin:0 auto; }
  .footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; margin-bottom:60px; }
  .footer-logo { font-family:var(--font-display); font-size:26px; font-weight:700; background:linear-gradient(135deg,var(--accent),var(--accent2)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin-bottom:14px; }
  .footer-tagline { color:var(--muted); font-size:14px; line-height:1.6; max-width:260px; }
  .footer-col-title { font-size:13px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:var(--muted); margin-bottom:16px; }
  .footer-link { display:block; color:var(--muted); font-size:14px; margin-bottom:10px; cursor:pointer; transition:color .2s; background:none; border:none; font-family:var(--font-body); text-align:left; }
  .footer-link:hover { color:var(--accent); }
  .footer-bottom { border-top:1px solid var(--border); padding-top:32px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
  .footer-rights { font-size:13px; color:var(--muted); }
  .social-btn { width:36px; height:36px; background:var(--card); border:1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:16px; transition:all .2s; }
  .social-btn:hover { border-color:var(--accent); background:rgba(59,158,255,0.1); }
  .mobile-drawer { position:fixed; top:64px; left:0; right:0; bottom:0; background:rgba(5,10,20,0.97); z-index:99; padding:24px; display:none; flex-direction:column; gap:4px; overflow-y:auto; }
  .mobile-drawer.open { display:flex; }
  .mobile-nav-link { background:none; border:none; color:var(--muted); font-family:var(--font-body); font-size:16px; padding:14px 16px; border-radius:10px; cursor:pointer; text-align:left; transition:all .2s; display:flex; align-items:center; gap:10px; }
  .mobile-nav-link:hover,.mobile-nav-link.active { color:var(--text); background:rgba(59,158,255,0.1); }
  .newsletter { background:linear-gradient(135deg,rgba(59,158,255,0.1),rgba(124,58,237,0.1)); border:1px solid rgba(59,158,255,0.2); border-radius:24px; padding:60px; text-align:center; margin-top:80px; }
  .newsletter-form { display:flex; gap:12px; justify-content:center; margin-top:28px; flex-wrap:wrap; }
  .newsletter-input { background:var(--bg3); border:1px solid var(--border); color:var(--text); font-family:var(--font-body); font-size:15px; padding:13px 20px; border-radius:10px; width:300px; outline:none; }
  .newsletter-input:focus { border-color:var(--accent); }
  .privacy-hero { text-align:center; padding:80px 24px 40px; background:radial-gradient(ellipse 60% 40% at 50% 0%,rgba(124,58,237,0.15),transparent); }
  .bento { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:auto; gap:16px; margin-top:60px; }
  .bento-card { background:var(--card); border:1px solid var(--border); border-radius:20px; padding:32px; transition:all .3s; }
  .bento-card:hover { border-color:var(--accent); transform:translateY(-3px); }
  .bento-card.span2 { grid-column:span 2; }
  .bento-icon { font-size:40px; margin-bottom:16px; }
  .bento-title { font-family:var(--font-display); font-size:20px; font-weight:600; margin-bottom:10px; }
  .bento-text { color:var(--muted); font-size:14px; line-height:1.6; }
  @media(max-width:960px){
    .nav-links { display:none; }
    .hamburger { display:flex; }
    .about-grid,.download-section,.contact-grid { grid-template-columns:1fr; }
    .footer-top { grid-template-columns:1fr 1fr; }
    .bento { grid-template-columns:1fr 1fr; }
    .bento-card.span2 { grid-column:span 1; }
    .admin-layout { grid-template-columns:1fr; }
    .admin-sidebar { display:none; }
  }
  @media(max-width:600px){
    .footer-top { grid-template-columns:1fr; }
    .bento { grid-template-columns:1fr; }
    .hero-title { font-size:42px; }
    .pricing-grid,.blog-grid,.features-grid { grid-template-columns:1fr; }
    .waitlist-form { padding:24px; }
  }
`;

const QRCode = () => {
  const pattern = [
    1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,
    1,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0,0,0,0,1,
    1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,
    1,0,1,1,1,0,1,0,0,1,0,1,0,0,1,0,1,1,1,0,1,
    1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,
    1,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1,
    1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,
  ];
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(21,1fr)",gap:"1px",padding:"10px",background:"#fff",borderRadius:"8px",width:"130px",height:"130px"}}>
      {pattern.map((c,i)=><div key={i} style={{background:c?"#050a14":"#fff",borderRadius:"1px"}}/>)}
    </div>
  );
};

const mockWaitlist = [
  {id:1,name:"Sarah Johnson",email:"sarah@example.com",date:"May 8, 2025",status:"new"},
  {id:2,name:"Ahmed Hassan",email:"ahmed@example.com",date:"May 7, 2025",status:"new"},
  {id:3,name:"Maria Silva",email:"maria@example.com",date:"May 6, 2025",status:"new"},
  {id:4,name:"David Park",email:"david@example.com",date:"May 5, 2025",status:"new"},
  {id:5,name:"Fatima Al-Rahman",email:"fatima@example.com",date:"May 4, 2025",status:"new"},
];
const mockMessages = [
  {id:1,name:"Tom Chen",email:"tom@example.com",subject:"Partnership inquiry",date:"May 8, 2025",status:"pending"},
  {id:2,name:"Lisa Moore",email:"lisa@example.com",subject:"Press request",date:"May 7, 2025",status:"pending"},
  {id:3,name:"Raj Patel",email:"raj@example.com",subject:"Bug report",date:"May 6, 2025",status:"approved"},
];
const mockBusiness = [
  {id:1,company:"TechCorp Inc.",name:"John Smith",email:"john@techcorp.com",size:"50-200",date:"May 8, 2025",status:"pending"},
  {id:2,company:"Media Group",name:"Amy Lee",email:"amy@media.com",size:"10-50",date:"May 7, 2025",status:"approved"},
];
const mockCreators = [
  {id:1,name:"Alex Rivers",handle:"@alexrivers",category:"Tech",followers:"45K",date:"May 8, 2025",status:"pending"},
  {id:2,name:"Priya Sharma",handle:"@priyatalks",category:"Education",followers:"120K",date:"May 6, 2025",status:"approved"},
  {id:3,name:"Carlos Reyes",handle:"@carlosreyes",category:"Music",followers:"8K",date:"May 5, 2025",status:"rejected"},
];

export default function App() {
  const [page, setPage] = useState("home");
  const [locale, setLocale] = useState("en");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminTab, setAdminTab] = useState("waitlist");
  const [openFaq, setOpenFaq] = useState(null);
  const [forms, setForms] = useState({waitlist:{},contact:{},business:{},creator:{},newsletter:{}});
  const [submitted, setSubmitted] = useState({});

  const t = (key) => lang(locale, key);
  const navigate = (p) => { setPage(p); setMobileOpen(false); window.scrollTo(0,0); };
  const handleForm = (formKey, field, value) => setForms(f=>({...f,[formKey]:{...f[formKey],[field]:value}}));
  const submitForm = (formKey) => {
    setSubmitted(s=>({...s,[formKey]:true}));
    setTimeout(()=>setSubmitted(s=>({...s,[formKey]:false})),5000);
  };

  const navItems = [
    {key:"home",label:"home"},{key:"about",label:"about"},{key:"features",label:"features"},
    {key:"privacy",label:"privacy"},{key:"download",label:"download"},{key:"business",label:"business"},
    {key:"community",label:"community"},{key:"pricing",label:"pricing"},{key:"faq",label:"faq"},
    {key:"contact",label:"contact"},{key:"blog",label:"blog"}
  ];

  const renderForm = (formKey, fields, btnKey, successKey, privacyNote) => (
    <div className="waitlist-form">
      {fields.map(f=>(
        <div className="form-group" key={f.key}>
          <label className="form-label">{t(f.label)}</label>
          {f.type==="textarea" ? (
            <textarea className="form-textarea" value={forms[formKey][f.key]||""} onChange={e=>handleForm(formKey,f.key,e.target.value)} placeholder={t(f.label)}/>
          ) : f.type==="select" ? (
            <select className="form-select" value={forms[formKey][f.key]||""} onChange={e=>handleForm(formKey,f.key,e.target.value)}>
              <option value="">Select...</option>
              {f.options.map(o=><option key={o}>{o}</option>)}
            </select>
          ) : (
            <input className="form-input" type={f.type||"text"} value={forms[formKey][f.key]||""} onChange={e=>handleForm(formKey,f.key,e.target.value)} placeholder={t(f.label)}/>
          )}
        </div>
      ))}
      <button className="btn-primary" style={{width:"100%"}} onClick={()=>submitForm(formKey)}>{t(btnKey)}</button>
      {submitted[formKey] && <div className="form-success">{t(successKey)}</div>}
      {privacyNote && <p style={{textAlign:"center",fontSize:"12px",color:"var(--muted)",marginTop:"12px"}}>🔒 {t(privacyNote)}</p>}
    </div>
  );

  const pages = {
    home: () => (
      <div>
        <section className="hero">
          <div className="hero-bg"/><div className="hero-grid"/>
          <div className="hero-content">
            <div className="hero-tag">✦ {t("hero.tag")}</div>
            <h1 className="hero-title">{t("hero.title1")}<br/><span>{t("hero.title2")}</span></h1>
            <p className="hero-sub">{t("hero.sub")}</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={()=>navigate("download")}>{t("hero.cta1")}</button>
              <button className="btn-secondary">{t("hero.cta2")} ▶</button>
            </div>
            <div className="hero-badges">
              {["Modern UI","Fast Messaging","E2E Encrypted","AI Powered","Phone # Hidden"].map(b=>(
                <div className="hero-badge" key={b}><div className="hero-badge-dot"/>{b}</div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-full"><div className="section-inner">
          <div style={{textAlign:"center"}}><span className="section-tag">App Preview</span><h2 className="section-title">A beautiful experience</h2></div>
          <div className="screenshots">
            {[
              {msgs:[{t:"Hey! Can we talk?",dir:"in"},{t:"Sure! Calling now 📞",dir:"out"},{t:"Your # is hidden 🔒",dir:"in"}],label:"Private Chat"},
              {msgs:[{t:"Team update ready",dir:"in"},{t:"Seen by 1.2K ✓",dir:"out"},{t:"🔥 Going viral!",dir:"in"},{t:"AI summary: 3 key points",dir:"out"}],label:"Channels",center:true},
              {msgs:[{t:"New order from @john",dir:"in"},{t:"Confirmed ✅",dir:"out"},{t:"AI: 98% satisfaction",dir:"in"}],label:"Business"},
            ].map((ph,i)=>(
              <div className={`phone-mock ${ph.center?"center":""}`} key={i}>
                <div className="phone-status"><span>9:41</span><span>●●●</span></div>
                <div style={{textAlign:"center",fontSize:"11px",color:"var(--accent)",fontWeight:"700",marginBottom:"8px"}}>{ph.label}</div>
                <div className="phone-chat">{ph.msgs.map((m,j)=><div key={j} className={`chat-msg ${m.dir}`}>{m.t}</div>)}</div>
              </div>
            ))}
          </div>
        </div></div>

        <section className="section">
          <span className="section-tag">Features</span>
          <h2 className="section-title">{t("features.title")}</h2>
          <p className="section-sub">{t("features.sub")}</p>
          <div className="features-grid">
            {(t("features.items")||[]).map((f,i)=>(
              <div className="feature-card" key={i}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.t}</div>
                <div className="feature-desc">{f.d}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-full"><div className="section-inner">
          <div className="bento">
            <div className="bento-card span2"><div className="bento-icon">🔒</div><div className="bento-title">Your phone number is always hidden</div><div className="bento-text">CallsChat assigns you a unique @handle. All calls and messages route through our encrypted network — your real number stays private, always.</div></div>
            <div className="bento-card"><div className="bento-icon">🤖</div><div className="bento-title">AI That Works For You</div><div className="bento-text">Smart replies, real-time translation in 50+ languages, message summaries, and spam detection.</div></div>
            <div className="bento-card"><div className="bento-icon">📡</div><div className="bento-title">Channels & Communities</div><div className="bento-text">Build your community. Broadcast to millions or chat in intimate groups.</div></div>
            <div className="bento-card"><div className="bento-icon">💼</div><div className="bento-title">Business Ready</div><div className="bento-text">Team workspaces, CRM integration, shared inboxes, and analytics.</div></div>
          </div>
        </div></div>

        <section className="section" style={{textAlign:"center"}}>
          <span className="section-tag">Early Access</span>
          <h2 className="section-title">{t("waitlist.title")}</h2>
          <p className="section-sub" style={{margin:"0 auto"}}>{t("waitlist.sub")}</p>
          {renderForm("waitlist",[
            {key:"name",label:"waitlist.name"},{key:"email",label:"waitlist.email",type:"email"},{key:"phone",label:"waitlist.phone",type:"tel"}
          ],"waitlist.btn","waitlist.success","waitlist.privacy")}
        </section>

        <section className="section" style={{paddingTop:"0"}}>
          <div className="newsletter">
            <span className="section-tag">Newsletter</span>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"32px",fontWeight:"700",margin:"12px 0 8px"}}>Stay in the loop</h2>
            <p style={{color:"var(--muted)"}}>Get launch updates, feature previews, and early access offers.</p>
            <div className="newsletter-form">
              <input className="newsletter-input" type="email" placeholder="Enter your email" value={forms.newsletter.email||""} onChange={e=>handleForm("newsletter","email",e.target.value)}/>
              <button className="btn-primary" onClick={()=>submitForm("newsletter")}>Subscribe</button>
            </div>
            {submitted.newsletter && <div className="form-success" style={{marginTop:"16px",maxWidth:"400px",margin:"16px auto 0"}}>🎉 Subscribed!</div>}
          </div>
        </section>
      </div>
    ),

    about: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">About</span><h1 className="section-title">{t("about.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"560px",margin:"0 auto"}}>{t("about.sub")}</p></div>
        <section className="section">
          <div className="about-grid">
            <div>
              <h2 style={{fontFamily:"var(--font-display)",fontSize:"36px",fontWeight:"700",marginBottom:"20px"}}>{t("about.mission")}</h2>
              <p style={{color:"var(--muted)",lineHeight:"1.8",fontSize:"16px",marginBottom:"20px"}}>{t("about.missionText")}</p>
              <p style={{color:"var(--muted)",lineHeight:"1.8",fontSize:"16px"}}>{t("about.team")}</p>
              <div style={{marginTop:"32px",display:"flex",gap:"12px",flexWrap:"wrap"}}>
                <button className="btn-primary" onClick={()=>navigate("download")}>Join Waitlist</button>
                <button className="btn-secondary" onClick={()=>navigate("contact")}>Contact Us</button>
              </div>
            </div>
            <div className="about-visual">
              <div className="stat-row">
                <div className="stat-box"><div className="stat-num">2+</div><div className="stat-label">Years Building</div></div>
                <div className="stat-box"><div className="stat-num">50K+</div><div className="stat-label">Waitlist Members</div></div>
              </div>
              <div className="stat-row">
                <div className="stat-box"><div className="stat-num">3</div><div className="stat-label">Languages at Launch</div></div>
                <div className="stat-box"><div className="stat-num">E2E</div><div className="stat-label">Encrypted</div></div>
              </div>
              <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:"14px",padding:"20px"}}>
                <div style={{fontSize:"13px",fontWeight:"700",color:"var(--muted)",marginBottom:"12px",textTransform:"uppercase",letterSpacing:"1px"}}>Our Values</div>
                {["Privacy First","Radical Transparency","Speed Matters","Beauty in Everything"].map(v=>(
                  <div key={v} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px",color:"var(--text)",fontSize:"15px"}}><span style={{color:"var(--green)"}}>✓</span>{v}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    ),

    features: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Features</span><h1 className="section-title">{t("features.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"560px",margin:"0 auto"}}>{t("features.sub")}</p></div>
        <section className="section">
          <div className="features-grid">
            {[
              {icon:"🔒",t:"Phone Number Hidden",d:"Your real number stays private. CallsChat assigns you a unique @handle for all communication."},
              {icon:"🤖",t:"AI-Powered Chat",d:"Smart replies, auto-translate in 50+ languages, message summaries, and AI spam detection."},
              {icon:"📞",t:"HD Voice & Video Calls",d:"Crystal-clear encrypted calls with noise cancellation and ultra-low latency."},
              {icon:"🌍",t:"Communities & Channels",d:"Create public or private communities. Broadcast to unlimited subscribers."},
              {icon:"💼",t:"Business Workspace",d:"Team messaging, shared inboxes, CRM integration, and analytics for brands."},
              {icon:"⚡",t:"Blazing Fast Delivery",d:"Sub-100ms message delivery with offline queuing and read receipts."},
              {icon:"🎙️",t:"Live Audio Rooms",d:"Host live audio sessions with up to 10,000 listeners."},
              {icon:"🤝",t:"File & Media Sharing",d:"Share files up to 2GB with built-in media player and document viewer."},
              {icon:"🔔",t:"Smart Notifications",d:"AI-powered notification priority so you never miss what matters."},
              {icon:"🌐",t:"Multi-device Sync",d:"Seamlessly switch between phone, tablet, and desktop with instant sync."},
              {icon:"📊",t:"Analytics for Creators",d:"Track engagement, growth, and top content with creator dashboards."},
              {icon:"🎨",t:"Custom Themes",d:"Personalize your app with custom themes, colors, and chat backgrounds."},
            ].map((f,i)=>(
              <div className="feature-card" key={i}><div className="feature-icon">{f.icon}</div><div className="feature-title">{f.t}</div><div className="feature-desc">{f.d}</div></div>
            ))}
          </div>
        </section>
      </div>
    ),

    privacy: () => (
      <div className="page">
        <div className="privacy-hero" style={{background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(124,58,237,0.2),transparent)"}}>
          <span className="section-tag" style={{background:"rgba(124,58,237,0.15)",color:"#a78bfa",borderColor:"rgba(124,58,237,0.3)"}}>Privacy & Security</span>
          <h1 className="section-title">Your privacy is <span style={{color:"#a78bfa"}}>non-negotiable</span></h1>
          <p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"560px",margin:"0 auto"}}>We built privacy into every layer of CallsChat — not as a feature, but as the foundation.</p>
        </div>
        <section className="section">
          <div className="bento">
            {[
              {icon:"🔐",t:"End-to-End Encryption",d:"All messages and calls are encrypted with state-of-the-art E2E encryption. Not even CallsChat can read your messages."},
              {icon:"📵",t:"Phone Number Protection",d:"Your number is never shared with other users, businesses, or third parties. Ever."},
              {icon:"🕵️",t:"No Tracking",d:"We don't sell your data or use it for advertising. Your conversations belong to you."},
              {icon:"🗑️",t:"Auto-Delete Messages",d:"Set messages to self-destruct after 1 minute to 1 week. Complete control over your history."},
              {icon:"🛡️",t:"Two-Factor Authentication",d:"Multiple layers of account security including biometric login and hardware keys."},
              {icon:"🌐",t:"Open Security Audits",d:"Our encryption protocols are independently audited by third-party security researchers."},
            ].map((c,i)=>(
              <div className="bento-card" key={i}><div className="bento-icon">{c.icon}</div><div className="bento-title">{c.t}</div><div className="bento-text">{c.d}</div></div>
            ))}
          </div>
          <div style={{background:"rgba(124,58,237,0.08)",border:"1px solid rgba(124,58,237,0.2)",borderRadius:"20px",padding:"48px",marginTop:"48px",textAlign:"center"}}>
            <div style={{fontSize:"48px",marginBottom:"16px"}}>🔒</div>
            <h3 style={{fontFamily:"var(--font-display)",fontSize:"28px",fontWeight:"700",marginBottom:"12px"}}>Our Privacy Promise</h3>
            <p style={{color:"var(--muted)",maxWidth:"600px",margin:"0 auto",lineHeight:"1.8"}}>We will never sell, rent, or share your personal data. We will never read your private messages. We will never use your conversations for training AI models.</p>
          </div>
        </section>
      </div>
    ),

    download: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Download</span><h1 className="section-title">{t("download.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"400px",margin:"0 auto"}}>{t("download.sub")}</p></div>
        <section className="section">
          <div className="download-section">
            <div>
              <h2 style={{fontFamily:"var(--font-display)",fontSize:"36px",fontWeight:"700",marginBottom:"12px"}}>{t("download.soon")}</h2>
              <p style={{color:"var(--muted)",lineHeight:"1.7",marginBottom:"32px"}}>CallsChat is launching on Android and iOS in 2025. Join the waitlist to get early access.</p>
              <div className="download-btns">
                <button className="btn-store"><span className="btn-store-icon">🤖</span><span className="btn-store-text"><span className="btn-store-sub">Get it on</span><span className="btn-store-main">{t("download.android")}</span></span></button>
                <button className="btn-store"><span className="btn-store-icon">🍎</span><span className="btn-store-text"><span className="btn-store-sub">Download on the</span><span className="btn-store-main">{t("download.ios")}</span></span></button>
              </div>
            </div>
            <div className="qr-box">
              <div style={{fontFamily:"var(--font-display)",fontSize:"18px",fontWeight:"600"}}>Scan to Download</div>
              <p style={{color:"var(--muted)",fontSize:"13px",textAlign:"center"}}>{t("download.qr")}</p>
              <QRCode/>
            </div>
          </div>
          <div style={{marginTop:"80px",textAlign:"center"}}>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"36px",fontWeight:"700",marginBottom:"12px"}}>Get Early Access</h2>
            <p style={{color:"var(--muted)",marginBottom:"0"}}>Join 50,000+ people already on the waitlist</p>
            {renderForm("waitlist",[
              {key:"name",label:"waitlist.name"},{key:"email",label:"waitlist.email",type:"email"},{key:"phone",label:"waitlist.phone",type:"tel"}
            ],"waitlist.btn","waitlist.success","waitlist.privacy")}
          </div>
        </section>
      </div>
    ),

    business: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Business</span><h1 className="section-title">{t("business.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"560px",margin:"0 auto"}}>{t("business.sub")}</p></div>
        <section className="section">
          <div className="features-grid" style={{marginTop:"40px"}}>
            {(t("business.features")||[]).map((f,i)=>(
              <div className="feature-card" key={i}><div className="feature-icon">{"💼📊🏷️📈🔌🎯"[i]||"✦"}</div><div className="feature-title">{f}</div></div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"60px"}}>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"36px",fontWeight:"700",marginBottom:"12px"}}>{t("business.cta")}</h2>
            {renderForm("business",[
              {key:"company",label:"business.form.company"},{key:"name",label:"business.form.name"},
              {key:"email",label:"business.form.email",type:"email"},
              {key:"size",label:"business.form.size",type:"select",options:["1-10","10-50","50-200","200-1000","1000+"]}
            ],"business.form.btn","business.form.success")}
          </div>
        </section>
      </div>
    ),

    community: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Creators</span><h1 className="section-title">{t("community.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"560px",margin:"0 auto"}}>{t("community.sub")}</p></div>
        <section className="section">
          <div className="features-grid" style={{marginTop:"40px"}}>
            {(t("community.features")||[]).map((f,i)=>(
              <div className="feature-card" key={i}><div className="feature-icon">{"📢💰🎙️🤖📊✅"[i]||"✦"}</div><div className="feature-title">{f}</div></div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"60px"}}>
            <h2 style={{fontFamily:"var(--font-display)",fontSize:"36px",fontWeight:"700",marginBottom:"12px"}}>{t("community.cta")}</h2>
            {renderForm("creator",[
              {key:"name",label:"community.form.name"},{key:"handle",label:"community.form.handle"},
              {key:"category",label:"community.form.category",type:"select",options:["Tech","Lifestyle","Education","Music","Gaming","Business","Sports","Other"]},
              {key:"followers",label:"community.form.followers"}
            ],"community.form.btn","community.form.success")}
          </div>
        </section>
      </div>
    ),

    pricing: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Pricing</span><h1 className="section-title">{t("pricing.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"400px",margin:"0 auto"}}>{t("pricing.sub")}</p></div>
        <section className="section">
          <div className="pricing-grid">
            {(t("pricing.plans")||[]).map((plan,i)=>(
              <div className={`price-card ${plan.highlight?"highlight":""}`} key={i}>
                <div className="price-name">{plan.name}</div>
                <div style={{margin:"12px 0"}}><span className="price-amount">{plan.price}</span><span className="price-period">{plan.period}</span></div>
                <ul className="price-features">{plan.features.map((f,j)=><li key={j} className="price-feature">{f}</li>)}</ul>
                <button className={plan.highlight?"btn-primary":"btn-secondary"} style={{width:"100%"}} onClick={()=>navigate(plan.name==="Business"?"business":"download")}>{plan.cta}</button>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"40px",color:"var(--muted)",fontSize:"14px"}}>All plans include a 14-day free trial. No credit card required.</div>
        </section>
      </div>
    ),

    faq: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">FAQ</span><h1 className="section-title">{t("faq.title")}</h1></div>
        <section className="section">
          <div className="faq-list">
            {(t("faq.items")||[]).map((item,i)=>(
              <div className="faq-item" key={i}>
                <button className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>{item.q}<span>{openFaq===i?"▲":"▼"}</span></button>
                {openFaq===i && <div className="faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
          <div style={{textAlign:"center",marginTop:"60px"}}>
            <p style={{color:"var(--muted)",marginBottom:"16px"}}>Still have questions?</p>
            <button className="btn-primary" onClick={()=>navigate("contact")}>Contact Support</button>
          </div>
        </section>
      </div>
    ),

    contact: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Contact</span><h1 className="section-title">{t("contact.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"400px",margin:"0 auto"}}>{t("contact.sub")}</p></div>
        <section className="section">
          <div className="contact-grid">
            <div className="contact-info">
              {[
                {icon:"📧",label:"Email",val:"support@callschat.com"},
                {icon:"🐦",label:"Twitter / X",val:"@CallsChat"},
                {icon:"💬",label:"Discord",val:"discord.gg/callschat"},
                {icon:"📍",label:"Location",val:"Global — fully remote team"},
              ].map((c,i)=>(
                <div className="contact-item" key={i}>
                  <div className="contact-icon">{c.icon}</div>
                  <div><div style={{fontSize:"12px",color:"var(--muted)",marginBottom:"2px",textTransform:"uppercase",letterSpacing:"1px"}}>{c.label}</div><div style={{fontSize:"15px",fontWeight:"600"}}>{c.val}</div></div>
                </div>
              ))}
              <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"14px",padding:"24px"}}>
                <div style={{fontSize:"13px",color:"var(--muted)",marginBottom:"12px",textTransform:"uppercase",letterSpacing:"1px",fontWeight:"700"}}>Response Time</div>
                <div style={{color:"var(--green)",fontWeight:"700",fontSize:"20px"}}>Within 24 hours</div>
                <div style={{color:"var(--muted)",fontSize:"13px",marginTop:"4px"}}>Monday – Friday, 9am – 6pm UTC</div>
              </div>
            </div>
            <div>
              <div className="waitlist-form" style={{margin:"0"}}>
                {[
                  {key:"name",label:"contact.name"},{key:"email",label:"contact.email",type:"email"},
                  {key:"subject",label:"contact.subject"},{key:"message",label:"contact.message",type:"textarea"}
                ].map(f=>(
                  <div className="form-group" key={f.key}>
                    <label className="form-label">{t(f.label)}</label>
                    {f.type==="textarea"?(
                      <textarea className="form-textarea" value={forms.contact[f.key]||""} onChange={e=>handleForm("contact",f.key,e.target.value)} placeholder={t(f.label)}/>
                    ):(
                      <input className="form-input" type={f.type||"text"} value={forms.contact[f.key]||""} onChange={e=>handleForm("contact",f.key,e.target.value)} placeholder={t(f.label)}/>
                    )}
                  </div>
                ))}
                <button className="btn-primary" style={{width:"100%"}} onClick={()=>submitForm("contact")}>{t("contact.btn")}</button>
                {submitted.contact && <div className="form-success">{t("contact.success")}</div>}
              </div>
            </div>
          </div>
        </section>
      </div>
    ),

    blog: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Blog</span><h1 className="section-title">{t("blog.title")}</h1><p style={{color:"var(--muted)",fontSize:"18px",maxWidth:"400px",margin:"0 auto"}}>{t("blog.sub")}</p></div>
        <section className="section">
          <div className="blog-grid">
            {(t("blog.posts")||[]).map((post,i)=>(
              <div className="blog-card" key={i}>
                <div className="blog-img">{"📣🔒🤖"[i]}</div>
                <div className="blog-body">
                  <span className="blog-tag">{post.tag}</span>
                  <div className="blog-date">{post.date}</div>
                  <div className="blog-title">{post.title}</div>
                  <div className="blog-excerpt">{post.excerpt}</div>
                  <button className="btn-secondary" style={{marginTop:"16px",padding:"8px 16px",fontSize:"13px"}}>Read More →</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),

    terms: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Legal</span><h1 className="section-title">{t("terms.title")}</h1><p style={{color:"var(--muted)"}}>{t("terms.updated")}</p></div>
        <section className="section"><div className="legal-content">
          {[
            {h:"1. Acceptance of Terms",p:"By accessing or using CallsChat, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our service."},
            {h:"2. Use of the Service",p:"CallsChat is provided for personal and business communication purposes. You agree to use the service lawfully and in compliance with all applicable regulations in your jurisdiction."},
            {h:"3. User Accounts",p:"You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account."},
            {h:"4. Prohibited Content",p:"You may not use CallsChat to transmit illegal content, spam, malware, or content that violates the rights of others. We reserve the right to terminate accounts violating these terms."},
            {h:"5. Privacy",p:"Your use of CallsChat is also governed by our Privacy Policy. We are committed to protecting your personal data in accordance with applicable data protection laws."},
            {h:"6. Intellectual Property",p:"CallsChat and its content are protected by intellectual property laws. You may not reproduce or redistribute our content without written permission."},
            {h:"7. Limitation of Liability",p:"CallsChat shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service."},
            {h:"8. Changes to Terms",p:"We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms."},
            {h:"9. Contact",p:"For questions about these Terms, contact us at legal@callschat.com."},
          ].map((s,i)=>(<div className="legal-section" key={i}><h2 className="legal-h2">{s.h}</h2><p className="legal-p">{s.p}</p></div>))}
        </div></section>
      </div>
    ),

    privacyPolicy: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Legal</span><h1 className="section-title">{t("privacyPolicy.title")}</h1><p style={{color:"var(--muted)"}}>{t("privacyPolicy.updated")}</p></div>
        <section className="section"><div className="legal-content">
          {[
            {h:"Information We Collect",p:"We collect information you provide directly (name, email, username), information generated by your use of the service (message metadata — never content), and device information necessary for the app to function."},
            {h:"How We Use Your Information",p:"We use your information to provide and improve the service, send service notifications, and ensure security. We never sell your data or use it for advertising."},
            {h:"End-to-End Encryption",p:"All private messages and calls are end-to-end encrypted. We cannot access the content of your private communications."},
            {h:"Data Retention",p:"You may delete your account and all associated data at any time. We retain minimal metadata as required by law."},
            {h:"Third-Party Services",p:"We use limited third-party services (cloud infrastructure, analytics) that are contractually bound to strict data protection standards."},
            {h:"Your Rights",p:"You have the right to access, correct, and delete your personal data. You may exercise these rights by contacting privacy@callschat.com."},
            {h:"Children's Privacy",p:"CallsChat is not intended for children under 13. We do not knowingly collect data from children."},
            {h:"Contact",p:"For privacy questions, contact our Data Protection Officer at privacy@callschat.com."},
          ].map((s,i)=>(<div className="legal-section" key={i}><h2 className="legal-h2">{s.h}</h2><p className="legal-p">{s.p}</p></div>))}
        </div></section>
      </div>
    ),

    cookies: () => (
      <div className="page">
        <div className="privacy-hero"><span className="section-tag">Legal</span><h1 className="section-title">{t("cookies.title")}</h1><p style={{color:"var(--muted)"}}>{t("cookies.updated")}</p></div>
        <section className="section"><div className="legal-content">
          {[
            {h:"What Are Cookies",p:"Cookies are small text files stored on your device when you visit our website. They help us provide a better experience."},
            {h:"Types of Cookies We Use",p:"Essential cookies: required for the website to function. Analytics cookies: help us understand usage patterns (anonymized). Preference cookies: remember your language and settings."},
            {h:"How to Control Cookies",p:"You can control and delete cookies through your browser settings. Note that disabling essential cookies may affect website functionality."},
            {h:"Third-Party Cookies",p:"We use minimal third-party cookies. We do not allow advertising networks to place cookies on our website."},
            {h:"Updates to This Policy",p:"We may update this Cookie Policy periodically. We will notify you of significant changes."},
            {h:"Contact",p:"Questions? Contact us at privacy@callschat.com."},
          ].map((s,i)=>(<div className="legal-section" key={i}><h2 className="legal-h2">{s.h}</h2><p className="legal-p">{s.p}</p></div>))}
        </div></section>
      </div>
    ),

    admin: () => {
      const tabs = [
        {key:"waitlist",icon:"👥",label:"Waitlist"},
        {key:"messages",icon:"💬",label:"Messages"},
        {key:"business",icon:"💼",label:"Business"},
        {key:"creators",icon:"🎨",label:"Creators"},
        {key:"blog",icon:"📝",label:"Blog"},
        {key:"analytics",icon:"📊",label:"Analytics"},
      ];
      const StatusBadge = ({s})=><span className={`badge badge-${s}`}>{s}</span>;
      return (
        <div className="page">
          <div className="admin-layout">
            <div className="admin-sidebar">
              <div className="admin-logo">⚡ CC Admin</div>
              {tabs.map(tab=>(
                <button key={tab.key} className={`admin-nav-item ${adminTab===tab.key?"active":""}`} onClick={()=>setAdminTab(tab.key)}>{tab.icon} {tab.label}</button>
              ))}
              <div style={{borderTop:"1px solid var(--border)",margin:"16px 0"}}/>
              <button className="admin-nav-item" onClick={()=>navigate("home")}>← Back to Site</button>
            </div>
            <div className="admin-main">
              {adminTab==="waitlist" && <>
                <div className="admin-title">👥 Waitlist Management</div>
                <div className="admin-cards">
                  <div className="admin-card"><div className="admin-card-num">50,241</div><div className="admin-card-label">Total Signups</div></div>
                  <div className="admin-card"><div className="admin-card-num">1,247</div><div className="admin-card-label">Today</div></div>
                  <div className="admin-card"><div className="admin-card-num">32%</div><div className="admin-card-label">Email Open Rate</div></div>
                </div>
                <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",overflow:"hidden"}}>
                  <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>{mockWaitlist.map(u=>(<tr key={u.id}><td style={{fontWeight:"600"}}>{u.name}</td><td style={{color:"var(--muted)"}}>{u.email}</td><td style={{color:"var(--muted)"}}>{u.date}</td><td><StatusBadge s={u.status}/></td><td><button className="admin-btn">Export</button></td></tr>))}</tbody>
                  </table>
                </div>
              </>}
              {adminTab==="messages" && <>
                <div className="admin-title">💬 Contact Messages</div>
                <div className="admin-cards">
                  <div className="admin-card"><div className="admin-card-num">127</div><div className="admin-card-label">Total Messages</div></div>
                  <div className="admin-card"><div className="admin-card-num">23</div><div className="admin-card-label">Pending</div></div>
                  <div className="admin-card"><div className="admin-card-num">98%</div><div className="admin-card-label">Response Rate</div></div>
                </div>
                <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",overflow:"hidden"}}>
                  <table className="admin-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>{mockMessages.map(m=>(<tr key={m.id}><td style={{fontWeight:"600"}}>{m.name}</td><td style={{color:"var(--muted)"}}>{m.email}</td><td>{m.subject}</td><td style={{color:"var(--muted)"}}>{m.date}</td><td><StatusBadge s={m.status}/></td><td><button className="admin-btn">Reply</button></td></tr>))}</tbody>
                  </table>
                </div>
              </>}
              {adminTab==="business" && <>
                <div className="admin-title">💼 Business Applications</div>
                <div className="admin-cards">
                  <div className="admin-card"><div className="admin-card-num">89</div><div className="admin-card-label">Applications</div></div>
                  <div className="admin-card"><div className="admin-card-num">34</div><div className="admin-card-label">Approved</div></div>
                  <div className="admin-card"><div className="admin-card-num">12</div><div className="admin-card-label">Pending</div></div>
                </div>
                <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",overflow:"hidden"}}>
                  <table className="admin-table">
                    <thead><tr><th>Company</th><th>Contact</th><th>Email</th><th>Size</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>{mockBusiness.map(b=>(<tr key={b.id}><td style={{fontWeight:"600"}}>{b.company}</td><td>{b.name}</td><td style={{color:"var(--muted)"}}>{b.email}</td><td>{b.size}</td><td style={{color:"var(--muted)"}}>{b.date}</td><td><StatusBadge s={b.status}/></td><td><button className="admin-btn">Review</button></td></tr>))}</tbody>
                  </table>
                </div>
              </>}
              {adminTab==="creators" && <>
                <div className="admin-title">🎨 Creator Applications</div>
                <div className="admin-cards">
                  <div className="admin-card"><div className="admin-card-num">312</div><div className="admin-card-label">Applications</div></div>
                  <div className="admin-card"><div className="admin-card-num">145</div><div className="admin-card-label">Approved</div></div>
                  <div className="admin-card"><div className="admin-card-num">67</div><div className="admin-card-label">Pending</div></div>
                </div>
                <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",overflow:"hidden"}}>
                  <table className="admin-table">
                    <thead><tr><th>Name</th><th>Handle</th><th>Category</th><th>Following</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
                    <tbody>{mockCreators.map(c=>(<tr key={c.id}><td style={{fontWeight:"600"}}>{c.name}</td><td style={{color:"var(--accent)"}}>{c.handle}</td><td>{c.category}</td><td>{c.followers}</td><td style={{color:"var(--muted)"}}>{c.date}</td><td><StatusBadge s={c.status}/></td><td><button className="admin-btn">Review</button></td></tr>))}</tbody>
                  </table>
                </div>
              </>}
              {adminTab==="blog" && <>
                <div className="admin-title">📝 Blog Management</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
                  <div style={{color:"var(--muted)"}}>3 published posts</div>
                  <button className="btn-primary">+ New Post</button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                  {(T.en.blog.posts||[]).map((post,i)=>(
                    <div key={i} style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"14px",padding:"20px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"20px"}}>
                      <div><div style={{fontFamily:"var(--font-display)",fontWeight:"600",marginBottom:"6px"}}>{post.title}</div><div style={{color:"var(--muted)",fontSize:"13px"}}>{post.date} · <span className="badge badge-approved">Published</span></div></div>
                      <div style={{display:"flex",gap:"8px",flexShrink:"0"}}><button className="admin-btn">Edit</button><button className="admin-btn" style={{background:"var(--card2)",color:"var(--muted)"}}>Delete</button></div>
                    </div>
                  ))}
                </div>
              </>}
              {adminTab==="analytics" && <>
                <div className="admin-title">📊 Analytics Dashboard</div>
                <div className="admin-cards">
                  <div className="admin-card"><div className="admin-card-num">50.2K</div><div className="admin-card-label">Waitlist Signups</div></div>
                  <div className="admin-card"><div className="admin-card-num">127K</div><div className="admin-card-label">Website Visits</div></div>
                  <div className="admin-card"><div className="admin-card-num">8.4%</div><div className="admin-card-label">Conversion Rate</div></div>
                  <div className="admin-card"><div className="admin-card-num">4:23</div><div className="admin-card-label">Avg. Session</div></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
                  <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:"24px"}}>
                    <div style={{fontFamily:"var(--font-display)",fontWeight:"600",marginBottom:"20px"}}>Top Countries</div>
                    {[{c:"🇧🇩 Bangladesh",p:34},{c:"🇧🇷 Brazil",p:28},{c:"🇺🇸 United States",p:18},{c:"🇬🇧 United Kingdom",p:12},{c:"🌍 Others",p:8}].map(r=>(
                      <div key={r.c} style={{marginBottom:"12px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:"13px",marginBottom:"4px"}}><span>{r.c}</span><span style={{color:"var(--muted)"}}>{r.p}%</span></div>
                        <div style={{height:"6px",background:"var(--bg3)",borderRadius:"3px"}}><div style={{height:"100%",width:`${r.p}%`,background:"var(--accent)",borderRadius:"3px"}}/></div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"var(--card)",border:"1px solid var(--border)",borderRadius:"var(--radius)",padding:"24px"}}>
                    <div style={{fontFamily:"var(--font-display)",fontWeight:"600",marginBottom:"20px"}}>Traffic Sources</div>
                    {[{s:"Organic Search",p:45},{s:"Social Media",p:32},{s:"Direct",p:15},{s:"Referral",p:8}].map(r=>(
                      <div key={r.s} style={{marginBottom:"12px"}}>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:"13px",marginBottom:"4px"}}><span>{r.s}</span><span style={{color:"var(--muted)"}}>{r.p}%</span></div>
                        <div style={{height:"6px",background:"var(--bg3)",borderRadius:"3px"}}><div style={{height:"100%",width:`${r.p}%`,background:"var(--accent3)",borderRadius:"3px"}}/></div>
                      </div>
                    ))}
                  </div>
                </div>
              </>}
            </div>
          </div>
        </div>
      );
    },
  };

  const CurrentPage = pages[page] || pages.home;

  return (
    <div className="app">
      <style>{css}</style>
      <nav className="nav">
        <div className="nav-logo" onClick={()=>navigate("home")}>⚡ CallsChat</div>
        <div className="nav-links">
          {navItems.map(item=>(
            <button key={item.key} className={`nav-link ${page===item.key?"active":""}`} onClick={()=>navigate(item.key)}>{t(`nav.${item.label}`)}</button>
          ))}
        </div>
        <div className="nav-right">
          <select className="lang-select" value={locale} onChange={e=>setLocale(e.target.value)}>
            <option value="en">🇬🇧 EN</option>
            <option value="bn">🇧🇩 বাংলা</option>
            <option value="pt">🇧🇷 PT</option>
          </select>
          <button className="btn-nav" onClick={()=>navigate("admin")}>Admin</button>
          <button className="hamburger" onClick={()=>setMobileOpen(!mobileOpen)}>☰</button>
        </div>
      </nav>
      <div className={`mobile-drawer ${mobileOpen?"open":""}`}>
        {navItems.map(item=>(
          <button key={item.key} className={`mobile-nav-link ${page===item.key?"active":""}`} onClick={()=>navigate(item.key)}>{t(`nav.${item.label}`)}</button>
        ))}
        <div style={{borderTop:"1px solid var(--border)",paddingTop:"16px",marginTop:"8px"}}>
          <button className="mobile-nav-link" onClick={()=>navigate("admin")}>⚙️ Admin Panel</button>
        </div>
      </div>
      <CurrentPage/>
      {page !== "admin" && (
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <div className="footer-logo">⚡ CallsChat</div>
                <p className="footer-tagline">{t("footer.tagline")}</p>
                <div style={{marginTop:"20px"}}>
                  <button className="btn-primary" style={{padding:"10px 20px",fontSize:"14px"}} onClick={()=>navigate("download")}>Join Waitlist</button>
                </div>
              </div>
              <div>
                <div className="footer-col-title">{t("footer.links")}</div>
                {["home","about","features","pricing","blog"].map(p=>(<button key={p} className="footer-link" onClick={()=>navigate(p)}>{t(`nav.${p}`)}</button>))}
              </div>
              <div>
                <div className="footer-col-title">{t("footer.legal")}</div>
                {["terms","privacyPolicy","cookies","privacy","faq"].map(p=>(<button key={p} className="footer-link" onClick={()=>navigate(p)}>{t(`nav.${p}`)}</button>))}
              </div>
              <div>
                <div className="footer-col-title">{t("footer.connect")}</div>
                {["contact","business","community","download"].map(p=>(<button key={p} className="footer-link" onClick={()=>navigate(p)}>{t(`nav.${p}`)}</button>))}
                <div style={{marginTop:"16px",display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  {["🐦","📘","📸","💬","▶️"].map((s,i)=>(<div key={i} className="social-btn">{s}</div>))}
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <div className="footer-rights">{t("footer.rights")}</div>
              <div style={{display:"flex",gap:"16px",flexWrap:"wrap"}}>
                {["terms","privacyPolicy","cookies"].map(p=>(<button key={p} className="footer-link" style={{margin:"0"}} onClick={()=>navigate(p)}>{t(`nav.${p}`)}</button>))}
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}