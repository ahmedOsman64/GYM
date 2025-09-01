// ===== MEMBERSHIP PAGE FUNCTIONALITY =====

// DOM Elements
const authSection = document.querySelector('.auth-section');
const dashboardSection = document.querySelector('.dashboard-section');
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');
const passwordToggles = document.querySelectorAll('.password-toggle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');

// Toast notification system (reuse from main site)
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close" aria-label="Close notification">
            <i data-lucide="x"></i>
        </button>
    `;

    toastContainer.appendChild(toast);
    
    // Initialize Lucide icons for the toast
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);

    // Manual close
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.remove();
    });
}

// User session management
class UserSession {
    constructor() {
        this.storageKey = 'aoGymUser';
        this.currentUser = this.loadUser();
    }

    loadUser() {
        try {
            const userData = localStorage.getItem(this.storageKey);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error loading user data:', error);
            return null;
        }
    }

    saveUser(userData) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(userData));
            this.currentUser = userData;
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    clearUser() {
        localStorage.removeItem(this.storageKey);
        this.currentUser = null;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize user session
const userSession = new UserSession();

// Form validation utilities
const validators = {
    email: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    phone: (phone) => {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    },
    
    password: (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
    },
    
    name: (name) => {
        return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
    }
};

// Password strength indicator
function updatePasswordStrength(password, strengthElement) {
    const strength = validators.password(password);
    const score = Object.values(strength).filter(Boolean).length;
    
    strengthElement.className = 'password-strength';
    
    if (score < 3) {
        strengthElement.classList.add('weak');
    } else if (score < 5) {
        strengthElement.classList.add('medium');
    } else {
        strengthElement.classList.add('strong');
    }
}

// Tab switching functionality
function initAuthTabs() {
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = tab.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show target form
            authForms.forEach(form => {
                form.classList.add('hidden');
                if (form.id === `${targetForm}Form`) {
                    form.classList.remove('hidden');
                }
            });
        });
    });
}

// Password visibility toggle
function initPasswordToggles() {
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const icon = toggle.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-lucide', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-lucide', 'eye');
            }
            
            // Reinitialize Lucide icons
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
}

// Form validation
function validateForm(form) {
    const formData = new FormData(form);
    const errors = [];
    
    // Get form type
    const isSignup = form.id === 'signupForm';
    
    // Validate email
    const email = formData.get('email');
    if (!email || !validators.email(email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Validate password
    const password = formData.get('password');
    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    
    if (isSignup) {
        // Additional signup validations
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const phone = formData.get('phone');
        const confirmPassword = formData.get('confirmPassword');
        
        if (!firstName || !validators.name(firstName)) {
            errors.push('Please enter a valid first name');
        }
        
        if (!lastName || !validators.name(lastName)) {
            errors.push('Please enter a valid last name');
        }
        
        if (!phone || !validators.phone(phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }
        
        // Password strength check
        const strength = validators.password(password);
        const score = Object.values(strength).filter(Boolean).length;
        if (score < 3) {
            errors.push('Password is too weak. Include uppercase, lowercase, numbers, and special characters');
        }
    }
    
    return errors;
}

// Login functionality
async function handleLogin(formData) {
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock user data - in real app, this would come from backend
            const userData = {
                id: 'user_' + Date.now(),
                email: email,
                firstName: 'Ahmed',
                lastName: 'Osman',
                phone: '+1 (555) 123-4567',
                membershipType: 'Premium',
                membershipStatus: 'Active',
                joinDate: '2024-01-15',
                expiryDate: '2025-01-15',
                stats: {
                    workouts: 47,
                    hours: 94,
                    calories: 12500
                },
                recentActivity: [
                    { type: 'workout', title: 'Strength Training', time: '2 hours ago' },
                    { type: 'booking', title: 'Personal Training Session', time: '1 day ago' },
                    { type: 'achievement', title: 'Monthly Goal Achieved', time: '3 days ago' }
                ]
            };
            
            resolve({ success: true, user: userData });
        }, 1500);
    });
}

// Signup functionality
async function handleSignup(formData) {
    const userData = {
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone')
    };
    
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            const newUser = {
                id: 'user_' + Date.now(),
                ...userData,
                membershipType: 'Basic',
                membershipStatus: 'Active',
                joinDate: new Date().toISOString().split('T')[0],
                expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                stats: {
                    workouts: 0,
                    hours: 0,
                    calories: 0
                },
                recentActivity: [
                    { type: 'signup', title: 'Welcome to AO Gym!', time: 'Just now' }
                ]
            };
            
            resolve({ success: true, user: newUser });
        }, 2000);
    });
}

// Update dashboard with user data
function updateDashboard(userData) {
    // Update profile section
    const profileAvatar = document.querySelector('.profile-avatar');
    const profileName = document.querySelector('.profile-details h4');
    const profileEmail = document.querySelector('.profile-details p:first-of-type');
    const profilePhone = document.querySelector('.profile-details p:last-of-type');
    const membershipBadge = document.querySelector('.membership-badge span');
    
    if (profileAvatar) {
        profileAvatar.textContent = `${userData.firstName[0]}${userData.lastName[0]}`;
    }
    if (profileName) {
        profileName.textContent = `${userData.firstName} ${userData.lastName}`;
    }
    if (profileEmail) {
        profileEmail.textContent = userData.email;
    }
    if (profilePhone) {
        profilePhone.textContent = userData.phone;
    }
    if (membershipBadge) {
        membershipBadge.textContent = userData.membershipType;
    }
    
    // Update membership status
    const statusBadge = document.querySelector('.status-badge');
    const membershipPlan = document.querySelector('.info-item:nth-child(1) .value');
    const joinDate = document.querySelector('.info-item:nth-child(2) .value');
    const expiryDate = document.querySelector('.info-item:nth-child(3) .value');
    
    if (statusBadge) {
        statusBadge.textContent = userData.membershipStatus;
        statusBadge.className = `status-badge ${userData.membershipStatus.toLowerCase()}`;
    }
    if (membershipPlan) {
        membershipPlan.textContent = userData.membershipType;
    }
    if (joinDate) {
        joinDate.textContent = new Date(userData.joinDate).toLocaleDateString();
    }
    if (expiryDate) {
        expiryDate.textContent = new Date(userData.expiryDate).toLocaleDateString();
    }
    
    // Update stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        statNumbers[0].textContent = userData.stats.workouts;
        statNumbers[1].textContent = userData.stats.hours;
        statNumbers[2].textContent = userData.stats.calories.toLocaleString();
    }
    
    // Update recent activity
    const activityList = document.querySelector('.activity-list');
    if (activityList && userData.recentActivity) {
        activityList.innerHTML = userData.recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i data-lucide="${activity.type === 'workout' ? 'dumbbell' : activity.type === 'booking' ? 'calendar' : 'trophy'}"></i>
                </div>
                <div class="activity-info">
                    <span class="activity-title">${activity.title}</span>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    // Update welcome message
    const welcomeMessage = document.querySelector('.welcome-message h1');
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${userData.firstName}!`;
    }
}

// Show dashboard and hide auth
function showDashboard(userData) {
    authSection.style.display = 'none';
    dashboardSection.classList.remove('hidden');
    updateDashboard(userData);
}

// Show auth and hide dashboard
function showAuth() {
    authSection.style.display = 'flex';
    dashboardSection.classList.add('hidden');
}

// Form submission handlers
function initFormHandlers() {
    // Login form
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(loginForm);
            const errors = validateForm(loginForm);
            
            if (errors.length > 0) {
                showToast(errors[0], 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = loginForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Signing in...';
            submitBtn.disabled = true;
            
            try {
                const result = await handleLogin(formData);
                
                if (result.success) {
                    userSession.saveUser(result.user);
                    showToast('Welcome back! Login successful.', 'success');
                    showDashboard(result.user);
                } else {
                    showToast('Invalid email or password', 'error');
                }
            } catch (error) {
                showToast('Login failed. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Signup form
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const errors = validateForm(signupForm);
            
            if (errors.length > 0) {
                showToast(errors[0], 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = signupForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating account...';
            submitBtn.disabled = true;
            
            try {
                const result = await handleSignup(formData);
                
                if (result.success) {
                    userSession.saveUser(result.user);
                    showToast('Account created successfully! Welcome to AO Gym.', 'success');
                    showDashboard(result.user);
                } else {
                    showToast('Account creation failed. Please try again.', 'error');
                }
            } catch (error) {
                showToast('Signup failed. Please try again.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Password strength indicator for signup
        const passwordInput = signupForm.querySelector('input[name="password"]');
        const strengthIndicator = signupForm.querySelector('.password-strength');
        
        if (passwordInput && strengthIndicator) {
            passwordInput.addEventListener('input', (e) => {
                updatePasswordStrength(e.target.value, strengthIndicator);
            });
        }
    }
}

// Logout functionality
function initLogout() {
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userSession.clearUser();
            showToast('You have been logged out successfully.', 'success');
            showAuth();
            
            // Reset forms
            if (loginForm) loginForm.reset();
            if (signupForm) signupForm.reset();
            
            // Reset to login tab
            authTabs.forEach(tab => tab.classList.remove('active'));
            authTabs[0].classList.add('active');
            authForms.forEach(form => form.classList.add('hidden'));
            authForms[0].classList.remove('hidden');
        });
    }
}

// Dashboard action handlers
function initDashboardActions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            
            switch (action) {
                case 'edit-profile':
                    showToast('Profile editing feature coming soon!', 'info');
                    break;
                case 'book-session':
                    showToast('Session booking feature coming soon!', 'info');
                    break;
                case 'manage-plan':
                    showToast('Plan management feature coming soon!', 'info');
                    break;
                case 'view-history':
                    showToast('Workout history feature coming soon!', 'info');
                    break;
                default:
                    showToast('Feature coming soon!', 'info');
            }
        });
    });
}

// Keyboard accessibility
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close any open modals or return to auth
        if (e.key === 'Escape') {
            // Add any modal closing logic here
        }
        
        // Tab navigation improvements
        if (e.key === 'Tab') {
            // Ensure focus is visible
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    if (userSession.isLoggedIn()) {
        showDashboard(userSession.getCurrentUser());
    } else {
        showAuth();
    }
    
    // Initialize all functionality
    initAuthTabs();
    initPasswordToggles();
    initFormHandlers();
    initLogout();
    initDashboardActions();
    initKeyboardNavigation();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Export for potential use in other scripts
window.MembershipApp = {
    userSession,
    showToast,
    validators
};
