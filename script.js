// ===== GLOBAL VARIABLES =====
let planQueue = [];
let currentTheme = 'dark';

// ===== PROGRAM DATA =====
const programs = [
    {
        id: 1,
        title: "Strength Training Fundamentals",
        category: "strength",
        description: "Build foundational strength with compound movements and progressive overload techniques.",
        duration: "60 min",
        level: "Beginner",
        price: 45,
        sessions: 12
    },
    {
        id: 2,
        title: "HIIT Cardio Blast",
        category: "cardio", 
        description: "High-intensity interval training to boost cardiovascular fitness and burn calories.",
        duration: "45 min",
        level: "All Levels",
        price: 35,
        sessions: 8
    },
    {
        id: 3,
        title: "CrossFit WOD",
        category: "crossfit",
        description: "Varied functional movements performed at high intensity for total fitness.",
        duration: "60 min", 
        level: "Intermediate",
        price: 55,
        sessions: 16
    },
    {
        id: 4,
        title: "Vinyasa Flow Yoga",
        category: "yoga",
        description: "Dynamic yoga sequences linking breath with movement for flexibility and mindfulness.",
        duration: "75 min",
        level: "All Levels", 
        price: 40,
        sessions: 10
    },
    {
        id: 5,
        title: "Personal Training Session",
        category: "personal",
        description: "One-on-one coaching tailored to your specific goals and fitness level.",
        duration: "60 min",
        level: "All Levels",
        price: 85,
        sessions: 1
    },
    {
        id: 6,
        title: "Powerlifting Program",
        category: "strength",
        description: "Master the big three lifts: squat, bench press, and deadlift with expert guidance.",
        duration: "90 min",
        level: "Advanced",
        price: 65,
        sessions: 20
    }
];

// ===== TRAINER DATA =====
const trainers = [
    {
        id: 1,
        name: "Ahmed Hassan",
        specialty: "Strength & Conditioning",
        experience: "8 years",
        bio: "Former competitive powerlifter with expertise in strength training and injury prevention. Specializes in helping clients build functional strength.",
        initials: "AH"
    },
    {
        id: 2,
        name: "Fatima Ali",
        specialty: "Yoga & Flexibility",
        experience: "6 years", 
        bio: "Certified yoga instructor with a passion for helping clients improve flexibility, balance, and mental wellness through mindful movement.",
        initials: "FA"
    },
    {
        id: 3,
        name: "Omar Mohamed",
        specialty: "CrossFit & HIIT",
        experience: "5 years",
        bio: "High-energy trainer specializing in functional fitness and metabolic conditioning. Loves pushing clients to achieve their best.",
        initials: "OM"
    },
    {
        id: 4,
        name: "Amina Yusuf",
        specialty: "Personal Training",
        experience: "7 years",
        bio: "Holistic approach to fitness focusing on sustainable lifestyle changes. Expert in nutrition and personalized workout programming.",
        initials: "AY"
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZATION =====
function initializeApp() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Setup navigation
    setupNavigation();
    
    // Setup theme toggle
    setupThemeToggle();
    
    // Setup scroll progress
    setupScrollProgress();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Populate content
    populatePrograms();
    populateTrainers();
    
    // Setup form handlers
    setupForms();
    
    // Setup plan queue
    setupPlanQueue();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
}

// ===== NAVIGATION =====
function setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Active link highlighting with intersection observer
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        rootMargin: '-50% 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[href="#${entry.target.id}"]`);
                activeLink?.classList.add('active');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// ===== THEME TOGGLE =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle?.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
        }
    }
}

// ===== SCROLL PROGRESS =====
function setupScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        scrollProgress.style.width = `${scrollPercent}%`;
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    // GSAP ScrollTrigger animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero animations
    gsap.from('.hero-content > *', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Section animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1
        });
    });
    
    // Card animations
    gsap.utils.toArray('.stat-card, .program-card, .trainer-card, .pricing-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        });
    });
}

// ===== SMOOTH SCROLLING =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Global scroll function
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== POPULATE PROGRAMS =====
function populatePrograms() {
    const programsGrid = document.getElementById('programsGrid');
    if (!programsGrid) return;
    
    programsGrid.innerHTML = programs.map(program => `
        <div class="program-card" data-category="${program.category}">
            <div class="program-header">
                <div>
                    <h3 class="program-title">${program.title}</h3>
                    <span class="program-category">${program.category}</span>
                </div>
            </div>
            <p class="program-description">${program.description}</p>
            <div class="program-details">
                <div class="program-detail">
                    <i data-lucide="clock"></i>
                    <span>${program.duration}</span>
                </div>
                <div class="program-detail">
                    <i data-lucide="trending-up"></i>
                    <span>${program.level}</span>
                </div>
                <div class="program-detail">
                    <i data-lucide="repeat"></i>
                    <span>${program.sessions} sessions</span>
                </div>
            </div>
            <div class="program-price">$${program.price}/month</div>
            <button class="add-to-plan" onclick="addToQueue(${program.id})">
                <i data-lucide="plus"></i>
                Add to Plan
            </button>
        </div>
    `).join('');
    
    lucide.createIcons();
    setupProgramFilters();
}

// ===== PROGRAM FILTERS =====
function setupProgramFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter programs
            programCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    gsap.from(card, { duration: 0.3, scale: 0.9, opacity: 0 });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== POPULATE TRAINERS =====
function populateTrainers() {
    const trainersGrid = document.getElementById('trainersGrid');
    if (!trainersGrid) return;
    
    trainersGrid.innerHTML = trainers.map(trainer => `
        <div class="trainer-card">
            <div class="trainer-avatar">${trainer.initials}</div>
            <h3 class="trainer-name">${trainer.name}</h3>
            <p class="trainer-specialty">${trainer.specialty}</p>
            <p class="trainer-experience">${trainer.experience} experience</p>
            <p class="trainer-bio">${trainer.bio}</p>
            <button class="book-session" onclick="showToast('success', 'Session Booked!', 'We\\'ll contact you to schedule your session with ${trainer.name}.')">
                Book Session
            </button>
        </div>
    `).join('');
}

// ===== PLAN QUEUE FUNCTIONALITY =====
function setupPlanQueue() {
    const closeQueue = document.getElementById('closeQueue');
    closeQueue?.addEventListener('click', closePlanQueue);
}

function addToQueue(programId) {
    const program = programs.find(p => p.id === programId);
    if (!program) return;
    
    const existingItem = planQueue.find(item => item.id === programId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        planQueue.push({
            id: programId,
            title: program.title,
            price: program.price,
            quantity: 1
        });
    }
    
    updatePlanQueueUI();
    showPlanQueue();
    
    // Update button state
    const button = document.querySelector(`[onclick="addToQueue(${programId})"]`);
    if (button) {
        button.classList.add('added');
        button.innerHTML = '<i data-lucide="check"></i> Added to Plan';
        lucide.createIcons();
    }
    
    showToast('success', 'Program Added!', `${program.title} has been added to your plan.`);
}

function updatePlanQueueUI() {
    const queueItems = document.getElementById('queueItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (planQueue.length === 0) {
        queueItems.innerHTML = '<p class="empty-queue">No programs selected yet</p>';
        totalPrice.textContent = '0';
        return;
    }
    
    queueItems.innerHTML = planQueue.map(item => `
        <div class="queue-item">
            <div class="queue-item-info">
                <h4>${item.title}</h4>
                <div class="queue-item-price">$${item.price}/month</div>
            </div>
            <div class="quantity-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
                    <i data-lucide="minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
                    <i data-lucide="plus"></i>
                </button>
                <button class="remove-item" onclick="removeFromQueue(${item.id})">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = planQueue.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = total.toString();
    
    lucide.createIcons();
}

function updateQuantity(programId, change) {
    const item = planQueue.find(item => item.id === programId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromQueue(programId);
    } else {
        updatePlanQueueUI();
    }
}

function removeFromQueue(programId) {
    planQueue = planQueue.filter(item => item.id !== programId);
    updatePlanQueueUI();
    
    // Reset button state
    const button = document.querySelector(`[onclick="addToQueue(${programId})"]`);
    if (button) {
        button.classList.remove('added');
        button.innerHTML = '<i data-lucide="plus"></i> Add to Plan';
        lucide.createIcons();
    }
    
    if (planQueue.length === 0) {
        closePlanQueue();
    }
}

function showPlanQueue() {
    document.getElementById('planQueue').classList.add('active');
}

function closePlanQueue() {
    document.getElementById('planQueue').classList.remove('active');
}

// ===== FORM HANDLING =====
function setupForms() {
    const membershipForm = document.getElementById('membershipForm');
    const contactForm = document.getElementById('contactForm');
    
    membershipForm?.addEventListener('submit', handleMembershipForm);
    contactForm?.addEventListener('submit', handleContactForm);
    
    // Plan selection buttons
    document.querySelectorAll('.select-plan').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = e.target.getAttribute('data-plan');
            document.getElementById('planType').value = plan;
            scrollToSection('membership');
        });
    });
}

function handleMembershipForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateMembershipForm(data)) return;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showToast('success', 'Application Submitted!', 'We\'ll contact you within 24 hours to complete your membership.');
        e.target.reset();
        planQueue = [];
        updatePlanQueueUI();
        closePlanQueue();
    }, 2000);
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) return;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="spinner"></div> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showToast('success', 'Message Sent!', 'Thank you for your message. We\'ll get back to you soon.');
        e.target.reset();
    }, 1500);
}

// ===== FORM VALIDATION =====
function validateMembershipForm(data) {
    const errors = [];
    
    if (!data.fullName?.trim()) errors.push('Full name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!isValidEmail(data.email)) errors.push('Please enter a valid email');
    if (!data.phone?.trim()) errors.push('Phone number is required');
    if (!isValidPhone(data.phone)) errors.push('Please enter a valid phone number');
    if (!data.planType) errors.push('Please select a membership plan');
    
    if (errors.length > 0) {
        showToast('error', 'Validation Error', errors.join(', '));
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.email?.trim()) errors.push('Email is required');
    if (!isValidEmail(data.email)) errors.push('Please enter a valid email');
    if (!data.message?.trim()) errors.push('Message is required');
    
    if (errors.length > 0) {
        showToast('error', 'Validation Error', errors.join(', '));
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''));
}

// ===== TOAST NOTIFICATIONS =====
function showToast(type = 'success', title, message) {
    const toastContainer = document.getElementById('toastContainer');
    const toastId = Date.now();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'alert-circle'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="closeToast(${toastId})">
            <i data-lucide="x"></i>
        </button>
    `;
    
    toast.id = `toast-${toastId}`;
    toastContainer.appendChild(toast);
    lucide.createIcons();
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => closeToast(toastId), 5000);
}

function closeToast(toastId) {
    const toast = document.getElementById(`toast-${toastId}`);
    if (toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Lazy load images when they come into view
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    showToast('error', 'Something went wrong', 'Please refresh the page and try again.');
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Escape key closes modals/panels
    if (e.key === 'Escape') {
        closePlanQueue();
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.scrollToSection = scrollToSection;
window.addToQueue = addToQueue;
window.updateQuantity = updateQuantity;
window.removeFromQueue = removeFromQueue;
window.closeToast = closeToast;
