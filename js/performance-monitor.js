/**
 * ROHIT.OS — ADAPTIVE PERFORMANCE CONTROLLER
 * Real-time FPS detection, automated hardware tiering, and Eco/High mode management.
 */

class PerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.mode = 'AUTO'; // AUTO, HIGH, ECO
    this.currentTier = 'HIGH'; // HIGH, LOW
    this.fpsHistory = [];
    this.maxHistory = 40;
    this.isReducedMotion = false;

    this.init();
  }

  init() {
    this.checkReducedMotionPreference();
    this.startFpsLoop();
  }

  checkReducedMotionPreference() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      this.setReducedMotion(true);
    }
    mediaQuery.addEventListener('change', (e) => {
      this.setReducedMotion(e.matches);
    });
  }

  setReducedMotion(enabled) {
    this.isReducedMotion = enabled;
    if (enabled) {
      document.body.classList.add('reduced-motion');
      if (window.rohitBlackHole) window.rohitBlackHole.particleCount = 150;
      if (window.rohitStarfield) window.rohitStarfield.starCount = 100;
    } else {
      document.body.classList.remove('reduced-motion');
      this.applyTierSettings(this.currentTier);
    }
  }

  setMode(mode) {
    this.mode = mode;
    if (mode === 'HIGH') {
      this.currentTier = 'HIGH';
      this.applyTierSettings('HIGH');
    } else if (mode === 'ECO') {
      this.currentTier = 'LOW';
      this.applyTierSettings('LOW');
    }
    this.updateHudLabel();
  }

  applyTierSettings(tier) {
    if (this.isReducedMotion) return;

    if (tier === 'LOW') {
      if (window.rohitBlackHole) {
        window.rohitBlackHole.particleCount = 350;
        window.rohitBlackHole.createParticles();
      }
      if (window.rohitStarfield) {
        window.rohitStarfield.starCount = 180;
        window.rohitStarfield.generateStars();
      }
    } else {
      if (window.rohitBlackHole) {
        window.rohitBlackHole.particleCount = 750;
        window.rohitBlackHole.createParticles();
      }
      if (window.rohitStarfield) {
        window.rohitStarfield.starCount = 380;
        window.rohitStarfield.generateStars();
      }
    }
  }

  startFpsLoop() {
    const loop = (now) => {
      this.frameCount++;
      const elapsed = now - this.lastTime;

      if (elapsed >= 500) {
        this.fps = Math.round((this.frameCount * 1000) / elapsed);
        this.frameCount = 0;
        this.lastTime = now;

        this.fpsHistory.push(this.fps);
        if (this.fpsHistory.length > this.maxHistory) {
          this.fpsHistory.shift();
        }

        if (this.mode === 'AUTO') {
          const avgFps = this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length;
          if (avgFps < 34 && this.currentTier === 'HIGH') {
            this.currentTier = 'LOW';
            this.applyTierSettings('LOW');
            this.updateHudLabel();
          } else if (avgFps > 52 && this.currentTier === 'LOW') {
            this.currentTier = 'HIGH';
            this.applyTierSettings('HIGH');
            this.updateHudLabel();
          }
        }

        const fpsEl = document.getElementById('hud-fps-indicator');
        if (fpsEl) {
          fpsEl.textContent = `${this.fps} FPS`;
        }
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  updateHudLabel() {
    const badge = document.getElementById('hud-perf-badge');
    if (badge) {
      badge.textContent = `${this.mode} [${this.currentTier}]`;
    }
  }
}

window.perfMonitor = new PerformanceMonitor();
