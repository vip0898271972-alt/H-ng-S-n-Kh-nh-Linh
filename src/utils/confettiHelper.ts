import confetti from 'canvas-confetti';

// Celebratory wedding confetti with hearts and gold ribbons
export const fireWeddingConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.75 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Multi-tier burst with warm wedding colors
  fire(0.25, {
    spread: 30,
    startVelocity: 60,
    colors: ['#D4AF37', '#FFD700', '#F3E5AB'], // Gold
  });
  fire(0.2, {
    spread: 60,
    colors: ['#E11D48', '#FDA4AF', '#BE123C'], // Rose pink / ruby
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#FFF8DC', '#F5DEB3', '#FFE4E1'], // Champagne & pearl
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#D4AF37', '#9B2C2C', '#FFFFFF'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#B8860B', '#E5A93C'],
  });
};

// Side cannons for extra grand entrances
export const fireGrandSalute = () => {
  const end = Date.now() + 1.2 * 1000;
  const colors = ['#D4AF37', '#9B2C2C', '#FFE4B5', '#FFF0F5'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.8 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.8 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
