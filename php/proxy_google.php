<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json'); // Asegura que la respuesta sea JSON

    $nombre = $_POST['asunto'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    $data = [
        'nombre' => $nombre,
        'email' => $email,
        'telefono' => $telefono,
        'mensaje' => $mensaje
    ];

    $url = 'https://script.google.com/macros/s/AKfycbzYR4_YjgrwKg52JiWqw3-ER9nzYUUrrH2SrIdxNczZNfbFem_hSTxcc72XUa8VXc8Y/exec';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    
    $result = curl_exec($ch);
    
    if ($result === FALSE) {
        http_response_code(500); // Error en el servidor
        echo json_encode(['status' => 'error', 'message' => 'Error al enviar los datos a Google Sheets']);
    } else {
        echo $result;
    }
    
    curl_close($ch);
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
