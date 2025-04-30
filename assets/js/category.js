document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.select-category-btn:not([disabled])');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Store the selected category in localStorage
            localStorage.setItem('selectedCategory', category);
            
            // Add a visual indication that the button was clicked
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Wait a moment before redirecting for better UX
            setTimeout(() => {
                window.location.href = 'quiz.html';
            }, 800);
        });
    });
    
    // Animate cards on hover for better interactivity
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const button = this.querySelector('.select-category-btn');
            if (!button.hasAttribute('disabled')) {
                button.style.transform = 'translateY(-3px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const button = this.querySelector('.select-category-btn');
            button.style.transform = '';
        });
    });
});