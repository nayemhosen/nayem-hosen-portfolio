// ===================================
// TYPING ANIMATION
// ===================================

const typingText = document.getElementById('typing-text');
const texts = [
    'Python & Django Developer',
    'Backend Specialist',
    'API Architect',
    'Full-Stack Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// SMOOTH SCROLLING FOR NAVIGATION
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-category')) {
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 300);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // About section
    const aboutText = document.querySelector('.about-text');
    const skillsGrid = document.querySelector('.skills-grid');
    if (aboutText) observer.observe(aboutText);
    if (skillsGrid) observer.observe(skillsGrid);
    
    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.15}s`;
        observer.observe(category);
    });
    
    // Timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
    
    // Contact section
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    if (contactInfo) observer.observe(contactInfo);
    if (contactForm) observer.observe(contactForm);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactFormElement = document.getElementById('contact-form');

contactFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactFormElement);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission (replace with actual backend call)
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    const submitBtn = contactFormElement.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.background = 'var(--gradient-primary)';
    submitBtn.style.borderColor = 'transparent';
    
    // Reset form
    contactFormElement.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'transparent';
        submitBtn.style.borderColor = 'var(--neon-blue)';
    }, 3000);
});

// ===================================
// PARTICLE EFFECT ON MOUSE MOVE (OPTIONAL)
// ===================================

let particles = [];
const maxParticles = 50;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.life = 100;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.2) this.size -= 0.05;
    }
}

// Create canvas for particles
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '999';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Only create particles on hero section
let isInHero = false;

document.addEventListener('mousemove', (e) => {
    const heroSection = document.getElementById('hero');
    const heroRect = heroSection.getBoundingClientRect();
    isInHero = e.clientY >= heroRect.top && e.clientY <= heroRect.bottom;
    
    if (isInHero && particles.length < maxParticles) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        
        ctx.fillStyle = `rgba(0, 243, 255, ${p.life / 100})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===================================
// ACTIVE NAVIGATION LINK
// ===================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = 'var(--text-secondary)';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--neon-blue)';
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// CURSOR GLOW EFFECT
// ===================================

const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0, 243, 255, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    opacity: 0;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ===================================
// INITIALIZE SKILL BARS
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Set initial width to 0 for animation
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    progressBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Hello, Developer!', 'color: #00f3ff; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to my portfolio. Feel free to explore the code!', 'color: #b537f2; font-size: 14px;');
console.log('%c💼 Looking for a Python/Django developer? Let\'s connect!', 'color: #00ff88; font-size: 14px;');
