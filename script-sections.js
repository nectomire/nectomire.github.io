// Collapsible Sections Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Define which sections should be collapsible (exclude discussion)
    const collapsibleSections = [
        { selector: '.accommodations-section', id: 'accommodations' },
        { selector: '.schedule-container', id: 'schedule' },
        { selector: '.faq-section', id: 'faq' },

    ];

    // Initialize collapsible sections
    collapsibleSections.forEach(section => {
        const sectionElement = document.querySelector(section.selector);
        if (!sectionElement) return;

        const header = sectionElement.querySelector('h2');
        const contents = Array.from(sectionElement.children).filter(child => child !== header);

        // Make header clickable
        header.classList.add('section-header-clickable');

        // Wrap content in collapsible container
        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('collapsible-content');
        contents.forEach(content => contentWrapper.appendChild(content));
        sectionElement.appendChild(contentWrapper);

        // Start collapsed by default
        contentWrapper.classList.remove('expanded');

        // Toggle on header click
        header.addEventListener('click', () => {
            const isExpanded = contentWrapper.classList.contains('expanded');
            if (isExpanded) {
                contentWrapper.classList.remove('expanded');
                header.classList.remove('expanded');
            } else {
                contentWrapper.classList.add('expanded');
                header.classList.add('expanded');
            }
        });
    });

    // Handle Quick Links behavior
    const quickLinks = document.querySelectorAll('.links-section .content-section a');
    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const targetId = href.substring(1);

            // Find which section this link corresponds to
            const targetSection = collapsibleSections.find(s => s.id === targetId);

            // Collapse all collapsible sections
            collapsibleSections.forEach(section => {
                const sectionElement = document.querySelector(section.selector);
                if (!sectionElement) return;

                const header = sectionElement.querySelector('h2');
                const content = sectionElement.querySelector('.collapsible-content');

                if (section.id === targetId) {
                    // Expand the target section
                    content.classList.add('expanded');
                    header.classList.add('expanded');
                } else {
                    // Collapse other sections
                    content.classList.remove('expanded');
                    header.classList.remove('expanded');
                }
            });

            // Scroll to the target section
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
});