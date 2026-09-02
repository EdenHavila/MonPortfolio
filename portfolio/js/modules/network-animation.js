/**
 * network-animation.js
 * Anime un léger graphe de nœuds connectés dans le panneau visuel du hero,
 * avec un balayage radar très discret. Respecte prefers-reduced-motion.
 */

const getThemeAccentRgb = () => {
  const computed = getComputedStyle(document.body || document.documentElement);
  return computed.getPropertyValue('--accent-rgb').trim() || '34, 197, 94';
};

const CONFIG = {
  nodeCountDesktop: 26,
  nodeCountMobile: 16,
  mobileBreakpoint: 400,
  linkDistance: 130,
  nodeSpeed: 0.12,
  nodeRadiusMin: 1.1,
  nodeRadiusRange: 1.4,
  sweepSpeed: 0.0025,
  linkColor: (alpha) => `rgba(148, 163, 184, ${alpha})`,
  getNodeColor: () => `rgba(${getThemeAccentRgb()}, 0.55)`,
  getSweepColor: (alpha) => `rgba(${getThemeAccentRgb()}, ${alpha})`,
};

export function initNetworkAnimation(canvasId = 'netCanvas') {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, nodes, sweepAngle = 0;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createNodes() {
    const count = width < CONFIG.mobileBreakpoint
      ? CONFIG.nodeCountMobile
      : CONFIG.nodeCountDesktop;

    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * CONFIG.nodeSpeed,
      vy: (Math.random() - 0.5) * CONFIG.nodeSpeed,
      r: Math.random() * CONFIG.nodeRadiusRange + CONFIG.nodeRadiusMin,
    }));
  }

  function updateNodes() {
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;
    });
  }

  function drawLinks() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < CONFIG.linkDistance) {
          ctx.strokeStyle = CONFIG.linkColor((1 - dist / CONFIG.linkDistance) * 0.18);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
  }

  function drawNodes() {
    nodes.forEach((n) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = CONFIG.getNodeColor();
      ctx.fill();
    });
  }

  function drawSweep() {
    if (reduceMotion || !ctx.createConicGradient) return;

    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.max(width, height);
    const gradient = ctx.createConicGradient(sweepAngle, cx, cy);
    gradient.addColorStop(0, CONFIG.getSweepColor(0.12));
    gradient.addColorStop(0.04, CONFIG.getSweepColor(0));
    gradient.addColorStop(1, CONFIG.getSweepColor(0));

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.restore();

    sweepAngle += CONFIG.sweepSpeed;
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);
    updateNodes();
    drawLinks();
    drawNodes();
    drawSweep();
    requestAnimationFrame(frame);
  }

  function setup() {
    resize();
    createNodes();
  }

  window.addEventListener('resize', setup);
  setup();
  frame();
}
