// ========================================
// WINTER ARC - SISTEMA ÉPICO DE FINALIZACIÓN
// ========================================

// Fechas del Winter Arc
const WINTER_ARC_START = new Date('2025-11-01T00:00:00');
const WINTER_ARC_END = new Date('2026-03-01T23:59:59');

// Elementos del DOM
const countdownElement = document.getElementById('countdown');
const statusMessageElement = document.getElementById('status-message');
const epicFinalizationElement = document.getElementById('epic-finalization');
const epicMessageElement = document.getElementById('epic-message');
const epicQuizButtonElement = document.getElementById('epic-quiz-button');
const startEpicQuizButton = document.getElementById('start-epic-quiz');
const quizSectionElement = document.getElementById('quiz-section');
const quizFormElement = document.getElementById('winter-arc-quiz');
const quizResultElement = document.getElementById('quiz-result');
const resultTextElement = document.getElementById('result-text');
const scoreDisplayElement = document.getElementById('score-display');
const retakeQuizButton = document.getElementById('retake-quiz');
const confettiCanvas = document.getElementById('confetti-canvas');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Variables del sistema de confeti
let confettiCtx;
let confettiParticles = [];
let isConfettiActive = false;

// ========================================
// FUNCIONES PRINCIPALES DEL SISTEMA
// ========================================

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

// ========================================
// SISTEMA ÉPICO DE FINALIZACIÓN
// ========================================

// Función para iniciar la secuencia épica de finalización
function startEpicFinalization() {
    console.log('🚀 Iniciando secuencia épica de finalización del Winter Arc');
    
    // Ocultar el contador con animación
    countdownElement.style.opacity = '0';
    countdownElement.style.transform = 'scale(0.8)';
    countdownElement.style.transition = 'all 1s ease-in-out';
    
    setTimeout(() => {
        countdownElement.style.display = 'none';
        
        // Mostrar la sección épica
        epicFinalizationElement.style.display = 'block';
        
        // Iniciar animaciones épicas secuencialmente
        setTimeout(() => {
            epicFinalizationElement.classList.add('show');
        }, 100);
        
        // Iniciar el sistema de confeti
        startConfettiSystem();
        
        // Mostrar el botón del cuestionario después de las animaciones
        setTimeout(() => {
            showEpicQuizButton();
        }, 3500); // 3.5 segundos para que terminen todas las animaciones
        
    }, 1000);
}

// Función para mostrar el botón épico del cuestionario
function showEpicQuizButton() {
    console.log('🎯 Mostrando botón épico del cuestionario');
    epicQuizButtonElement.style.display = 'block';
}

// ========================================
// SISTEMA DE CONFETI MINIMALISTA
// ========================================

// Función para inicializar el sistema de confeti
function initConfettiSystem() {
    if (!confettiCanvas) return;
    
    confettiCtx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    // Crear partículas de confeti
    createConfettiParticles();
    
    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', resizeConfettiCanvas);
}

// Función para crear partículas de confeti
function createConfettiParticles() {
    confettiParticles = [];
    const particleCount = 150; // Número de partículas
    
    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10 - Math.random() * 100, // Empezar arriba de la pantalla
            vx: (Math.random() - 0.5) * 2, // Velocidad horizontal
            vy: Math.random() * 2 + 1, // Velocidad vertical
            size: Math.random() * 3 + 1, // Tamaño de la partícula
            color: getRandomConfettiColor(),
            type: Math.random() > 0.5 ? 'circle' : 'line', // Círculo o línea
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4
        });
    }
}

// Función para obtener colores aleatorios del confeti
function getRandomConfettiColor() {
    const colors = ['#00FFFF', '#1E90FF', '#FF6B6B', '#FFD93D', '#6BCF7F', '#FF8E8E'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Función para redimensionar el canvas del confeti
function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    createConfettiParticles();
}

// Función para iniciar el sistema de confeti
function startConfettiSystem() {
    if (!confettiCanvas || isConfettiActive) return;
    
    console.log('🎉 Activando sistema de confeti épico');
    isConfettiActive = true;
    confettiCanvas.classList.add('active');
    
    // Iniciar el loop de animación del confeti
    animateConfetti();
    
    // Detener el confeti después de 8 segundos
    setTimeout(() => {
        stopConfettiSystem();
    }, 8000);
}

// Función para detener el sistema de confeti
function stopConfettiSystem() {
    if (!isConfettiActive) return;
    
    console.log('🛑 Deteniendo sistema de confeti');
    isConfettiActive = false;
    confettiCanvas.classList.remove('active');
}

// Función para animar el confeti
function animateConfetti() {
    if (!isConfettiActive || !confettiCtx) return;
    
    // Limpiar el canvas
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    // Actualizar y dibujar cada partícula
    confettiParticles.forEach((particle, index) => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Reiniciar partículas que salen de la pantalla
        if (particle.y > confettiCanvas.height + 10 || 
            particle.x < -10 || 
            particle.x > confettiCanvas.width + 10) {
            particle.x = Math.random() * confettiCanvas.width;
            particle.y = -10;
            particle.vy = Math.random() * 2 + 1;
        }
        
        // Dibujar la partícula
        confettiCtx.save();
        confettiCtx.translate(particle.x, particle.y);
        confettiCtx.rotate(particle.rotation * Math.PI / 180);
        confettiCtx.fillStyle = particle.color;
        
        if (particle.type === 'circle') {
            confettiCtx.beginPath();
            confettiCtx.arc(0, 0, particle.size, 0, Math.PI * 2);
            confettiCtx.fill();
        } else {
            confettiCtx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size * 2);
        }
        
        confettiCtx.restore();
    });
    
    // Continuar la animación
    requestAnimationFrame(animateConfetti);
}

// ========================================
// SISTEMA DE CONTADOR Y ESTADOS
// ========================================

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date();
    
    // Verificar si el Winter Arc ya terminó
    if (now > WINTER_ARC_END) {
        // Si es la primera vez que se detecta el fin, iniciar la secuencia épica
        if (countdownElement.style.display !== 'none') {
            startEpicFinalization();
        }
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

// ========================================
// SISTEMA DEL CUESTIONARIO
// ========================================

// Función para mostrar la sección del cuestionario
function showQuizSection() {
    console.log('📝 Mostrando sección del cuestionario');
    
    // Verificar si ya hay resultados guardados
    const savedResults = localStorage.getItem('winterArcQuizResults');
    if (savedResults) {
        const results = JSON.parse(savedResults);
        showQuizResults(results.score, results.level);
    } else {
        quizSectionElement.style.display = 'block';
        quizSectionElement.style.opacity = '0';
        setTimeout(() => {
            quizSectionElement.style.opacity = '1';
        }, 100);
    }
}

// Función para calcular el nivel basado en la puntuación
function calculateLevel(score) {
    if (score >= 32) return 'advanced';
    if (score >= 24) return 'intermediate';
    return 'beginner';
}

// Función para obtener el texto del nivel
function getLevelText(level) {
    const levels = {
        'beginner': 'Principiante',
        'intermediate': 'Intermedio',
        'advanced': 'Avanzado'
    };
    return levels[level] || 'Principiante';
}

// Función para mostrar los resultados del cuestionario
function showQuizResults(score, level) {
    quizSectionElement.style.display = 'block';
    quizFormElement.style.display = 'none';
    quizResultElement.style.display = 'block';
    
    resultTextElement.textContent = getLevelText(level);
    resultTextElement.className = `result-text ${level}`;
    scoreDisplayElement.textContent = score;
    
    // Animar la aparición del resultado
    quizResultElement.style.opacity = '0';
    setTimeout(() => {
        quizResultElement.style.opacity = '1';
    }, 100);
}

// Función para procesar el formulario del cuestionario
function processQuizForm(formData) {
    let totalScore = 0;
    const questions = ['exercise', 'diet', 'sleep', 'meditation', 'learning', 'social', 'substances', 'attitude'];
    
    questions.forEach(question => {
        const value = parseInt(formData.get(question));
        if (!isNaN(value)) {
            totalScore += value;
        }
    });
    
    const level = calculateLevel(totalScore);
    
    // Guardar resultados en localStorage
    const results = {
        score: totalScore,
        level: level,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('winterArcQuizResults', JSON.stringify(results));
    
    // Mostrar resultados
    showQuizResults(totalScore, level);
}

// Función para reiniciar el cuestionario
function resetQuiz() {
    quizFormElement.reset();
    quizFormElement.style.display = 'block';
    quizResultElement.style.display = 'none';
    
    // Limpiar localStorage
    localStorage.removeItem('winterArcQuizResults');
}

// ========================================
// FUNCIONES DE INICIALIZACIÓN
// ========================================

// Función para inicializar la página
function init() {
    console.log('🌨️ Inicializando Winter Arc - Sistema Épico');
    
    // Inicializar el sistema de confeti
    initConfettiSystem();
    
    // Verificar si el Winter Arc ya terminó al cargar la página
    const now = new Date();
    if (now > WINTER_ARC_END) {
        console.log('🎯 Winter Arc ya terminó, mostrando finalización épica');
        startEpicFinalization();
    } else {
        // Actualizar el contador inmediatamente
        updateCountdown();
        
        // Actualizar cada segundo
        setInterval(updateCountdown, 1000);
    }
    
    // Añadir efecto de entrada suave
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Event listeners para el cuestionario
document.addEventListener('DOMContentLoaded', () => {
    // Manejar el envío del formulario
    quizFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(quizFormElement);
        processQuizForm(formData);
    });
    
    // Manejar el botón de volver a hacer el cuestionario
    retakeQuizButton.addEventListener('click', resetQuiz);
    
    // Manejar el botón épico del cuestionario
    startEpicQuizButton.addEventListener('click', () => {
        console.log('🚀 Botón épico del cuestionario activado');
        epicFinalizationElement.style.display = 'none';
        showQuizSection();
    });
});

// ========================================
// FUNCIONES DE EFECTOS VISUALES
// ========================================

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
    const elementsToObserve = document.querySelectorAll('.official-slogan, .countdown, .quiz-section');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
}

// Inicializar efectos de scroll
document.addEventListener('DOMContentLoaded', addScrollEffects);
