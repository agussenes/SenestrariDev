let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;
let interval;

// Crear los indicadores (dots)
const dotsContainer = document.querySelector('.dots-container');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('onclick', `navigateToSlide(${i})`);
    dotsContainer.appendChild(dot);
}

function showSlide(index) {
    // Si el índice excede el total de diapositivas, vuelve al inicio
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        document.querySelectorAll('.dot')[i].classList.remove('active-dot');
        if (i === currentSlide) {
            slide.classList.add('active');
            document.querySelectorAll('.dot')[i].classList.add('active-dot');
        }
    });
}

// Función para cambiar de diapositiva con botones
function navigateSlide(direction) {
    showSlide(currentSlide + direction);
}

// Función para ir a una diapositiva específica con los indicadores
function navigateToSlide(index) {
    showSlide(index);
}

// Función para iniciar el carrusel automáticamente
function startCarousel() {
    interval = setInterval(() => {
        navigateSlide(1);
    }, 5000);
}

// Detener el carrusel al pasar el mouse y reanudar al salir
slides.forEach(slide => {
    slide.addEventListener('mouseover', () => clearInterval(interval));
    slide.addEventListener('mouseout', startCarousel);
});

// Mostrar la primera diapositiva y comenzar el carrusel al cargar
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    startCarousel();
});
