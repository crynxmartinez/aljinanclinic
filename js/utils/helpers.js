// Helper Utility Functions

// Format date to YYYY-MM-DD
function formatDate(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format time to 12-hour format (AM/PM)
function formatTime12Hour(time24) {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time12) {
    const [time, period] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);
    
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }
    
    return `${String(hours).padStart(2, '0')}:${minutes}`;
}

// Generate time slots
function generateTimeSlots(startTime, endTime, duration, bufferTime = 0) {
    const slots = [];
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const interval = (duration + bufferTime) * 60 * 1000; // Convert to milliseconds
    
    let current = start;
    while (current < end) {
        const timeStr = current.toTimeString().slice(0, 5);
        slots.push(timeStr);
        current = new Date(current.getTime() + interval);
    }
    
    return slots;
}

// Get day name from date
function getDayName(date) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[new Date(date).getDay()];
}

// Check if date is today
function isToday(date) {
    const today = new Date();
    const checkDate = new Date(date);
    return checkDate.toDateString() === today.toDateString();
}

// Format timestamp to readable date
function formatTimestamp(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

export {
    formatDate,
    formatTime12Hour,
    convertTo24Hour,
    generateTimeSlots,
    getDayName,
    isToday,
    formatTimestamp
};
