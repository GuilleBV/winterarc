// Fechas del Winter Arc
const WINTER_ARC_START = new Date('2025-11-01T00:00:00');
const WINTER_ARC_END = new Date('2026-03-01T23:59:59');

// Elementos del DOM
const countdownElement = document.getElementById('countdown');
const statusMessageElement = document.getElementById('status-message');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Función para formatear números con ceros a la izquierda
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Función para calcular la diferencia de tiempo
function calculateTimeDifference(targetDate) {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date();
    
    // Verificar si el Winter Arc ya terminó
    if (now > WINTER_ARC_END) {
        countdownElement.style.display = 'none';
        statusMessageElement.textContent = 'El Winter Arc ha finalizado. Prepárate para el próximo desafío.';
        statusMessageElement.classList.add('show');
        return;
    }
    
    // Verificar si el Winter Arc ya empezó
    if (now >= WINTER_ARC_START) {
        // Mostrar tiempo restante hasta el final
        const timeLeft = calculateTimeDifference(WINTER_ARC_END);
        daysElement.textContent = timeLeft.days;
        hoursElement.textContent = padZero(timeLeft.hours);
        minutesElement.textContent = padZero(timeLeft.minutes);
        secondsElement.textContent = padZero(timeLeft.seconds);
        
        // Cambiar el mensaje del status
        if (!statusMessageElement.classList.contains('show')) {
            statusMessageElement.textContent = 'El Winter Arc está en curso. ¡Aprovecha cada momento!';
            statusMessageElement.classList.add('show');
        }
    } else {
        // Mostrar tiempo restante hasta el inicio
        const timeLeft = calculateTimeDifference(WINTER_ARC_START);
        daysElement.textContent = timeLeft.days;
        hoursElement.textContent = padZero(timeLeft.hours);
        minutesElement.textContent = padZero(timeLeft.minutes);
        secondsElement.textContent = padZero(timeLeft.seconds);
        
        // Ocultar mensaje del status
        statusMessageElement.classList.remove('show');
    }
}

// Función para añadir efecto de pulso a los números
function addPulseEffect() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach((number, index) => {
        setTimeout(() => {
            number.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                number.style.animation = '';
            }, 600);
        }, index * 100);
    });
}

// Función para inicializar la página
function init() {
    // Actualizar el contador inmediatamente
    updateCountdown();
    
    // Actualizar cada segundo
    setInterval(() => {
        updateCountdown();
        // Añadir efecto de pulso cada 10 segundos
        if (new Date().getSeconds() % 10 === 0) {
            addPulseEffect();
        }
    }, 1000);
    
    // Añadir efecto de entrada suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Función para añadir efectos interactivos
function addInteractiveEffects() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
            item.style.borderColor = 'rgba(30, 144, 255, 0.8)';
            item.style.boxShadow = '0 15px 40px rgba(30, 144, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.borderColor = 'rgba(30, 144, 255, 0.2)';
            item.style.boxShadow = 'none';
        });
        
        // Efecto de click
        item.addEventListener('click', () => {
            item.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// Añadir efectos interactivos cuando la página esté lista
window.addEventListener('load', addInteractiveEffects);

// Añadir efecto de scroll suave para elementos
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones de scroll
    const elementsToObserve = document.querySelectorAll('.official-slogan, .countdown');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}

// Inicializar efectos de scroll
document.addEventListener('DOMContentLoaded', addScrollEffects);
