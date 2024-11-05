document.addEventListener('DOMContentLoaded', function () {
    const email = { email: '', asunto: '', mensaje: '', telefono: '' };

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputTelefono = document.querySelector('#telefono');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputTelefono.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', (e) => {
        e.preventDefault();
        resetFormulario();
    });

    function enviarEmail(e) {
        e.preventDefault();

        // Verificar si el reCAPTCHA está completado
        if (grecaptcha.getResponse() === '') {
            mostrarAlerta('Por favor, completa el reCAPTCHA.', formulario);
            return;
        }

        spinner.style.display = 'block';

        const formData = new FormData(formulario); // Recoge los datos del formulario

        fetch('php/procesarFormulario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Puedes cambiar a .json() si la respuesta es JSON
        .then(data => {
            console.log('Respuesta del servidor:', data);
            spinner.style.display = 'none';
            const alertaExito = document.createElement('p');
            alertaExito.textContent = data.includes('Correo enviado correctamente') 
                ? 'Mensaje enviado correctamente' 
                : 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo.';
            alertaExito.className = data.includes('Correo enviado correctamente') 
                ? 'alerta-exito' 
                : 'alerta-error';
            formulario.appendChild(alertaExito);
            setTimeout(() => alertaExito.remove(), 5000);
            resetFormulario();
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error al enviar los datos:', error);
            mostrarAlerta('Ocurrió un error al enviar el formulario. Inténtalo de nuevo.', formulario);
        });
    }

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'telefono' && !validarTelefono(e.target.value)) {
            mostrarAlerta('El teléfono no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        const alerta = referencia.querySelector('.alerta-error');
        if (alerta) {
            alerta.remove();
        }

        const error = document.createElement('p');
        error.textContent = mensaje;
        error.className = 'alerta-error';
        error.style.borderRadius = '10px';
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.alerta-error');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(email);
    }

    function validarTelefono(telefono) {
        const regex = /^[0-9]{7,15}$/;
        return regex.test(telefono);
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.disabled = true;
            btnSubmit.style.opacity = '0.5';
            return;
        }
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '1';
    }

    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        email.telefono = '';
        formulario.reset();
        grecaptcha.reset(); // Restablecer reCAPTCHA después de enviar el formulario
        comprobarEmail();
    }
});
