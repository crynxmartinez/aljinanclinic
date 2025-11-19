// Full Booking Page Logic with Multi-Step Flow
import { detectLanguage, switchLanguage, getCurrentLanguage, translate } from '../utils/i18n.js';
import { showToast } from '../utils/toast.js';
import { isValidEmail, isValidPhone } from '../utils/validation.js';
import { getDoctors, getServices, createAppointment } from '../services/firestore.js';
import { formatDate, generateTimeSlots, getDayName } from '../utils/helpers.js';

// Initialize
detectLanguage();
window.switchLanguage = switchLanguage;

// Booking state
let bookingData = {
    date: null,
    doctorId: null,
    doctorName: null,
    startTime: null,
    endTime: null
};

// Mobile menu toggle
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
};

// Start booking flow
window.startBooking = function() {
    document.getElementById('booking-type-selection').classList.add('hidden');
    document.getElementById('appointment-flow').classList.remove('hidden');
    renderCalendar();
};

// Calendar rendering
function renderCalendar() {
    const container = document.getElementById('calendar-container');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentCalendarMonth = today.getMonth();
    let currentCalendarYear = today.getFullYear();
    
    function render() {
        const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
        const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        let html = `
            <div class="bg-white rounded-lg p-4">
                <div class="flex justify-between items-center mb-4">
                    <button onclick="calendarPrevMonth()" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <h3 class="text-xl font-bold text-gray-800">${monthNames[currentCalendarMonth]} ${currentCalendarYear}</h3>
                    <button onclick="calendarNextMonth()" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-7 gap-2 mb-2">
        `;
        
        dayNames.forEach(day => {
            html += `<div class="text-center font-semibold text-gray-600 text-sm">${day}</div>`;
        });
        
        html += `</div><div class="grid grid-cols-7 gap-2">`;
        
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div class="p-3"></div>';
        }
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentCalendarYear, currentCalendarMonth, day);
            const dateStr = formatDate(date);
            const isPast = date < today;
            const isToday = date.toDateString() === today.toDateString();
            
            if (isPast) {
                html += `
                    <div class="border-2 border-gray-200 rounded-lg p-3 text-center bg-gray-100 cursor-not-allowed opacity-50">
                        <p class="text-lg font-bold text-gray-400">${day}</p>
                    </div>
                `;
            } else {
                html += `
                    <div onclick="selectDate('${dateStr}')" class="border-2 ${isToday ? 'border-primary bg-blue-50' : 'border-gray-200'} rounded-lg p-3 text-center hover:border-primary hover:bg-blue-50 transition cursor-pointer">
                        <p class="text-lg font-bold ${isToday ? 'text-primary' : 'text-gray-800'}">${day}</p>
                    </div>
                `;
            }
        }
        
        html += '</div></div>';
        container.innerHTML = html;
    }
    
    window.calendarPrevMonth = function() {
        currentCalendarMonth--;
        if (currentCalendarMonth < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        }
        if (currentCalendarYear < today.getFullYear() || 
            (currentCalendarYear === today.getFullYear() && currentCalendarMonth < today.getMonth())) {
            currentCalendarMonth = today.getMonth();
            currentCalendarYear = today.getFullYear();
            return;
        }
        render();
    };
    
    window.calendarNextMonth = function() {
        currentCalendarMonth++;
        if (currentCalendarMonth > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        }
        render();
    };
    
    render();
}

// Select date
window.selectDate = async function(dateStr) {
    bookingData.date = dateStr;
    document.getElementById('step-date').classList.add('hidden');
    document.getElementById('step-doctor').classList.remove('hidden');
    document.getElementById('selected-date-display').textContent = `Selected Date: ${dateStr}`;
    await loadDoctors();
};

// Load doctors
async function loadDoctors() {
    try {
        const doctors = await getDoctors();
        const container = document.getElementById('doctors-list');
        
        if (doctors.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500">No doctors available</p>';
            return;
        }
        
        container.innerHTML = doctors.map(doctor => `
            <div onclick="selectDoctor('${doctor.id}', '${doctor.name}')" class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-blue-50 transition cursor-pointer">
                <div class="flex items-center">
                    <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                        ${doctor.name.charAt(0)}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-800">${doctor.name}</h3>
                        <p class="text-gray-600">${doctor.specialty || 'General Dentist'}</p>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading doctors:', error);
        showToast('Failed to load doctors', 'error');
    }
}

// Select doctor
window.selectDoctor = function(doctorId, doctorName) {
    bookingData.doctorId = doctorId;
    bookingData.doctorName = doctorName;
    document.getElementById('step-doctor').classList.add('hidden');
    document.getElementById('step-time').classList.remove('hidden');
    document.getElementById('selected-info').textContent = `${doctorName} on ${bookingData.date}`;
    loadTimeSlots();
};

// Load time slots
function loadTimeSlots() {
    const container = document.getElementById('time-slots');
    const slots = generateTimeSlots('09:00', '17:00', 30, 0);
    
    container.innerHTML = slots.map(slot => {
        const [hours, minutes] = slot.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const timeDisplay = `${hour12}:${minutes} ${ampm}`;
        
        return `
            <button onclick="selectTime('${slot}')" class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-blue-50 transition text-center">
                <i class="fas fa-clock text-primary text-2xl mb-2"></i>
                <p class="font-bold text-gray-800">${timeDisplay}</p>
            </button>
        `;
    }).join('');
}

// Select time
window.selectTime = function(time) {
    bookingData.startTime = time;
    const [hours, minutes] = time.split(':');
    const endHour = parseInt(hours);
    const endMinutes = parseInt(minutes) + 30;
    bookingData.endTime = `${String(endHour + Math.floor(endMinutes / 60)).padStart(2, '0')}:${String(endMinutes % 60).padStart(2, '0')}`;
    
    document.getElementById('step-time').classList.add('hidden');
    document.getElementById('step-info').classList.remove('hidden');
    
    // Update summary
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const timeDisplay = `${hour12}:${m} ${ampm}`;
    
    document.getElementById('summary-doctor').innerHTML = `<strong>Doctor:</strong> ${bookingData.doctorName}`;
    document.getElementById('summary-date').innerHTML = `<strong>Date:</strong> ${bookingData.date}`;
    document.getElementById('summary-time').innerHTML = `<strong>Time:</strong> ${timeDisplay}`;
    
    loadServices();
};

// Load services
async function loadServices() {
    try {
        const services = await getServices(bookingData.doctorId);
        const select = document.getElementById('apt-service');
        
        select.innerHTML = '<option value="">Choose a service...</option>';
        services.forEach(service => {
            select.innerHTML += `<option value="${service.id}">${service.name} - $${service.price}</option>`;
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Back navigation
window.backToStep = function(step) {
    document.getElementById('step-date').classList.add('hidden');
    document.getElementById('step-doctor').classList.add('hidden');
    document.getElementById('step-time').classList.add('hidden');
    document.getElementById('step-info').classList.add('hidden');
    
    if (step === 'date') {
        document.getElementById('step-date').classList.remove('hidden');
    } else if (step === 'doctor') {
        document.getElementById('step-doctor').classList.remove('hidden');
    } else if (step === 'time') {
        document.getElementById('step-time').classList.remove('hidden');
    }
};

// Handle form submission
document.getElementById('appointment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('apt-name').value.trim();
    const phone = document.getElementById('apt-phone').value.trim();
    const email = document.getElementById('apt-email').value.trim();
    const service = document.getElementById('apt-service').value;
    const symptoms = document.getElementById('apt-symptoms').value.trim();
    const consent = document.getElementById('consent-checkbox').checked;
    
    if (!consent) {
        showToast('Please accept the consent to continue', 'error');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    if (email && !isValidEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    try {
        const appointmentData = {
            patientName: name,
            patientPhone: phone,
            patientEmail: email,
            doctorId: bookingData.doctorId,
            doctorName: bookingData.doctorName,
            date: bookingData.date,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            duration: 30,
            serviceId: service || null,
            symptoms: symptoms,
            status: 'new',
            type: 'appointment'
        };
        
        await createAppointment(appointmentData);
        
        // Show success
        document.getElementById('step-info').classList.add('hidden');
        document.getElementById('success-message').classList.remove('hidden');
        
        const [h, m] = bookingData.startTime.split(':');
        const hour = parseInt(h);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const timeDisplay = `${hour12}:${m} ${ampm}`;
        
        document.getElementById('success-details').innerHTML = `
            <h3 class="font-bold text-gray-800 mb-2">Appointment Details:</h3>
            <p><strong>Doctor:</strong> ${bookingData.doctorName}</p>
            <p><strong>Date:</strong> ${bookingData.date}</p>
            <p><strong>Time:</strong> ${timeDisplay}</p>
            <p><strong>Patient:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        `;
        
        showToast('Appointment booked successfully!', 'success');
        
    } catch (error) {
        console.error('Booking error:', error);
        showToast('Failed to book appointment. Please try again.', 'error');
    }
});
