document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(formulario);
        
        spinner.style.display = 'block'; // Mostrar el spinner

        fetch('php/proxy_google.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Estado de la respuesta:', response.status);
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            console.log('Respuesta del servidor:', data);
            spinner.style.display = 'none';
            if (data.status === 'success') {
                alert('Formulario enviado correctamente y guardado en Google Sheets.');
                formulario.reset();
            } else {
                alert('Hubo un problema al enviar el formulario: ' + data.message);
            }
        })
        .catch(error => {
            spinner.style.display = 'none';
            console.error('Error al enviar los datos:', error);
            alert('Ocurrió un error. Verifique la consola para más detalles.');
        });
    });
});
