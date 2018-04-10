<?php
require_once("site.conf");
/*Mail*/

$max_image_size = 64 * 1024;
$valid_types = array("gif", "jpg", "png", "jpeg", "doc", "docx", "rtf", "pdf");

$arResult['ok'] = "N";
$myFaile = "";
$mail_to = MAIL_TO;
$thm = '[Септики] Вам написал товарищ '.$_POST['name'];


foreach($_FILES as $index => $file) {
    $fileName = $file['name'];
    $fileTempName = $file['tmp_name'];

    if(!empty($file['error'][$index])) {
        return false;
    }

    if(!empty($fileTempName) && is_uploaded_file($fileTempName)) {
        move_uploaded_file($fileTempName, $_SERVER['DOCUMENT_ROOT']."/upload/" . $fileName);
        $myFaile[] = '<a href="http://septic.kdm1.ru/upload/' . $fileName . '" target="_blank">' . $fileName . '</a>';
        $files = implode(", ", $myFaile);

        var_dump($file);
    }
}

$msg = "Имя: ".$_POST['name']."<br /><br />
Телефон: ".$_POST['phone']."<br /><br />
Почта: ".$_POST['email']."<br /><br />
Комментарий: ".$_POST['comment']."<br /><br />
Техническое задание: ".$files;

$mail_from = $_POST['email'];

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: '.$_POST['phone'].  "\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion();

if($_POST['name']) {
    if(mail($mail_to, $thm, $msg, $headers))
        $arResult['ok'] = "Y";
    else
        $arResult['ok'] = "N";
}

echo json_encode($arResult);

die();