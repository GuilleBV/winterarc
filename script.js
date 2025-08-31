// ========================================
// WINTER ARC - SISTEMA OPTIMIZADO
// ========================================
// 
// FLUJO VISUAL OPTIMIZADO:
// 1. Página se carga → Contador visible siempre
// 2. Contador llega a 0 → Se queda fijo en "00 DÍAS 00 HORAS 00 MINUTOS 00 SEGUNDOS"
// 3. Confeti se lanza SOLO la primera vez que llega a 0
// 4. Mensaje final aparece con animación fade-in + scale-up
// 5. Botón del cuestionario aparece debajo del mensaje
// 6. Todo queda fijo en pantalla, sin movimientos ni parpadeos
//
// CARACTERÍSTICAS CLAVE:
// - Contador NUNCA desaparece
// - Confeti solo se lanza una vez
// - Mensaje y botón quedan fijos
// - Sin "Fecha inválida" ni parpadeos

// ========================================
// CONSTANTES Y CONFIGURACIÓN
// ========================================

const WINTER_ARC_START = new Date('2025-11-01T00:00:00');
const WINTER_ARC_END = new Date('2026-03-01T23:59:59');

// ========================================
// ELEMENTOS DEL DOM
// ========================================

const countdownElement = document.getElementById('countdown');
const counterTextElement = document.getElementById('counter-text');
const statusMessageElement = document.getElementById('status-message');
const epicFinalizationElement = document.getElementById('epic-finalization');
const epicMessageElement = document.getElementById('epic-message');
const epicQuizButtonElement = document.getElementById('epic-quiz-button');
const quizSectionElement = document.getElementById('quiz-section');
const quizFormElement = document.getElementById('winter-arc-quiz');
const quizResultElement = document.getElementById('quiz-result');
const userStatsElement = document.getElementById('user-stats');

const confettiCanvas = document.getElementById('confetti-canvas');

// ========================================
// VARIABLES DE ESTADO
// ========================================

let hasConfettiLaunched = false; // Controla que el confeti solo se lance una vez
let countdownInterval = null; // Intervalo del contador
let isWinterArcFinished = false; // Estado del Winter Arc

// ========================================
// FUNCIONES UTILITARIAS
// ========================================

// Función para formatear números con ceros a la izquierda
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Función para calcular diferencia de tiempo
function calculateTimeDifference(targetDate) {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// ========================================
// SISTEMA DE CONTADOR PRINCIPAL
// ========================================

// Función para actualizar el contador en tiempo real
function updateCountdown() {
    const now = new Date();
    
    if (now > WINTER_ARC_END) {
        // Winter Arc ha terminado
        if (!isWinterArcFinished) {
            isWinterArcFinished = true;
            handleWinterArcCompletion();
        }
        
        // Mantener el contador en 0
        updateCountdownDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
    }
    
    if (now >= WINTER_ARC_START) {
        // Winter Arc está en curso
        const timeLeft = calculateTimeDifference(WINTER_ARC_END);
        updateCountdownDisplay(timeLeft);
        
        if (counterTextElement) {
            counterTextElement.textContent = 'Termina en';
            counterTextElement.style.display = 'block';
            counterTextElement.style.opacity = '1';
            counterTextElement.style.transform = 'translateY(0)';
        }
    } else {
        // Winter Arc no ha comenzado
        const timeLeft = calculateTimeDifference(WINTER_ARC_START);
        updateCountdownDisplay(timeLeft);
        
        if (counterTextElement) {
            counterTextElement.textContent = 'Empieza en';
            counterTextElement.style.display = 'block';
            counterTextElement.style.opacity = '1';
            counterTextElement.style.transform = 'translateY(0)';
        }
    }
}

// Función para actualizar la visualización del contador
function updateCountdownDisplay(timeData) {
    if (!countdownElement) return;
    
    const dayElement = countdownElement.querySelector('.countdown-item:nth-child(1) .number');
    const hourElement = countdownElement.querySelector('.countdown-item:nth-child(2) .number');
    const minuteElement = countdownElement.querySelector('.countdown-item:nth-child(3) .number');
    const secondElement = countdownElement.querySelector('.countdown-item:nth-child(4) .number');
    
    if (dayElement) dayElement.textContent = timeData.days;
    if (hourElement) hourElement.textContent = padZero(timeData.hours);
    if (minuteElement) minuteElement.textContent = padZero(timeData.minutes);
    if (secondElement) secondElement.textContent = padZero(timeData.seconds);
}

// Función para manejar la finalización del Winter Arc
function handleWinterArcCompletion() {
    console.log('🎯 Winter Arc ha terminado - Iniciando secuencia de finalización');
    
    // IMPORTANTE: El contador se queda visible en 0, NO desaparece
    
    // Actualizar texto descriptivo
    if (counterTextElement) {
        counterTextElement.textContent = 'Finalizado';
        counterTextElement.style.color = '#8B5CF6'; // Color morado para indicar finalización
        counterTextElement.classList.add('finalized');
    }
    
    // Lanzar confeti SOLO si no se ha lanzado antes
    if (!hasConfettiLaunched) {
        console.log('🎉 Lanzando confeti por primera vez');
        hasConfettiLaunched = true;
        startConfettiSystem();
        
        // Después del confeti, mostrar mensaje y botón
        setTimeout(() => {
            showEpicFinalization();
        }, 1000);
    }
}

// Función para verificar si el Winter Arc ya terminó naturalmente
function checkIfWinterArcAlreadyFinished() {
    const now = new Date();
    return now > WINTER_ARC_END;
}

// ========================================
// SISTEMA DE FINALIZACIÓN ÉPICA
// ========================================

// Función para mostrar la finalización épica
function showEpicFinalization() {
    console.log('🌟 Mostrando finalización épica del Winter Arc');
    
    if (!epicFinalizationElement) return;
    
    // Mostrar la sección épica
    epicFinalizationElement.style.display = 'block';
    
    // Aplicar animación de entrada
    epicFinalizationElement.style.opacity = '0';
    epicFinalizationElement.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        epicFinalizationElement.style.opacity = '1';
        epicFinalizationElement.style.transform = 'scale(1)';
        epicFinalizationElement.classList.add('show');
    }, 100);
    
    // Mostrar el botón del cuestionario después de la animación del mensaje
    setTimeout(() => {
        showEpicQuizButton();
        console.log('🎯 Botón "Iniciar Evaluación" visible - El usuario debe hacer clic para continuar');
    }, 1500);
}

// Función para mostrar el botón épico del cuestionario
function showEpicQuizButton() {
    console.log('🎯 Mostrando botón épico del cuestionario');
    if (epicQuizButtonElement) {
        epicQuizButtonElement.style.display = 'block';
    }
}

// ========================================
// SISTEMA DE VISUALIZACIÓN POST-FINALIZACIÓN
// ========================================

// Función para mostrar el cuestionario después de la animación épica
function showQuizAfterEpicAnimation() {
    console.log('📝 Mostrando cuestionario después de la animación épica');
    
    // IMPORTANTE: NO ocultar la sección épica, solo mostrar el cuestionario
    // El mensaje final y botón se quedan visibles como elementos fijos
    
    // Mostrar el cuestionario vacío (siempre limpio)
    showQuizSection();
}

// Función para mostrar la sección del cuestionario
function showQuizSection() {
    console.log('📝 Mostrando sección del cuestionario');
    
    // Ocultar elementos que no deben estar visibles
    hideAllSections();
    
    // Mostrar el formulario vacío
    if (quizSectionElement && quizFormElement) {
        quizSectionElement.style.display = 'block';
        quizFormElement.style.display = 'block';
        
        // Aplicar animación de entrada suave
        quizSectionElement.style.opacity = '0';
        setTimeout(() => {
            quizSectionElement.style.opacity = '1';
        }, 100);
    }
}

// Función para ocultar todas las secciones
function hideAllSections() {
    const sections = [
        { element: userStatsElement, name: 'estadísticas' },
        { element: quizResultElement, name: 'resultados del cuestionario' }
    ];
    
    sections.forEach(section => {
        if (section.element && section.element.style.display === 'block') {
            section.element.style.display = 'none';
            console.log(`🔒 Ocultando sección: ${section.name}`);
        }
    });
}

// ========================================
// SISTEMA DE CUESTIONARIO
// ========================================

// Función para procesar el formulario del cuestionario
function processQuizForm(formData) {
    console.log('📝 Procesando formulario del cuestionario');
    
    // FLUJO OPTIMIZADO DEL CUESTIONARIO:
    // 1. Usuario completa el formulario
    // 2. Se calculan puntuaciones y nivel
    // 3. Se muestran resultados del cuestionario
    // 4. Después de 2 segundos, aparecen las estadísticas
    // NOTA: No se guarda nada en localStorage
    
    // Calcular puntuación total y por categorías
    let totalScore = 0;
    const categoryScores = {};
    
    const categories = ['exercise', 'diet', 'sleep', 'meditation', 'learning', 'social', 'substances', 'attitude'];
    
    categories.forEach(category => {
        const score = parseInt(formData.get(category));
        if (score && score >= 1 && score <= 5) {
            totalScore += score;
            categoryScores[category] = score;
        }
    });
    
    // Calcular nivel basado en la puntuación total
    const level = calculateLevel(totalScore);
    
    console.log(`📊 Puntuación total: ${totalScore}, Nivel: ${level}`);
    
    // Mostrar resultados del cuestionario
    showQuizResults(totalScore, level);
    
    // IMPORTANTE: Las estadísticas aparecen DESPUÉS de completar el cuestionario
    // Esto asegura el orden visual correcto: cuestionario → resultados → estadísticas
    setTimeout(() => {
        showUserStats({ score: totalScore, level: level, categoryScores: categoryScores });
    }, 2000);
}

// Función para calcular el nivel del usuario
function calculateLevel(score) {
    if (score >= 8 && score <= 20) return 'beginner';
    if (score >= 21 && score <= 32) return 'intermediate';
    if (score >= 33 && score <= 40) return 'advanced';
    return 'beginner';
}

// Función para obtener el texto del nivel
function getLevelText(level) {
    const levelTexts = {
        'beginner': 'Principiante',
        'intermediate': 'Intermedio',
        'advanced': 'Avanzado'
    };
    return levelTexts[level] || 'Principiante';
}

// Función para mostrar resultados del cuestionario
function showQuizResults(score, level) {
    console.log('📊 Mostrando resultados del cuestionario');
    
    if (!quizResultElement) return;
    
    // Ocultar el formulario
    if (quizFormElement) {
        quizFormElement.style.display = 'none';
    }
    
    // Mostrar resultados
    quizResultElement.style.display = 'block';
    
    // Actualizar contenido
    const levelElement = quizResultElement.querySelector('.result-level');
    const scoreElement = quizResultElement.querySelector('.result-score');
    const textElement = quizResultElement.querySelector('.result-text');
    
    if (levelElement) levelElement.textContent = getLevelText(level);
    if (scoreElement) scoreElement.textContent = `${score}/40`;
    
    // Aplicar clase de nivel para estilos
    if (textElement) {
        textElement.className = 'result-text ' + level;
    }
}

// Función para reiniciar el cuestionario
function resetQuiz() {
    console.log('🔄 Reiniciando cuestionario');
    
    // Ocultar resultados y estadísticas
    hideAllSections();
    
    // Mostrar formulario vacío
    if (quizFormElement) {
        quizFormElement.style.display = 'block';
    }
    
    // Limpiar todas las respuestas del formulario
    const allRadioButtons = document.querySelectorAll('input[type="radio"]');
    allRadioButtons.forEach(radio => {
        radio.checked = false;
    });
    
    console.log('✅ Cuestionario reiniciado completamente');
}

// ========================================
// SISTEMA DE ESTADÍSTICAS
// ========================================

// Función para mostrar estadísticas del usuario
function showUserStats(results) {
    console.log('📊 Mostrando estadísticas del usuario');
    
    if (!userStatsElement) return;
    
    // Mostrar la sección de estadísticas
    userStatsElement.style.display = 'block';
    
    // Aplicar animación de entrada
    userStatsElement.style.opacity = '0';
    setTimeout(() => {
        userStatsElement.style.opacity = '1';
    }, 100);
    
    // Actualizar datos de resumen
    updateSummaryData(results);
    
    // Actualizar gráfico circular de nivel
    updateLevelChart(results.level);
    
    // Actualizar barras de progreso por categoría
    updateProgressBars(results.categoryScores);
}

// Función para actualizar datos de resumen
function updateSummaryData(results) {
    const levelElement = document.querySelector('.user-level');
    const scoreElement = document.querySelector('.user-score');
    const dateElement = document.querySelector('.evaluation-date');
    
    if (levelElement) levelElement.textContent = getLevelText(results.level);
    if (scoreElement) scoreElement.textContent = `${results.score}/40`;
    if (dateElement) dateElement.textContent = new Date().toLocaleDateString('es-ES');
}

// Función para actualizar gráfico circular de nivel
function updateLevelChart(level) {
    const canvas = document.getElementById('level-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Colores según el nivel
    const colors = {
        'beginner': '#8B5CF6',
        'intermediate': '#1E90FF',
        'advanced': '#00FFFF'
    };
    
    const color = colors[level] || '#8B5CF6';
    
    // Dibujar círculo de fondo
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a1a';
    ctx.fill();
    
    // Dibujar círculo de nivel
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -Math.PI / 2, (3 * Math.PI) / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.stroke();
    
    // Texto del nivel
    const chartLevelTextElement = document.getElementById('chart-level-text');
    if (chartLevelTextElement) {
        chartLevelTextElement.textContent = getLevelText(level);
    }
}

// Función para actualizar barras de progreso
function updateProgressBars(categoryScores) {
    const progressBars = document.querySelectorAll('.progress-fill');
    const scoreValues = document.querySelectorAll('.score-value');
    
    const categories = ['exercise', 'diet', 'sleep', 'meditation', 'learning', 'social', 'substances', 'attitude'];
    
    categories.forEach((category, index) => {
        const score = categoryScores[category] || 0;
        const percentage = (score / 5) * 100;
        
        if (progressBars[index]) {
            progressBars[index].style.width = '0%';
            setTimeout(() => {
                progressBars[index].style.width = percentage + '%';
            }, index * 100);
        }
        
        if (scoreValues[index]) {
            scoreValues[index].textContent = `${score}/5`;
        }
    });
}

// ========================================
// SISTEMA DE CONFETI OPTIMIZADO
// ========================================

let confettiParticles = [];
let confettiAnimationId;

// Función para inicializar el sistema de confeti
function initConfettiSystem() {
    if (!confettiCanvas) return;
    
    // Configurar canvas
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    // Inicialmente oculto
    confettiCanvas.style.opacity = '0';
    confettiCanvas.style.transition = 'opacity 0.5s ease';
    
    // Crear partículas de confeti
    createConfettiParticles();
    
    // Manejar redimensionamiento
    window.addEventListener('resize', resizeConfettiCanvas);
    
    console.log('🎉 Sistema de confeti inicializado');
}

// Función para crear partículas de confeti
function createConfettiParticles() {
    confettiParticles = [];
    
    // Crear confeti con colores específicos del diseño
    for (let i = 0; i < 80; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10 - Math.random() * 150, // Empezar arriba de la pantalla
            vx: (Math.random() - 0.5) * 4, // Velocidad horizontal
            vy: Math.random() * 4 + 3, // Velocidad vertical
            size: Math.random() * 5 + 3, // Tamaño de la partícula
            color: getRandomConfettiColor(),
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 20,
            type: Math.random() > 0.5 ? 'circle' : 'square' // Círculo o cuadrado
        });
    }
}

// Función para obtener color aleatorio de confeti (colores del diseño)
function getRandomConfettiColor() {
    const colors = ['#00BFFF', '#8A2BE2', '#FFFFFF', '#000000']; // Azul, morado, blanco, negro
    return colors[Math.floor(Math.random() * colors.length)];
}

// Función para redimensionar canvas de confeti
function resizeConfettiCanvas() {
    if (!confettiCanvas) return;
    
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

// Función para iniciar el sistema de confeti
function startConfettiSystem() {
    console.log('🎉 Iniciando sistema de confeti épico');
    
    // Asegurarse de que el canvas esté visible
    if (confettiCanvas) {
        confettiCanvas.style.opacity = '1';
        confettiCanvas.classList.add('active');
    }
    
    animateConfetti();
    
    // Detener el confeti después de 6 segundos para no sobrecargar
    setTimeout(() => {
        stopConfettiSystem();
    }, 6000);
}

// Función para detener el sistema de confeti
function stopConfettiSystem() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    
    // Ocultar el canvas gradualmente
    if (confettiCanvas) {
        confettiCanvas.style.opacity = '0';
        confettiCanvas.classList.remove('active');
    }
    
    console.log('🛑 Sistema de confeti detenido');
}

// Función para animar el confeti
function animateConfetti() {
    const ctx = confettiCanvas.getContext('2d');
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Dibujar partícula
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation * Math.PI / 180);
        
        ctx.fillStyle = particle.color;
        
        if (particle.type === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        }
        
        ctx.restore();
        
        // Reiniciar partícula si sale de la pantalla
        if (particle.y > confettiCanvas.height + 30 || 
            particle.x < -30 || 
            particle.x > confettiCanvas.width + 30) {
            particle.x = Math.random() * confettiCanvas.width;
            particle.y = -30;
            particle.vy = Math.random() * 4 + 3;
        }
    });
    
    confettiAnimationId = requestAnimationFrame(animateConfetti);
}

// ========================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ========================================

// Función para inicializar la página
function init() {
    console.log('🌨️ Inicializando Winter Arc - Sistema Optimizado');
    
    // Verificar que las fechas se hayan parseado correctamente
    console.log('📅 Fecha de inicio del Winter Arc:', WINTER_ARC_START.toLocaleDateString('es-ES'));
    console.log('📅 Fecha de finalización del Winter Arc:', WINTER_ARC_END.toLocaleDateString('es-ES'));
    
    // Inicializar el sistema de confeti
    initConfettiSystem();
    
    // Verificar si el Winter Arc ya terminó al cargar la página
    const now = new Date();
    if (checkIfWinterArcAlreadyFinished()) {
        console.log('🎯 Winter Arc ya terminado, configurando estado final');
        
        // Configurar estado final sin lanzar confeti
        isWinterArcFinished = true;
        hasConfettiLaunched = true; // Evitar que se lance confeti
        
        // Mostrar contador en 0
        updateCountdownDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        
        // Actualizar texto descriptivo
        if (counterTextElement) {
            counterTextElement.textContent = 'Finalizado';
            counterTextElement.style.color = '#8B5CF6';
            counterTextElement.classList.add('finalized');
        }
        
        // Mostrar finalización épica directamente
        setTimeout(() => {
            showEpicFinalization();
        }, 500);
        
    } else {
        // Actualizar el contador inmediatamente
        updateCountdown();
        
        // Iniciar intervalo del contador
        countdownInterval = setInterval(updateCountdown, 1000);
        
        // Asegurar que el texto descriptivo se muestre correctamente
        if (counterTextElement) {
            if (now >= WINTER_ARC_START) {
                counterTextElement.textContent = 'Termina en';
            } else {
                counterTextElement.textContent = 'Empieza en';
            }
            // Asegurar visibilidad
            counterTextElement.style.display = 'block';
            counterTextElement.style.opacity = '1';
            counterTextElement.style.transform = 'translateY(0)';
        }
    }
    
    // Aplicar efecto de entrada suave a toda la página
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar la página
    init();
    
    // Manejar el formulario del cuestionario
    const quizForm = document.getElementById('winter-arc-quiz');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(quizForm);
            processQuizForm(formData);
        });
    }
    
    // Manejar el botón de retomar cuestionario
    const retakeButton = document.querySelector('.retake-btn');
    if (retakeButton) {
        retakeButton.addEventListener('click', resetQuiz);
    }
    
    // Manejar el botón épico del cuestionario
    const startEpicQuizButton = document.getElementById('start-epic-quiz');
    if (startEpicQuizButton) {
        startEpicQuizButton.addEventListener('click', () => {
            console.log('🚀 Botón épico del cuestionario activado');
            
            // Ocultar el botón para evitar clics múltiples
            if (epicQuizButtonElement) {
                epicQuizButtonElement.style.display = 'none';
            }
            
            // Mostrar el cuestionario
            showQuizAfterEpicAnimation();
        });
    }
    
    // Manejar el botón de reevaluación
    const reevaluateButton = document.querySelector('.reevaluate-btn');
    if (reevaluateButton) {
        reevaluateButton.addEventListener('click', resetQuiz);
    }
    
    // Añadir efectos visuales adicionales
    addVisualEffects();
});

// ========================================
// EFECTOS VISUALES ADICIONALES
// ========================================

// Función para añadir efectos visuales
function addVisualEffects() {
    // Efecto de pulso en números del contador
    addPulseEffect();
    
    // Efectos interactivos en elementos del contador
    addInteractiveEffects();
    
    // Efectos de scroll
    addScrollEffects();
}

// Función para añadir efecto de pulso
function addPulseEffect() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach(number => {
        number.addEventListener('animationend', () => {
            number.classList.remove('pulse');
        });
    });
}

// Función para añadir efectos interactivos
function addInteractiveEffects() {
    const countdownItems = document.querySelectorAll('.countdown-item');
    countdownItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
        
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Función para añadir efectos de scroll
function addScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse al hacer scroll
    const animatedElements = document.querySelectorAll('.quiz-section, .user-stats, .epic-finalization');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}
