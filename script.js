document.addEventListener('DOMContentLoaded', () => {

  // --- Tab Switching ---
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === target) {
          pane.classList.add('active');
        }
      });
    });
  });

  // --- Scroll Animations ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

  // --- Radial Organization Graph Logic ---
  const container = document.getElementById('radial-container');
  if (container) {
    const cards = document.querySelectorAll('.radial-card');
    const svgLines = document.getElementById('radial-lines');
    
    const drawRadialLayout = () => {
      // Clear existing lines
      svgLines.innerHTML = '';
      
      if (window.innerWidth <= 768) {
        // Mobile layout
        cards.forEach(card => {
          card.style.left = 'auto';
          card.style.top = 'auto';
        });
        return;
      }

      // Desktop Layout - Perfect Circle
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const radius = 280; // Fixed radius for a perfect circle

      const angleStep = (2 * Math.PI) / cards.length;
      // Start at -90deg (top) or adjust starting angle
      const startAngle = -Math.PI / 2; 

      cards.forEach((card, index) => {
        const angle = startAngle + (index * angleStep);
        const targetX = centerX + radius * Math.cos(angle);
        const targetY = centerY + radius * Math.sin(angle);
        
        card.style.left = `${targetX}px`;
        card.style.top = `${targetY}px`;
        
        // Draw SVG Line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX);
        line.setAttribute('y1', centerY);
        line.setAttribute('x2', targetX);
        line.setAttribute('y2', targetY);
        svgLines.appendChild(line);
      });
    };

    drawRadialLayout();
    window.addEventListener('resize', drawRadialLayout);
  }

  // --- Dark/Light Mode Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
      } else {
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // --- Water Text Hover Effect ---
  const waterName = document.getElementById('water-name');
  if (waterName) {
    waterName.addEventListener('mousemove', (e) => {
      const rect = waterName.getBoundingClientRect();
      const x = e.clientX - rect.left;
      let percentage = (x / rect.width) * 100;
      
      // Add a slight threshold so it completely fills/unfills near edges
      if (percentage < 2) percentage = 0;
      if (percentage > 98) percentage = 100;
      
      waterName.style.setProperty('--water-fill', `${percentage}%`);
    });
    
    waterName.addEventListener('mouseleave', () => {
      waterName.style.setProperty('--water-fill', `0%`);
    });
  }

  // --- Resume Button Animation ---
  const resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      resumeBtn.classList.remove('fly');
      // Trigger reflow to restart animation
      void resumeBtn.offsetWidth;
      resumeBtn.classList.add('fly');
      
      setTimeout(() => {
        resumeBtn.classList.remove('fly');
      }, 800);
    });
  }
});
