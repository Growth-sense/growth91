<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require APPPATH. 'third_party/phpmailer/vendor/autoload.php';

/*
function send_email($body,$subject,$email,$cc){	
	$mail = new PHPMailer;
    // $mail->isSMTP();          
    $mail->Host = 'smtp-relay.sendinblue.com';       
    $mail->SMTPAuth = true;              
    $mail->Username = 'growth91@zrow.in';   
    $mail->Password = '3J4ZKs0SO8yHAgVD';
    $mail->SMTPSecure = 'tls';          
    $mail->From = 'noreply@growth91.com';
    $mail->FromName = 'Growth91';
    $mail->addAddress($email);   
    if(!empty($cc)) {
        $mail->AddBCC($cc);   
    }
    // $mail->AddBcc('');    
    $mail->WordWrap=50; 
    $mail->isHTML(true);
	$mail->Subject=$subject;
    $mail->Body=$body;
    if(!$mail->send()) {
        // return 'Message could not be sent.';
        return '0';
    } else {
        // return 'Message has been sent';
        return '1';
    }
}
*/

function send_email($body,$subject,$email,$cc)
{	
	//$toName = 'TO NAME';
	$toEmail = $email;
	$fromName = 'Growth91';
	$fromEmail = 'noreply@saamaancart.com';
	$subject = $subject;
	$htmlMessage = $body;

	$data = array(
	    "sender" => array(
		"email" => $fromEmail,
		"name" => $fromName         
	    ),
	    "to" => array(
		array(
		    "email" => $toEmail,
		    //"name" => $toName 
		    )
	    ), 
	    "bcc" => array(
	    	array(
	    		"email" => $cc	
	    		)
	    ),
	    "subject" => $subject,
	    "htmlContent" => $htmlMessage
	); 

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://api.sendinblue.com/v3/smtp/email');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
	$headers = array();
	$headers[] = 'Accept: application/json';
	$headers[] = 'Api-Key: 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';
	$headers[] = 'Content-Type: application/json';  
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	$result = curl_exec($ch);
	

	
	if (curl_errno($ch))
	{
	    	return 0;
	}
	else
	{
		return 1;
	}
	curl_close($ch);
}


?>
