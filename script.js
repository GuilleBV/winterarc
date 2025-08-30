// ========================================
// WINTER ARC - SISTEMA OPTIMIZADO
// ========================================
// 
// FLUJO VISUAL OPTIMIZADO:
// 1. Página se carga → Contador visible (si Winter Arc no ha terminado)
// 2. Botón de prueba → Simula fin del Winter Arc
// 3. Animación épica → "¡El Winter Arc ha finalizado!" + confeti
// 4. Botón del cuestionario → Aparece después de la animación
// 5. Cuestionario → Se muestra al hacer clic en el botón
// 6. Estadísticas → Aparecen DESPUÉS de completar el cuestionario
//
// ORDEN DE APARICIÓN CORREGIDO:
// - Elementos aparecen secuencialmente, sin parpadeos
// - Estadísticas siempre debajo del cuestionario
// - Flujo visual coherente y predecible

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
const testEpicModeButton = document.getElementById('test-epic-mode');
const confettiCanvas = document.getElementById('confetti-canvas');

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
        startEpicFinalization();
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

// ========================================
// SISTEMA DE FINALIZACIÓN ÉPICA
// ========================================

// Función para iniciar la secuencia épica de finalización
function startEpicFinalization() {
    console.log('🚀 Iniciando secuencia épica de finalización del Winter Arc');
    
    // SECUENCIA TEMPORAL OPTIMIZADA:
    // 0s: Inicio de la función
    // 0.8s: Texto descriptivo se desvanece
    // 1s: Contador se desvanece
    // 1.1s: Animación épica comienza
    // 3.5s: Botón del cuestionario aparece
    // 6s: Secuencia completa terminada
    
    // FASE 1: Desvanecer contador y texto descriptivo
    if (countdownElement) {
        countdownElement.style.transition = 'all 1s ease-in-out';
        countdownElement.style.opacity = '0';
        countdownElement.style.transform = 'scale(0.8)';
    }
    
    if (counterTextElement) {
        counterTextElement.style.transition = 'all 0.8s ease-in-out';
        counterTextElement.style.opacity = '0';
        counterTextElement.style.transform = 'translateY(-20px)';
        
        // Ocultar completamente después de la animación
        setTimeout(() => {
            counterTextElement.style.display = 'none';
        }, 800);
    }
    
    // FASE 2: Mostrar animación épica
    setTimeout(() => {
        if (countdownElement) {
            countdownElement.style.display = 'none';
        }
        
        if (epicFinalizationElement) {
            epicFinalizationElement.style.display = 'block';
            
            // Iniciar animaciones secuencialmente
            setTimeout(() => {
                epicFinalizationElement.classList.add('show');
            }, 100);
        }
        
        // Iniciar sistema de confeti
        startConfettiSystem();
        
        // FASE 3: Mostrar botón del cuestionario
        setTimeout(() => {
            showEpicQuizButton();
        }, 3500);
        
    }, 1000);
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
    
    // Ocultar la sección épica
    if (epicFinalizationElement) {
        epicFinalizationElement.style.display = 'none';
    }
    
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
        { element: epicFinalizationElement, name: 'finalización épica' },
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
// SISTEMA DE CONFETI
// ========================================

let confettiParticles = [];
let confettiAnimationId;

// Función para inicializar el sistema de confeti
function initConfettiSystem() {
    if (!confettiCanvas) return;
    
    // Configurar canvas
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    // Crear partículas de confeti
    createConfettiParticles();
    
    // Manejar redimensionamiento
    window.addEventListener('resize', resizeConfettiCanvas);
}

// Función para crear partículas de confeti
function createConfettiParticles() {
    confettiParticles = [];
    
    for (let i = 0; i < 50; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 1,
            size: Math.random() * 3 + 1,
            color: getRandomConfettiColor(),
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
}

// Función para obtener color aleatorio de confeti
function getRandomConfettiColor() {
    const colors = ['#00FFFF', '#1E90FF', '#8B5CF6', '#FF69B4', '#32CD32'];
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
    console.log('🎉 Iniciando sistema de confeti');
    animateConfetti();
}

// Función para detener el sistema de confeti
function stopConfettiSystem() {
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
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
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        
        ctx.restore();
        
        // Reiniciar partícula si sale de la pantalla
        if (particle.y > confettiCanvas.height + 10) {
            particle.y = -10;
            particle.x = Math.random() * confettiCanvas.width;
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
    if (now > WINTER_ARC_END) {
        console.log('🎯 Winter Arc ya terminado, iniciando secuencia épica completa');
        
        // SECUENCIA DE VISUALIZACIÓN POST-FINALIZACIÓN:
        // 1. Iniciar animación épica (mensaje + confeti)
        startEpicFinalization();
        
        // 2. Después de 6 segundos, mostrar cuestionario
        //    Esto permite que la animación épica se complete completamente
        setTimeout(() => {
            showQuizAfterEpicAnimation();
        }, 6000);
        
    } else {
        // Actualizar el contador inmediatamente
        updateCountdown();
        
        // Actualizar cada segundo
        setInterval(updateCountdown, 1000);
        
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
            showQuizAfterEpicAnimation();
        });
    }
    
    // Manejar el botón de reevaluación
    const reevaluateButton = document.querySelector('.reevaluate-btn');
    if (reevaluateButton) {
        reevaluateButton.addEventListener('click', resetQuiz);
    }
    
    // Manejar el botón de prueba del modo épico
    if (testEpicModeButton) {
        testEpicModeButton.addEventListener('click', () => {
            console.log('🧪 Botón de prueba activado - Simulando fin del Winter Arc');
            
            // FLUJO DEL BOTÓN DE PRUEBA OPTIMIZADO:
            // 1. Simular que el Winter Arc ha terminado
            // 2. Ocultar contador y texto descriptivo
            // 3. Iniciar animación épica (6 segundos)
            // 4. Mostrar cuestionario vacío
            // 5. Usuario completa cuestionario
            // 6. Se muestran las estadísticas
            
            // Simular que el Winter Arc ha terminado
            if (countdownElement) {
                countdownElement.style.display = 'none';
            }
            if (counterTextElement) {
                counterTextElement.style.display = 'none';
            }
            
            // Iniciar la secuencia épica completa
            startEpicFinalization();
            
            // Después de la animación épica, mostrar el cuestionario
            setTimeout(() => {
                showQuizAfterEpicAnimation();
            }, 6000);
        });
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
