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
	    "subject" => $subject,
	    "htmlContent" => $htmlMessage
	); 

	if (empty($cc)) {
		$data_cc = array(
			"bcc" => array(
				array("email" => "contact@growth91.com")
			)
		);
	} else {
		$data_cc = array(
			"bcc" => array(
				array("email" => "contact@growth91.com"),
				array("email" => $cc)
			)
		);
	}
	
	$data = array_merge($data, $data_cc);

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
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($result === false) {
        error_log('CURL Error: ' . curl_error($ch));
        curl_close($ch);
        return 0;
    }
    
    curl_close($ch);
    
    // Check if email was sent successfully
    if ($http_code == 201 || $http_code == 200) {
        return 1;
    } else {
        error_log('SendinBlue API Error (HTTP ' . $http_code . '): ' . $result);
        return 0;
    }
	
}


?>
