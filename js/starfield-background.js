/**
 * ROHIT.OS — VOLUMETRIC COSMOS & STARFIELD ENGINE
 * - Multi-depth parallax star layers
 * - Cybernetic 3D perspective horizon grid
 * - Deep space atmospheric volumetric dust & nebula
 * - Gravitational distortion reacting to mouse & black hole center
 * - Warp burst mode for boot and section jumps
 * - INTERACTIVE TOUCH/CLICK STAR BURST ENGINE:
 *   Spawns glowing 4-pointed cosmic stars, diamond sparkles, and gravitational ripples on touch!
 */

class StarfieldBackground {
  constructor(canvasId = 'canvas-cosmos') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.stars = [];
    this.starCount = 380;
    this.warpMode = false;
    this.warpSpeed = 1;
    this.mouseParallaxX = 0;
    this.mouseParallaxY = 0;

    // Interactive Touch Star Particle Arrays
    this.touchStars = [];
    this.touchRipples = [];
    this.isPointerDown = false;
    this.lastTouchTime = 0;

    this.gridYOffset = 0;
    this.lastTime = performance.now();
    this.animFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    this.generateStars();
    this.bindEvents();
    this.startLoop();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    // Smooth background parallax with mouse
    window.addEventListener('mousemove', (e) => {
      this.mouseParallaxX = (e.clientX - this.width / 2) * 0.04;
      this.mouseParallaxY = (e.clientY - this.height / 2) * 0.04;
    }, { passive: true });

    // -------------------------------------------------------------
    // TOUCH & POINTER INTERACTIVITY — SPAWN STARS ON TOUCH!
    // -------------------------------------------------------------
    
    // 1. Touch Start (Mobile & Tablet multi-finger support)
    window.addEventListener('touchstart', (e) => {
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        this.spawnTouchStars(touch.clientX, touch.clientY, 18, 1.2);
      }
    }, { passive: true });

    // 2. Touch Move (Spawns a glittering trail of cosmic stars as finger drags)
    window.addEventListener('touchmove', (e) => {
      const now = performance.now();
      if (now - this.lastTouchTime > 35) { // Throttle slightly for silky 60fps
        this.lastTouchTime = now;
        for (let i = 0; i < e.touches.length; i++) {
          const touch = e.touches[i];
          this.spawnTouchStars(touch.clientX, touch.clientY, 4, 0.6);
        }
      }
    }, { passive: true });

    // 3. Pointer Down (Desktop mouse click, stylus, or pen tap)
    window.addEventListener('pointerdown', (e) => {
      this.isPointerDown = true;
      this.spawnTouchStars(e.clientX, e.clientY, 16, 1.1);
    }, { passive: true });

    window.addEventListener('pointerup', () => {
      this.isPointerDown = false;
    }, { passive: true });

    // 4. Pointer Move (Trail while dragging mouse)
    window.addEventListener('pointermove', (e) => {
      if (this.isPointerDown) {
        const now = performance.now();
        if (now - this.lastTouchTime > 40) {
          this.lastTouchTime = now;
          this.spawnTouchStars(e.clientX, e.clientY, 3, 0.5);
        }
      }
    }, { passive: true });
  }

  /**
   * Spawns an explosion of radiant 4-pointed diamond stars and energy sparkles
   * at the exact screen coordinates where the user touched or clicked!
   */
  spawnTouchStars(x, y, count = 16, velocityScale = 1.0) {
    if (x === undefined || y === undefined) return;

    // Trigger procedural audio crystal chime
    if (window.rohitAudio && window.rohitAudio.isEnabled) {
      window.rohitAudio.playStarSparkle();
    }

    // 1. Expanding Gravitational Ripple
    this.touchRipples.push({
      x,
      y,
      radius: 4,
      maxRadius: 45 + Math.random() * 35,
      alpha: 0.8,
      speed: 2.2 * velocityScale,
      color: Math.random() > 0.5 ? '#00f0ff' : '#a855f7'
    });

    // Color palette for radiant cosmic stars
    const starColors = [
      '#00f0ff', // Electric blue
      '#38bdf8', // Cyan
      '#c084fc', // Bright purple
      '#a855f7', // Neon purple
      '#ffffff', // Pure white
      '#fde047'  // Cosmic gold
    ];

    // 2. Spawn 4-pointed radiant stars and glowing embers
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (2.0 + Math.random() * 6.5) * velocityScale;
      const chosenColor = starColors[Math.floor(Math.random() * starColors.length)];

      this.touchStars.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (0.4 + Math.random() * 0.8), // Slight upward anti-gravity drift
        size: 7 + Math.random() * 14,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.12,
        color: chosenColor,
        life: 1.0,
        decay: 0.016 + Math.random() * 0.022,
        scalePulse: Math.random() * Math.PI * 2,
        isMajorStar: i % 3 === 0 // 1 in 3 is a large, razor-sharp 4-pointed cosmic star
      });
    }

    // Keep memory clean (cap maximum active touch particles at 250)
    if (this.touchStars.length > 250) {
      this.touchStars.splice(0, this.touchStars.length - 250);
    }
  }

  generateStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: (Math.random() - 0.5) * this.width * 2,
        y: (Math.random() - 0.5) * this.height * 2,
        z: Math.random() * 1000 + 1,
        baseSize: Math.random() * 1.5 + 0.5,
        color: Math.random() > 0.8 ? '#00f0ff' : (Math.random() > 0.85 ? '#c084fc' : '#ffffff'),
        alpha: Math.random() * 0.8 + 0.2
      });
    }
  }

  triggerWarp(durationMs = 1200) {
    this.warpMode = true;
    this.warpSpeed = 16;
    setTimeout(() => {
      this.warpMode = false;
      this.warpSpeed = 1;
    }, durationMs);
  }

  update(dt) {
    const speed = (this.warpMode ? 28 : 0.6) * (dt / 16.6);
    this.gridYOffset = (this.gridYOffset + speed * 0.5) % 40;

    // 1. Update background star field
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.z -= speed;

      if (star.z <= 0) {
        star.z = 1000;
        star.x = (Math.random() - 0.5) * this.width * 2;
        star.y = (Math.random() - 0.5) * this.height * 2;
      }
    }

    // 2. Update interactive touch stars
    for (let i = this.touchStars.length - 1; i >= 0; i--) {
      const p = this.touchStars[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95; // Atmospheric friction
      p.vy *= 0.95;
      p.angle += p.vAngle;
      p.scalePulse += 0.14;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.touchStars.splice(i, 1);
      }
    }

    // 3. Update touch ripples
    for (let i = this.touchRipples.length - 1; i >= 0; i--) {
      const r = this.touchRipples[i];
      r.radius += r.speed;
      r.alpha = Math.max(0, 1 - (r.radius / r.maxRadius));

      if (r.radius >= r.maxRadius || r.alpha <= 0) {
        this.touchRipples.splice(i, 1);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Deep Space Cosmic Nebular Atmospheric Fog
    const nebulaGrad = this.ctx.createRadialGradient(
      this.width * 0.3 + this.mouseParallaxX, 
      this.height * 0.4 + this.mouseParallaxY, 
      50, 
      this.width * 0.5, 
      this.height * 0.5, 
      this.width * 0.7
    );
    nebulaGrad.addColorStop(0, 'rgba(168, 85, 247, 0.045)');
    nebulaGrad.addColorStop(0.4, 'rgba(0, 240, 255, 0.025)');
    nebulaGrad.addColorStop(1, 'rgba(2, 2, 5, 0)');
    
    this.ctx.fillStyle = nebulaGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Subtle Cybernetic Perspective Ground Horizon Grid
    this.drawPerspectiveGrid();

    // 3. Volumetric 3D Stars with Relativistic Depth Projection
    const cx = this.width / 2 + this.mouseParallaxX;
    const cy = this.height / 2 + this.mouseParallaxY;

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const k = 400 / star.z;
      const px = star.x * k + cx;
      const py = star.y * k + cy;

      if (px < 0 || px >= this.width || py < 0 || py >= this.height) continue;

      const size = Math.max(0.6, (1 - star.z / 1000) * star.baseSize * (this.warpMode ? 2.5 : 1));
      const alpha = (1 - star.z / 1000) * star.alpha;

      this.ctx.save();
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = Math.min(1, alpha);

      if (this.warpMode) {
        // Warp streak trails pointing to singularity
        const prevK = 400 / (star.z + 40);
        const prevX = star.x * prevK + cx;
        const prevY = star.y * prevK + cy;

        this.ctx.beginPath();
        this.ctx.moveTo(px, py);
        this.ctx.lineTo(prevX, prevY);
        this.ctx.lineWidth = size * 1.5;
        this.ctx.strokeStyle = star.color;
        this.ctx.stroke();
      } else {
        this.ctx.beginPath();
        this.ctx.arc(px, py, size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    // 4. DRAW EXPANDING TOUCH RIPPLES
    this.drawTouchRipples();

    // 5. DRAW RADIANT 4-POINTED TOUCH STARS
    this.drawTouchStars();
  }

  drawTouchRipples() {
    if (this.touchRipples.length === 0) return;

    this.ctx.save();
    for (let i = 0; i < this.touchRipples.length; i++) {
      const r = this.touchRipples[i];
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = r.color;
      this.ctx.globalAlpha = r.alpha * 0.7;
      this.ctx.lineWidth = 1.5;
      this.ctx.shadowColor = r.color;
      this.ctx.shadowBlur = 10;
      this.ctx.stroke();
    }
    this.ctx.restore();
  }

  drawTouchStars() {
    if (this.touchStars.length === 0) return;

    this.ctx.save();
    for (let i = 0; i < this.touchStars.length; i++) {
      const p = this.touchStars[i];
      const alpha = Math.max(0, p.life);
      const pulse = 1.0 + Math.sin(p.scalePulse) * 0.25;
      const currentRadius = p.size * pulse * p.life;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      this.ctx.globalAlpha = alpha;

      // Glow aura
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 14;

      if (p.isMajorStar) {
        // Draw 4-pointed radiant cosmic diamond star
        this.drawFourPointStar(0, 0, currentRadius, currentRadius * 0.22, p.color);
      } else {
        // Draw brilliant glowing circular spark
        this.ctx.beginPath();
        this.ctx.arc(0, 0, Math.max(1, currentRadius * 0.4), 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.fill();

        // White hot center
        this.ctx.beginPath();
        this.ctx.arc(0, 0, Math.max(0.5, currentRadius * 0.18), 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
      }

      this.ctx.restore();
    }
    this.ctx.restore();
  }

  drawFourPointStar(cx, cy, outerRadius, innerRadius, color) {
    const rays = 4;
    this.ctx.beginPath();
    for (let i = 0; i < rays * 2; i++) {
      const rad = (i * Math.PI) / rays;
      const dist = (i % 2 === 0) ? outerRadius : innerRadius;
      const x = cx + Math.cos(rad) * dist;
      const y = cy + Math.sin(rad) * dist;
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();

    // Pure brilliant white singularity core
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, innerRadius * 0.5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fill();
  }

  drawPerspectiveGrid() {
    this.ctx.save();
    const horizon = this.height * 0.72;
    const gridCols = 18;
    const spacing = this.width / gridCols;

    this.ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
    this.ctx.lineWidth = 1;

    // Vanishing perspective rays from center horizon
    for (let i = -gridCols; i <= gridCols * 2; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.width / 2, horizon);
      this.ctx.lineTo(i * spacing, this.height);
      this.ctx.stroke();
    }

    // Horizontal perspective rungs with exponential spacing
    for (let y = horizon + 5; y < this.height; y += Math.pow((y - horizon) * 0.35, 1.25) + 6) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

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
}

window.StarfieldBackground = StarfieldBackground;
