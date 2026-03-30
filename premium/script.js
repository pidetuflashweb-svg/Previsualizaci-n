/**
 * Hybrid88 - Website JavaScript
 * Entrenamiento Híbrido en Badajoz
 */

// ================= DOM ELEMENTS =================
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const backToTop = document.getElementById('backToTop');
const testimonialsSlider = document.getElementById('testimonialsSlider');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

// ================= LOADER =================
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
        initAnimations();
    }, 1800);
});

// ================= HEADER SCROLL EFFECT =================
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Header background on scroll
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (currentScrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
});

// ================= MOBILE MENU =================
hamburger.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

// Close mobile menu when clicking on a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================= BACK TO TOP =================
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ================= SCROLL ANIMATIONS =================
function initAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ================= COUNTER ANIMATION =================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Initialize counters on load
document.addEventListener('DOMContentLoaded', animateCounters);

// ================= TESTIMONIALS SLIDER =================
let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonialCards.length;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
    
    testimonialDots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Click on dots to change testimonial
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
        
        // Reset auto-rotate timer
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
});

// Pause auto-rotate on hover
if (testimonialsSlider) {
    testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialsSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    });
}

// ================= PARALLAX EFFECT (Hero) =================
const heroSection = document.querySelector('.hero-bg');

window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (heroSection) {
            heroSection.style.transform = `scale(1.1) translateY(${rate}px)`;
        }
    }
});

// ================= SERVICE CARDS TILT EFFECT =================
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ================= ACTIVE NAV LINK ON SCROLL =================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ================= FORM VALIDATION (if needed in future) =================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// ================= KEYBOARD NAVIGATION =================
document.addEventListener('keydown', (e) => {
    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ================= PERFORMANCE OPTIMIZATIONS =================
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ================= LAZY LOADING IMAGES =================
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// ================= CONSOLE MESSAGE =================
console.log('%c🏋️ Hybrid88 - Entrenamiento Híbrido en Badajoz', 'font-size: 20px; font-weight: bold; color: #d6ff00;');
console.log('%cDesarrollado por FlashWeb', 'font-size: 12px; color: #a1a1aa;');
