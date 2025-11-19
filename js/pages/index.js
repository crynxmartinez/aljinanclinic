// Patient Booking Page Logic
import { detectLanguage, switchLanguage } from '../utils/i18n.js';
import { showToast } from '../utils/toast.js';
import { isValidEmail, isValidPhone } from '../utils/validation.js';
import { createAppointment } from '../services/firestore.js';

// Initialize language
detectLanguage();
window.switchLanguage = switchLanguage;

// Set minimum date to today
const dateInput = document.getElementById('appointment-date');
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

// Handle form submission
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const patientName = document.getElementById('patient-name').value.trim();
    const patientEmail = document.getElementById('patient-email').value.trim();
    const patientPhone = document.getElementById('patient-phone').value.trim();
    const appointmentDate = document.getElementById('appointment-date').value;
    const symptoms = document.getElementById('symptoms').value.trim();
    
    // Validate
    if (!isValidEmail(patientEmail)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!isValidPhone(patientPhone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    try {
        // Create appointment
        const appointmentData = {
            patientName,
            patientEmail,
            patientPhone,
            date: appointmentDate,
            startTime: '09:00', // Default time for now
            endTime: '09:30',
            duration: 30,
            symptoms,
            status: 'new',
            type: 'appointment'
        };
        
        await createAppointment(appointmentData);
        
        showToast('Appointment booked successfully! We will contact you soon.', 'success');
        
        // Reset form
        document.getElementById('booking-form').reset();
        
    } catch (error) {
        console.error('Booking error:', error);
        showToast('Failed to book appointment. Please try again.', 'error');
    }
});
