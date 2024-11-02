const textArray = ['DESARROLLADOR FRONT-END', 'DESARROLLADOR BACK-END', 'APASIONADO POR EL DESARROLLO'];
let textIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById('typing');

function typeEffect() {
    if (charIndex < textArray[textIndex].length) {
        typingElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100); // Ajusta la velocidad de escritura
    } else {
        setTimeout(eraseEffect, 2000); // Pausa antes de borrar
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 100); // Ajusta la velocidad de borrado
    } else {
        textIndex = (textIndex + 1) % textArray.length; // Ir al siguiente texto
        setTimeout(typeEffect, 500); // Pausa antes de escribir de nuevo
    }
}

document.addEventListener('DOMContentLoaded', typeEffect);
