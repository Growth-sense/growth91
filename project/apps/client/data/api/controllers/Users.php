<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

	function getstatusdata() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		// sql query
		$id=$formdata['id'];
		$sql = "SELECT kycstatus,ifsc_code,first_name,last_name,email,mobile,membership_type FROM `users` WHERE investor_id='$id'";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Status data is fetched successfully.',
				'data' => $list,
			];
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}


	function setsignindata() {
		// var_dump($_GET);


		// header("Access-Control-Allow-Origin: *");
		// header("Access-Control-Allow-Origin: application/json, text/plain, */*");
		// header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		// header("Access-Control-Allow-Headers: access");
		// header("Content-Type: application/json; charset=UTF-8");
		// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// $formdata = json_decode(file_get_contents('php://input'), true);
		
		$investor_email = $_GET['email'];
		$investor_id = $_GET['user_id'];

		$this->session->set_userdata('investor_email', $investor_email);
		$this->session->set_userdata('user_id', $investor_id);
		setcookie('investor_email' ,$investor_email);
		setcookie('user_id' ,$investor_id);

		// // $_SESSION['investor_email']=$investor_email;
		// // $_SESSION['user_id']=$investor_id;
		if($_SESSION['investor_email']) {
			var_dump($_SESSION['investor_email']);
			redirect('https://growth91.trydiscourse.com/login');	

		}
		// if($_GET){
		// }
	}

	private function decryptData($encryptedString) {
		try {
			// Get encryption key
			$encKey = 'kIYFZKnwVRkhgFB5nzz3NbAho6ei3Z5v'; // Use same key as frontend
	
			// Base64 decode the encrypted string
			$encryptedData = base64_decode($encryptedString);
	
			// Extract salt, iv and ciphertext
			if (substr($encryptedData, 0, 8) !== "Salted__") {
				return $encryptedString; // Return original if not encrypted
			}
	
			$salt = substr($encryptedData, 8, 8);
			$ciphertext = substr($encryptedData, 16);
	
			// Generate key and iv using the same method as CryptoJS
			$keyIvPair = $this->evpKDF($encKey, $salt);
	
			// Decrypt
			$decrypted = openssl_decrypt(
				$ciphertext,
				'aes-256-cbc',
				$keyIvPair['key'],
				OPENSSL_RAW_DATA,
				$keyIvPair['iv']
			);
	
			return $decrypted;
		} catch (Exception $e) {
			error_log("Decryption error: " . $e->getMessage());
			return null;
		}
	}
	
	private function evpKDF($password, $salt, $keySize = 8, $ivSize = 4, $iterations = 1, $hashAlgorithm = "md5") {
		$targetKeySize = $keySize + $ivSize;
		$derivedBytes = "";
		$numberOfDerivedWords = 0;
		$block = null;
		$hasher = hash_init($hashAlgorithm);
	
		while ($numberOfDerivedWords < $targetKeySize) {
			if ($block != null) {
				hash_update($hasher, $block);
			}
			hash_update($hasher, $password);
			hash_update($hasher, $salt);
			$block = hash_final($hasher, true);
			$hasher = hash_init($hashAlgorithm);
	
			// Iterations
			for ($i = 1; $i < $iterations; $i++) {
				hash_update($hasher, $block);
				$block = hash_final($hasher, true);
				$hasher = hash_init($hashAlgorithm);
			}
	
			$derivedBytes .= substr($block, 0, min(strlen($block), ($targetKeySize - $numberOfDerivedWords) * 4));
			$numberOfDerivedWords += strlen($block)/4;
		}
	
		return array(
			"key" => substr($derivedBytes, 0, $keySize * 4),
			"iv"  => substr($derivedBytes, $keySize * 4, $ivSize * 4)
		);
	}




	function sendregisterotp(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)){
			$email=$formdata['email'];
			$encryptedOtp=$formdata['otp'];
			$otp = $this->decryptData(encryptedString: $encryptedOtp);
			$sql="SELECT * FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				$response =[
					'status' => '0',
					'message' => 'You have been registered already.'
				];	
			}else{
				$config = Array(
				    'protocol'  => 'smtp',
				    'smtp_host' => SMTP_HOST,
				    'smtp_port' => SMTP_PORT,
				    'smtp_user' => SMTP_USER,
				    'smtp_pass' => SMTP_PASS,
				    'mailtype'  => 'text/html',
				    'starttls'  => true,
				    'newline'   => "\r\n",
				    'smtp_crypto' => 'ssl',
				    'charset' => 'utf-8',
				);
				$msg="OTP for login is $otp.";
				$this->load->library("email", $config);
				$result = $this->email
				->from(SMTP_FROM_EMAIL,SMTP_FROM_NAME)
				->subject("OTP Notification")
				->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
				->message($msg)->set_mailtype('html');
				if($this->email->to($email)->send()){
					$response = [
						'status' => '1',
						'message'=> 'Otp is sent successfully.Please check email.',
					];	
				}
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function loginUsingGoogle(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)){
			$email=$formdata['email'];
			$sql="SELECT * FROM `users` WHERE email='$email' AND user_type='investor'";
			$query=$this->db->query($sql);
			$result=$query->result();
			if($result){
				$response = [
					'status' => '1',
					'message'=> 'Logged in successfully.',
					'data' => $result,
				];	
			}else{
				$response = [
					'status' => '0',
					'message'=> 'Please try to login with registered email.',
				];	
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please try again. May be email is incorrect.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
	// LGOIN USING GOOGLE IN FOUNDER
	function loginUsingGoogleForFounder(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$email=$formdata['email'];
			// $sql="SELECT * FROM `users` WHERE email='$email' AND user_type='founder'";
			$sql="SELECT * FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$result=$query->result();
			if($result){
				$response = [
					'status' => '1',
					'message'=> 'Logged in successfully.',
					'data' => $result,
				];	
			}else{
				$response = [
					'status' => '0',
					'message'=> 'Please try to login with registered email.',
				];	
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please try again. May be email is incorrect.',
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}


}