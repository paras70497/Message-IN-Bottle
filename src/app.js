// Main Application Entry Point
import { throwBottle, fishRandomBottle, catchBottle } from './services/firebase.js';
import { createBottleElement, animateBottleThrow } from './components/bottle.js';
import { initOcean, addBottleToOcean } from './components/ocean.js';
import { initMessageForm } from './components/messageForm.js';
import { showMessageReader, hideMessageReader } from './components/messageReader.js';

class MessageInBottleApp {
    constructor() {
        this.currentView = 'main';
        this.init();
    }

    init() {
        // Initialize all components
        initOcean();
        initMessageForm(this.handleThrowBottle.bind(this));
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Load initial bottles
        this.loadFloatingBottles();
        
        console.log('🌊 Message in a Bottle app initialized!');
    }

    setupEventListeners() {
        // Fish button to catch a random bottle
        const fishBtn = document.getElementById('fish-btn');
        if (fishBtn) {
            fishBtn.addEventListener('click', () => this.handleFishBottle());
        }

        // View toggle buttons
        const showFormBtn = document.getElementById('show-form-btn');
        const hideFormBtn = document.getElementById('hide-form-btn');
        
        if (showFormBtn) {
            showFormBtn.addEventListener('click', () => this.toggleView('form'));
        }
        
        if (hideFormBtn) {
            hideFormBtn.addEventListener('click', () => this.toggleView('main'));
        }
    }

    toggleView(view) {
        const formSection = document.getElementById('message-form-section');
        const oceanSection = document.getElementById('ocean-section');
        
        if (view === 'form') {
            formSection.style.display = 'block';
            oceanSection.style.display = 'none';
        } else {
            formSection.style.display = 'none';
            oceanSection.style.display = 'block';
        }
        
        this.currentView = view;
    }

    async handleThrowBottle(message, author) {
        try {
            // Throw bottle to Firebase
            const result = await throwBottle(message, author);
            
            if (result.success) {
                // Show success animation
                this.showNotification('🍾 Your bottle has been thrown into the ocean!', 'success');
                
                // Reload bottles
                await this.loadFloatingBottles();
                
                // Return to main view
                this.toggleView('main');
                
                return true;
            } else {
                this.showNotification('❌ Failed to throw bottle: ' + result.error, 'error');
                return false;
            }
        } catch (error) {
            console.error('Error in handleThrowBottle:', error);
            this.showNotification('❌ An error occurred while throwing the bottle', 'error');
            return false;
        }
    }

    async handleFishBottle() {
        try {
            const fishBtn = document.getElementById('fish-btn');
            fishBtn.disabled = true;
            fishBtn.textContent = '🎣 Fishing...';
            
            // Get a random bottle
            const bottle = await fishRandomBottle();
            
            if (!bottle) {
                this.showNotification('🌊 The ocean is empty! Be the first to throw a bottle!', 'info');
                fishBtn.disabled = false;
                fishBtn.textContent = '🎣 Fish for a Bottle';
                return;
            }
            
            // Ask for catcher's name
            const catcherName = prompt('What\'s your name? (or leave blank for Anonymous)') || 'Anonymous';
            
            // Catch the bottle
            const result = await catchBottle(bottle.id, catcherName);
            
            if (result.success) {
                // Show the message
                showMessageReader(bottle, catcherName);
                
                // Reload bottles
                await this.loadFloatingBottles();
                
                this.showNotification('🍾 You caught a bottle!', 'success');
            } else {
                this.showNotification('❌ Failed to catch bottle: ' + result.error, 'error');
            }
            
            fishBtn.disabled = false;
            fishBtn.textContent = '🎣 Fish for a Bottle';
            
        } catch (error) {
            console.error('Error in handleFishBottle:', error);
            this.showNotification('❌ An error occurred while fishing', 'error');
            
            const fishBtn = document.getElementById('fish-btn');
            fishBtn.disabled = false;
            fishBtn.textContent = '🎣 Fish for a Bottle';
        }
    }

    async loadFloatingBottles() {
        try {
            // This will be handled by the ocean component
            const event = new CustomEvent('reload-bottles');
            document.dispatchEvent(event);
        } catch (error) {
            console.error('Error loading bottles:', error);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MessageInBottleApp();
    });
} else {
    new MessageInBottleApp();
}

export default MessageInBottleApp;