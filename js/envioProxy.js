document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();

        // Verificar si el reCAPTCHA está completado
        if (grecaptcha.getResponse() === '') {
            mostrarAlerta('Por favor, completa el reCAPTCHA.', formulario);
            return;
        }

        spinner.style.display = 'block';
        const formData = new FormData(formulario);

        // Enviar datos al proxyGoogle.php en la carpeta php
        fetch('php/proxyGoogle.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            spinner.style.display = 'none';
            if (data.status === 'success') {
                mostrarAlerta('Datos enviados a la hoja de cálculo correctamente', formulario, true);
            } else {
                mostrarAlerta('Hubo un problema al enviar los datos. Inténtalo de nuevo.', formulario);
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error al enviar los datos:', error);
            mostrarAlerta('Ocurrió un error al enviar los datos al proxy.', formulario);
        });
    });

    function mostrarAlerta(mensaje, referencia, exito = false) {
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.className = exito ? 'alerta-exito' : 'alerta-error';
        referencia.appendChild(alerta);
        setTimeout(() => alerta.remove(), 5000);
    }
});
