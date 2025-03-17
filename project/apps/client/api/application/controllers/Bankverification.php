<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bankverification extends CI_Controller {
    function verify_bank(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

        $formdata = json_decode(file_get_contents('php://input'), true);

        $client_id='CF240429CC86AJ6Q7GBOSABHJ6N0';
        $client_secret='6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0';
        $headers = array(
            'x-client-id: '.$client_id.'',
            'x-client-secret: '.$client_secret.'',
            'Content-Type: application/json',
        );
        $curl = curl_init("https://payout-api.cashfree.com/payout/v1/authorize");
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode([]));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $response = curl_exec($curl);

		

        curl_close($curl);

        $token_response = json_decode($response);
	    $token = $token_response->data->token;

        $accountno = $formdata['accountno'];
        $ifsccode = $formdata['ifsccode'];
        $mobile = $formdata['mobile'];
        $name = $formdata['name'];

        $bankDetails = [	
            // 'name' => $name,
            'phone' => $mobile,
            'bankAccount' => $accountno,
            'ifsc' => $ifsccode,
        ];

        $query_string = "?";
	
        foreach($bankDetails as $key => $value){
            $query_string = $query_string.$key.'='.$value.'&';
        }

        $finalUrl = 'https://payout-api.cashfree.com/payout/v1.2/validation/bankDetails'.substr($query_string, 0, -1);

        array_push($headers, 'Authorization: Bearer '.$token);


        $ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $finalUrl);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch,  CURLOPT_RETURNTRANSFER, true);

		$r = curl_exec($ch);
		curl_close($ch);
		
		$rObj = json_decode($r, true);    
	
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($rObj));
	}

}