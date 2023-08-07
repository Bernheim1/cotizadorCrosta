<?php

    $xml = file_get_contents('php://input');
    $ch    = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, "https://wbs.allianzonline.com.ar:8443/Cotizadores/Vehiculo/Externo/Operaciones/OpCotizadorVehiculoExtReqABCS");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
    $response = curl_exec($ch);
    curl_close($ch);
    echo $response;

?>