<?php
defined('BASEPATH') OR exit('No direct script access allowed');
//ini_set('display_errors', '1');/
//ini_set('display_startup_errors', '1');
//error_reporting(E_ALL);
class Users extends CI_Controller {

	function update_membership_to_premium(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		$response=null;
		if(!empty($formdata)){
			$investor_id=$formdata['investor_id'];
			$sql="SELECT * FROM `users` WHERE investor_id='$investor_id'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$end_date=$result[0]->membership_end_date;		
			$split = explode(" ",$end_date);
			$hello = $split[0];	
			$end_date = date('Y-m-d', strtotime($hello));
			$expiryDate=date('Y-m-d H-i a', strtotime('+1 year', strtotime($end_date)) );
  			$membership_duration='1';      			
  			$data=[
  				'membership_duration'=>$membership_duration,
  				'membership_end_date'=>$expiryDate,
  				'membership_type'=>'premium',
  			];
  			$this->db->where('investor_id',$investor_id);
  			$res=$this->db->update('users',$data);
  			
			if(!empty($res)){
				$this->send_premium_member_email($investor_id);
				$response = [
					'status' => '1',
					'message'=> 'Data is updated successfully.',
				];
			}else{
				$response = [
					'status' => '0',
					'message'=> 'Please try again!',
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message'=> 'Something went wrong. Please try again.',
			];	
		}
		$this->output->set_content_type('application/json')->set_output(json_encode($response));
	}
	function send_premium_member_email($investor_id){
		$sql="SELECT * FROM users WHERE investor_id='$investor_id'";
		$query=$this->db->query($sql);
		$result=$query->result();
		$name=$result[0]->first_name.' '.$result[0]->last_name;
		$email=$result[0]->email;
		$investment=$result[0]->email;
		$membership_fees = $result[0]->membership_fees;
		$subject='Welcome to Growth91 platform as premium member';
		$email=$email;
		$cc='';
		$this->load->helper('send_email');
		$body='<!doctype html>
	      <html>
	        <head>
	          <meta name="viewport" content="width=device-width, initial-scale=1.0">
	          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	          <title> Deal Payment Success</title>
	          <style>
				@media only screen and (max-width: 620px) {
					table.body h1 {
					font-size: 28px !important;
					margin-bottom: 10px !important;
					}
				
					table.body p,
				table.body ul,
				table.body ol,
				table.body td,
				table.body span,
				table.body a {
					font-size: 16px !important;
					}
				
					table.body .wrapper,
				table.body .article {
					padding: 10px !important;
					}
				
					table.body .content {
					padding: 0 !important;
					}
				
					table.body .container {
					padding: 0 !important;
					width: 100% !important;
					}
				
					table.body .main {
					border-left-width: 0 !important;
					border-radius: 0 !important;
					border-right-width: 0 !important;
					}
				
					table.body .btn table {
					width: 100% !important;
					}
				
					table.body .btn a {
					width: 100% !important;
					}
				
					table.body .img-responsive {
					height: auto !important;
					max-width: 100% !important;
					width: auto !important;
					}
				}
				@media all {
					.ExternalClass {
					width: 100%;
					}
				
					.ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
					line-height: 100%;
					}
				
					.apple-link a {
					color: inherit !important;
					font-family: inherit !important;
					font-size: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
					text-decoration: none !important;
					}
				
					#MessageViewBody a {
					color: inherit;
					text-decoration: none;
					font-size: inherit;
					font-family: inherit;
					font-weight: inherit;
					line-height: inherit;
					}
				
					.btn-primary table td:hover {
					background-color: #34495e !important;
					}
				
					.btn-primary a:hover {
					background-color: #34495e !important;
					border-color: #34495e !important;
					}
				}
				</style>
					</head>
					<body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
						<tr>
						<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
						<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
							<div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
				
							<!-- START CENTERED WHITE CONTAINER -->
							<table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
				
								<!-- START MAIN CONTENT AREA -->
								<tr>
								<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
									<tr>
										<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
										<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
											<br>
											<br>
											Thank you for registering on Growth91 as an investor.
											<br>
											<br>
											Growth91 platform provides access to highly vetted growth opportunities. 
					
											<br>
											<br>
											We have successfully upgraded you as a premium member.
											<br>
											<br>
											'.($membership_fees=="0" ? "" : "<br>
											<br>We have received Rs. '.$membership_fees.' towards the premium membership subscription.").'
											<br>
											<br>
											As a premium member, you have early access to view listed deals and priority for investment.
											<br>
											<br>
											You can invest in exciting Deals using the link below:
											<br>
											<br>
											https://growth91.com/deals
											<br>
											<br>
											<i> Note: If you face any difficulty, please reach out to contact@growth91.com .</i>
											<br>
											<br>
											Thank you <br/>
											Growth91 Team  <br/>
											<br>
											PS: This is system generated email. Please do not reply.
										</br>
										</br>
										<div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
											<img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:120px;height:auto;">
										</div>
										</td>
									</tr>
									</table>
								</td>
								</tr>
				
							<!-- END MAIN CONTENT AREA -->
							</table>
							<!-- END CENTERED WHITE CONTAINER -->
				
							<!-- START FOOTER -->
							<div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
								<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
								<tr>
									<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
									<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
									</td>
								</tr>
								<tr>
									<td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
									Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
									</td>
								</tr>
								</table>
							</div>
							<!-- END FOOTER -->
				
							</div>
						</td>
						<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
						</tr>
					</table>
					</body>
	      </html>';
		$res=send_email($body,$subject,$email,$cc);
	}
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
			$otp = $this->decryptData($encryptedOtp);
			$otp=$formdata['otp'];
			// $mobile=$formdata['mobile'];
	
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
				// 28/09/22 shubham (Email reference : 001)


				$body='<!doctype html>
				<html>
				  <head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					<title> Email Verification </title>
					<style>
				@media only screen and (max-width: 620px) {
				  table.body h1 {
					font-size: 28px !important;
					margin-bottom: 10px !important;
				  }
				
				  table.body p,
				table.body ul,
				table.body ol,
				table.body td,
				table.body span,
				table.body a {
					font-size: 16px !important;
				  }
				
				  table.body .wrapper,
				table.body .article {
					padding: 10px !important;
				  }
				
				  table.body .content {
					padding: 0 !important;
				  }
				
				  table.body .container {
					padding: 0 !important;
					width: 100% !important;
				  }
				
				  table.body .main {
					border-left-width: 0 !important;
					border-radius: 0 !important;
					border-right-width: 0 !important;
				  }
				
				  table.body .btn table {
					width: 100% !important;
				  }
				
				  table.body .btn a {
					width: 100% !important;
				  }
				
				  table.body .img-responsive {
					height: auto !important;
					max-width: 100% !important;
					width: auto !important;
				  }
				}
				@media all {
				  .ExternalClass {
					width: 100%;
				  }
				
				  .ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
					line-height: 100%;
				  }
				
				  .apple-link a {
					color: inherit !important;
					font-family: inherit !important;
					font-size: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
					text-decoration: none !important;
				  }
				
				  #MessageViewBody a {
					color: inherit;
					text-decoration: none;
					font-size: inherit;
					font-family: inherit;
					font-weight: inherit;
					line-height: inherit;
				  }
				
				  .btn-primary table td:hover {
					background-color: #34495e !important;
				  }
				
				  .btn-primary a:hover {
					background-color: #34495e !important;
					border-color: #34495e !important;
				  }
				}
				</style>
				  </head>
				  <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
					  <tr>
						<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
						<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
						  <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
				
							<!-- START CENTERED WHITE CONTAINER -->
							<table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
				
							  <!-- START MAIN CONTENT AREA -->
							  <tr>
								<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
								  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
									<tr>
									  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
										<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
										  <tbody>
											<tr>
											  <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
												<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
												   
												</table>
											  </td>
											</tr>
										  </tbody>
										</table>
										<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">  Dear User, <br><br>
										Use the following OTP to verify your email on Growth91.
										  <br>
										  <br>
										  
										  OTP is '.$otp.'
										  <br>
										  <br>
										  This code will be valid for 10 minutes. Please do not share this code with anyone. 
										  Don’t recognize this activity? Please contact contact@growth91.com immediately. 

										  <br>
										  <br>
										  
										  PS: This is an automated email. Please do not reply.
										  
										</br>
										<br>
										<div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
											<img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:120px;height:auto;">
										</div>
									  </td>
									</tr>
								  </table>
								</td>
							  </tr>
				
							<!-- END MAIN CONTENT AREA -->
							</table>
							<!-- END CENTERED WHITE CONTAINER -->
				
							<!-- START FOOTER -->
							<div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
							  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
								<tr>
								  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
									<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
								   </td>
								</tr>
								<tr>
								  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
									Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
								  </td>
								</tr>
							  </table>
							</div>
							<!-- END FOOTER -->
				
						  </div>
						</td>
						<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					  </tr>
					</table>
				  </body>
				</html>';
				$this->load->helper('send_email');
				$subject="Signup OTP $otp";
				$cc='contact@growth91.com';
				$res=send_email($body,$subject,$email,$cc);
				if($res=='1'){
					$response = [
						'status' => '1',
						'message'=> 'OTP is sent successfully.Please check email.',
					];	
				} else{
					$response = [
						'status' => '0',
						'message'=> 'OTP is not correct',
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
			// $sql="SELECT * FROM `users` WHERE email='$email';
			$sql="SELECT * FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$result=$query->result();
			if($result){
			$sql1="SELECT * FROM `users` WHERE email='$email' and user_block_status=0";
			$query1=$this->db->query($sql1);
			$result1=$query1->result();
			if($result1){
				$response = [
					'status' => '1',
					'message'=> 'Logged in successfully.',
					'data' => $result,
				];	

			}else{
				$response = [
					'status' => '2',
					'message'=> 'Your email has been blocked. Please contact to administrator',
				];	
			}
				
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
	function get_registered_user_details(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$investor_id=$formdata['investor_id'];
			$sql="SELECT investor_id,email,kycstatus,first_name,last_name FROM `users` WHERE investor_id='$investor_id'";
			$query=$this->db->query($sql);
			$resp =$query->result();
			if(isset($resp)) {
				$response = [
					'status' => '1',
					'message' => 'Data is fetched successfully.',
					'data' => $resp,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}	
		} else{
			$response=[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output->set_content_type('application/json')->set_output(json_encode($response));	
	}




	function getUsersDetailsByEmail(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$email=$formdata['email'];
			$sql="SELECT * FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$resp =$query->result();
			if(isset($resp)) {
				$response = [
					'status' => '1',
					'message' => 'Data is fetched successfully.',
					'data' => $resp,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}	
		} else{
			$response=[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output->set_content_type('application/json')->set_output(json_encode($response));	
	}



	function send_contact_email(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");	
		
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)){
			$post_data = [
				'contactName' => $formdata['contactName'],
				'contactEmail' => $formdata['contactEmail'],
				'contactMessage' => $formdata['contactMessage'],
			];
			$contactName=$formdata['contactName'];
			$contactEmail=$formdata['contactEmail'];
			$contactMessage=$formdata['contactMessage'];
			
			$this->db->insert('contactus', $post_data);
			$id = $this->db->insert_id();
			if ($id) 
				{
					$response = [
						'status' => '1',
						'message' => 'Email Sent successfully',
					];
					
					$subject='Growth91 Contact Us from -'.$contactName;
					$contactEmail=$contactEmail;
					$cc='';
					$this->load->helper('send_email');
					$body='<!doctype html>
	      <html>
	        <head>
	          <meta name="viewport" content="width=device-width, initial-scale=1.0">
	          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	          <title> Deal Payment Success</title>
	          <style>
				@media only screen and (max-width: 620px) {
					table.body h1 {
					font-size: 28px !important;
					margin-bottom: 10px !important;
					}
				
					table.body p,
				table.body ul,
				table.body ol,
				table.body td,
				table.body span,
				table.body a {
					font-size: 16px !important;
					}
				
					table.body .wrapper,
				table.body .article {
					padding: 10px !important;
					}
				
					table.body .content {
					padding: 0 !important;
					}
				
					table.body .container {
					padding: 0 !important;
					width: 100% !important;
					}
				
					table.body .main {
					border-left-width: 0 !important;
					border-radius: 0 !important;
					border-right-width: 0 !important;
					}
				
					table.body .btn table {
					width: 100% !important;
					}
				
					table.body .btn a {
					width: 100% !important;
					}
				
					table.body .img-responsive {
					height: auto !important;
					max-width: 100% !important;
					width: auto !important;
					}
				}
				@media all {
					.ExternalClass {
					width: 100%;
					}
				
					.ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
					line-height: 100%;
					}
				
					.apple-link a {
					color: inherit !important;
					font-family: inherit !important;
					font-size: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
					text-decoration: none !important;
					}
				
					#MessageViewBody a {
					color: inherit;
					text-decoration: none;
					font-size: inherit;
					font-family: inherit;
					font-weight: inherit;
					line-height: inherit;
					}
				
					.btn-primary table td:hover {
					background-color: #34495e !important;
					}
				
					.btn-primary a:hover {
					background-color: #34495e !important;
					border-color: #34495e !important;
					}
				}
				</style>
					</head>
					<body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
						<tr>
						<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
						<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
							<div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
				
							<!-- START CENTERED WHITE CONTAINER -->
							<table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
				
								<!-- START MAIN CONTENT AREA -->
								<tr>
								<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
									<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
									<tr>
										<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
										<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>Admin</strong>, 
											<br>
											<br>
											Someone have filled up contact us form on the growth91 website. Please find his details.
											<br>
											<br>
											Name: <strong>'.$contactName.'</strong><br>
											Email: <strong>'.$contactEmail.'</strong><br>
											Message: <strong>'.$contactMessage.'</strong><br><br>
											
											Thank you <br/>
											Growth91 Team  <br/>
											<br>
											PS: This is system generated email. Please do not reply.
										</br>
										</br>
										<div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
											<img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:120px;height:auto;">
										</div>
										</td>
									</tr>
									</table>
								</td>
								</tr>
				
							<!-- END MAIN CONTENT AREA -->
							</table>
							<!-- END CENTERED WHITE CONTAINER -->
				
							<!-- START FOOTER -->
							<div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
								<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
								<tr>
									<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
									<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
									</td>
								</tr>
								<tr>
									<td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
									Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
									</td>
								</tr>
								</table>
							</div>
							<!-- END FOOTER -->
				
							</div>
						</td>
						<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
						</tr>
					</table>
					</body>
	      </html>';
			$res=send_email($body,$subject,"contact@growth91.com",$cc);
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
		}
		
		
		else {
			$response = [
				'status' => '0',
				'message' => 'Invalid request. Please try again.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
		
	}
	

}