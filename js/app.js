/**
 * ROHIT.OS — APPLICATION ORCHESTRATOR
 * Integrates:
 * - Boot sequence & gravitational collapse transition
 * - AI Core progressive evolution controller
 * - Dynamic data hydration from ROHIT_DATA
 * - Case study modal & interactive resume viewer
 * - Profile photo upload & interactive reveal
 * - Encrypted transmission terminal simulation
 * - Magnetic custom cursor
 * - Cinematic session shutdown & reboot
 */

class RohitApp {
  constructor() {
    this.data = window.ROHIT_DATA;
    this.bootComplete = false;
    this.activeSection = 'universe';
    this.currentCaseStudy = null;
    
    // Core instances
    this.blackHole = null;
    this.starfield = null;
    this.commandCenter = null;

    this.init();
  }

  init() {
    this.initVisualEngines();
    this.hydrateContent();
    this.setupCursor();
    this.setupScrollObserver();
    this.setupInteractions();
    this.runBootSequence();
  }

  initVisualEngines() {
    if (window.StarfieldBackground) {
      this.starfield = new StarfieldBackground('canvas-cosmos');
      window.rohitStarfield = this.starfield;
    }
    if (window.BlackHoleCore) {
      this.blackHole = new BlackHoleCore('canvas-blackhole');
      window.rohitBlackHole = this.blackHole;
      this.blackHole.setEvolutionState('BOOT');
    }
    if (window.CommandCenter) {
      this.commandCenter = new CommandCenter();
      window.rohitCommandCenter = this.commandCenter;
    }
  }

  /* ------------------------------------------------------------------
     1. BOOT SEQUENCE & COLLAPSE TRANSITION
     ------------------------------------------------------------------ */
  runBootSequence() {
    const bootScreen = document.getElementById('boot-terminal-screen');
    const logBox = document.getElementById('boot-log-container');
    const progressFill = document.getElementById('boot-progress-fill');
    const skipBtn = document.getElementById('boot-skip-btn');

    if (!bootScreen || !logBox) {
      this.completeBoot();
      return;
    }

    const bootMessages = [
      { text: "[KERNEL_INIT] ROHIT.OS Core Kernel v2.6.0 loading...", type: "cyan", delay: 200 },
      { text: "[HARDWARE_SCAN] Detecting neural accelerator & display telemetry...", type: "default", delay: 450 },
      { text: "[ACADEMIC_BASE] JECRC University Jaipur — CSE (AI & ML) IBM Track verified.", type: "purple", delay: 800 },
      { text: "[COGNITIVE_STACK] Mounting AI Engine & ChatGPT workflow interfaces...", type: "cyan", delay: 1200 },
      { text: "[EVENT_HORIZON] Gravitational Singularity Core ignited at coordinates (0, 0, 0)...", type: "highlight", delay: 1650 },
      { text: "[DIAGNOSTIC] Web Audio synthesizer and Canvas render layers synchronized.", type: "default", delay: 2100 },
      { text: "[STATUS_OK] All 8 sectors online. Priming digital universe...", type: "success", delay: 2600 }
    ];

    let currentStep = 0;
    const totalSteps = bootMessages.length;

    const printNextMessage = () => {
      if (currentStep >= totalSteps) {
        if (progressFill) progressFill.style.width = '100%';
        setTimeout(() => this.collapseBoot(), 500);
        return;
      }

      const msg = bootMessages[currentStep];
      const p = document.createElement('div');
      p.className = `boot-line ${msg.type}`;
      p.textContent = msg.text;
      logBox.appendChild(p);

      if (window.rohitAudio && window.rohitAudio.isEnabled) {
        window.rohitAudio.playHover();
      }

      currentStep++;
      if (progressFill) {
        progressFill.style.width = `${Math.round((currentStep / totalSteps) * 100)}%`;
      }

      const nextDelay = (currentStep < totalSteps) ? (bootMessages[currentStep].delay - msg.delay) : 400;
      this.bootTimer = setTimeout(printNextMessage, Math.max(150, nextDelay));
    };

    this.bootTimer = setTimeout(printNextMessage, 300);

    // Skip handler
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        clearTimeout(this.bootTimer);
        this.collapseBoot();
      });
    }

    // Keyboard shortcut to skip: ESC or ENTER
    const keyHandler = (e) => {
      if (!this.bootComplete && (e.key === 'Escape' || e.key === 'Enter')) {
        clearTimeout(this.bootTimer);
        window.removeEventListener('keydown', keyHandler);
        this.collapseBoot();
      }
    };
    window.addEventListener('keydown', keyHandler);
  }

  collapseBoot() {
    if (this.bootComplete) return;
    this.bootComplete = true;

    const bootScreen = document.getElementById('boot-terminal-screen');
    if (!bootScreen) return;

    // Trigger audio warp whoosh
    if (window.rohitAudio && window.rohitAudio.isEnabled) {
      window.rohitAudio.playWarp();
    }

    // Trigger starfield relativistic warp burst
    if (this.starfield) {
      this.starfield.triggerWarp(1600);
    }

    // Singularity expansion in Black Hole Core
    if (this.blackHole) {
      this.blackHole.setEvolutionState('HERO');
    }

    // Visual collapse animation
    bootScreen.classList.add('collapsing');
    setTimeout(() => {
      bootScreen.style.display = 'none';
      this.completeBoot();
    }, 950);
  }

  completeBoot() {
    this.bootComplete = true;
    const hud = document.querySelector('.system-hud-top');
    if (hud) hud.style.opacity = '1';
    
    // Set active section to Hero
    this.updateActiveSection('universe');
  }

  /* ------------------------------------------------------------------
     2. DYNAMIC CONTENT HYDRATION
     ------------------------------------------------------------------ */
  hydrateContent() {
    if (!this.data) return;

    // 2.1 Identity & Bio
    const bioBox = document.getElementById('identity-bio-container');
    if (bioBox && this.data.identity) {
      bioBox.innerHTML = this.data.identity.bio.story.map(p => `<p>${p}</p>`).join('');
    }

    // 2.2 Education Telemetry
    const eduContainer = document.getElementById('education-telemetry-content');
    if (eduContainer && this.data.education) {
      const e = this.data.education;
      eduContainer.innerHTML = `
        <div class="education-meta-row">
          <h3 class="education-university">${e.institution}</h3>
          <span class="system-badge">${e.tenure}</span>
        </div>
        <div class="education-degree">${e.degree} — <span style="color:#d8b4fe;">${e.affiliation}</span></div>
        <div class="education-modules-list">
          ${e.coreModules.map(m => `<div class="education-module-item">${m}</div>`).join('')}
        </div>
      `;
    }

    // 2.3 Journey Milestones
    const journeyList = document.getElementById('journey-timeline-list');
    if (journeyList && this.data.journeyMilestones) {
      journeyList.innerHTML = this.data.journeyMilestones.map(m => `
        <div class="journey-node-row">
          <div class="journey-orbital-dot">${m.phase}</div>
          <div class="journey-card cyber-card">
            <div class="hud-corner-tl"></div>
            <div class="hud-corner-br"></div>
            <div class="journey-card-header">
              <h3 class="journey-phase-title">${m.title}</h3>
              <span class="system-badge purple">${m.badge}</span>
            </div>
            <div class="mono" style="font-size: 0.76rem; color: var(--electric-blue); margin-bottom: 8px;">// ${m.period} [${m.code}]</div>
            <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.55;">${m.summary}</p>
            <div class="journey-focus-tags">
              ${m.focus.map(f => `<span class="journey-tag">${f}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    // 2.4 Capabilities Matrix
    const capabilityList = document.getElementById('capability-matrix-list');
    if (capabilityList && this.data.capabilities) {
      capabilityList.innerHTML = this.data.capabilities.map(c => `
        <div class="capability-card cyber-card">
          <div class="hud-corner-tl"></div>
          <div class="hud-corner-br"></div>
          <div class="capability-card-top">
            <div class="capability-category">// ${c.category}</div>
            <h3 class="capability-name">${c.name}</h3>
            <div class="capability-focus-tag">${c.focus}</div>
            <p class="capability-desc">${c.description}</p>
          </div>
          <div class="capability-meter-wrap">
            <div class="capability-meter-header">
              <span>STATUS: ${c.stage}</span>
              <span class="system-badge ${c.level === 'BUILDING' ? '' : 'purple'}">${c.level}</span>
            </div>
            <div class="capability-meter-bar">
              <div class="capability-meter-fill" style="width: ${c.proficiencyPercent}%;"></div>
            </div>
          </div>
          <div class="capability-tools-pills">
            ${c.tools.map(t => `<span class="capability-tool-pill">${t}</span>`).join('')}
          </div>
        </div>
      `).join('');
    }

    // 2.5 Project Archive
    const projectGrid = document.getElementById('projects-grid-list');
    if (projectGrid && this.data.projects) {
      projectGrid.innerHTML = this.data.projects.map(p => `
        <div class="project-card cyber-card" data-project-id="${p.id}">
          <div class="hud-corner-tl"></div>
          <div class="hud-corner-br"></div>
          <div>
            <div class="project-card-header">
              <span class="system-badge ${p.status === 'Completed' ? 'purple' : ''}">${p.statusBadge}</span>
              <span class="project-year">${p.year}</span>
            </div>
            <h3 class="project-title">${p.title}</h3>
            <div class="project-subtitle">// ${p.subtitle}</div>
            <p class="project-summary">${p.summary}</p>
            <div class="project-stack-tags">
              ${p.techStack.map(t => `<span class="project-stack-tag">${t}</span>`).join('')}
            </div>
          </div>
          <div class="project-card-actions">
            <button class="project-inspect-trigger">
              <span>INSPECT CASE STUDY</span>
              <span>→</span>
            </button>
            <a href="${p.githubUrl}" target="_blank" rel="noopener" class="cyber-btn" style="padding: 4px 10px; font-size: 0.7rem;" onclick="event.stopPropagation();">
              GITHUB
            </a>
          </div>
        </div>
      `).join('');

      // Add click handler to cards to open case study
      projectGrid.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-project-id');
          this.openCaseStudy(id);
        });
      });
    }

    // 2.6 Mission Archive
    const missionGrid = document.getElementById('mission-grid-list');
    if (missionGrid && this.data.missions) {
      const allMissions = [
        ...this.data.missions.confirmedMissions,
        ...this.data.missions.pendingMissions
      ];

      missionGrid.innerHTML = allMissions.map(m => {
        const isConfirmed = m.status.includes('CONFIRMED');
        return `
          <div class="mission-card cyber-card">
            <div class="hud-corner-tl"></div>
            <div class="hud-corner-br"></div>
            <span class="mission-stamp ${isConfirmed ? 'confirmed' : 'pending'}">
              ${m.badge}
            </span>
            <div class="mission-code">// ${m.code} [${m.date}]</div>
            <h3 class="mission-title">${m.title}</h3>
            <div class="mission-org">${m.organization} — ${m.type}</div>
            <p class="mission-desc">${m.description}</p>
            <div class="mission-highlights-list">
              ${m.highlights.map(h => `<div class="mission-highlight-item">${h}</div>`).join('')}
            </div>
          </div>
        `;
      }).join('');
    }

    // 2.7 Socials Uplink
    const socialsList = document.getElementById('transmission-socials-list');
    if (socialsList && this.data.socials) {
      const s = this.data.socials;
      socialsList.innerHTML = `
        <a href="${s.github.url}" target="_blank" rel="noopener" class="social-uplink-card">
          <span>GITHUB // ${s.github.handle}</span>
          <span>↗</span>
        </a>
        <a href="${s.instagram.url}" target="_blank" rel="noopener" class="social-uplink-card">
          <span>INSTAGRAM // ${s.instagram.handle}</span>
          <span>↗</span>
        </a>
        <a href="${s.linkedin.url}" target="_blank" rel="noopener" class="social-uplink-card placeholder" title="Editable Placeholder">
          <span>LINKEDIN // [EDITABLE PLACEHOLDER]</span>
          <span>↗</span>
        </a>
        <a href="${s.email.url}" class="social-uplink-card">
          <span>EMAIL // ${s.email.address}</span>
          <span>✉</span>
        </a>
      `;
    }
  }

  /* ------------------------------------------------------------------
     3. CASE STUDY MODAL
     ------------------------------------------------------------------ */
  openCaseStudy(projectId) {
    const project = this.data.projects.find(p => p.id === projectId);
    if (!project) return;

    this.currentCaseStudy = project;
    const modal = document.getElementById('case-study-modal');
    const container = document.getElementById('case-study-content');
    if (!modal || !container) return;

    if (window.rohitAudio) window.rohitAudio.playWarp();

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
        <span class="system-badge ${project.status === 'Completed' ? 'purple' : ''}">${project.statusBadge}</span>
        <span class="mono" style="font-size: 0.8rem; color: var(--text-muted);">${project.year}</span>
      </div>
      <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-bottom: 6px;">${project.title}</h2>
      <div class="mono" style="color: var(--electric-blue); font-size: 0.95rem; margin-bottom: 20px;">// ${project.subtitle}</div>

      <div class="case-study-specs-grid">
        <div>
          <div class="spec-item-label">ROLE</div>
          <div class="spec-item-value">${project.role}</div>
        </div>
        <div>
          <div class="spec-item-label">TIMELINE</div>
          <div class="spec-item-value">${project.year}</div>
        </div>
        <div>
          <div class="spec-item-label">CATEGORY</div>
          <div class="spec-item-value">${project.category}</div>
        </div>
        <div>
          <div class="spec-item-label">STATUS</div>
          <div class="spec-item-value">${project.status}</div>
        </div>
      </div>

      <div class="case-study-body-section">
        <h4><span>[01]</span> THE PROBLEM & CONTEXT</h4>
        <p>${project.problem}</p>
      </div>

      <div class="case-study-body-section">
        <h4><span>[02]</span> CORE CONCEPT & ARCHITECTURE</h4>
        <p>${project.concept}</p>
      </div>

      <div class="case-study-body-section">
        <h4><span>[03]</span> TECHNICAL SOLUTION</h4>
        <p>${project.solution}</p>
      </div>

      <div class="case-study-body-section">
        <h4><span>[04]</span> ENGINEERING PROCESS</h4>
        <ul>
          ${project.process.map(step => `<li style="margin-bottom: 6px;">${step}</li>`).join('')}
        </ul>
      </div>

      <div class="case-study-body-section">
        <h4><span>[05]</span> MEASURABLE RESULTS & IMPACT</h4>
        <p>${project.result}</p>
      </div>

      <div class="case-study-body-section">
        <h4><span>[06]</span> TECHNOLOGY STACK</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
          ${project.techStack.map(t => `<span class="project-stack-tag" style="font-size: 0.82rem; padding: 4px 12px;">${t}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 14px; margin-top: 32px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap;">
        <a href="${project.demoUrl}" class="cyber-btn solid">
          <span>RUN LIVE DEMO</span>
          <span>⚡</span>
        </a>
        <a href="${project.githubUrl}" target="_blank" rel="noopener" class="cyber-btn">
          <span>VIEW REPOSITORY</span>
          <span>↗</span>
        </a>
      </div>
    `;

    modal.classList.add('open');
  }

  closeCaseStudy() {
    const modal = document.getElementById('case-study-modal');
    if (modal) {
      modal.classList.remove('open');
      if (window.rohitAudio) window.rohitAudio.playClick();
    }
  }

  /* ------------------------------------------------------------------
     4. INTERACTIVE RESUME MODAL
     ------------------------------------------------------------------ */
  openResumeModal() {
    const modal = document.getElementById('resume-modal');
    const container = document.getElementById('resume-dossier-content');
    if (!modal || !container) return;

    if (window.rohitAudio) window.rohitAudio.playWarp();

    const id = this.data.identity.owner;
    const edu = this.data.education;
    const caps = this.data.capabilities;
    const projs = this.data.projects;

    container.innerHTML = `
      <div class="resume-print-header">
        <div>
          <h1 style="font-size: 2.2rem; margin-bottom: 4px;">${id.fullName}</h1>
          <div class="mono" style="color: var(--electric-blue); font-size: 0.95rem;">${id.title}</div>
          <div style="color: var(--text-secondary); font-size: 0.82rem; margin-top: 4px;">
            ${edu.institution} | ${edu.degree} | ${id.academicYear}
          </div>
        </div>
        <div class="mono" style="font-size: 0.78rem; text-align: right; color: var(--text-secondary);">
          <div>Email: ${this.data.transmission.recipientEmail}</div>
          <div>Location: ${id.location}</div>
          <div>GitHub: github.com/RohitXpert</div>
          <div>Instagram: @Rohit_garg2008</div>
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.15rem; color: var(--purple-energy); margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
          CAREER OBJECTIVE
        </h3>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.6;">
          First-year Computer Science & Engineering undergraduate specializing in Artificial Intelligence & Machine Learning (IBM collaborative curriculum) at JECRC University, Jaipur. Aiming to establish a career as an AI Developer by applying computational fundamentals, prompt architecture, and software engineering to construct impactful, intelligent applications.
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.15rem; color: var(--purple-energy); margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
          EDUCATION
        </h3>
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>${edu.institution}</span>
          <span class="mono">${edu.tenure}</span>
        </div>
        <div style="color: var(--electric-blue); font-size: 0.88rem;">${edu.degree} — ${edu.affiliation}</div>
        <ul style="padding-left: 20px; margin-top: 8px; font-size: 0.85rem; color: var(--text-secondary);">
          ${edu.coreModules.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.15rem; color: var(--purple-energy); margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
          CONFIRMED TECHNICAL CAPABILITIES
        </h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.85rem;">
          ${caps.map(c => `
            <div>
              <strong style="color: #fff;">${c.name}</strong> [${c.level}]:
              <span style="color: var(--text-secondary);">${c.tools.join(', ')}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 1.15rem; color: var(--purple-energy); margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px;">
          SELECTED PROJECTS & ARCHIVES
        </h3>
        ${projs.map(p => `
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-weight: 600;">
              <span>${p.title} (${p.status})</span>
              <span class="mono" style="font-size: 0.78rem;">${p.year}</span>
            </div>
            <div class="mono" style="font-size: 0.78rem; color: var(--electric-blue); margin-bottom: 4px;">Stack: ${p.techStack.join(' • ')}</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary);">${p.summary}</p>
          </div>
        `).join('')}
      </div>

      <div class="no-print" style="display: flex; justify-content: space-between; align-items: center; margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
        <button class="cyber-btn solid" onclick="window.print()">
          <span>PRINT / SAVE AS PDF</span>
          <span>🖨</span>
        </button>
        <button class="cyber-btn" onclick="rohitApp.closeResumeModal()">
          <span>CLOSE DOSSIER</span>
        </button>
      </div>
    `;

    modal.classList.add('open');
  }

  closeResumeModal() {
    const modal = document.getElementById('resume-modal');
    if (modal) {
      modal.classList.remove('open');
      if (window.rohitAudio) window.rohitAudio.playClick();
    }
  }

  /* ------------------------------------------------------------------
     5. SECTION SCROLL OBSERVER & PROGRESSIVE CORE EVOLUTION
     ------------------------------------------------------------------ */
  setupScrollObserver() {
    const sections = ['universe', 'identity', 'journey', 'capability', 'project-archive', 'mission-archive', 'transmission'];
    const navLinks = document.querySelectorAll('.hud-nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const sectionId = entry.target.id;
          this.updateActiveSection(sectionId);

          // Update active link in HUD
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${sectionId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: [0.3, 0.6]
    });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  updateActiveSection(sectionId) {
    this.activeSection = sectionId;
    if (!this.blackHole) return;

    switch (sectionId) {
      case 'universe':
        this.blackHole.setEvolutionState('HERO');
        break;
      case 'identity':
        this.blackHole.setEvolutionState('IDENTITY');
        break;
      case 'journey':
        this.blackHole.setEvolutionState('JOURNEY');
        break;
      case 'capability':
        this.blackHole.setEvolutionState('CAPABILITY');
        break;
      case 'project-archive':
        this.blackHole.setEvolutionState('PROJECTS');
        break;
      case 'mission-archive':
        this.blackHole.setEvolutionState('MISSIONS');
        break;
      case 'transmission':
        this.blackHole.setEvolutionState('TRANSMISSION');
        break;
    }

    // Update bottom HUD label
    const pill = document.getElementById('hud-section-pill');
    if (pill) {
      pill.textContent = `SECTOR: ${sectionId.toUpperCase().replace('-', '_')}`;
    }
  }

  /* ------------------------------------------------------------------
     6. PROFILE PHOTO INTERACTIVE REVEAL & UPLOAD
     ------------------------------------------------------------------ */
  setupProfilePhoto() {
    const frame = document.getElementById('portrait-display-frame');
    const fileInput = document.getElementById('portrait-file-input');
    const photoImg = document.getElementById('portrait-photo-element');
    const placeholder = document.getElementById('portrait-silhouette-placeholder');

    if (!frame) return;

    // Interactive silhouette toggle on click
    frame.addEventListener('click', () => {
      if (photoImg && photoImg.src && !photoImg.src.includes('data:,')) {
        placeholder.style.opacity = placeholder.style.opacity === '0' ? '1' : '0';
      } else if (fileInput) {
        fileInput.click();
      }
    });

    // File input change for custom photo insertion
    if (fileInput && photoImg) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            photoImg.src = event.target.result;
            photoImg.style.display = 'block';
            if (placeholder) placeholder.style.opacity = '0';
            if (window.rohitAudio) window.rohitAudio.playChime(640, 'sine', 0.2);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  /* ------------------------------------------------------------------
     7. TRANSMISSION TERMINAL ENCRYPTED FORM
     ------------------------------------------------------------------ */
  setupTransmissionForm() {
    const form = document.getElementById('transmission-contact-form');
    const statusBox = document.getElementById('transmission-status-feedback');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('tx-sender-name').value.trim();
      const email = document.getElementById('tx-sender-email').value.trim();
      const subject = document.getElementById('tx-sender-subject').value.trim() || 'Collaboration Directive';
      const message = document.getElementById('tx-sender-message').value.trim();

      if (!name || !email || !message) {
        if (statusBox) {
          statusBox.innerHTML = `<span style="color: #ef4444;">[ERR_INCOMPLETE_PAYLOAD] All telemetry fields are required.</span>`;
        }
        return;
      }

      // Simulated packet encryption & dispatch sequence
      if (statusBox) {
        statusBox.innerHTML = `
          <div style="color: var(--electric-blue);" class="mono">
            <div>[TRANSMITTING...] Encrypting packet with AES-256...</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Recipient: ${this.data.transmission.recipientEmail}</div>
          </div>
        `;
      }

      if (window.rohitAudio) window.rohitAudio.playTransmit();

      setTimeout(() => {
        if (statusBox) {
          statusBox.innerHTML = `
            <div style="color: #4ade80;" class="mono">
              <div>[TRANSMISSION_ACKNOWLEDGED] Message routed successfully!</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Direct copy prepared. Opening default mail client uplink...</div>
            </div>
          `;
        }

        // Open mailto client with pre-filled content
        const mailtoUrl = `mailto:${this.data.transmission.recipientEmail}?subject=${encodeURIComponent(`[ROHIT.OS] ${subject} - from ${name}`)}&body=${encodeURIComponent(`Sender: ${name} (${email})\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;

        form.reset();
      }, 1400);
    });
  }

  /* ------------------------------------------------------------------
     8. CUSTOM MAGNETIC CURSOR
     ------------------------------------------------------------------ */
  setupCursor() {
    const dot = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (!dot || !follower) return;

    window.addEventListener('mousemove', (e) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      follower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    }, { passive: true });

    // Magnetic hover states on buttons and links
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .cyber-card, .portrait-display-frame');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        if (window.rohitAudio) window.rohitAudio.playHover();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  /* ------------------------------------------------------------------
     9. HUD CONTROLS & EVENT BINDINGS
     ------------------------------------------------------------------ */
  setupInteractions() {
    this.setupProfilePhoto();
    this.setupTransmissionForm();

    // Sound Toggle Button
    const soundToggle = document.getElementById('hud-sound-toggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        if (window.rohitAudio) {
          const isEnabled = window.rohitAudio.toggleSound();
          this.updateSoundButtonUI(isEnabled);
        }
      });
    }

    // Performance Toggle Button
    const perfToggle = document.getElementById('hud-perf-toggle');
    if (perfToggle) {
      perfToggle.addEventListener('click', () => {
        if (window.perfMonitor) {
          const next = window.perfMonitor.mode === 'AUTO' ? 'HIGH' : (window.perfMonitor.mode === 'HIGH' ? 'ECO' : 'AUTO');
          window.perfMonitor.setMode(next);
        }
      });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeCaseStudy();
        this.closeResumeModal();
      });
    });

    // Close on backdrop clicks
    const csModal = document.getElementById('case-study-modal');
    if (csModal) {
      csModal.addEventListener('click', (e) => {
        if (e.target === csModal) this.closeCaseStudy();
      });
    }

    const resModal = document.getElementById('resume-modal');
    if (resModal) {
      resModal.addEventListener('click', (e) => {
        if (e.target === resModal) this.closeResumeModal();
      });
    }

    // Shutdown Button in Footer
    const shutdownBtn = document.getElementById('system-shutdown-trigger');
    if (shutdownBtn) {
      shutdownBtn.addEventListener('click', () => this.triggerShutdownSequence());
    }

    // Reboot Button in Shutdown Overlay
    const rebootBtn = document.getElementById('shutdown-reboot-btn');
    if (rebootBtn) {
      rebootBtn.addEventListener('click', () => this.triggerReboot());
    }
  }

  updateSoundButtonUI(isEnabled) {
    const btn = document.getElementById('hud-sound-toggle');
    const label = document.getElementById('hud-sound-label');
    if (btn && label) {
      if (isEnabled) {
        btn.classList.add('active');
        label.textContent = 'SOUND: ON';
      } else {
        btn.classList.remove('active');
        label.textContent = 'SOUND: OFF';
      }
    }
  }

  /* ------------------------------------------------------------------
     10. CINEMATIC SHUTDOWN & REBOOT SEQUENCE
     ------------------------------------------------------------------ */
  triggerShutdownSequence() {
    const shutdownScreen = document.getElementById('shutdown-overlay-screen');
    if (!shutdownScreen) return;

    if (window.rohitAudio) {
      window.rohitAudio.playWarp();
    }

    if (this.blackHole) {
      this.blackHole.setEvolutionState('SHUTDOWN');
    }

    shutdownScreen.classList.add('active');
  }

  triggerReboot() {
    const shutdownScreen = document.getElementById('shutdown-overlay-screen');
    if (shutdownScreen) {
      shutdownScreen.classList.remove('active');
    }

    const bootScreen = document.getElementById('boot-terminal-screen');
    if (bootScreen) {
      bootScreen.classList.remove('collapsing');
      bootScreen.style.display = 'flex';
      const logBox = document.getElementById('boot-log-container');
      if (logBox) logBox.innerHTML = '';
      this.bootComplete = false;
      this.runBootSequence();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.rohitApp = new RohitApp();
});
