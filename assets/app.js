/* Poorv Patil / Flight Lab
 * An intentionally dependency-free, progressively accessible interactive portfolio.
 * Project copy can be edited in the PROJECTS and MODULES objects below.
 */
(() => {
  'use strict';
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));

  const PROJECTS = [
    {
      id:'tripsync', title:'TripSync', category:'SOFTWARE / REAL-TIME SYSTEMS', groups:['software'], art:'tripsync', emoji:'✈', featured:true,
      short:'A collaborative itinerary planner built around the messy parts of group travel: sync, permissions, and conflicting edits.',
      tags:['React','FastAPI','PostgreSQL','WebSockets'],
      subtitle:'Making shared plans behave like shared state.',
      metrics:[['Realtime','WebSocket updates'],['Versioned','Conflict handling'],['.ics','Calendar ingestion']],
      problem:'A group itinerary is deceptively distributed: multiple people edit the same events, calendars arrive from outside sources, and stale writes can silently overwrite changes.',
      approach:['Built a React/Vite interface backed by a FastAPI REST API and PostgreSQL, with authenticated WebSocket notifications for browser-to-browser updates.','Implemented membership-based access, time-zone-aware events, optimistic version checks, and HTTP 409 responses for conflicting edits.','Added remote HTTPS iCalendar subscriptions and manual .ics imports, with a separate scheduler, safe fetch restrictions, and failure-preserving synchronization.'],
      outcome:'A runnable multi-user prototype with local demo accounts, versioned itinerary edits, and scheduled calendar ingestion. Its README documents important limits, including in-process WebSocket delivery for API-triggered events.',
      note:'UI artwork on this page is a conceptual illustration. The GitHub README distinguishes the seeded demo events from live reservations.',
      links:[{label:'Explore GitHub repository',href:'https://github.com/EpicMaster7/TripSync'}]
    },
    {
      id:'cipher', title:'CIPHER', category:'ML / LLM SECURITY', groups:['ml'], art:'cipher', emoji:'⌘', featured:true,
      short:'Detecting cryptographic API misuse in LLM-generated code through sparse autoencoders and structured evaluation.',
      tags:['PyTorch','Sparse Autoencoders','Gemma 2','Security'],
      subtitle:'Looking inside the model, not only at its output.',
      metrics:[['87.3%','Detection accuracy'],['450','Benchmark prompts'],['17','Vulnerability categories']],
      problem:'LLMs can produce syntactically valid but insecure code. The interesting question is whether internal representations help expose cryptographic misuse patterns before the failures reach a user.',
      approach:['Extracted model activations from Gemma-2 9B and trained sparse autoencoders to study security-related vulnerability features.','Contributed to the CIPHER benchmark covering cryptographic API misuse across 450 prompts, 17 vulnerability categories, and 7 language models.','Structured line-level evidence and schema-validated scoring so detected issues could be audited rather than treated as opaque classifications.'],
      outcome:'Reported 87.3% detection accuracy for cryptographic API misuse in LLM-generated code. A key emphasis was attribution and reproducible evaluation, not solely an aggregate score.',
      note:'The sample code and activation map shown in this portfolio are illustrative, not literal benchmark examples. Benchmark code is not linked publicly here.',
      links:[]
    },
    {
      id:'heart', title:'Heart-Sound Classification', category:'RESEARCH / MEDICAL ML', groups:['ml'], art:'heart', emoji:'♡',
      short:'A lightweight XGBoost pipeline for detecting cardiac abnormalities from phonocardiogram recordings.',
      tags:['XGBoost','Signal Processing','IEEE'],
      subtitle:'Less compute, carefully chosen features.',
      metrics:[['92%','Classification accuracy'],['81%','Prior benchmark'],['1,112','PCG recordings']],
      problem:'Heart-sound classifiers are only useful if their signal-processing pipeline is robust and practical enough to deploy outside a large GPU setting.',
      approach:['Bandpass-filtered phonocardiogram audio and engineered 25 candidate features including MFCCs, spectral statistics, and an entropy-fluctuation feature.','Compared XGBoost against SVM and KNN baselines, testing feature selection strategies rather than assuming a larger feature set was better.','Found that a manually selected ten-feature subset outperformed the full 25-feature representation in the reported experiments.'],
      outcome:'Reached 92% classification accuracy compared with an 81% prior baseline. Published first-author research at IEEE BIBE 2024; the IEEE Xplore record is dated January 2025.',
      note:'The waveform on this site is synthetic and illustrative; it is not a patient recording or published study figure.',
      links:[{label:'Read publication (DOI)',href:'https://doi.org/10.1109/BIBE63649.2024.10820490'}]
    },
    {
      id:'quadcopter', title:'Autonomous Quadcopter', category:'ROBOTICS / EMBEDDED SYSTEMS', groups:['robotics'], art:'drone', emoji:'✦',
      short:'An F450 quadcopter built around Pixhawk, with flight software and autonomy evaluated in ROS/Gazebo.',
      tags:['PX4','ROS','Gazebo','Kalman Filter'],
      subtitle:'Where the software meets the hardware.',
      metrics:[['F450','Custom frame'],['Pixhawk','Flight controller'],['ROS/Gazebo','Simulated autonomy']],
      problem:'Navigation algorithms become more complicated when motor vibrations, state estimation, control delays, and embedded hardware are part of the loop.',
      approach:['Assembled a custom F450 flight stack, soldered ESC and power-distribution connections, and designed a vibration-damping mounting solution.','Built simulation pipelines in ROS/Gazebo, combining reinforcement-learning navigation experiments with Kalman filter-based state estimation.','Used simulated trajectories to evaluate autonomous navigation behavior before attempting further physical validation.'],
      outcome:'A hardware-integrated quadcopter build and an active simulation pipeline for testing autonomy ideas.',
      note:'The interactive drone on this website is a stylized visualization. Do not interpret the motor-test animation as live telemetry or evidence of an autonomous flight test.',
      links:[{label:'See project overview on LinkedIn',href:'https://www.linkedin.com/in/poorvpatil/'}]
    },
    {
      id:'swarm', title:'Multi-Drone Search & Rescue', category:'RESEARCH / MULTI-AGENT ROBOTICS', groups:['robotics','ml'], art:'swarm', emoji:'◎',
      short:'Cooperative UAV search strategies tested against wind, communication loss, and uncertainty.',
      tags:['C++','MATLAB','Monte Carlo','Coordination'],
      subtitle:'Three aircraft, one search mission, many unknowns.',
      metrics:[['3','Simulated UAVs'],['1K+','Monte Carlo runs'],['70%','Reported detection probability']],
      problem:'Real-world search-and-rescue missions need robust coordination even when target behavior, environmental conditions, and connectivity are uncertain.',
      approach:['Developed C++/MATLAB planning and localization tools for a simulated three-UAV search-and-rescue system.','Modeled stochastic lost-person behavior and cellular-signal localization alongside candidate search strategies.','Built Monte Carlo evaluation across wind, network loss, and fleet constraints, benchmarking against Civil Air Patrol-style baselines.'],
      outcome:'Sustained a reported 70% detection probability in longer search simulations across the tested conditions.',
      note:'The map and flight trajectories shown here are conceptual illustrations, not original UAV flight telemetry.',
      links:[{label:'UCSB SRA GitHub organization',href:'https://github.com/orgs/SRA-2025/repositories'}]
    },
    {
      id:'clearcare', title:'ClearCare', category:'SOFTWARE / HEALTHCARE DATA', groups:['software'], art:'clearcare', emoji:'✳',
      short:'A healthcare price-comparison prototype with structured estimates, search, and transparent data provenance.',
      tags:['Next.js','TypeScript','Supabase','PostGIS'],
      subtitle:'Make healthcare pricing easier to inspect.',
      metrics:[['Next.js 16','App Router'],['CPT 70551','Initial procedure'],['5','Placeholder demo facilities']],
      problem:'Hospital pricing is hard to compare: source records can be incomplete, prices cover different services, and users need to know precisely what an estimate means.',
      approach:['Built a Next.js and TypeScript application with search, comparison pages, a financial-assistance workflow, and explanatory call scripts.','Designed database and API layers using Supabase/PostgreSQL, PostGIS, validation, and row-level security rules.','Established a narrow pilot scope around one MRI procedure (CPT 70551), with comparability and provenance rules specified in project documentation.'],
      outcome:'A running demo application with a five-facility placeholder dataset and infrastructure for replacing fixtures with verified records.',
      note:'The public README explicitly says the initial dataset uses placeholder facilities. It is a prototype and should not be presented as a verified live hospital-price directory.',
      links:[{label:'Explore GitHub repository',href:'https://github.com/EpicMaster7/ClearCare'}]
    },
    {
      id:'cognixion', title:'Assistive NLP at Cognixion', category:'SOFTWARE / HUMAN-CENTERED ML', groups:['software','ml'], art:'cognixion', emoji:'◈',
      short:'Context-aware next-phrase prediction for assistive communication, with an emphasis on latency and consistency.',
      tags:['PyTorch','NLP','Caching','Product'],
      subtitle:'Latency and interface stability matter to people.',
      metrics:[['35%','Lower inference latency'],['15%','Top-3 accuracy gain'],['10K+','Messages evaluated']],
      problem:'Assisted communication needs predictions that are fast and predictable. A theoretically clever ranking algorithm can still introduce costly corrections.',
      approach:['Rebuilt a PyTorch NLP pipeline around conversational context windows and evaluated top-three predictions on more than 10,000 user messages.','Reduced inference latency from roughly 200 ms to 130 ms through context caching and batched scoring across more than 2,000 sessions.','Investigated the UX consequences of aggressive suggestion reordering and adjusted toward stable context-aware choices.'],
      outcome:'Reported a 15% top-three prediction accuracy improvement and 35% lower inference latency, with user-oriented iteration around correction burden.',
      note:'The phrase-prediction UI in the artwork is conceptual, not a screenshot of Cognixion software or patient messages.',
      links:[]
    }
  ];
  const byId = Object.fromEntries(PROJECTS.map(p => [p.id,p]));
  const MODULES = {
    ml:{index:1, color:'#ae9afa', symbol:'◉', eyebrow:'01 / MACHINE LEARNING', title:'Making sense of signals.', description:'Building and evaluating models, from cardiac audio to interpretable LLM representations.', projectIds:['cipher','heart','cognixion'], foot:'MOTOR 01 / REPRESENTATION & EVALUATION'},
    software:{index:2, color:'#79b7ff', symbol:'⌘', eyebrow:'02 / SOFTWARE ENGINEERING', title:'Building the systems.', description:'APIs, data, real-time collaboration, performance, and the details that keep an application working.', projectIds:['tripsync','clearcare','cognixion'], foot:'MOTOR 02 / DESIGN & IMPLEMENTATION'},
    research:{index:3, color:'#88e4bc', symbol:'⌁', eyebrow:'03 / RESEARCH', title:'Ask, test, repeat.', description:'Experiments with a baseline, careful measurements, and enough rigor to discover when an idea fails.', projectIds:['heart','cipher','swarm'], foot:'MOTOR 03 / METHODS & EVIDENCE'},
    robotics:{index:4, color:'#ffc18b', symbol:'✥', eyebrow:'04 / ROBOTICS', title:'Code with consequences.', description:'State estimation, control, and cooperative planning across physical and simulated autonomous systems.', projectIds:['quadcopter','swarm'], foot:'MOTOR 04 / AUTONOMY & CONTROL'}
  };
  const MODULE_ORDER = ['ml','software','research','robotics'];
  let selectedModule='software';
  let selectedFilter='all';
  let flightMode=false, blueprintMode=false;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateModule(moduleId){
    const module=MODULES[moduleId]; if(!module)return;
    selectedModule=moduleId;
    const panel=$('#module-panel');
    panel.style.setProperty('--module-accent',module.color);
    $('#panel-counter').textContent=String(module.index).padStart(2,'0')+' / 04';
    $('#panel-symbol').textContent=module.symbol;
    $('#panel-category').textContent=module.eyebrow;
    $('#panel-title').textContent=module.title;
    $('#panel-description').textContent=module.description;
    $('#panel-foot-label').textContent=module.foot;
    $('#canvas-status').textContent=`MODULE ${String(module.index).padStart(2,'0')} / ${moduleId.toUpperCase()}`;
    $('#module-projects').innerHTML=module.projectIds.map(id=>{const p=byId[id];return `<button type="button" class="module-project" data-open-project="${p.id}" aria-label="Open ${p.title} case study"><span class="module-project-icon" aria-hidden="true">${p.emoji}</span><span><span class="module-project-name">${p.title}</span><span class="module-project-desc">${p.short.length>79?p.short.slice(0,76).trim()+'…':p.short}</span></span><span class="module-project-arrow">↗</span></button>`}).join('');
    $$('.motor').forEach(b=>{const active=b.dataset.module===moduleId;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
  }

  function waveformPath(w=620,h=145){
    let d='';
    const peaks=[.18,.34,.56,.75,.88];
    for(let i=0;i<=600;i++){
      const x=i/600*w;
      const u=i/600;
      let envelope=.025;
      for(const p of peaks){const distance=(u-p)/.025;envelope+=.8*Math.exp(-distance*distance);}
      const jitter=Math.sin(i*1.42)*Math.cos(i*.37)+.37*Math.sin(i*2.13);
      const y=h/2+(h*.37*envelope*jitter);
      d+=(i?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)+' ';
    }
    return d;
  }
  function activationCells(){return Array.from({length:64},(_,i)=>{const v=(i*41+Math.floor(i/8)*13)%23;let cl=v<5?'hot':v<10?'warm':'';return `<i class="${cl}"></i>`}).join('');}
  function renderArt(kind){
    switch(kind){
      case 'tripsync':return `<div class="project-visual visual-tripsync"><div class="art-label">ILLUSTRATIVE UI / 01</div><div class="app-mock"><div class="mock-bar"><b>✈ TripSync</b><span>Trips &nbsp;&nbsp; Calendar &nbsp;&nbsp; People</span></div><div class="mock-body"><div class="mock-sidebar"><div class="sel">◈ My trips</div><div>▤ Calendar</div><div>◌ Members</div><div>⚙ Settings</div></div><div class="mock-main"><h4>Seattle weekend ☀</h4><div class="mock-mountain"></div><div class="mock-timeline"><span>Fri · Arrive</span><span>Sat · Explore</span><span>Sun · Home</span></div></div></div></div><div class="mock-float">● 3 collaborators connected</div></div>`;
      case 'cipher':return `<div class="project-visual visual-cipher"><div class="art-label">ILLUSTRATIVE SCAN / 02</div><div class="code-window"><div class="code-head">● ● ● &nbsp; scan_crypto.py</div><div class="code-line">1 &nbsp; import secrets</div><div class="code-line">2 &nbsp; from Crypto.Cipher import AES</div><div class="code-line code-warning">3 &nbsp; key = b"hardcoded"</div><div class="code-line">4 &nbsp; mode = AES.MODE_ECB</div><div class="code-line">5 &nbsp; # candidate misuse</div></div><div class="cipher-activation">${activationCells()}</div><div class="cipher-alert">SECURITY SIGNAL DETECTED</div></div>`;
      case 'heart':return `<div class="project-visual visual-heart"><div class="art-label">SIGNAL STUDY / 03</div><div class="heart-visual-grid"></div><svg class="heart-graph" viewBox="0 0 620 145" aria-hidden="true"><path d="${waveformPath(620,145)}"/></svg><div class="heart-metric"><b>92%</b><small>CLASSIFICATION ACCURACY</small></div><div class="heart-key">PCG / SYNTHETIC WAVEFORM</div></div>`;
      case 'drone':return `<div class="project-visual visual-drone"><div class="art-label">FLIGHT STACK / 04</div><svg viewBox="0 0 520 210" aria-hidden="true"><path d="M50 153C119 139 133 48 230 59S374 188 482 42"/><ellipse cx="230" cy="80" rx="67" ry="40"/><ellipse cx="379" cy="121" rx="96" ry="57"/></svg><div class="little-drone d1">✣</div><div class="little-drone d2">✣</div><div class="little-drone d3">✣</div><span class="map-pin"></span></div>`;
      case 'swarm':return `<div class="project-visual visual-swarm"><div class="art-label">SEARCH SIMULATION / 05</div><svg class="terrain-svg" viewBox="0 0 520 210" aria-hidden="true"><path d="M-30 40Q68-50 156 30T360 28T540 14M-30 56Q68-34 156 46T360 44T540 30M-30 73Q68-17 156 63T360 61T540 47M-30 90Q68 0 156 80T360 78T540 64M-30 107Q68 17 156 97T360 95T540 81M-30 124Q68 34 156 114T360 112T540 98M-30 141Q68 51 156 131T360 129T540 115M-30 158Q68 68 156 148T360 146T540 132M-30 175Q68 85 156 165T360 163T540 149M-30 192Q68 102 156 182T360 180T540 166"/><path class="route" d="M48 156C120 150 147 62 227 80S336 157 465 42"/><path class="route" d="M58 55C164 26 225 151 287 132S383 85 459 148"/><circle class="target" cx="280" cy="110" r="31"/><circle class="target" cx="280" cy="110" r="15"/><circle cx="48" cy="156" r="6" fill="#8fe3ff"/><circle cx="58" cy="55" r="6" fill="#8fe3ff"/><circle cx="465" cy="42" r="6" fill="#8fe3ff"/></svg><div class="swarm-label">3 AGENTS / UNCERTAIN TERRAIN</div></div>`;
      case 'clearcare':return `<div class="project-visual visual-clearcare"><div class="art-label" style="color:#27518a;background:#f6faff">DEMO UI / 06</div><div class="clear-window"><div class="clear-head"><b>✳ ClearCare</b><span>Search &nbsp; Compare &nbsp; About</span></div><div class="clear-title">Clarity on healthcare costs.</div><div class="clear-search">⌕ &nbsp; Brain MRI without contrast...</div><div class="clear-bars"><i style="height:38%"></i><i style="height:63%"></i><i style="height:78%"></i><i style="height:54%"></i><i style="height:92%"></i></div></div><div class="clear-demo">PLACEHOLDER DATA</div></div>`;
      case 'cognixion':return `<div class="project-visual visual-cognixion"><div class="art-label">CONCEPT INTERFACE / 07</div><div class="phrase-window"><div class="phrase-label">PREDICT NEXT PHRASE / CONTEXT ON</div><div class="phrase-input">I would like to...</div><div class="phrase-suggestions"><span>go outside</span><span>ask a question</span><span>take a break</span></div></div><div class="phrase-stat">↘ 35% LATENCY</div></div>`;
      default:return '';
    }
  }
  function renderProjects(){
    const grid=$('#projects-grid');
    grid.innerHTML=PROJECTS.map((p,i)=>{
      const size=i<2?'feature':i<5?'standard':'wide';
      const visible=selectedFilter==='all'||p.groups.includes(selectedFilter);
      return `<article class="project-card ${size}${visible?'':' hidden'}" data-project="${p.id}">${renderArt(p.art)}<div class="project-copy"><div class="project-topline"><span class="project-category">${p.category}</span><span class="project-index">${String(i+1).padStart(2,'0')} / 07</span></div><h3>${p.title}</h3><p>${p.short}</p><div class="project-footer"><div class="tech-tags">${p.tags.slice(0,3).map(t=>`<span>${t}</span>`).join('')}</div><button class="project-open" type="button" data-open-project="${p.id}" aria-label="Open ${p.title} case study">Case file ↗</button></div></div></article>`;
    }).join('');
  }
  function renderTimeline(){
    const items=[
      {year:'2025 — 2026',name:'Algoverse AI',role:'Software Engineer Intern · LLM Security',summary:'Sparse autoencoders over LLM activations and reproducible detection of cryptographic misuse in generated code.'},
      {year:'2025',name:'UC Santa Barbara',role:'Robotics Research · Software Engineering',summary:'Three-UAV search-and-rescue simulation, coordination strategies, and Monte Carlo evaluation under degraded conditions.'},
      {year:'2024 — 2025',name:'Cognixion',role:'Software Engineering Intern',summary:'Context-aware phrase prediction and lower-latency NLP for assistive communication.'},
      {year:'2023 — 2025',name:'University of Oxford',role:'Machine Learning Intern · Signal Processing',summary:'XGBoost-based heart-sound classification; first-author IEEE BIBE paper and experimental feature-selection study.'}
    ];
    $('#timeline').innerHTML=items.map((x,i)=>`<div class="timeline-item"><div class="timeline-year">${x.year}</div><div class="timeline-company">${x.name}<span class="timeline-role">${x.role}</span></div><div class="timeline-summary">${x.summary}</div><div class="timeline-mark" aria-hidden="true">${['⌘','✥','⌁','◎'][i]}</div></div>`).join('');
  }

  function showProject(id,replaceHash=true){
    const p=byId[id]; if(!p)return;
    const dialog=$('#case-dialog');
    const linkMarkup=p.links.length?p.links.map(l=>`<a class="dialog-link" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label} ↗</a>`).join(''):'<a class="dialog-link" href="assets/Poorv-Patil-Resume.pdf" target="_blank" rel="noopener noreferrer">See experience in résumé ↗</a>';
    $('#dialog-content').innerHTML=`<div class="dialog-eyebrow">CASE FILE / ${p.category} / ${String(PROJECTS.indexOf(p)+1).padStart(2,'0')}</div><h2 id="case-title">${p.title}</h2><p class="dialog-lead">${p.subtitle} ${p.short}</p><div class="dialog-stats">${p.metrics.map(([a,b])=>`<div class="dialog-stat"><strong>${a}</strong><span>${b}</span></div>`).join('')}</div><div class="dialog-section"><h3>The problem</h3><p>${p.problem}</p></div><div class="dialog-section"><h3>What I built / investigated</h3><ul>${p.approach.map(a=>`<li>${a}</li>`).join('')}</ul></div><div class="dialog-section"><h3>Outcome</h3><p>${p.outcome}</p></div><div class="dialog-link-row">${linkMarkup}</div><p class="dialog-note">${p.note}</p>`;
    if(!dialog.open)dialog.showModal();
    if(replaceHash && location.hash!==`#project/${id}`)history.replaceState(null,'',`#project/${id}`);
  }
  function closeProject(){const d=$('#case-dialog');if(d.open)d.close()}
  function setFilter(value){
    selectedFilter=value;
    $$('.filter').forEach(b=>{const active=b.dataset.filter===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
    renderProjects();
  }
  let toastTimer;
  function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2800)}
  function toggleBlueprint(){blueprintMode=!blueprintMode;$('#flight-canvas').classList.toggle('blueprint',blueprintMode);$('#inspect-btn').setAttribute('aria-pressed',String(blueprintMode));toast(blueprintMode?'Schematic view enabled. Select any motor to inspect its work.':'Photographic render restored.')}
  function toggleFlight(){flightMode=!flightMode;$('#flight-canvas').classList.toggle('flight-active',flightMode && !reducedMotion);$('#flight-btn').setAttribute('aria-pressed',String(flightMode));toast(flightMode?'Visual motor test running. This is a UI animation, not live flight telemetry.':'Visual motor test stopped.')}
  function handleHash(){const id=decodeURIComponent(location.hash.replace('#project/',''));if(location.hash.startsWith('#project/')&&byId[id])showProject(id,false)}
  function init(){
    updateModule('software');renderProjects();renderTimeline();
    $('#research-wave').innerHTML=`<svg viewBox="0 0 620 145" role="img" aria-label="Synthetic waveform illustration"><path d="${waveformPath(620,145)}"/></svg>`;
    $('#year').textContent=new Date().getFullYear();
    document.addEventListener('click',event=>{
      const motor=event.target.closest('[data-module]');if(motor){updateModule(motor.dataset.module);return}
      const project=event.target.closest('[data-open-project]');if(project){showProject(project.dataset.openProject);return}
      const filter=event.target.closest('[data-filter]');if(filter){setFilter(filter.dataset.filter);return}
    });
    $('#inspect-btn').addEventListener('click',toggleBlueprint);
    $('#flight-btn').addEventListener('click',toggleFlight);
    $('#close-dialog').addEventListener('click',closeProject);
    $('#case-dialog').addEventListener('close',()=>{if(location.hash.startsWith('#project/'))history.replaceState(null,'','#projects')});
    $('#case-dialog').addEventListener('click',e=>{if(e.target===$('#case-dialog'))closeProject()});
    document.addEventListener('keydown',e=>{
      const target=e.target; if(target.closest('input, textarea, select, [contenteditable="true"]')||$('#case-dialog').open)return;
      if(['1','2','3','4'].includes(e.key)){updateModule(MODULE_ORDER[Number(e.key)-1]);return}
      if(e.key.toLowerCase()==='i' && !e.metaKey&&!e.ctrlKey){toggleBlueprint();return}
      if(e.key.toLowerCase()==='t' && !e.metaKey&&!e.ctrlKey){toggleFlight()}
    });
    const toggle=$('#menu-toggle'),menu=$('#mobile-menu');
    toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');menu.hidden=!open});
    $$('a',menu).forEach(link=>link.addEventListener('click',()=>{menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu')}));
    document.addEventListener('click',e=>{if(!menu.hidden && !menu.contains(e.target) && !toggle.contains(e.target)){menu.hidden=true;toggle.setAttribute('aria-expanded','false')}});
    if('IntersectionObserver' in window){
      const sectionIds=['flight-deck','projects','research','experience','about'];
      const obs=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){$$('.nav-link').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id))}}},{rootMargin:'-20% 0px -65% 0px'});
      sectionIds.forEach(s=>{const node=$('#'+s);if(node)obs.observe(node)});
    }
    window.addEventListener('hashchange',handleHash);handleHash();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
