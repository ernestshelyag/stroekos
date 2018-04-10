<?php
require_once("site.conf");
/*Mail*/

$to = MAIL_TO;
$subject = 'Новая заявка с сайта "Строительные экосистемы"';
$message =
    'Имя: '.$_POST['name'].'<br><br>'.

    'Тип архитектурного объекта: '.$_POST['answer1'].'<br><br>'.
    'Какой у вас тип проживания? '.$_POST['answer2'].'<br/><br>'.
    'Сколько человек будут использовать септик? '.$_POST['answer3'].'<br><br>'.
    'Какая канализация стоит сейчас? '.$_POST['answer4'].'<br><br>'.
    'А какой тип канализации нужен? '.$_POST['answer5'].'<br><br>'.
    'Какой у вас тип почвы? '.$_POST['answer6'].'<br><br>'.
    'Уровень грунтовых вод на вашем участке: '.$_POST['answer7'].'<br><br>'.
    'Куда планируете отводить очищенную воду: '.$_POST['answer8'].'<br><br>'.
    'В какой бюджет планируете уложиться? '.$_POST['answer9'].'<br><br>'.
    'Когда вам было бы удобно принять инженера? '.$_POST['answer10'].'<br><br>'.

    'Телефон: <a href="tel:'.$_POST['phone'].'">'.$_POST['phone'].'</a><br><br>'.

    $headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: '.$_POST['phone'].  "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

if ($_POST['name']) {
    mail($to, $subject, $message, $headers);
}