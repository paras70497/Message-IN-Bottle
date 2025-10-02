// Utility Helper Functions

export function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
}

export function validateMessage(message) {
    if (!message || message.trim().length === 0) {
        return { valid: false, error: 'Message cannot be empty' };
    }
    
    if (message.length < 10) {
        return { valid: false, error: 'Message must be at least 10 characters long' };
    }
    
    if (message.length > 500) {
        return { valid: false, error: 'Message must be less than 500 characters' };
    }
    
    return { valid: true };
}

export function formatTimestamp(timestamp) {
    if (!timestamp) return 'Unknown';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}