<?php
// Verificar que la solicitud sea POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Clave secreta de reCAPTCHA
    $secretKey = '6Le7S3YqAAAAAFFBFya5VOi8R3T9Sy1KHzZ_5MU1';
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    // Verificar el reCAPTCHA
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse
    ];

    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    $verification = json_decode($result);

    if ($verification && $verification->success) {
        // Obtener los datos del formulario
        $nombre = htmlspecialchars(trim($_POST['asunto']));
        $email = htmlspecialchars(trim($_POST['email']));
        $telefono = htmlspecialchars(trim($_POST['telefono']));
        $mensaje = htmlspecialchars(trim($_POST['mensaje']));

        // Validar que los campos no estén vacíos
        if (empty($nombre) || empty($email) || empty($telefono) || empty($mensaje)) {
            echo 'Por favor completa todos los campos.';
            exit;
        }

        // Configuración del correo
        $destino = 'info@senestraridev.com'; // Tu correo webmail
        $asunto = "Nuevo mensaje de contacto de $nombre";
        $cuerpo = "Has recibido un nuevo mensaje de contacto:\n\n";
        $cuerpo .= "Nombre: $nombre\n";
        $cuerpo .= "Correo: $email\n";
        $cuerpo .= "Teléfono: $telefono\n";
        $cuerpo .= "Mensaje:\n$mensaje\n";

     $headers = "From: info@senestraridev.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

        // Enviar correo al webmail
        if (mail($destino, $asunto, $cuerpo, $headers)) {
            // Correo de confirmación al remitente
            $asuntoConfirmacion = "Confirmación de recepción de mensaje";
            $cuerpoConfirmacion = "Hola $nombre,\n\n";
            $cuerpoConfirmacion .= "Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos pronto.\n\n";
            $cuerpoConfirmacion .= "Tu mensaje fue:\n$mensaje\n\n";
            $cuerpoConfirmacion .= "Atentamente,\nEl equipo de Senestrari Dev.";

            $headersConfirmacion = "From: no-reply@senestraridev.com\r\n";
            $headersConfirmacion .= "X-Mailer: PHP/" . phpversion();

            // Enviar correo de confirmación al remitente
            mail($email, $asuntoConfirmacion, $cuerpoConfirmacion, $headersConfirmacion);

            echo 'Correo enviado correctamente';
        } else {
            echo 'Error al enviar el correo. Inténtalo de nuevo.';
        }
    } else {
        echo 'Error de verificación de reCAPTCHA. Por favor, inténtalo de nuevo.';
    }
} else {
    http_response_code(405); // Método no permitido
    echo 'Método no permitido.';
}
