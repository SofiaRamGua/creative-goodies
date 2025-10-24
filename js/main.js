document.addEventListener('DOMContentLoaded', () => {
    // Get all necessary DOM elements
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalContentArea = document.getElementById('modal-content-area');
    const closeButton = document.getElementById('modal-close-btn');

    // Function to close the modal
    const closeModal = () => {
        modal.classList.remove('is-visible');
        // Clear the content to prepare for the next project
        modalContentArea.innerHTML = ''; 
        // Re-enable scrolling on the main page
        document.body.style.overflow = 'auto'; 
    };

    // 1. OPEN MODAL FUNCTIONALITY
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get the unique ID of the case study content from the data attribute
            const contentId = card.getAttribute('data-project-id'); 
            const sourceContent = document.getElementById(contentId);

            if (sourceContent) {
                // Copy the HTML from the hidden content block into the empty modal area
                modalContentArea.innerHTML = sourceContent.innerHTML;
                
                // Make the modal visible by adding the class
                modal.classList.add('is-visible'); 
                
                // Prevent the main page from scrolling while the modal is open
                document.body.style.overflow = 'hidden';

                // Scroll the content area to the top (important if they open a second case study)
                modal.scrollTop = 0;
            }
        });
    });

    // 2. CLOSE MODAL LISTENERS
    
    // Close when clicking the 'X' button
    closeButton.addEventListener('click', closeModal); 

    // Close when clicking the semi-transparent backdrop (the modal wrapper itself)
    modal.addEventListener('click', (event) => {
        // Checks if the click target is the modal-wrapper (the backdrop) and not the content box
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close when pressing the Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });
});