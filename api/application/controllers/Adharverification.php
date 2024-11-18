<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Adharverification extends CI_Controller {
	// verify adhar
	function verify_adhar(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$adhar_no=$formdata['adharno'];

			$sql3 = "SELECT * FROM `cashfree_details` where `id`='1'";
			$query3 = $this->db->query($sql3);
			$cash_data =$query3->result();
			$environment=$cash_data[0]->env;
			$client_id='';
			$client_secret='';
			$url='';
			if($environment=='prod'){
				$client_id=$cash_data[0]->prod_client_id;
				$client_secret=$cash_data[0]->prod_client_secret;
				$url='https://api.cashfree.com/verification/offline-aadhaar/otp';
			} else{
				$client_id=$cash_data[0]->test_client_id;
				$client_secret=$cash_data[0]->test_client_secret;
				$url='https://sandbox.cashfree.com/verification/offline-aadhaar/otp';
			}			
			$curl = curl_init();
			// production keys
			// $prod_client_id='CF240429CC86AJ6Q7GBOSABHJ6N0';
			// $prod_client_secret='6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0';
			// test keys
			// $test_client_id='CF192074CDK9EPKRJNUEKSHPSQ50';
			// $test_client_secret='b3aae3a02f3c21373a5e31085b69a7b4d529d2e6';
 
			// $test_url='https://sandbox.cashfree.com/verification/offline-aadhaar/otp';
			// $prod_url='https://api.cashfree.com/verification/offline-aadhaar/otp';



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
			     "aadhaar_number": "'.$adhar_no.'"
			  }',
			  CURLOPT_HTTPHEADER => array(
			    'x-client-id: '.$client_id.'',
			    'x-client-secret: '.$client_secret.'',
			    'Content-Type: application/json'
			  ),
			));
			// CF192074CCTDK5T84OK74C7OSH90
			// cd8baadba79414a1425d0319ca69653adbc13ba9
			$response = curl_exec($curl);
			curl_close($curl);
			$response = [
				'status' => '1',
				'message' => 'Aadhaar card is verified successfully.',
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
	
	// verify adhar otp
	 function verify_adhar_otp(){
	 	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			
			// 226220337802//
			$otp=$formdata['otp'];
			$ref_id=$formdata['ref_id'];
			$investor_id=$formdata['investor_id'];

			$sql3 = "SELECT * FROM `cashfree_details` where `id`='1'";
			$query3 = $this->db->query($sql3);
			$cash_data =$query3->result();
			$environment=$cash_data[0]->env;
			$client_id='';
			$client_secret='';
			$url='';
			if($environment=='prod'){
				$client_id=$cash_data[0]->prod_client_id;
				$client_secret=$cash_data[0]->prod_client_secret;
				$url='https://api.cashfree.com/verification/offline-aadhaar/verify';
			} else{
				$client_id=$cash_data[0]->test_client_id;
				$client_secret=$cash_data[0]->test_client_secret;
				$url='https://sandbox.cashfree.com/verification/offline-aadhaar/verify';
			}

			// $prod_url='https://api.cashfree.com/verification/offline-aadhaar/verify';
			// $test_url='https://sandbox.cashfree.com/verification/offline-aadhaar/verify';

			// production keys
			// $prod_client_id='CF240429CC86AJ6Q7GBOSABHJ6N0';
			// $prod_client_secret='6061f4b9e72c05ef5adc166b4a52e98e89a5b8c0';
			// test keys
			// $test_client_id='CF192074CDK9EPKRJNUEKSHPSQ50';
			// $test_client_secret='b3aae3a02f3c21373a5e31085b69a7b4d529d2e6';

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
			    "otp":"'.$otp.'",
			    "ref_id":"'.$ref_id.'"
			}',
			  CURLOPT_HTTPHEADER => array(
			    'x-client-id: '.$client_id.'',
			    'x-client-secret: '.$client_secret.'',
			    'Content-Type: application/json'
			  ),
			));
			$response = curl_exec($curl);
			curl_close($curl);
			$data=[
				'adhar_okyc_response'=> json_decode( json_encode($response), true),
				'adhar_otp'=>$otp,
				'adhar_ref_id'=>$ref_id
			];
			$this->db->where('investor_id',$investor_id);
			$this->db->update('users',$data);
			$response = [
				'status' => '1',
				'data' => json_decode($response),
			];
		} else{
			$response = [
				'status' => '1',
				'message' => 'please enter the valid OTP and try again',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	 	
	 }
}