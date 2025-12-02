// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const langToggle = document.getElementById('langToggle');
const backToTop = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');

// Current language state (true for Arabic, false for English)
let currentLang = true; // Default to Arabic

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Toggle language function
function toggleLanguage() {
    currentLang = !currentLang;
    
    // Update button text
    langToggle.textContent = currentLang ? 'EN' : 'AR';
    
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar], [data-en]').forEach(element => {
        if (currentLang) {
            // Switch to Arabic
            if (element.hasAttribute('data-ar')) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.nextElementSibling.textContent = element.getAttribute('data-ar');
                } else {
                    element.textContent = element.getAttribute('data-ar');
                }
            }
        } else {
            // Switch to English
            if (element.hasAttribute('data-en')) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.nextElementSibling.textContent = element.getAttribute('data-en');
                } else {
                    element.textContent = element.getAttribute('data-en');
                }
            }
        }
    });
    
    // Update direction of the page
    document.documentElement.dir = currentLang ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang ? 'ar' : 'en';
}

// Initialize language toggle
langToggle.addEventListener('click', toggleLanguage);

// Back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show an alert and reset the form
    const successMessage = currentLang 
        ? `شكرًا ${name}، تم استلام رسالتك وسيتم الرد عليك قريبًا!` 
        : `Thank you ${name}, your message has been received and we'll respond soon!`;
    
    alert(successMessage);
    contactForm.reset();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize tooltips for social links
document.querySelectorAll('.footer-social a, .contact-item a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const platform = this.querySelector('i').className.split(' ')[1].replace('fa-', '');
        const tooltipText = currentLang 
            ? `زيارة ${platform === 'instagram' ? 'إنستجرام' : platform === 'facebook' ? 'فيسبوك' : 'الموقع'}`
            : `Visit ${platform}`;
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'var(--dark-color)';
        tooltip.style.color = 'white';
        tooltip.style.padding = '5px 10px';
        tooltip.style.borderRadius = '4px';
        tooltip.style.fontSize = '0.8rem';
        tooltip.style.zIndex = '1000';
        tooltip.style.bottom = '100%';
        tooltip.style.right = '50%';
        tooltip.style.transform = 'translateX(50%)';
        tooltip.style.marginBottom = '5px';
        tooltip.style.whiteSpace = 'nowrap';
        
        this.style.position = 'relative';
        this.appendChild(tooltip);
    });
    
    link.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach(element => {
    observer.observe(element);
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes
    document.querySelectorAll('.skill-category, .project-card, .stat-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Check initial scroll position for back to top button
    if (window.pageYOffset > 300) {
        backToTop.classList.add('active');
    }
});