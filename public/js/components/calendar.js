// Simple Calendar Component

function createCalendar(containerId, onDateSelect) {
    const container = document.getElementById(containerId);
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    let selectedDate = null;
    
    function renderCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        let html = `
            <div class="bg-white rounded-lg p-6">
                <div class="flex justify-between items-center mb-6">
                    <button onclick="calendar.prevMonth()" class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <h3 class="text-2xl font-bold text-gray-800">${monthNames[month]} ${year}</h3>
                    <button onclick="calendar.nextMonth()" class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-7 gap-2 mb-2">
                    <div class="text-center font-semibold text-gray-600 py-2">Sun</div>
                    <div class="text-center font-semibold text-gray-600 py-2">Mon</div>
                    <div class="text-center font-semibold text-gray-600 py-2">Tue</div>
                    <div class="text-center font-semibold text-gray-600 py-2">Wed</div>
                    <div class="text-center font-semibold text-gray-600 py-2">Thu</div>
                    <div class="text-center font-semibold text-gray-600 py-2">Fri</div>
                    <div class="text-center font-semibold text-gray-600 py-2">Sat</div>
                </div>
                
                <div class="grid grid-cols-7 gap-2">
        `;
        
        // Empty cells before first day
        for (let i = 0; i < startingDayOfWeek; i++) {
            html += '<div></div>';
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = formatDate(date);
            const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const isToday = date.toDateString() === today.toDateString();
            const isSelected = selectedDate === dateStr;
            
            let classes = 'text-center py-3 rounded-lg cursor-pointer transition ';
            
            if (isPast) {
                classes += 'text-gray-300 cursor-not-allowed';
            } else if (isSelected) {
                classes += 'bg-primary text-white font-bold';
            } else if (isToday) {
                classes += 'bg-blue-100 text-primary font-bold hover:bg-primary hover:text-white';
            } else {
                classes += 'hover:bg-blue-50 text-gray-700';
            }
            
            html += `<div class="${classes}" ${!isPast ? `onclick="calendar.selectDate('${dateStr}')"` : ''}>${day}</div>`;
        }
        
        html += '</div></div>';
        container.innerHTML = html;
    }
    
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    let displayMonth = currentMonth;
    let displayYear = currentYear;
    
    // Public API
    window.calendar = {
        selectDate: (dateStr) => {
            selectedDate = dateStr;
            renderCalendar(displayMonth, displayYear);
            if (onDateSelect) {
                onDateSelect(dateStr);
            }
        },
        prevMonth: () => {
            displayMonth--;
            if (displayMonth < 0) {
                displayMonth = 11;
                displayYear--;
            }
            // Don't allow going to past months
            if (displayYear < currentYear || (displayYear === currentYear && displayMonth < currentMonth)) {
                displayMonth = currentMonth;
                displayYear = currentYear;
                return;
            }
            renderCalendar(displayMonth, displayYear);
        },
        nextMonth: () => {
            displayMonth++;
            if (displayMonth > 11) {
                displayMonth = 0;
                displayYear++;
            }
            renderCalendar(displayMonth, displayYear);
        }
    };
    
    renderCalendar(displayMonth, displayYear);
}

export { createCalendar };
