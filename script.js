// ==============================================
// Part 1: JavaScript Event Handling
// ==============================================

// Click Event - Reveal secret message
document.getElementById('reveal-btn').addEventListener('click', function() {
    const message = document.getElementById('secret-message');
    message.classList.toggle('hidden');
    this.textContent = message.classList.contains('hidden') ? 'Click Me!' : 'Hide Message';
});

// Mouse Events - Cupcake interaction
const cupcake = document.getElementById('cupcake');
const cupcakeStatus = document.getElementById('cupcake-status');

cupcake.addEventListener('mouseover', function() {
    this.style.textShadow = '0 0 10px #ff69b4';
    cupcakeStatus.textContent = 'Cupcake is glowing!';
});

cupcake.addEventListener('mouseout', function() {
    this.style.textShadow = 'none';
    cupcakeStatus.textContent = 'Cupcake is ready for interaction';
});

cupcake.addEventListener('click', function() {
    this.textContent = this.textContent === '🧁' ? '🧁✨' : '🧁';
    cupcakeStatus.textContent = 'Sprinkles added!';
});

// Keyboard Events - Text transformation
const keyboardInput = document.getElementById('keyboard-input');
const keyboardOutput = document.getElementById('keyboard-output');

keyboardInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
        keyboardOutput.textContent = 'Your text will appear here';
        return;
    }
    
    // Transform the text in various ways
    const transformations = [
        `Normal: ${this.value}`,
        `Uppercase: ${this.value.toUpperCase()}`,
        `Lowercase: ${this.value.toLowerCase()}`,
        `Length: ${this.value.length} characters`
    ];
    
    keyboardOutput.innerHTML = transformations.join('<br>');
});

// ==============================================
// Part 2: Interactive Elements
// ==============================================

// Feature 1: Light/Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    this.textContent = document.body.classList.contains('dark-theme') 
        ? 'Switch to Light Mode' 
        : 'Switch to Dark Mode';
});

// Feature 2: Simple Cookie Counter Game
// for some reason the cookie counter button kept disappearing from the page, so i put an isolated standalone script inline in the html docment

// Feature 3: Collapsible FAQ Section
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isVisible = answer.classList.contains('show');
        
        // Close all answers
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('show');
        });
        
        // Update all icons
        document.querySelectorAll('.faq-question').forEach(q => {
            q.textContent = q.textContent.replace('➖', '➕');
        });
        
        // Toggle current answer if it wasn't already visible
        if (!isVisible) {
            answer.classList.add('show');
            this.textContent = this.textContent.replace('➕', '➖');
        }
    });
});

// ==============================================
// Part 3: Form Validation
// ==============================================

const orderForm = document.getElementById('order-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const orderInput = document.getElementById('order-details');
const dateInput = document.getElementById('date');

// Real-time validation
nameInput.addEventListener('blur', function() {
    validateName();
});

emailInput.addEventListener('blur', function() {
    validateEmail();
});

phoneInput.addEventListener('blur', function() {
    validatePhone();
});

orderInput.addEventListener('blur', function() {
    validateOrder();
});

dateInput.addEventListener('change', function() {
    validateDate();
});

// Validation functions
function validateName() {
    const errorElement = document.getElementById('name-error');
    
    if (nameInput.value.trim() === '') {
        showError(errorElement, 'Name is required');
        return false;
    } else if (nameInput.value.trim().length < 2) {
        showError(errorElement, 'Name must be at least 2 characters');
        return false;
    } else {
        clearError(errorElement);
        return true;
    }
}

function validateEmail() {
    const errorElement = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
        showError(errorElement, 'Email is required');
        return false;
    } else if (!emailRegex.test(emailInput.value)) {
        showError(errorElement, 'Please enter a valid email address');
        return false;
    } else {
        clearError(errorElement);
        return true;
    }
}

function validatePhone() {
    const errorElement = document.getElementById('phone-error');
    const phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    
    if (phoneInput.value.trim() === '') {
        showError(errorElement, 'Phone number is required');
        return false;
    } else if (!phoneRegex.test(phoneInput.value)) {
        showError(errorElement, 'Please enter a valid phone number');
        return false;
    } else {
        clearError(errorElement);
        return true;
    }
}

function validateOrder() {
    const errorElement = document.getElementById('order-error');
    
    if (orderInput.value.trim() === '') {
        showError(errorElement, 'Order details are required');
        return false;
    } else if (orderInput.value.trim().length < 10) {
        showError(errorElement, 'Please provide more details about your order');
        return false;
    } else {
        clearError(errorElement);
        return true;
    }
}

function validateDate() {
    const errorElement = document.getElementById('date-error');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!dateInput.value) {
        showError(errorElement, 'Please select a date');
        return false;
    } else if (selectedDate < today) {
        showError(errorElement, 'Please select a future date');
        return false;
    } else {
        clearError(errorElement);
        return true;
    }
}

// Helper functions for error handling
function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function clearError(element) {
    element.textContent = '';
    element.style.display = 'none';
}

// Form submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isOrderValid = validateOrder();
    const isDateValid = validateDate();
    
    // If all valid, submit the form
    if (isNameValid && isEmailValid && isPhoneValid && isOrderValid && isDateValid) {
        // In a real application, you would send the data to a server here
        orderForm.classList.add('hidden');
        document.getElementById('order-success').classList.remove('hidden');
        
        // Reset form after successful submission (optional)
        setTimeout(() => {
            orderForm.reset();
            orderForm.classList.remove('hidden');
            document.getElementById('order-success').classList.add('hidden');
        }, 5000);
    }
});