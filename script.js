// Theme Management
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.className = 'fas fa-sun';
        themeToggle.title = 'Switch to Dark Mode';
    } else {
        icon.className = 'fas fa-moon';
        themeToggle.title = 'Switch to Light Mode';
    }
}

// Initialize theme icon
updateThemeIcon(currentTheme);

// Theme toggle functionality
themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add a nice transition effect
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Page Loader
document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.getElementById('pageLoader');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                pageLoader.style.opacity = '0';
                setTimeout(() => {
                    pageLoader.style.display = 'none';
                    initializeAnimations();
                }, 500);
            }, 500);
        }
        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.round(progress) + '%';
    }, 100);
});

// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    const currentTheme = body.getAttribute('data-theme');

    if (window.scrollY > 50) {
        if (currentTheme === 'light') {
            // Light mode => navbar dark
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            // Dark mode => navbar light
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        }
    } else {
        if (currentTheme === 'light') {
            // Light mode => navbar dark
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            // Dark mode => navbar light
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
}

// Call on scroll
window.addEventListener('scroll', updateNavbarBackground);

// Call on page load
window.addEventListener('load', updateNavbarBackground);

// Call on theme toggle (after theme change)
themeToggle.addEventListener('click', () => {
    setTimeout(updateNavbarBackground, 50);
});

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, index * 200);
    });
}

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Trigger specific animations
                if (entry.target.id === 'about') {
                    setTimeout(animateCounters, 500);
                }
                
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkills, 500);
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe individual elements
    document.querySelectorAll('.service-card, .portfolio-item, .skill-category, .skill-icon').forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
    
    // Get form data
    const formData = new FormData(contactForm);
    const fullName = formData.get('fullName').trim();
    const email = formData.get('email').trim();
    const mobile = formData.get('mobile').trim();
    const subject = formData.get('subject').trim();
    const message = formData.get('message').trim();
    
    // Validation
    let isValid = true;
    
    if (fullName.length < 2) {
        showError('fullNameError', 'Full name must be at least 2 characters');
        isValid = false;
    }
    
    if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (mobile.length < 10) {
        showError('mobileError', 'Please enter a valid mobile number');
        isValid = false;
    }
    
    if (subject.length < 5) {
        showError('subjectError', 'Subject must be at least 5 characters');
        isValid = false;
    }
    
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (!isValid) {
        showFormMessage('Please fix the errors above', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    document.querySelector('.btn-text').style.display = 'none';
    document.querySelector('.btn-loading').style.display = 'inline-flex';
    
    // Simulate form submission
    setTimeout(() => {
        // Reset button
        submitBtn.disabled = false;
        document.querySelector('.btn-text').style.display = 'inline';
        document.querySelector('.btn-loading').style.display = 'none';
        
        // Show success message
        showFormMessage(`Thank you ${fullName}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 2000);
});

function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll to Top
const scrollToTopBtn = document.getElementById('scrollToTop');

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/Hide Scroll to Top Button
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.profile-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effects to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
}, 3000);

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles after page load
setTimeout(createParticles, 3500);

// Add smooth reveal animation for sections
function revealOnScroll() {
    const reveals = document.querySelectorAll('.animate-on-scroll');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('animated');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add loading animation to buttons
document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        }
    });
});

// Skill icons hover animation
document.querySelectorAll('.skill-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const iconElement = this.querySelector('i');
        iconElement.style.transform = 'rotateY(360deg) scale(1.2)';
    });
    
    icon.addEventListener('mouseleave', function() {
        const iconElement = this.querySelector('i');
        iconElement.style.transform = 'rotateY(0deg) scale(1)';
    });
});

// Add staggered animation to skill categories
function staggerSkillCategories() {
    const categories = document.querySelectorAll('.skill-category');
    categories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
        category.classList.add('fade-in');
    });
}

// Initialize staggered animations
setTimeout(staggerSkillCategories, 1000);

console.log('Portfolio website with Skills section and Dark/Light mode loaded successfully! 🚀');

//education section

// Progress bar animation - ADD THIS TO script.js
function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Add to existing window load event
window.addEventListener('load', function() {
    setTimeout(animateSkills, 1000);
    setTimeout(animateProgress, 1500); // ADD THIS LINE
});


//nave bar
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // UI Elements
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");
    const formMessage = document.getElementById("formMessage");

    // Show loading
    btnText.style.display = "none";
    btnLoading.style.display = "inline-block";

    const formData = new FormData(this);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            formMessage.innerHTML = "Your message has been sent successfully!";
            formMessage.style.color = "green";
            this.reset();
        } else {
            formMessage.innerHTML = "Something went wrong. Please try again!";
            formMessage.style.color = "red";
        }

    } catch (error) {
        formMessage.innerHTML = "Network error. Please try again later!";
        formMessage.style.color = "red";
    }

    // Hide loading and restore button
    btnText.style.display = "inline-block";
    btnLoading.style.display = "none";
});
