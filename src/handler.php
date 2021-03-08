<?php
// Check POST
if (!$_POST){
  header('Location: http://'.$_SERVER['HTTP_HOST']);
  die;
}

header('Content-Type: text/html; charset=UTF-8');
define ('ROOT', __DIR__);
require (ROOT.'/vendor/autoload.php'); 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(true);

try {
  
  //Charset
  $mail->CharSet = "utf-8";

  //Recipients
  $mail->setFrom('info@webhouse.by', 'Форма бронирования');
  $mail->addAddress('info@webhouse.by');               

  //Content
  $mail->isHTML(true);                                 
  $mail->Subject = $_POST['subject'];
  $mail->Body = '<p><ul>';
  $mail->Body .= '<li>'.$_POST['subject'].'</li>';
  $mail->Body .= '<li>Дата отправки сообщения: '.$_POST['date'].'</li>';
  $mail->Body .= '<li><b>Имя:</b> ' .trim($_POST['name']).'</li>';
  $mail->Body .= '<li><b>Телефон:</b> '.trim($_POST['phone']).'</li>';
  if($_POST['carType']) $mail->Body .= '<li><b>Модель автомобиля:</b> '.$_POST['carType'].'</li>';
  if($_POST['startDate']) $mail->Body .= '<li><b>Дата начала:</b> '.trim($_POST['startDate']).'</li>';
  if($_POST['endDate']) $mail->Body .= '<li><b>Дата окончания:</b> '.trim($_POST['endDate']).'</li>';
  ($_POST['driver'])?$mail->Body .= '<li><b>С водителем:</b> Да</li>':'<li><bС водителем:<b> Нет</li>';
  $mail->Body .= '</ul></p>';
  if($_POST['text']) $mail->Body .= '<p><b>Доп. информация:</b> '.trim($_POST['text']).'</p>';

  $mail->send();
  echo 'Сообщение отправлено';
} catch (Exception $e) {
  echo "Сообщение не отправлено. Ошибка: {$mail->ErrorInfo}";
}