// Message Form Component - For writing and throwing bottles

let submitCallback = null;

export function initMessageForm(onSubmit) {
    submitCallback = onSubmit;
    
    const form = document.getElementById('bottle-form');
    if (!form) {
        console.error('Message form not found!');
        return;
    }
    
    form.addEventListener('submit', handleSubmit);
    
    // Character counter
    const messageInput = document.getElementById('message-input');
    const charCounter = document.getElementById('char-counter');
    
    if (messageInput && charCounter) {
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            const maxLength = messageInput.maxLength;
            charCounter.textContent = `${length}/${maxLength}`;
            
            if (length > maxLength * 0.9) {
                charCounter.style.color = '#ff6b6b';
            } else {
                charCounter.style.color = '#666';
            }
        });
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const messageInput = document.getElementById('message-input');
    const authorInput = document.getElementById('author-input');
    const submitBtn = document.getElementById('throw-btn');
    
    const message = messageInput.value.trim();
    const author = authorInput.value.trim() || 'Anonymous';
    
    if (!message) {
        showFormError('Please write a message!');
        return;
    }
    
    if (message.length < 10) {
        showFormError('Your message is too short! Write at least 10 characters.');
        return;
    }
    
    // Disable form while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = '🍾 Throwing...';
    messageInput.disabled = true;
    authorInput.disabled = true;
    
    try {
        // Call the callback
        const success = await submitCallback(message, author);
        
        if (success) {
            // Clear form
            messageInput.value = '';
            authorInput.value = '';
            
            // Update character counter
            const charCounter = document.getElementById('char-counter');
            if (charCounter) {
                charCounter.textContent = '0/500';
            }
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showFormError('An error occurred. Please try again.');
    } finally {
        // Re-enable form
        submitBtn.disabled = false;
        submitBtn.textContent = '🍾 Throw Bottle';
        messageInput.disabled = false;
        authorInput.disabled = false;
    }
}

function showFormError(message) {
    const errorDiv = document.getElementById('form-error');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 3000);
    } else {
        alert(message);
    }
}