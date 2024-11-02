let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const totalSlides = slides.length;
let interval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Función para iniciar el carrusel
function startCarousel() {
    interval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000); // Cambia la diapositiva cada 5 segundos
}

// Detener el carrusel al pasar el mouse
slides.forEach(slide => {
    slide.addEventListener('mouseover', () => clearInterval(interval));
    slide.addEventListener('mouseout', startCarousel);
});

// Mostrar la primera diapositiva al cargar
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    startCarousel();
});
