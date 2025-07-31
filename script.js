document.addEventListener('DOMContentLoaded', function() {
    // Effet sur le header au défilement
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Défilement fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Ajustement pour le header fixe
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion du menu hamburger
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Animation d'apparition au défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Appliquer l'animation aux éléments concernés
    const elementsToAnimate = document.querySelectorAll('.mission-content, .product-card, .step, .about-content, .team-member, .contact-form');
    elementsToAnimate.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Validation du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const consent = document.getElementById('consent').checked;

            if (name === '' || email === '') {
                alert('Veuillez remplir votre nom et votre email.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }

            if (!consent) {
                alert("Veuillez accepter d'être recontacté pour continuer.");
                return;
            }
            
            // Simulation d'envoi réussi
            alert('Merci ! Vous avez bien été ajouté à notre liste d\'attente.');
            contactForm.reset();
        });
    }
});

// Injection du style pour l'animation de défilement
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);