document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax Mouse Effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');

        const moveX1 = (mouseX / window.innerWidth) * 30; // Move 30px max
        const moveY1 = (mouseY / window.innerHeight) * 30;

        const moveX2 = (mouseX / window.innerWidth) * -30; // Move opposite
        const moveY2 = (mouseY / window.innerHeight) * -30;

        if (orb1) orb1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
        if (orb2) orb2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add a class to trigger CSS transition if needed
                // Currently using CSS animation on load, but we can add more scroll triggers here
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Logo hover effect (simple)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.transform = 'scale(1.05)';
        });
        logo.addEventListener('mouseout', () => {
            logo.style.transform = 'scale(1)';
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, this would send data to a server
            const name = document.getElementById('name').value;
            alert(`Thanks ${name}! Your message has been sent (demo only).`);
            contactForm.reset();
        });
    }

    // Typewriter Effect
    const titles = ["AI Engineer", "Data Scientist", "Data Analyst", "Data Engineer"];
    const typingElement = document.getElementById('typing-text');
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typingElement) return;

        const currentTitle = titles[titleIndex];
        const nextTitle = titles[(titleIndex + 1) % titles.length];

        // Smart Backspacing: Find common prefix length
        let commonPrefixLength = 0;
        if (isDeleting) {
            // Only backspace until the point where the next word differs
            // Or if they are totally different, backspace all
            // Simple approach: Backspace everything if no "Data" match, or keep "Data"

            // "Data Analyst" -> "Data Scientist" (Common: "Data ")
            // "Data Scientist" -> "AI Engineer" (Common: "")
            // "AI Engineer" -> "Data Engineer" (Common: " Engineer"? No, usually prefix is kept, rarely suffix)
            // Wait, standard typewriter keeps PREFIX.
            // "AI Engineer" -> "Data Engineer" (Prefix mismatch immediately 'A' vs 'D'). So delete all.
            // "Data Engineer" -> "Data Analyst" (Common: "Data ")

            // Determine how much to keep
            let i = 0;
            while (i < currentTitle.length && i < nextTitle.length && currentTitle[i] === nextTitle[i]) {
                i++;
            }
            commonPrefixLength = i;
        }

        if (isDeleting) {
            // Deleting
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster deleting

            if (charIndex <= commonPrefixLength) {
                isDeleting = false;
                titleIndex = (titleIndex + 1) % titles.length;
                typeSpeed = 500; // Pause before typing new
            }
        } else {
            // Typing
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Normal typing speed

            if (charIndex === currentTitle.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end of word
            }
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing
    type();

});
