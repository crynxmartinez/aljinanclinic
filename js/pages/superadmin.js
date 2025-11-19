// Super Admin Portal Logic
import { protectPage, logout as authLogout } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';
import { getAppointments, getUsers, getDoctors, createUser, createDoctor, updateUser, deleteUser } from '../services/firestore.js';
import { formatTime12Hour } from '../utils/helpers.js';

// Protect page - only superadmin can access
const user = protectPage(['superadmin']);
if (!user) {
    // Redirect handled by protectPage
} else {
    init();
}

let currentTab = 'appointments';

async function init() {
    await loadStats();
    await loadAppointments();
}

async function loadStats() {
    try {
        const [appointments, doctors, users] = await Promise.all([
            getAppointments(),
            getDoctors(),
            getUsers()
        ]);
        
        document.getElementById('total-appointments').textContent = appointments.length;
        document.getElementById('total-doctors').textContent = doctors.length;
        document.getElementById('total-staff').textContent = users.filter(u => u.role === 'staff').length;
        document.getElementById('pending-appointments').textContent = appointments.filter(a => a.status === 'new').length;
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

async function loadAppointments() {
    try {
        const appointments = await getAppointments();
        displayAppointments(appointments);
    } catch (error) {
        console.error('Error loading appointments:', error);
        showToast('Failed to load appointments', 'error');
    }
}

async function loadUsers() {
    try {
        const users = await getUsers();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
        showToast('Failed to load users', 'error');
    }
}

async function loadDoctors() {
    try {
        const doctors = await getDoctors();
        displayDoctors(doctors);
    } catch (error) {
        console.error('Error loading doctors:', error);
        showToast('Failed to load doctors', 'error');
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
                <div class="flex-1">
                    <h3 class="font-bold text-lg text-gray-800">${apt.patientName}</h3>
                    <div class="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
                        <p><i class="fas fa-calendar mr-2"></i>${apt.date}</p>
                        <p><i class="fas fa-clock mr-2"></i>${formatTime12Hour(apt.startTime)}</p>
                        <p><i class="fas fa-envelope mr-2"></i>${apt.patientEmail}</p>
                        <p><i class="fas fa-phone mr-2"></i>${apt.patientPhone}</p>
                    </div>
                    ${apt.symptoms ? `<p class="text-gray-600 mt-2"><i class="fas fa-comment-medical mr-2"></i>${apt.symptoms}</p>` : ''}
                </div>
                <div>
                    <span class="px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(apt.status)}">
                        ${apt.status}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
}

function displayUsers(users) {
    const container = document.getElementById('users-list');
    
    if (users.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-users-slash text-3xl mb-4"></i>
                <p>No users found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = users.map(user => `
        <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary transition">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-lg text-gray-800">${user.name}</h3>
                    <p class="text-gray-600"><i class="fas fa-envelope mr-2"></i>${user.email}</p>
                    <span class="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor(user.role)}">
                        ${user.role}
                    </span>
                </div>
                <button onclick="deleteUserConfirm('${user.id}')" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function displayDoctors(doctors) {
    const container = document.getElementById('doctors-list');
    
    if (doctors.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <i class="fas fa-user-md-slash text-3xl mb-4"></i>
                <p>No doctors found</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = doctors.map(doctor => `
        <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-primary transition">
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-bold text-lg text-gray-800">${doctor.name}</h3>
                    <p class="text-gray-600"><i class="fas fa-stethoscope mr-2"></i>${doctor.specialty || 'General'}</p>
                    ${doctor.email ? `<p class="text-gray-600"><i class="fas fa-envelope mr-2"></i>${doctor.email}</p>` : ''}
                </div>
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

function getRoleColor(role) {
    const colors = {
        doctor: 'bg-blue-100 text-blue-800',
        staff: 'bg-green-100 text-green-800',
        superadmin: 'bg-purple-100 text-purple-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
}

window.switchTab = async function(tab) {
    currentTab = tab;
    
    // Update tab buttons
    ['appointments', 'users', 'doctors'].forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        const content = document.getElementById(`content-${t}`);
        
        if (t === tab) {
            btn.className = 'flex-1 px-6 py-4 font-semibold text-primary border-b-2 border-primary';
            content.classList.remove('hidden');
        } else {
            btn.className = 'flex-1 px-6 py-4 font-semibold text-gray-600 hover:text-primary';
            content.classList.add('hidden');
        }
    });
    
    // Load data for the selected tab
    if (tab === 'users') {
        await loadUsers();
    } else if (tab === 'doctors') {
        await loadDoctors();
    }
};

window.showAddUserModal = function() {
    showToast('Add user feature coming soon', 'info');
};

window.showAddDoctorModal = function() {
    showToast('Add doctor feature coming soon', 'info');
};

window.deleteUserConfirm = function(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        deleteUser(userId).then(() => {
            showToast('User deleted successfully', 'success');
            loadUsers();
            loadStats();
        }).catch(error => {
            console.error('Error deleting user:', error);
            showToast('Failed to delete user', 'error');
        });
    }
};

window.logout = function() {
    authLogout();
};
