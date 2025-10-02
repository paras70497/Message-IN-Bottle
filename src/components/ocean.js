// Ocean Component - Displays floating bottles

import { getFloatingBottles } from '../services/firebase.js';
import { createBottleElement } from './bottle.js';

let oceanContainer = null;
let bottleCount = 0;

export function initOcean() {
    oceanContainer = document.getElementById('ocean');
    
    if (!oceanContainer) {
        console.error('Ocean container not found!');
        return;
    }
    
    // Load bottles initially
    loadBottles();
    
    // Set up reload listener
    document.addEventListener('reload-bottles', loadBottles);
    
    // Auto-refresh every 30 seconds
    setInterval(loadBottles, 30000);
}

export async function loadBottles() {
    if (!oceanContainer) return;
    
    try {
        const bottles = await getFloatingBottles();
        
        // Clear existing bottles
        oceanContainer.innerHTML = '';
        
        if (bottles.length === 0) {
            oceanContainer.innerHTML = `
                <div class="empty-ocean">
                    <p>🌊 The ocean is calm and empty...</p>
                    <p>Be the first to throw a message in a bottle!</p>
                </div>
            `;
            bottleCount = 0;
            updateBottleCounter(0);
            return;
        }
        
        // Add bottles to ocean
        bottles.forEach((bottle, index) => {
            setTimeout(() => {
                addBottleToOcean(bottle);
            }, index * 100); // Stagger the appearance
        });
        
        bottleCount = bottles.length;
        updateBottleCounter(bottles.length);
        
    } catch (error) {
        console.error('Error loading bottles:', error);
        oceanContainer.innerHTML = `
            <div class="empty-ocean">
                <p>⚠️ Error loading bottles</p>
                <p>Check your Firebase configuration</p>
            </div>
        `;
    }
}

export function addBottleToOcean(bottle) {
    if (!oceanContainer) return;
    
    const bottleElement = createBottleElement(bottle);
    bottleElement.classList.add('bottle-floating');
    
    oceanContainer.appendChild(bottleElement);
}

function updateBottleCounter(count) {
    const counter = document.getElementById('bottle-counter');
    if (counter) {
        counter.textContent = `${count} bottle${count !== 1 ? 's' : ''} floating`;
    }
}

export function clearOcean() {
    if (oceanContainer) {
        oceanContainer.innerHTML = '';
    }
    bottleCount = 0;
}