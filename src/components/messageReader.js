// Message Reader Component - For reading caught bottles

import { formatDate } from './bottle.js';

export function showMessageReader(bottle, catcherName) {
    const modal = document.getElementById('message-modal');
    const overlay = document.getElementById('modal-overlay');
    
    if (!modal || !overlay) {
        console.error('Modal elements not found!');
        return;
    }
    
    // Populate modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div class="bottle-opened">
            <div class="bottle-animation">
                🍾
            </div>
            <h2>You found a message!</h2>
        </div>
        
        <div class="message-content">
            <div class="message-text">"${escapeHtml(bottle.message)}"</div>
        </div>
        
        <div class="message-metadata">
            <div class="metadata-item">
                <span class="metadata-label">From:</span>
                <span class="metadata-value">${escapeHtml(bottle.author)}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Thrown:</span>
                <span class="metadata-value">${formatDate(bottle.thrownAt)}</span>
            </div>
            <div class="metadata-item">
                <span class="metadata-label">Caught by:</span>
                <span class="metadata-value">${escapeHtml(catcherName)}</span>
            </div>
        </div>
        
        <div class="modal-actions">
            <button id="close-modal-btn" class="btn btn-primary">Close</button>
        </div>
    `;
    
    // Show modal
    overlay.style.display = 'block';
    modal.style.display = 'block';
    
    // Trigger animation
    setTimeout(() => {
        overlay.classList.add('active');
        modal.classList.add('active');
    }, 10);
    
    // Set up close button
    const closeBtn = document.getElementById('close-modal-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => hideMessageReader());
    }
    
    // Close on overlay click
    overlay.addEventListener('click', () => hideMessageReader());
    
    // Close on ESC key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            hideMessageReader();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

export function hideMessageReader() {
    const modal = document.getElementById('message-modal');
    const overlay = document.getElementById('modal-overlay');
    
    if (!modal || !overlay) return;
    
    // Remove active classes
    overlay.classList.remove('active');
    modal.classList.remove('active');
    
    // Hide after transition
    setTimeout(() => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }, 300);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}