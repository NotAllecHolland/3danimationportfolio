class EffectAnimator {
  constructor() {
    this.effects = [
      'flip-x',
      'flip-y', 
      'rotate-3d',
      'tilt-left',
      'tilt-right',
      'scale-pulse',
      'swing',
      'wobble',
      'rubber-band',
      'flip-diagonal'
    ];
    
    this.lastEffects = new Map();
    this.init();
  }
  
  init() {
    this.buttons = document.querySelectorAll('.effect-btn');
    this.resetBtn = document.getElementById('reset-btn');
    
    this.buttons.forEach((button, index) => {
      button.addEventListener('click', () => this.applyRandomEffect(button, index));
      // Add keyboard support
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.applyRandomEffect(button, index);
        }
      });
    });
    
    this.resetBtn.addEventListener('click', () => this.resetAll());
    
    // Add subtle entrance animation
    this.buttons.forEach((button, index) => {
      button.style.opacity = '0';
      button.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        button.style.transition = 'all 0.5s ease';
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, index * 100);
    });
  }
  
  applyRandomEffect(button, buttonIndex) {
    // Remove any existing effect
    this.clearEffects(button);
    
    // Get random effect that's different from the last one
    let randomEffect;
    do {
      randomEffect = this.effects[Math.floor(Math.random() * this.effects.length)];
    } while (randomEffect === this.lastEffects.get(buttonIndex));
    
    this.lastEffects.set(buttonIndex, randomEffect);
    
    // Add the new effect
    button.classList.add(randomEffect);
    
    // Add visual feedback
    this.addVisualFeedback(button);
    
    // Auto-remove the effect after animation completes
    setTimeout(() => {
      button.classList.remove(randomEffect);
    }, this.getAnimationDuration(randomEffect));
  }
  
  clearEffects(button) {
    this.effects.forEach(effect => {
      button.classList.remove(effect);
    });
  }
  
  resetAll() {
    this.buttons.forEach(button => {
      this.clearEffects(button);
      button.style.animation = '';
    });
    this.lastEffects.clear();
    
    // Add reset feedback
    this.resetBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.resetBtn.style.transform = 'scale(1)';
    }, 100);
  }
  
  addVisualFeedback(button) {
    // Create temporary glow effect
    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.top = '0';
    glow.style.left = '0';
    glow.style.width = '100%';
    glow.style.height = '100%';
    glow.style.borderRadius = '10px';
    glow.style.background = 'rgba(255, 255, 255, 0.2)';
    glow.style.opacity = '1';
    glow.style.transition = 'opacity 0.5s ease';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '0';
    
    button.appendChild(glow);
    
    setTimeout(() => {
      glow.style.opacity = '0';
      setTimeout(() => {
        if (glow.parentNode) {
          glow.parentNode.removeChild(glow);
        }
      }, 500);
    }, 50);
  }
  
  getAnimationDuration(effect) {
    // Return animation duration in milliseconds
    const durations = {
      'flip-x': 1000,
      'flip-y': 1000,
      'rotate-3d': 1500,
      'tilt-left': 1000,
      'tilt-right': 1000,
      'scale-pulse': 1000,
      'swing': 1200,
      'wobble': 1000,
      'rubber-band': 1000,
      'flip-diagonal': 1200
    };
    
    return durations[effect] || 1000;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new EffectAnimator();
  
  // Add subtle background animation
  const container = document.querySelector('body');
  container.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    container.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, 
      rgba(255, 255, 255, 0.02), 
      transparent 80%), 
      linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)`;
  });
});

// Performance optimization for mobile
if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', (e) => {
    // Reduce animations on mobile for better performance
    document.body.classList.add('mobile-device');
  });
}

// Add CSS for mobile optimization
const style = document.createElement('style');
style.innerHTML = `
  .mobile-device .effect-btn {
    transform-style: flat;
  }
  
  .mobile-device .effect-btn:hover {
    transform: none;
  }
`;
document.head.appendChild(style);