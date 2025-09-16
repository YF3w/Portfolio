/**
 * Initialise le formulaire de contact (si présent)
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Validation simple
            if (!name || !email || !message) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Validation email
            if (!isValidEmail(email)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simulation d'envoi (ici vous pourriez intégrer un service d'email)
            console.log('Message envoyé:', { name, email, message });
            
            // Afficher un message de confirmation
            showSuccessMessage(`Merci ${name} ! Votre message a été envoyé. Je vous répondrai rapidement à l'adresse ${email}.`);
            
            // Réinitialiser le formulaire
            this.reset();
        });
    }
}

/**
 * Affiche un message de succès
 * @param {string} message - Le message à afficher
 */
function showSuccessMessage(message) {
    // Créer un élément de notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        z-index: 1000;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

/**
 * Valide une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} True si valide
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Ajoute des animations au scroll pour les sections
 */
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

/**
 * Ajoute des effets hover aux cards de documents
 */
function initDocumentCards() {
    const cards = document.querySelectorAll('.document-card');
    
    cards.forEach(card => {
        // Effet de hover
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        // Effet de clic
        const links = card.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Ajouter un effet visuel lors du clic
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = 'scale(1)';
                }, 150);
                
                console.log(`Ouverture du document: ${link.textContent}`);
            });
        });
    });
}

/**
 * Ajoute des effets aux liens de contact
 */
function initContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-item a');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('mailto:')) {
                console.log(`Ouverture de l'email: ${href.replace('mailto:', '')}`);
                showNotification('📧 Client email ouvert !');
            } else if (href.startsWith('tel:')) {
                console.log(`Appel du numéro: ${href.replace('tel:', '')}`);
                showNotification('📱 Numéro copié !');
                // Copier le numéro dans le presse-papier
                navigator.clipboard.writeText(href.replace('tel:', '').replace(/\s/g, ''));
            } else if (href.includes('linkedin.com')) {
                console.log('Redirection vers LinkedIn');
                showNotification('💼 Redirection vers LinkedIn...');
            } else if (href.includes('github.com')) {
                console.log('Redirection vers GitHub');
                showNotification('🐙 Redirection vers GitHub...');
            }
        });
    });
}

/**
 * Affiche une notification simple
 * @param {string} message - Le message à afficher
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #667eea;
        color: white;
        padding: 0.8rem 1.5rem;
        border-radius: 25px;
        font-size: 0.9rem;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animation d'apparition
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 2000);
    
    // Supprimer après l'animation
    setTimeout(() => {
        notification.remove();
    }, 2300);
}

/**
 * Ajoute un effet de défilement fluide pour les ancres (si nécessaire)
 */
function initSmoothScroll() {
    // Si vous ajoutez une navigation interne plus tard
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Fonction utilitaire pour déboguer le portfolio
 */
function debugPortfolio() {
    console.log('=== DEBUG PORTFOLIO ===');
    console.log(`Nombre de sections: ${document.querySelectorAll('.section').length}`);
    console.log(`Nombre de cards de documents: ${document.querySelectorAll('.document-card').length}`);
    console.log(`Nombre de liens de contact: ${document.querySelectorAll('.contact-item a').length}`);
    console.log(`Formulaire de contact présent: ${document.getElementById('contact-form') ? 'Oui' : 'Non'}`);
    
    // Vérifier les liens des documents
    const documentLinks = document.querySelectorAll('.document-card a');
    console.log('Liens des documents:');
    documentLinks.forEach((link, index) => {
        console.log(`  ${index + 1}. ${link.textContent} -> ${link.href}`);
    });
}

/**
 * Ajoute des raccourcis clavier utiles
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+D pour debug
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            debugPortfolio();
        }
        
        // Ctrl+Shift+T pour aller au top
        if (e.ctrlKey && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showNotification('🔝 Retour en haut !');
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portfolio Youssif MATTI YOUSIF initialisé');
    
    // Initialiser toutes les fonctionnalités
    initContactForm();
    initScrollAnimations();
    initDocumentCards();
    initContactLinks();
    initSmoothScroll();
    initKeyboardShortcuts();
    
    console.log('💡 Raccourcis disponibles:');
    console.log('  - Ctrl+Shift+D: Debug du portfolio');
    console.log('  - Ctrl+Shift+T: Retour en haut de page');
    
    // Message de bienvenue après un court délai
    setTimeout(() => {
        showNotification('👋 Bienvenue sur mon portfolio !');
    }, 1000);
});

// Fonctions utilitaires globales
window.debugPortfolio = debugPortfolio;