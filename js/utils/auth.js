// Authentication and Session Management
import { db } from '../config/firebase.js';
import { collection, query, where, limit, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in
function isLoggedIn() {
    const adminSession = sessionStorage.getItem('adminLoggedIn');
    const userStr = localStorage.getItem('currentUser');
    return adminSession === 'true' || userStr !== null;
}

// Redirect based on user role
function redirectByRole(user) {
    if (!user || !user.role) {
        console.error('Invalid user object');
        return;
    }
    
    switch(user.role) {
        case 'superadmin':
            window.location.href = '/superadmin.html';
            break;
        case 'doctor':
            window.location.href = '/doctor.html';
            break;
        case 'staff':
            window.location.href = '/staff.html';
            break;
        default:
            console.error('Unknown role:', user.role);
            localStorage.removeItem('currentUser');
            window.location.href = '/login.html';
    }
}

// Login with email (staff/doctor)
async function login(email) {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', '==', email.toLowerCase().trim()), limit(1));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
            throw new Error('No account found with this email');
        }
        
        const userDoc = snapshot.docs[0];
        const userData = {
            id: userDoc.id,
            ...userDoc.data()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        return userData;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Login as super admin (hardcoded credentials)
async function loginSuperAdmin(username, password) {
    try {
        if (username.toLowerCase().trim() !== 'admin' || password !== 'admin') {
            throw new Error('Invalid super admin credentials');
        }
        
        const user = {
            id: 'superadmin',
            email: 'admin',
            name: 'Super Administrator',
            role: 'superadmin'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminUser', JSON.stringify(user));
        
        return user;
    } catch (error) {
        console.error('Super admin login error:', error);
        throw error;
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminUser');
    window.location.href = '/login.html';
}

// Protect page (check if user is logged in and has correct role)
function protectPage(allowedRoles = []) {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/login.html';
        return null;
    }
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        console.error('Access denied');
        window.location.href = '/login.html';
        return null;
    }
    return user;
}

export { 
    getCurrentUser, 
    isLoggedIn, 
    redirectByRole, 
    login, 
    loginSuperAdmin, 
    logout, 
    protectPage 
};
