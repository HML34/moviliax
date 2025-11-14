/**
 * MOVILIAX - Main JavaScript (Optimizado)
 * Versión: 2.0
 * Fecha: Noviembre 2024
 * Mejoras: Performance, Accesibilidad, Código limpio
 */

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initHeaderScroll();
    initMobileMenu();
    initScrollToTop();
    initScrollAnimations();
    initParticles();
    initNewsletterForm();
    initKeyboardNavigation();
    initSmoothScrolling();
    initAnalyticsTracking();
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Agregar clase 'scrolled' después de 100px
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header según dirección del scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    // Optimización: usar requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeader();
            });
            ticking = true;
        }
    }, { passive: true });
}

// ==========================================
// MOBILE MENU
// ==========================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        toggleMenu();
    });
    
    // Cerrar menú al hacer clic en los enlaces
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        const isClickInside = menuToggle.contains(e.target) || navLinks.contains(e.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

function toggleMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle body scroll
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// ==========================================
// SCROLL TO TOP
// ==========================================

function initScrollToTop() {
    const scrollButton = document.getElementById('scrollToTop');
    if (!scrollButton) return;
    
    let ticking = false;

    function updateScrollButton() {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
        ticking = false;
    }

    // Optimización: usar requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollButton();
            });
            ticking = true;
        }
    }, { passive: true });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// SCROLL ANIMATIONS (Intersection Observer)
// ==========================================

function initScrollAnimations() {
    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Si prefiere movimiento reducido, mostrar todos los elementos inmediatamente
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar una vez que el elemento es visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// ==========================================
// PARTICLES ANIMATION
// ==========================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Verificar si el usuario prefiere movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // No crear partículas si el usuario prefiere movimiento reducido
        return;
    }

    // Reducir número de partículas en dispositivos móviles
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 40; // Reducido de 50 para mejor performance
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Posición aleatoria
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Tamaño y opacidad aleatorios
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Delay y duración de animación aleatorios
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15;
    
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    container.appendChild(particle);
}

// ==========================================
// NEWSLETTER FORM
// ==========================================

function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const submitButton = document.getElementById('submitButton');
    const formMessage = document.getElementById('formMessage');
    
    if (!form || !emailInput || !submitButton || !formMessage) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Validar email
        if (!isValidEmail(email)) {
            showMessage('Por favor, ingresa un email válido.', 'error');
            emailInput.focus();
            return;
        }
        
        // Mostrar estado de carga
        submitButton.disabled = true;
        const originalButtonText = submitButton.textContent;
        submitButton.innerHTML = 'Enviando... <div class="spinner"></div>';
        
        try {
            // IMPORTANTE: Aquí debes reemplazar con tu integración real
            // Ejemplo con MailChimp, ConvertKit, etc.
            await submitNewsletter(email);
            
            showMessage('¡Gracias por suscribirte! Revisa tu email para confirmar.', 'success');
            form.reset();
            
            // Analytics event (si tienes Google Analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'newsletter_signup', {
                    'event_category': 'engagement',
                    'event_label': 'newsletter'
                });
            }
        } catch (error) {
            console.error('Error en suscripción:', error);
            showMessage('Error al procesar la suscripción. Por favor, intenta nuevamente.', 'error');
        } finally {
            // Restaurar botón
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
    
    // Validación en tiempo real
    emailInput.addEventListener('input', debounce(() => {
        const email = emailInput.value.trim();
        
        if (email && !isValidEmail(email)) {
            emailInput.style.borderColor = '#ff5252';
            emailInput.setAttribute('aria-invalid', 'true');
        } else {
            emailInput.style.borderColor = '';
            emailInput.setAttribute('aria-invalid', 'false');
        }
    }, 300));
}

// Función de validación de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para mostrar mensajes
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-ocultar mensajes de éxito después de 5 segundos
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Simulación de envío de newsletter (REEMPLAZAR CON API REAL)
function submitNewsletter(email) {
    return new Promise((resolve, reject) => {
        // ============================================
        // IMPORTANTE: REEMPLAZAR CON TU INTEGRACIÓN REAL
        // ============================================
        
        // Ejemplo con fetch a tu backend:
        /*
        fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resolve(data);
            } else {
                reject(new Error(data.message));
            }
        })
        .catch(error => reject(error));
        */
        
        // Ejemplo con MailChimp:
        /*
        const url = 'TU_URL_DE_MAILCHIMP';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                email_address: email,
                status: 'subscribed'
            })
        })
        .then(response => response.json())
        .then(data => resolve(data))
        .catch(error => reject(error));
        */
        
        // Simulación temporal (ELIMINAR EN PRODUCCIÓN)
        setTimeout(() => {
            if (Math.random() > 0.1) { // 90% de éxito
                resolve({ success: true });
            } else {
                reject(new Error('Simulación de error de red'));
            }
        }, 1500);
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initSmoothScrolling() {
    // Smooth scrolling para enlaces ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Ignorar enlaces vacíos
            if (targetId === '#' || targetId === '#!') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Foco en el elemento para accesibilidad
                targetElement.focus({ preventScroll: true });
            }
        });
    });
}

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Cerrar menú móvil con Escape
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
}

// ==========================================
// ANALYTICS & TRACKING
// ==========================================

function initAnalyticsTracking() {
    // Rastrear clics en CTAs
    document.querySelectorAll('.cta-button, .card-link').forEach(button => {
        button.addEventListener('click', (e) => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'CTA',
                    'event_label': e.target.textContent.trim()
                });
            }
        });
    });
    
    // Rastrear clics en redes sociales
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            if (typeof gtag !== 'undefined') {
                const platform = e.currentTarget.getAttribute('aria-label');
                gtag('event', 'social_click', {
                    'event_category': 'Social',
                    'event_label': platform
                });
            }
        });
    });
}

// ==========================================
// UTILIDADES
// ==========================================

// Función debounce para optimizar eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función throttle para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// LAZY LOADING DE IMÁGENES
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observar todas las imágenes con data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// PERFORMANCE MONITORING
// ==========================================

// Monitorear performance de carga
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`⚡ Tiempo de carga de página: ${pageLoadTime}ms`);
        
        // Enviar a analytics si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': pageLoadTime,
                'event_category': 'Performance'
            });
        }
    }
});

// ==========================================
// ERROR HANDLING
// ==========================================

// Capturar errores globales
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
    
    // Opcional: enviar a servicio de monitoreo como Sentry
    // if (typeof Sentry !== 'undefined') {
    //     Sentry.captureException(e.error);
    // }
});

// Capturar promesas rechazadas no manejadas
window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rechazada no manejada:', e.reason);
    
    // Opcional: enviar a servicio de monitoreo
    // if (typeof Sentry !== 'undefined') {
    //     Sentry.captureException(e.reason);
    // }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log(`
%c🚀 MOVILIAX 
%cVersión 2.0 - Optimizado
%c¿Interesado en trabajar con nosotros?
Envía tu CV a: hola@moviliax.com
`, 
'font-size: 24px; font-weight: bold; color: #00E0FF;',
'font-size: 14px; color: #9CA3AF;',
'font-size: 12px; color: #FFFFFF; margin-top: 10px;'
);

// ==========================================
// MEJORAS DE SEGURIDAD
// ==========================================

// Prevenir clickjacking (adicional al X-Frame-Options)
if (window.self !== window.top) {
    window.top.location = window.self.location;
}

// ==========================================
// EXPORTAR FUNCIONES (si se necesita)
// ==========================================

// Si necesitas acceder a estas funciones desde el exterior:
window.MOVILIAX = {
    closeMenu: closeMenu,
    toggleMenu: toggleMenu,
    showMessage: showMessage
};
