// Internationalization (i18n) - English/Arabic Support

const translations = {
    en: {
        title: 'Clinic Management',
        subtitle: 'Sign in to continue',
        staffLogin: 'Staff Login',
        superAdmin: 'Super Admin',
        emailAddress: 'Email Address',
        password: 'Password',
        username: 'Username',
        signIn: 'Sign In',
        or: 'OR',
        bookAsGuest: 'Book as Guest',
        noAccount: "Don't have an account? Contact your administrator"
    },
    ar: {
        title: 'إدارة العيادة',
        subtitle: 'سجل الدخول للمتابعة',
        staffLogin: 'دخول الموظفين',
        superAdmin: 'المدير العام',
        emailAddress: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        username: 'اسم المستخدم',
        signIn: 'تسجيل الدخول',
        or: 'أو',
        bookAsGuest: 'احجز كزائر',
        noAccount: 'ليس لديك حساب؟ اتصل بالمسؤول'
    }
};

let currentLanguage = 'en';

// Detect user's preferred language
function detectLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLanguage = savedLang;
    } else {
        const browserLang = navigator.language || navigator.userLanguage;
        currentLanguage = browserLang.startsWith('ar') ? 'ar' : 'en';
    }
    updateLanguage(currentLanguage);
}

// Switch language
function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('preferredLanguage', lang);
    updateLanguage(lang);
}

// Update all text content based on language
function updateLanguage(lang) {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update language switcher buttons
    const langEnBtn = document.getElementById('lang-en');
    const langArBtn = document.getElementById('lang-ar');
    
    if (langEnBtn && langArBtn) {
        if (lang === 'en') {
            langEnBtn.className = 'px-3 py-1.5 rounded-md text-sm font-semibold transition bg-white text-primary shadow';
            langArBtn.className = 'px-3 py-1.5 rounded-md text-sm font-semibold transition text-gray-600 hover:text-gray-800';
        } else {
            langEnBtn.className = 'px-3 py-1.5 rounded-md text-sm font-semibold transition text-gray-600 hover:text-gray-800';
            langArBtn.className = 'px-3 py-1.5 rounded-md text-sm font-semibold transition bg-white text-primary shadow';
        }
    }
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-placeholder-en]').forEach(element => {
        const placeholder = lang === 'en' ? 
            element.getAttribute('data-placeholder-en') : 
            element.getAttribute('data-placeholder-ar');
        element.placeholder = placeholder;
    });
}

// Get current language
function getCurrentLanguage() {
    return currentLanguage;
}

// Get translation
function translate(key) {
    return translations[currentLanguage][key] || key;
}

export { detectLanguage, switchLanguage, updateLanguage, getCurrentLanguage, translate, translations };
