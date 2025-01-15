<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function send_email_invite($body,$subject,$email,$cc,$bcc)
{	 
	$toEmail = $email;
	$fromName = 'Growth91';
	$fromEmail = 'noreply@growth91.com';
	$subject = $subject;
	$htmlMessage = $body;

	$data = array(
	    "sender" => array(
		"email" => $fromEmail,
		"name" => $fromName         
	    ),
	    "to" => array(
		array(
		    "email" => $toEmail
		    )
	    ),
	    "bcc" => array(
	    	array(
	    		"email" => $bcc
	    		),
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
	
	if (curl_exec($ch) === false)
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
