<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function send_email($body,$subject,$email,$cc)
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
		    "email" => $toEmail,
		    //"name" => $toName 
		    )
	    ), 
	    "subject" => $subject,
	    "htmlContent" => $htmlMessage
	); 
	
	if(!empty($cc))
	{
	    $data_cc = array(
	            "cc" => array(
    	    	array(
    	    		"email" => $cc	
    	    		)
    	    ),
	        );
	        
        $data = array_merge($data,$data_cc);
	}

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://api.sendinblue.com/v3/smtp/email');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
	$headers = array();
	$headers[] = 'Accept: application/json';
	//$headers[] = 'Api-Key: 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';
	$headers[] = 'Api-Key: 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';
	$headers[] = 'Content-Type: application/json';  
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	$result = curl_exec($ch);
	
	//var_dump($result);
	//die;
	
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

function sendRegistrationEmail($first_name, $last_name, $status, $mobile, $email, $user_type) {
    // Format the email body
    $body = "<p><strong>Name:</strong> {$first_name} {$last_name}</p>";
    $body .= "<p><strong>Residential Status:</strong> {$status}</p>";
    $body .= "<p><strong>Mobile Number:</strong> {$mobile}</p>";
    $body .= "<p><strong>Email Id:</strong> {$email}</p>";
    $body .= "<p><strong>Date of registration:</strong> " . date('Y-m-d') . "</p>";

    $subject = "New {$user_type} registered";

    // Using the existing send_email helper function
    $result = send_email(
        $body,                      // HTML body
        $subject,                   // Subject
        'contact@growth91.com',     // To email
        ''                          // CC (empty in this case)
    );

    return $result;
}

?>
