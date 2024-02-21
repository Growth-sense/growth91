<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cashfree extends CI_Controller {
	function receive_response(){
		echo '<pre>';
		// $data={
		//   "data": {
		//     "order": {
		//       "order_id": "1633615918",
		//       "order_amount": 1.00,
		//       "order_currency": "INR",
		//       "order_tags": null
		//     },
		//     "payment": {
		//       "cf_payment_id": 1107253,
		//       "payment_status": "SUCCESS",
		//       "payment_amount": 1.00,
		//       "payment_currency": "INR",
		//       "payment_message": "Transaction pending",
		//       "payment_time": "2021-10-07T19:42:40+05:30",
		//       "bank_reference": "1903772466",
		//       "auth_id": null,
		//       "payment_method": {
		//         "card": {
		//           “channel”: null,	
		//           "card_number": "470613XXXXXX2123",
		//           "card_network": "visa",
		//           "card_type": "credit_card",
		//           "card_country": "IN",
		//           "card_bank_name": "TEST Bank"
		//         }
		//       },
		//       "payment_group": "credit_card"
		//     },
		//     "customer_details": {
		//       "customer_name": "Yogesh",
		//       "customer_id": "12121212",
		//       "customer_email": "yogesh.miglani@gmail.com",
		//       "customer_phone": "9666699999"
		//     }
		//   },
		//   "event_time": "2021-10-07T19:42:44+05:30",
		//   "type": "PAYMENT_SUCCESS_WEBHOOK"
		// };
		$data = file_get_contents("php://input");
		$events = json_decode($data, true);
		$post_data=[
			'data'=>json_encode($events),
		];
		$this->db->insert('test', $post_data);
	}
	
	function payment_success_1(){
		$data = file_get_contents("php://input");
		$events = json_decode($data, true);
		$post_data=[
			'data'=>json_encode($events),
		];
		$this->db->insert('test', $post_data);
	}
	function user_dropped_1(){
		$data = file_get_contents("php://input");
		$events = json_decode($data, true);
		$post_data=[
			'data'=>json_encode($events),
		];
		$this->db->insert('test', $post_data);
	}
	function payment_failed_1(){
		$data = file_get_contents("php://input");
		$events = json_decode($data, true);
		$post_data=[
			'data'=>json_encode($events),
		];
		$this->db->insert('test', $post_data);
	}
	function verify_adhar(){
		error_reporting(E_ALL);
		ini_set('display_errors',1);
		$curl = curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL => 'https://sandbox.cashfree.com/verification/offline-aadhaar/otp',
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => '',
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => 'POST',
		  CURLOPT_POSTFIELDS =>'{
		     "aadhaar_number": "655675523712"
		  }',
		  CURLOPT_HTTPHEADER => array(
		    'x-client-id: CF192074CDK9EPKRJNUEKSHPSQ50',
		    'x-client-secret: b3aae3a02f3c21373a5e31085b69a7b4d529d2e6',
		    'Content-Type: application/json'
		  ),
		));
		// CF192074CCTDK5T84OK74C7OSH90
		// cd8baadba79414a1425d0319ca69653adbc13ba9
		$response = curl_exec($curl);
		curl_close($curl);
		echo $response;
	}
}