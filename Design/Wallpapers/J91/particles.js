// Generate particles
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.querySelector('.particles');
    const binaryContainer = document.createElement('div');
    
    // Create 50 particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // Random delay
      const delay = Math.random() * 10;
      
      particle.style.left = `${left}%`;
      particle.style.top = `${top}%`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainer.appendChild(particle);
    }
    
    // Create binary text elements
    for (let i = 0; i < 20; i++) {
      const binary = document.createElement('div');
      binary.className = 'binary';
      
      // Generate random binary string
      let binaryText = '';
      for (let j = 0; j < 8; j++) {
        binaryText += Math.round(Math.random());
      }
      
      binary.textContent = binaryText;
      
      // Random position
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      binary.style.left = `${left}%`;
      binary.style.top = `${top}%`;
      
      document.querySelector('.container-fluid').appendChild(binary);
    }
    
    // Create hexagons
    for (let i = 0; i < 10; i++) {
      const hexagon = document.createElement('div');
      hexagon.className = 'hexagon';
      
      // Random position
      const left = Math.random() * 90;
      const top = Math.random() * 90;
      
      hexagon.style.left = `${left}%`;
      hexagon.style.top = `${top}%`;
      
      document.querySelector('.container-fluid').appendChild(hexagon);
    }
    
    // Update timestamp
    function updateTime() {
      const now = new Date();
      const timestamp = document.querySelector('.timestamp');
      timestamp.textContent = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
      setTimeout(updateTime, 1000);
    }
    
    updateTime();
  });