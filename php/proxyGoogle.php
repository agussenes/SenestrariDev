<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $url = 'https://script.google.com/macros/s/AKfycbxNIZ2J1k1AbYC0sCwDUtZMfPrKvGdUf9_YiZWwNNheVvb9J_XRIQgbjD_FYPtVUwXcGg/exec';
    
    $data = [
        'nombre' => htmlspecialchars(trim($_POST['asunto'])),
        'email' => htmlspecialchars(trim($_POST['email'])),
        'telefono' => htmlspecialchars(trim($_POST['telefono'])),
        'mensaje' => htmlspecialchars(trim($_POST['mensaje']))
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data)
        ]
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) {
        echo json_encode(['status' => 'error', 'message' => 'Error al enviar los datos al script de Google']);
    } else {
        echo $result;
    }
} else {
    http_response_code(405);
    echo 'Método no permitido';
}
?>
