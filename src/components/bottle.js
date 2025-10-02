// Bottle Component - Creates and animates bottle elements

export function createBottleElement(bottle) {
    const bottleDiv = document.createElement('div');
    bottleDiv.className = 'bottle';
    bottleDiv.dataset.bottleId = bottle.id;
    
    // Random position and animation
    const randomLeft = Math.random() * 80 + 10; // 10% to 90%
    const randomDelay = Math.random() * 5; // 0 to 5 seconds
    const randomDuration = 15 + Math.random() * 10; // 15 to 25 seconds
    
    bottleDiv.style.left = `${randomLeft}%`;
    bottleDiv.style.animationDelay = `${randomDelay}s`;
    bottleDiv.style.animationDuration = `${randomDuration}s`;
    
    // Bottle SVG icon
    bottleDiv.innerHTML = `
        <svg class="bottle-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2h8v2h1c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1V2zm2 2v2h4V4h-4zm-3 4v12h10V8H7z" 
                  fill="#4db8a8" stroke="#2d6a5f" stroke-width="0.5"/>
            <circle cx="12" cy="14" r="1" fill="#fff" opacity="0.7"/>
            <path d="M10 12h4v1h-4z" fill="#fff" opacity="0.5"/>
        </svg>
        <div class="bottle-tooltip">
            From: ${bottle.author}<br>
            ${formatDate(bottle.thrownAt)}
        </div>
    `;
    
    return bottleDiv;
}

export function animateBottleThrow(bottleElement) {
    bottleElement.classList.add('bottle-throw-animation');
    
    return new Promise((resolve) => {
        setTimeout(() => {
            bottleElement.classList.remove('bottle-throw-animation');
            bottleElement.classList.add('bottle-floating');
            resolve();
        }, 1500);
    });
}

export function formatDate(timestamp) {
    if (!timestamp) return 'Just now';
    
    // Handle Firestore timestamp
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}