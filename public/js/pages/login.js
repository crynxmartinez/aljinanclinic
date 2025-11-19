// Login Page Logic
import { detectLanguage, switchLanguage, updateLanguage, getCurrentLanguage, translations } from '../utils/i18n.js';
import { showToast } from '../utils/toast.js';
import { isValidEmail } from '../utils/validation.js';
import { getCurrentUser, isLoggedIn, redirectByRole, login, loginSuperAdmin } from '../utils/auth.js';

// Initialize language on page load
detectLanguage();

// Make switchLanguage available globally
window.switchLanguage = switchLanguage;

// Login Type State
let currentLoginType = 'staff';

// Switch Login Type
window.switchLoginType = function(type) {
    currentLoginType = type;
    const staffTab = document.getElementById('staff-tab');
    const superadminTab = document.getElementById('superadmin-tab');
    const passwordField = document.getElementById('password-field');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const emailLabel = emailInput.previousElementSibling;
    const lang = getCurrentLanguage();
    
    if (type === 'staff') {
        staffTab.className = 'flex-1 py-2 px-4 rounded-lg font-semibold transition bg-white text-primary shadow';
        superadminTab.className = 'flex-1 py-2 px-4 rounded-lg font-semibold transition text-gray-600 hover:text-gray-800';
        passwordField.classList.add('hidden');
        passwordInput.removeAttribute('required');
        emailInput.type = 'email';
        emailInput.placeholder = lang === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني';
        emailLabel.innerHTML = '<i class="fas fa-envelope mr-2 text-primary"></i><span data-translate="emailAddress">' + translations[lang].emailAddress + '</span>';
    } else {
        staffTab.className = 'flex-1 py-2 px-4 rounded-lg font-semibold transition text-gray-600 hover:text-gray-800';
        superadminTab.className = 'flex-1 py-2 px-4 rounded-lg font-semibold transition bg-white text-primary shadow';
        passwordField.classList.remove('hidden');
        passwordInput.setAttribute('required', 'required');
        emailInput.type = 'text';
        emailInput.placeholder = lang === 'en' ? 'Enter username (admin)' : 'أدخل اسم المستخدم (admin)';
        emailLabel.innerHTML = '<i class="fas fa-user mr-2 text-primary"></i><span data-translate="username">' + translations[lang].username + '</span>';
    }
    
    document.getElementById('error-message').classList.add('hidden');
};

// Check if already logged in
if (isLoggedIn()) {
    const user = getCurrentUser();
    redirectByRole(user);
}

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.getElementById('login-btn');
    const loginText = document.getElementById('login-text');
    const loginSpinner = document.getElementById('login-spinner');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    
    // Validate email only for staff login
    if (currentLoginType === 'staff' && !isValidEmail(email)) {
        errorText.textContent = 'Please enter a valid email address';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Validate username for super admin
    if (currentLoginType === 'superadmin' && !email) {
        errorText.textContent = 'Please enter your username';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Validate password for super admin
    if (currentLoginType === 'superadmin' && !password) {
        errorText.textContent = 'Please enter your password';
        errorMessage.classList.remove('hidden');
        return;
    }
    
    // Show loading
    loginBtn.disabled = true;
    loginText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    try {
        let user;
        
        if (currentLoginType === 'superadmin') {
            user = await loginSuperAdmin(email, password);
        } else {
            user = await login(email);
        }
        
        showToast('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            redirectByRole(user);
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        errorText.textContent = error.message || 'Login failed. Please try again.';
        errorMessage.classList.remove('hidden');
        
        loginBtn.disabled = false;
        loginText.classList.remove('hidden');
        loginSpinner.classList.add('hidden');
    }
});

// Clear error on input
document.getElementById('email').addEventListener('input', () => {
    document.getElementById('error-message').classList.add('hidden');
});

document.getElementById('password').addEventListener('input', () => {
    document.getElementById('error-message').classList.add('hidden');
});
