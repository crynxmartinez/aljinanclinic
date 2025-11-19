// Firestore Database Operations
import { db } from '../config/firebase.js';
import { 
    collection, 
    doc, 
    getDoc, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// ============ USERS ============

async function getUsers(role = null) {
    try {
        const usersRef = collection(db, 'users');
        let q = usersRef;
        
        if (role) {
            q = query(usersRef, where('role', '==', role));
        }
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

async function createUser(userData) {
    try {
        const usersRef = collection(db, 'users');
        const docRef = await addDoc(usersRef, {
            ...userData,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

async function updateUser(userId, userData) {
    try {
        const userRef = doc(db, 'users', userId);
        await updateDoc(userRef, {
            ...userData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const userRef = doc(db, 'users', userId);
        await deleteDoc(userRef);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

// ============ DOCTORS ============

async function getDoctors() {
    try {
        const doctorsRef = collection(db, 'doctors');
        const q = query(doctorsRef, where('active', '==', true));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting doctors:', error);
        throw error;
    }
}

async function getDoctor(doctorId) {
    try {
        const doctorRef = doc(db, 'doctors', doctorId);
        const doctorDoc = await getDoc(doctorRef);
        if (doctorDoc.exists()) {
            return { id: doctorDoc.id, ...doctorDoc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error getting doctor:', error);
        throw error;
    }
}

async function createDoctor(doctorData) {
    try {
        const doctorsRef = collection(db, 'doctors');
        const docRef = await addDoc(doctorsRef, {
            ...doctorData,
            active: true,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating doctor:', error);
        throw error;
    }
}

async function updateDoctor(doctorId, doctorData) {
    try {
        const doctorRef = doc(db, 'doctors', doctorId);
        await updateDoc(doctorRef, {
            ...doctorData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating doctor:', error);
        throw error;
    }
}

// ============ APPOINTMENTS ============

async function getAppointments(filters = {}) {
    try {
        const appointmentsRef = collection(db, 'appointments');
        let q = appointmentsRef;
        
        const constraints = [];
        
        if (filters.doctorId) {
            constraints.push(where('doctorId', '==', filters.doctorId));
        }
        
        if (filters.date) {
            constraints.push(where('date', '==', filters.date));
        }
        
        if (filters.status) {
            constraints.push(where('status', '==', filters.status));
        }
        
        if (constraints.length > 0) {
            q = query(appointmentsRef, ...constraints, orderBy('date'), orderBy('startTime'));
        } else {
            q = query(appointmentsRef, orderBy('date'), orderBy('startTime'));
        }
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting appointments:', error);
        throw error;
    }
}

async function createAppointment(appointmentData) {
    try {
        const appointmentsRef = collection(db, 'appointments');
        const docRef = await addDoc(appointmentsRef, {
            ...appointmentData,
            type: 'appointment',
            status: 'new',
            checkedIn: false,
            notes: [],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
}

async function updateAppointment(appointmentId, appointmentData) {
    try {
        const appointmentRef = doc(db, 'appointments', appointmentId);
        await updateDoc(appointmentRef, {
            ...appointmentData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}

async function deleteAppointment(appointmentId) {
    try {
        const appointmentRef = doc(db, 'appointments', appointmentId);
        await deleteDoc(appointmentRef);
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
}

// ============ SERVICES ============

async function getServices(doctorId = null) {
    try {
        const servicesRef = collection(db, 'services');
        let q = servicesRef;
        
        if (doctorId) {
            q = query(servicesRef, where('doctorId', '==', doctorId), where('active', '==', true));
        } else {
            q = query(servicesRef, where('active', '==', true));
        }
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting services:', error);
        throw error;
    }
}

async function createService(serviceData) {
    try {
        const servicesRef = collection(db, 'services');
        const docRef = await addDoc(servicesRef, {
            ...serviceData,
            active: true,
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating service:', error);
        throw error;
    }
}

async function updateService(serviceId, serviceData) {
    try {
        const serviceRef = doc(db, 'services', serviceId);
        await updateDoc(serviceRef, {
            ...serviceData,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
}

async function deleteService(serviceId) {
    try {
        const serviceRef = doc(db, 'services', serviceId);
        await deleteDoc(serviceRef);
    } catch (error) {
        console.error('Error deleting service:', error);
        throw error;
    }
}

// ============ REAL-TIME LISTENERS ============

function listenToAppointments(callback, filters = {}) {
    const appointmentsRef = collection(db, 'appointments');
    let q = appointmentsRef;
    
    const constraints = [];
    
    if (filters.doctorId) {
        constraints.push(where('doctorId', '==', filters.doctorId));
    }
    
    if (constraints.length > 0) {
        q = query(appointmentsRef, ...constraints, orderBy('date'), orderBy('startTime'));
    } else {
        q = query(appointmentsRef, orderBy('date'), orderBy('startTime'));
    }
    
    return onSnapshot(q, (snapshot) => {
        const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(appointments);
    });
}

export {
    // Users
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    // Doctors
    getDoctors,
    getDoctor,
    createDoctor,
    updateDoctor,
    // Appointments
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    // Services
    getServices,
    createService,
    updateService,
    deleteService,
    // Real-time
    listenToAppointments
};
