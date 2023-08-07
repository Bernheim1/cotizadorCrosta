<?php
   require '../../vendor/autoload.php';
   use PHPMailer\PHPMailer\PHPMailer;

   $mensaje = file_get_contents('php://input');
   date_default_timezone_set('America/Argentina/Buenos_Aires');
   $fechaHora = date('m/d/Y h:i a', time());

   $mail = new PHPMailer;
   $mail->isSMTP();
   $mail->SMTPDebug = 0;
   $mail->Host = 'smtp.hostinger.com';
   $mail->Port = 587;
   $mail->SMTPAuth = true;
   $mail->Username = 'cotizadorcrosta@cotizadorcrosta.com';
   $mail->Password = 'Cotizadorcrosta2023?';
   $mail->setFrom('cotizadorcrosta@cotizadorcrosta.com', 'Cotizador Crosta');
   $mail->addAddress('cotizadorcrosta@gmail.com', 'Cotizaciones');
   $mail->msgHTML(file_get_contents('php://input'));
   $mail->Subject = 'Nueva cotizacion '.$fechaHora;
   //$mail->addAttachment('attachment.txt');
   if (!$mail->send()) {
       echo 0;
   } else {
       echo 1;
   }
?>