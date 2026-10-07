/**
 * ROHIT.OS — AI CORE (BLACK HOLE SINGULARITY ENGINE)
 * Relativistic physics simulation:
 * - Central event horizon void
 * - Relativistic Doppler beaming (blue-shifted approaching limb)
 * - Photon sphere & gravitational lensing distortion
 * - 800+ relativistic orbiting matter particles in 3D projection
 * - Polar plasma jets & interactive cursor gravity
 * - 8-Phase progressive evolution across sections
 */

class BlackHoleCore {
  constructor(canvasId = 'canvas-blackhole') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    // Core parameters
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.targetCenterX = this.centerX;
    this.targetCenterY = this.centerY;
    
    // Physics & State
    this.radius = Math.min(this.width, this.height) * 0.12;
    this.tilt = 0.38; // Inclination of accretion disk
    this.rotationAngle = 0;
    this.particleCount = 750;
    this.particles = [];
    this.evolutionState = 'HERO'; // BOOT, HERO, IDENTITY, JOURNEY, CAPABILITY, PROJECTS, MISSIONS, TRANSMISSION, SHUTDOWN
    this.intensity = 1.0;
    
    // Cursor gravitational influence
    this.mouseX = this.centerX;
    this.mouseY = this.centerY;
    this.mouseVelocity = 0;
    this.lastMouseX = this.mouseX;
    this.lastMouseY = this.mouseY;
    this.cursorDist = 999;
    
    // Timing & animation
    this.lastTime = performance.now();
    this.animFrameId = null;
    this.pulseTime = 0;

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.startLoop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
    
    // Dynamic core sizing
    this.baseRadius = Math.max(55, Math.min(this.width, this.height) * 0.11);
    this.radius = this.baseRadius;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    window.addEventListener('mousemove', (e) => {
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.mouseVelocity = Math.sqrt(dx * dx + dy * dy);
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      const cdx = this.mouseX - this.centerX;
      const cdy = this.mouseY - this.centerY;
      this.cursorDist = Math.sqrt(cdx * cdx + cdy * cdy);

      // Subtle gravitational attraction of the core center towards the cursor
      const pullFactor = 0.07;
      this.targetCenterX = (this.width / 2) + (cdx * pullFactor);
      this.targetCenterY = (this.height / 2) + (cdy * pullFactor);
    }, { passive: true });
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(innerOnly = false) {
    const minR = this.radius * 1.15;
    const maxR = this.radius * (innerOnly ? 2.2 : 3.8);
    // Relativistic distribution: matter is denser closer to the event horizon (power law)
    const distT = Math.pow(Math.random(), 1.7);
    const orbitR = minR + distT * (maxR - minR);
    
    return {
      r: orbitR,
      theta: Math.random() * Math.PI * 2,
      speed: (0.012 + Math.random() * 0.02) * (this.radius / orbitR), // Keplerian orbit: faster near center
      size: 0.8 + Math.random() * 2.2,
      opacity: 0.2 + Math.random() * 0.75,
      hue: Math.random() > 0.45 ? 190 : 275, // Electric blue (190) or Purple (275)
      zOffset: (Math.random() - 0.5) * 14,
      tailLength: Math.floor(2 + Math.random() * 4)
    };
  }

  setEvolutionState(state) {
    this.evolutionState = state;
    switch (state) {
      case 'BOOT':
        this.intensity = 0.4;
        this.particleCount = 300;
        break;
      case 'HERO':
        this.intensity = 1.0;
        this.particleCount = 750;
        break;
      case 'IDENTITY':
        this.intensity = 0.85;
        this.targetCenterX = this.width * 0.35; // Positioned behind portrait aura
        break;
      case 'JOURNEY':
        this.intensity = 0.95;
        this.targetCenterX = this.width * 0.5;
        break;
      case 'CAPABILITY':
        this.intensity = 1.1;
        break;
      case 'PROJECTS':
        this.intensity = 0.8;
        this.targetCenterX = this.width * 0.65;
        break;
      case 'MISSIONS':
        this.intensity = 0.85;
        this.targetCenterX = this.width * 0.5;
        break;
      case 'TRANSMISSION':
        this.intensity = 1.25;
        this.targetCenterX = this.width * 0.5;
        break;
      case 'SHUTDOWN':
        this.intensity = 0.0;
        break;
    }
  }

  update(dt) {
    this.pulseTime += dt * 0.002;
    this.rotationAngle += 0.008 * this.intensity;

    // Smooth damping for core center position
    this.centerX += (this.targetCenterX - this.centerX) * 0.06;
    this.centerY += (this.targetCenterY - this.centerY) * 0.06;

    // Cursor acceleration factor
    const proximityBoost = Math.max(0, 1 - this.cursorDist / 400) * 1.5;
    const velocityBoost = Math.min(2.5, this.mouseVelocity * 0.05);
    const speedMultiplier = 1 + proximityBoost + velocityBoost;

    // Decay mouse velocity
    this.mouseVelocity *= 0.92;

    // Update particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.theta += p.speed * speedMultiplier * this.intensity;

      // Gravitational lensing gravitational draw if cursor is active
      if (this.cursorDist < 250) {
        p.r -= 0.15;
        if (p.r < this.radius * 1.08) {
          p.r = this.radius * (2.0 + Math.random() * 1.5);
        }
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.evolutionState === 'SHUTDOWN') {
      return; // Core collapsed
    }

    const cx = this.centerX;
    const cy = this.centerY;
    const r = this.radius;

    this.ctx.save();

    // 1. Polar Relativistic Energy Jets (top and bottom plasma beams)
    if (this.intensity > 0.5) {
      this.drawPolarJets(cx, cy, r);
    }

    // 2. Gravitational Lensing Outer Halo (Volumetric space warping)
    const haloGrad = this.ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 3.6);
    haloGrad.addColorStop(0, 'rgba(0, 240, 255, 0.28)');
    haloGrad.addColorStop(0.35, 'rgba(168, 85, 247, 0.18)');
    haloGrad.addColorStop(0.7, 'rgba(76, 29, 149, 0.06)');
    haloGrad.addColorStop(1, 'rgba(2, 2, 5, 0)');

    this.ctx.fillStyle = haloGrad;
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r * 3.6, 0, Math.PI * 2);
    this.ctx.fill();

    // 3. Render Background Particles (behind the event horizon)
    this.drawParticleAccretion(cx, cy, r, true);

    // 4. Gravitational Accretion Disk Ring (Back Upper Rim curved over the top by lensing)
    this.drawLensedAccretionRing(cx, cy, r);

    // 5. The Event Horizon Void (Pure Black Singularity)
    this.ctx.save();
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 24 * this.intensity;

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r, 0, Math.PI * 2);
    this.ctx.fillStyle = '#010103'; // Purest void black
    this.ctx.fill();
    this.ctx.restore();

    // 6. Photon Sphere (Razor-thin hyper-bright photon orbit ring)
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r * 1.04, 0, Math.PI * 2);
    this.ctx.lineWidth = 2.2;
    this.ctx.strokeStyle = `rgba(0, 240, 255, ${0.85 * this.intensity})`;
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 18;
    this.ctx.stroke();

    // Secondary subtle purple photon ring
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, r * 1.09, 0, Math.PI * 2);
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeStyle = `rgba(168, 85, 247, ${0.65 * this.intensity})`;
    this.ctx.shadowColor = '#a855f7';
    this.ctx.shadowBlur = 14;
    this.ctx.stroke();
    this.ctx.restore();

    // 7. Render Foreground Particles (in front of the event horizon)
    this.drawParticleAccretion(cx, cy, r, false);

    // 8. Relativistic Doppler Beaming Accent (Approaching side is significantly brighter)
    this.drawDopplerBeaming(cx, cy, r);

    this.ctx.restore();
  }

  drawParticleAccretion(cx, cy, r, isBack) {
    this.ctx.save();

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Calculate 3D projected elliptical coordinate
      const cosA = Math.cos(p.theta + this.rotationAngle);
      const sinA = Math.sin(p.theta + this.rotationAngle);

      // Only draw either front or back half based on Z-depth
      const isBehind = sinA < 0;
      if (isBack !== isBehind) continue;

      const px = cx + cosA * p.r;
      const py = cy + sinA * (p.r * this.tilt) + p.zOffset;

      // Doppler beaming intensity modulation: matter moving towards viewer (cosA < 0) is amplified
      const dopplerFactor = 1.0 - (cosA * 0.45);
      const alpha = Math.min(1, p.opacity * dopplerFactor * this.intensity);

      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size * (0.8 + dopplerFactor * 0.4), 0, Math.PI * 2);

      if (p.hue === 190) {
        this.ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        this.ctx.shadowColor = '#00f0ff';
      } else {
        this.ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        this.ctx.shadowColor = '#a855f7';
      }
      this.ctx.shadowBlur = 6 * dopplerFactor;
      this.ctx.fill();
    }

    this.ctx.restore();
  }

  drawLensedAccretionRing(cx, cy, r) {
    this.ctx.save();
    
    // Accretion disk arch curving over the top of the event horizon due to extreme spacetime curvature
    this.ctx.beginPath();
    this.ctx.ellipse(cx, cy - r * 0.12, r * 2.3, r * 0.95, -0.06, Math.PI * 1.05, Math.PI * 1.95);
    this.ctx.lineWidth = 14;
    
    const ringGrad = this.ctx.createLinearGradient(cx - r * 2, cy, cx + r * 2, cy);
    ringGrad.addColorStop(0, 'rgba(0, 240, 255, 0.85)'); // Bright approaching limb
    ringGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.45)');
    ringGrad.addColorStop(1, 'rgba(76, 29, 149, 0.15)'); // Dim receding limb

    this.ctx.strokeStyle = ringGrad;
    this.ctx.shadowColor = '#00f0ff';
    this.ctx.shadowBlur = 22;
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawDopplerBeaming(cx, cy, r) {
    this.ctx.save();
    // Relativistic blue-shift hotspot on the left limb
    const spotX = cx - r * 1.25;
    const spotY = cy;
    const spotR = r * 0.7;

    const spotGrad = this.ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, spotR);
    spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
    spotGrad.addColorStop(0.3, 'rgba(0, 240, 255, 0.5)');
    spotGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.15)');
    spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    this.ctx.fillStyle = spotGrad;
    this.ctx.beginPath();
    this.ctx.arc(spotX, spotY, spotR, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawPolarJets(cx, cy, r) {
    this.ctx.save();
    const jetLength = r * 3.2;
    const pulse = 1 + Math.sin(this.pulseTime * 3) * 0.15;

    // Upward beam
    const jetUp = this.ctx.createLinearGradient(cx, cy - r * 0.5, cx, cy - jetLength);
    jetUp.addColorStop(0, 'rgba(0, 240, 255, 0.6)');
    jetUp.addColorStop(0.4, 'rgba(168, 85, 247, 0.25)');
    jetUp.addColorStop(1, 'rgba(0, 240, 255, 0)');

    this.ctx.fillStyle = jetUp;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - 5, cy - r * 0.5);
    this.ctx.lineTo(cx + 5, cy - r * 0.5);
    this.ctx.lineTo(cx + 25 * pulse, cy - jetLength);
    this.ctx.lineTo(cx - 25 * pulse, cy - jetLength);
    this.ctx.closePath();
    this.ctx.fill();

    // Downward beam
    const jetDown = this.ctx.createLinearGradient(cx, cy + r * 0.5, cx, cy + jetLength);
    jetDown.addColorStop(0, 'rgba(0, 240, 255, 0.6)');
    jetDown.addColorStop(0.4, 'rgba(168, 85, 247, 0.25)');
    jetDown.addColorStop(1, 'rgba(0, 240, 255, 0)');

    this.ctx.fillStyle = jetDown;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - 5, cy + r * 0.5);
    this.ctx.lineTo(cx + 5, cy + r * 0.5);
    this.ctx.lineTo(cx + 25 * pulse, cy + jetLength);
    this.ctx.lineTo(cx - 25 * pulse, cy + jetLength);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  startLoop() {
    const loop = (currentTime) => {
      const dt = currentTime - this.lastTime;
      this.lastTime = currentTime;
      
      this.update(dt);
      this.draw();

      this.animFrameId = requestAnimationFrame(loop);
    };
    this.animFrameId = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }
}

window.BlackHoleCore = BlackHoleCore;
