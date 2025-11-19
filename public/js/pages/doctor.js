// Doctor Portal Logic
import { protectPage, logout as authLogout, getCurrentUser } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { getAppointments, updateAppointment } from '../services/firestore.js';
import { formatTime12Hour } from '../utils/helpers.js';

// Protect page - only doctors can access
const user = protectPage(['doctor']);
if (!user) {
    // Redirect handled by protectPage
} else {
    init();
}

async function init() {
    // Display doctor name
    document.getElementById('doctor-name').textContent = user.name || 'Doctor';
    
    // Load appointments
    await loadAppointments();
}

async function loadAppointments() {
    try {
        const appointments = await getAppointments({ doctorId: user.id });
        displayAppointments(appointments);
    } catch (error) {
        console.error('Error loading appointments:', error);
        showToast('Failed to load appointments', 'error');
    }
}

function displayAppointments(appointments) {
    const container = document.getElementById('appointments-list');
    
    if (appointments.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-calendar-times text-3xl mb-4"></i>
                <p>No appointments found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = appointments.map(apt => `
        <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary transition">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="font-bold text-lg text-gray-800">${apt.patientName}</h3>
                    <p class="text-gray-600"><i class="fas fa-calendar mr-2"></i>${apt.date}</p>
                    <p class="text-gray-600"><i class="fas fa-clock mr-2"></i>${formatTime12Hour(apt.startTime)}</p>
                    <p class="text-gray-600 mt-2"><i class="fas fa-comment-medical mr-2"></i>${apt.symptoms || 'No symptoms provided'}</p>
                </div>
                <div>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(apt.status)}">
                        ${apt.status}
                    </span>
                </div>
            </div>
            <div class="mt-4 flex gap-2">
                ${apt.status === 'new' ? `
                    <button onclick="updateStatus('${apt.id}', 'confirmed')" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                        <i class="fas fa-check mr-2"></i>Confirm
                    </button>
                    <button onclick="updateStatus('${apt.id}', 'cancelled')" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <i class="fas fa-times mr-2"></i>Cancel
                    </button>
                ` : ''}
                ${apt.status === 'confirmed' ? `
                    <button onclick="updateStatus('${apt.id}', 'completed')" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        <i class="fas fa-check-circle mr-2"></i>Complete
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function getStatusColor(status) {
    const colors = {
        new: 'bg-yellow-100 text-yellow-800',
        confirmed: 'bg-green-100 text-green-800',
        today: 'bg-blue-100 text-blue-800',
        completed: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

window.updateStatus = async function(appointmentId, newStatus) {
    try {
        await updateAppointment(appointmentId, { status: newStatus });
        showToast('Appointment updated successfully', 'success');
        await loadAppointments();
    } catch (error) {
        console.error('Error updating appointment:', error);
        showToast('Failed to update appointment', 'error');
    }
};

window.logout = function() {
    authLogout();
};
