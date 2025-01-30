<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Panverification extends CI_Controller {
	// verify Pan card
	function verify_pan(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$pan_no=$formdata['pan_no'];
			$client_id='CF240429CC86AJ6Q7GBOSABHJ6N0';
			$client_secret='6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0';
			$url='https://api.cashfree.com/verification/pan';
			
			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => $url,
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => '',
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 0,
			  CURLOPT_FOLLOWLOCATION => true,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => 'POST',
			  CURLOPT_POSTFIELDS =>'{
			     "pan": "'.$pan_no.'"
			  }',
			  CURLOPT_HTTPHEADER => array(
			    'x-client-id: '.$client_id.'',
			    'x-client-secret: '.$client_secret.'',
			    'Content-Type: application/json'
			  ),
			));
			
			$response = curl_exec($curl);
			curl_close($curl);
			$response = [
				'status' => '1',
				'message' => 'Pan card is verified successfully.',
				'data' => $response,
			];
		} else{
			$response = [
				'status' => '1',
				'message' => 'Something went wrong. Please try again.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}
}