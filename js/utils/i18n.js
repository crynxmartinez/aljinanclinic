// Internationalization (i18n) - English/Arabic Support

const translations = {
    en: {
        // Login Page
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
        noAccount: "Don't have an account? Contact your administrator",
        
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.booking': 'Book Now',
        'nav.staffLogin': 'Staff Login',
        
        // Hero Section
        'hero.title1': 'Your Perfect',
        'hero.title2': 'Smile',
        'hero.title3': 'Starts Here',
        'hero.subtitle': "Experience world-class dental care with our team of expert dentists. We're committed to making your smile brighter and healthier.",
        'hero.bookBtn': 'Book Appointment',
        'hero.learnBtn': 'Learn More',
        'hero.stat1': 'Years Experience',
        'hero.stat2': 'Happy Patients',
        'hero.stat3': 'Expert Dentists',
        
        // About Section
        'about.title': 'Why Choose Us?',
        'about.subtitle': 'We combine cutting-edge technology with compassionate care to deliver exceptional dental services.',
        'about.feature1Title': 'Expert Team',
        'about.feature1Desc': 'Our dentists have years of experience and stay updated with the latest techniques.',
        'about.feature2Title': 'Modern Technology',
        'about.feature2Desc': 'State-of-the-art equipment ensures precise and comfortable treatments.',
        'about.feature3Title': 'Patient-Centered Care',
        'about.feature3Desc': 'Your comfort and satisfaction are our top priorities.',
        'about.card1Title': 'Flexible Hours',
        'about.card1Desc': 'Open 7 days a week',
        'about.card2Title': 'Safe & Sterile',
        'about.card2Desc': 'Highest hygiene standards',
        'about.card3Title': 'Affordable',
        'about.card3Desc': 'Competitive pricing',
        'about.card4Title': '5000+ Smiles',
        'about.card4Desc': 'Happy patients',
        
        // Booking Section
        'booking.title': 'Book Your Appointment',
        'booking.subtitle': 'Schedule an appointment with your preferred doctor',
        'booking.startBtn': 'Start Booking',
        'booking.selectDate': 'Select Date',
        'booking.availableDoctors': 'Available Doctors',
        'booking.selectTime': 'Select Time',
        'booking.yourInfo': 'Your Information',
        'booking.summary': 'Appointment Summary:',
        
        // Form
        'form.fullName': 'Full Name *',
        'form.phone': 'Phone Number *',
        'form.email': 'Email',
        'form.service': 'Service (Optional)',
        'form.chooseService': 'Choose a service...',
        'form.symptoms': 'Symptoms / Reason for Visit',
        'form.consent': 'I consent to receive communications via email, SMS, and WhatsApp regarding my appointment.',
        'form.confirmBtn': 'Confirm Booking',
        
        // Success
        'success.title': 'Thank You for Booking!',
        'success.message': "We've successfully received your appointment request and sent a confirmation email.",
        'success.emailTitle': 'Check Your Email',
        'success.emailDesc': 'Please check your inbox (or spam folder) for your booking confirmation.',
        'success.whatsappTitle': 'Get Updates on WhatsApp',
        'success.whatsappDesc': 'Want to receive your booking details and updates via WhatsApp?',
        'success.whatsappBtn': 'Click Here & Message "BOOK"',
        'success.pendingTitle': 'Awaiting Approval',
        'success.pendingDesc': 'Your appointment is pending approval from our staff.',
        'success.anotherBtn': 'Make Another Booking',
        
        // Common
        'common.back': 'Back'
    },
    ar: {
        // Login Page
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
        noAccount: 'ليس لديك حساب؟ اتصل بالمسؤول',
        
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.about': 'عن العيادة',
        'nav.booking': 'احجز الآن',
        'nav.staffLogin': 'دخول الموظفين',
        
        // Hero Section
        'hero.title1': 'ابتسامتك',
        'hero.title2': 'المثالية',
        'hero.title3': 'تبدأ من هنا',
        'hero.subtitle': 'استمتع برعاية أسنان عالمية المستوى مع فريقنا من أطباء الأسنان الخبراء. نحن ملتزمون بجعل ابتسامتك أكثر إشراقًا وصحة.',
        'hero.bookBtn': 'احجز موعد',
        'hero.learnBtn': 'اعرف المزيد',
        'hero.stat1': 'سنوات من الخبرة',
        'hero.stat2': 'مريض سعيد',
        'hero.stat3': 'طبيب خبير',
        
        // About Section
        'about.title': 'لماذا تختارنا؟',
        'about.subtitle': 'نجمع بين التكنولوجيا المتطورة والرعاية الرحيمة لتقديم خدمات طب الأسنان الاستثنائية.',
        'about.feature1Title': 'فريق خبير',
        'about.feature1Desc': 'أطباؤنا لديهم سنوات من الخبرة ويواكبون أحدث التقنيات.',
        'about.feature2Title': 'تكنولوجيا حديثة',
        'about.feature2Desc': 'معدات حديثة تضمن علاجات دقيقة ومريحة.',
        'about.feature3Title': 'رعاية تركز على المريض',
        'about.feature3Desc': 'راحتك ورضاك هما أولويتنا القصوى.',
        'about.card1Title': 'ساعات مرنة',
        'about.card1Desc': 'مفتوح 7 أيام في الأسبوع',
        'about.card2Title': 'آمن ومعقم',
        'about.card2Desc': 'أعلى معايير النظافة',
        'about.card3Title': 'أسعار معقولة',
        'about.card3Desc': 'أسعار تنافسية',
        'about.card4Title': '5000+ ابتسامة',
        'about.card4Desc': 'مرضى سعداء',
        
        // Booking Section
        'booking.title': 'احجز موعدك',
        'booking.subtitle': 'حدد موعدًا مع طبيبك المفضل',
        'booking.startBtn': 'ابدأ الحجز',
        'booking.selectDate': 'اختر التاريخ',
        'booking.availableDoctors': 'الأطباء المتاحون',
        'booking.selectTime': 'اختر الوقت',
        'booking.yourInfo': 'معلوماتك',
        'booking.summary': 'ملخص الموعد:',
        
        // Form
        'form.fullName': 'الاسم الكامل *',
        'form.phone': 'رقم الهاتف *',
        'form.email': 'البريد الإلكتروني',
        'form.service': 'الخدمة (اختياري)',
        'form.chooseService': 'اختر خدمة...',
        'form.symptoms': 'الأعراض / سبب الزيارة',
        'form.consent': 'أوافق على تلقي الاتصالات عبر البريد الإلكتروني والرسائل النصية وواتساب بخصوص موعدي.',
        'form.confirmBtn': 'تأكيد الحجز',
        
        // Success
        'success.title': 'شكرًا لك على الحجز!',
        'success.message': 'لقد تلقينا طلب موعدك بنجاح وأرسلنا بريدًا إلكترونيًا للتأكيد.',
        'success.emailTitle': 'تحقق من بريدك الإلكتروني',
        'success.emailDesc': 'يرجى التحقق من صندوق الوارد (أو مجلد البريد العشوائي) للحصول على تأكيد الحجز.',
        'success.whatsappTitle': 'احصل على التحديثات عبر واتساب',
        'success.whatsappDesc': 'هل تريد تلقي تفاصيل حجزك والتحديثات عبر واتساب؟',
        'success.whatsappBtn': 'انقر هنا وأرسل "BOOK"',
        'success.pendingTitle': 'في انتظار الموافقة',
        'success.pendingDesc': 'موعدك في انتظار الموافقة من موظفينا.',
        'success.anotherBtn': 'قم بحجز آخر',
        
        // Common
        'common.back': 'رجوع'
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
