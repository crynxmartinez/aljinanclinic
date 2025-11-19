// Form Validation Utilities

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[0-9]{10,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function validateRequired(value) {
    return value && value.trim().length > 0;
}

function validateForm(formData) {
    const errors = [];
    
    for (const [key, value] of Object.entries(formData)) {
        if (!validateRequired(value)) {
            errors.push(`${key} is required`);
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

export { isValidEmail, isValidPhone, validateRequired, validateForm };
