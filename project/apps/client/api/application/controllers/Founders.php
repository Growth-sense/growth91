<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Founders extends CI_Controller {

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

	// This functuion is for sending otp in mail during login (shubham)
	public function sendotp() {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$email = $formdata['email'];
			$encryptedOtp = $formdata['otp'];

			$otp = $this->decryptData($encryptedOtp);

			// here we are taking details of users using email of user
			$sql ="SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res =$query->result();
			$mobile=$res[0]->mobile;
			$num_rows =$query->num_rows();
			if(intval($num_rows) > 0) {

			// for checking user is blocked or not
			$sql1 ="SELECT * FROM `users` WHERE email='$email' and user_block_status=0";
			$query1 = $this->db->query($sql1);
			$res1 =$query1->result();
			$num_rows1 =$query1->num_rows();
			if(intval($num_rows1)>0){
				// send sms
				 
				$this->load->helper('send_sms'); //codeiginitor method for sending sms
				$resp=sendSMS($otp,$mobile);

				// 27/09/2022 shubham Mail reference : 002
				$this->load->helper('send_email'); //codeiginitor method for sending email
				$first_name=$res[0]->first_name;
				$body='<html>
					<head>
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
						<title> Login Authentication</title>
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
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$first_name.'</strong>, 
												<br>
												<br>
												Use the following OTP to login to Growth91.
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
											<br>
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
				$subject='Login OTP is '.$otp;
				$cc='contact@growth91.com';
				$ress=send_email($body,$subject,$email,$cc);

				// 27/09/22 Changes done (shubham)
				if($num_rows && $ress) {
					$response = [
						'status' => '1',
						'message' => 'OTP is sent successfully. Please check your registered email address',
						'data' => $res,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Please try again!'
					];
				}	

			}else{
				$response =[
					'status' => '2',
					'message' => 'Your Email has been blocked. Please contact to Administrator'
				];

			}
				
			}else {
				$response =[
					'status' => '0',
					'message' => 'Invalid email or not approved by system.We will get back to you soon'
				];
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
//13-08-2022 for adding new founder
function addnewfounder() {
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	$formdata = json_decode(file_get_contents('php://input'), true);
	if(!empty($formdata)) {
		    $first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$email = $formdata['email'];
			$mobile=$formdata['mobile'];
			$companyname = $formdata['startup_name'];
			$founder_referral_code = isset($formdata['founder_referral_code']) ? $formdata['founder_referral_code'] : '';
			
			$post_data = [
				'first_name' => $first_name,
				'middle_name' => $middle_name,
				'last_name' => $last_name,
				'email' => $email,
				'startup_name' => $companyname,
				'mobile' => $mobile,
				'user_type' => 'founder',
				'user_registered_dt' => date('Y-m-d'),
				'founder_referral_code' => $founder_referral_code,
			];
			$sql="SELECT  * FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				$response=[
					'status'=>'0',
					'message'=>'You have been already registered',
				];
			}else{
				$this->db->insert('users', $post_data);
        	    $id =  $this->db->insert_id();
				$sql="SELECT  * FROM `users` WHERE investor_id='$id'";
				$query=$this->db->query($sql);
				$res=$query->result();
			    if($id) {
				// $this->uploaddealimg();
				sendRegistrationEmail($post_data['first_name'], $post_data['last_name'], "", $post_data['mobile'], $post_data['email'], "Founder");
				   $response = [
					  'status' => '1',
					  'message' => 'Registration successfully.',
					  'data' => $res,
				    ];

					//email code
					$this->load->helper('send_email');

					// Mail reference : 003
        
        $body='<!doctype html>
			<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
				<title> Founder Registration</title>
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
					<body style="color:black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
											<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$first_name.'</strong>, 
												<br>
												<br>
												Thank you for registering on Growth91 as a founder.   
											<br>
											<br>
											Growth91 enables founders in their growth journey by helping raise growth capital seamlessly.
											<br>
											<br>
											We are excited to share that we have launched a new feature on the Growth91 platform called the <strong>Future Unicorn</strong> - a space built to help founders like you showcase your business to the world and scale faster.
											<br>
											<br>
											Here\'s how you can list your startup under the Future Unicorn section:
											<br>
											<br>
											✅ Sign up to Growth91 portal as a founder<br>
											✅ Click on Future Unicorn from the top menu bar<br>
											✅ Click on List Your Unicorn<br>
											✅ Upload your pitch deck &amp; insights, and click on Publish<br>
											✅ Your startup is listed in a desired and structured format<br>
											✅ Get direct interest from verified investors<br>
											✅ Choose your visibility level (Silver to Platinum)<br>
											✅ Edit anytime as you grow
											<br>
											<br>
											This feature is aimed at improving your discoverability among 2000+ registered investors, customers, advisors, and collaborators.
											<br>
											<br>
											<i>If you face any difficulty, please reach out to contact@growth91.com</i>
											<br>
											<br>

											Thank you, <br>
											Growth91 Team <br>
											<br>
												PS: This is an automated email. Please do not reply
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
        
        $subject='Founder Registration & next steps';
        $cc='';
        $ress=send_email($body,$subject,$email,$cc);
				} 
			else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
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
//end founder

	// Get founder's referral code
	function getFounderReferralCode() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$temp_ud_id = isset($formdata['temp_ud_id']) ? $formdata['temp_ud_id'] : null;
			
			// Get founder's referral code from users table
			$sql = "SELECT founder_referral_code FROM `users` WHERE investor_id='$founder_id'";
			$query = $this->db->query($sql);
			$founder = $query->result();
			
			if(count($founder) > 0 && !empty($founder[0]->founder_referral_code)) {
				$referral_code = $founder[0]->founder_referral_code;
				$default_logo_filename = '';
				
				// Download and save default Unsplash image if temp_ud_id exists
				if($temp_ud_id) {
					$upload_dir = './uploads/unicorndeals/' . $temp_ud_id . '/';
					
					// Check if default logo already exists
					$existing_files = glob($upload_dir . 'default_referral_logo_*.jpg');
					
					if(!empty($existing_files)) {
						// Use existing file
						$default_logo_filename = basename($existing_files[0]);
					} else {
						// Download new image
						$unsplash_url = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400';
						
						// Create directory if it doesn't exist
						if (!file_exists($upload_dir)) {
							mkdir($upload_dir, 0777, true);
						}
						
						// Generate filename
						$filename = 'default_referral_logo_' . time() . '.jpg';
						$file_path = $upload_dir . $filename;
						
						// Download image from Unsplash
						$image_content = @file_get_contents($unsplash_url);
						if($image_content !== false) {
							file_put_contents($file_path, $image_content);
							$default_logo_filename = $filename;
						}
					}
				}
				
				$response = [
					'status' => '1',
					'message' => 'Referral code fetched successfully.',
					'data' => [
						'referral_code' => $referral_code,
						'default_logo_filename' => $default_logo_filename
					]
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'No referral code found for this founder.'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please provide founder_id.'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}

	function registernewfounder() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$email = $formdata['email'];
			$startup_name = $formdata['startup_name'];
			$primary_contact_person_name = $formdata['primary_contact_person_name'];
			$primary_contact_person_mobile = $formdata['primary_contact_person_mobile'];
			$primary_contact_person_email = $formdata['primary_contact_person_email'];
			$main_founder_id = $formdata['main_founder_id'];
			$post_data = [
				'email' => $email,
				'startup_name' => $startup_name,
				'primary_contact_person_name' => $primary_contact_person_name,
				'primary_contact_person_mobile' => $primary_contact_person_mobile,
				'primary_contact_person_email' => $primary_contact_person_email,
				'registered_dt' => date('Y-m-d'),
				'f1_status'=>$formdata['f1_status'],
			];
			$sql="SELECT * FROM `founders` WHERE main_founder_id='$main_founder_id'";
			$query=$this->db->query($sql);
			$count=$query->num_rows();
			$id='';
			if(intval($count)>0){
			    $this->db->where('main_founder_id', $main_founder_id);
			    $id = $this->db->update('founders', $post_data);
			}else{
			    $post_data['main_founder_id']=$main_founder_id;
			    $this->db->insert('founders', $post_data);
			    $id=$this->db->insert_id();
			}
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Registration is done successfully.',
					'id' => $id,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
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

	function updatefounder() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$no = $formdata['no'];
			$founder_id = $formdata['founder_id'];
			$post_data=[];

			if($no=='2') {
				$post_data = [
					'is_disrupting_existing_market' => $formdata['is_disrupting_existing_market'],
					'is_targeting_new_untabed_market' => $formdata['is_targeting_new_untabed_market'],
					'customer_benifit' => $formdata['customer_benifit'],
					'suplier_benifit' => $formdata['suplier_benifit'],
					'focused_on_product' => $formdata['focused_on_product'],
					'direct_substitute_available' => $formdata['direct_substitute_available'],
					'indirect_substitute_available' => $formdata['indirect_substitute_available'],
					'risks_perceived' => $formdata['risks_perceived'],
					'responsibilities_distributted_members' => $formdata['responsibilities_distributted_members'],
					'moats' => $formdata['moats'],
					'challenges_for_scale_up' => $formdata['challenges_for_scale_up'],
					'f2_status'=>$formdata['f2_status'],
				];
			} else if($no=='3') {
				$post_data = [
					'trademark' => $formdata['trademark'],
					'patents' => $formdata['patents'],
					'other_ips' => $formdata['other_ips'],
					'other_relevant_details' => $formdata['other_relevant_details'],
					'all_iprs_rwgistered_in_company' => $formdata['all_iprs_rwgistered_in_company'],
					'f3_status'=>$formdata['f3_status'],
				];
			}else if($no=='4') {
				$post_data = [
					'have_any_android_app_startup' => $formdata['have_any_android_app_startup'],
					'app_name_details' => $formdata['app_name_details'],
					'have_ios_app' => $formdata['have_ios_app'],
					'ios_name_details' => $formdata['ios_name_details'],
					'f4_status'=>$formdata['f4_status'],
				];
			} else if($no=='5') {
				$post_data = [
					'relevant_industry' => $formdata['relevant_industry'],
					'views_on_industry' => $formdata['views_on_industry'],
					'total_market_size_of_industry' => $formdata['total_market_size_of_industry'],
					'supporting_information_of_narket_size' => $formdata['supporting_information_of_narket_size'],
					'addressale_market_size' => $formdata['addressale_market_size'],
					'supporting_information_of_demarking_addressable_market' => $formdata['supporting_information_of_demarking_addressable_market'],
					'f5_status'=>$formdata['f5_status'],
				];
			} else if($no=='6') {
				$post_data = [
					'direct_local_competition' => $formdata['direct_local_competition'],
					'in_direct_local_competition' => $formdata['in_direct_local_competition'],
					'direct_global_competition' => $formdata['direct_global_competition'],
					'indirect_global_competition' =>$formdata['indirect_global_competition'],
					'how_different_startup_from_competition' => $formdata['how_different_startup_from_competition'],
					'why_difficult_competition' => $formdata['why_difficult_competition'],
					'what_are_unfair_disadvantages' => $formdata['what_are_unfair_disadvantages'],
					'most_about_your_competition' => $formdata['most_about_your_competition'],
					'failed_venture_in_same_domain' =>  $formdata['failed_venture_in_same_domain'],
					'resons_for_failure_after_analysing' => $formdata['resons_for_failure_after_analysing'],
					'f6_status'=>$formdata['f6_status'],
				];
			} else if($no=='7') {
				$post_data = [
					'strength_of_your_startup' => $formdata['strength_of_your_startup'],
					'weakness_of_startup' => $formdata['weakness_of_startup'],
					'opportunities_for_startup' => $formdata['opportunities_for_startup'],
					'threats_for_startup' =>$formdata['threats_for_startup'],
					'f7_status'=>$formdata['f7_status'],
				];
			} else if($no=='8') {
				$post_data = [
					'name_of_legality_entity'=> $formdata['name_of_legality_entity'],
					'website'=> $formdata['website'],
					'cin_legality_entity'=> $formdata['cin_legality_entity'],
					'pan_legality_entity'=> $formdata['pan_legality_entity'],
					'registered_in_country'=> $formdata['registered_in_country'],
					'formality_established_date'=> $formdata['formality_established_date'],
					'activities_start_date_befire_formal'=> $formdata['activities_start_date_befire_formal'],
					'address_registered_office'=> $formdata['address_registered_office'],
					'address_corporate_office'=> $formdata['address_corporate_office'],
					'director_1_name'=> $formdata['director_1_name'],
					'director_1_din'=> $formdata['director_1_din'],
					'director_2_name'=> $formdata['director_2_name'],
					'director_2_din'=> $formdata['director_2_din'],
					'director_3_name'=> $formdata['director_3_name'],
					'director_3_din'=> $formdata['director_3_din'],
					'director_4_name'=> $formdata['director_4_name'],
					'director_4_din'=> $formdata['director_4_din'],
					'f8_status'=>$formdata['f8_status'],
				];
			} else if($no=='9') {
				$post_data = [
					'linkdin' => $formdata['linkdin'],
					'facebook' => $formdata['facebook'],
					'instagram' => $formdata['instagram'],
					'youtube' => $formdata['youtube'],
					'others' => $formdata['others'],
					'f9_status'=>$formdata['f9_status'],
				];
			} else if($no=='10') {
				$post_data = [
					'primary_gtm_strategy' => $formdata['primary_gtm_strategy'],
					'backup_plan_for_strategy' => $formdata['backup_plan_for_strategy'],
					'existing_cas' => $formdata['existing_cas'],
					'expected_cac_in_future' => $formdata['expected_cac_in_future'],
					'rational_behinde_any_change_in_cac' => $formdata['rational_behinde_any_change_in_cac'],
					'ltv_of_customer' => $formdata['ltv_of_customer'],
					'rational_behind_ltv_number' => $formdata['rational_behind_ltv_number'],
					'ltv_to_cac_ratio' => $formdata['ltv_to_cac_ratio'],
					'f10_status'=>$formdata['f10_status'],
				];
			} else if($no=='11') {
				$post_data = [
					'name_of_clients' => $formdata['name_of_clients'],
					'client_retention' => $formdata['client_retention'],
					'revenue_top_5_clients' => $formdata['revenue_top_5_clients'],
					'explaination_economics_of_startup' => $formdata['explaination_economics_of_startup'],
					'total_capex_of_startup' => $formdata['total_capex_of_startup'],
					'total_amount_spent_of_product' => $formdata['total_amount_spent_of_product'],
					'major_expense_till_date' => $formdata['major_expense_till_date'],
					'f11_status'=>$formdata['f11_status'],
				];
			} else if($no=='12') {
				$post_data = [
					'authorized_captial_of_company' => $formdata['authorized_captial_of_company'],
					'paid_up_capital_company' => $formdata['paid_up_capital_company'],
					'percentage_holding_by_founders'=>$formdata['percentage_holding_by_founders'],
					'percentage_holding_by_core_team' => $formdata['percentage_holding_by_core_team'],
					'reserved_for_esop' => $formdata['reserved_for_esop'],
					'percentage_holding_of_others' => $formdata['percentage_holding_of_others'],
					'actual_amount_real_salaries_taken' => $formdata['actual_amount_real_salaries_taken'],
					'usecure_loans_received_from_founders' => $formdata['usecure_loans_received_from_founders'],
					'usecure_loans_received_from_other' => $formdata['usecure_loans_received_from_other'],
					'any_other_secured_or_ddebt_from_bank' => $formdata['any_other_secured_or_ddebt_from_bank'],
					'f12_status'=>$formdata['f12_status'],
				];
			} else if($no=='13') {
				$post_data = [
					'founders_current_salery' => $formdata['founders_current_salery'],
					'date_of_last_increase_founders_salary' => $formdata['date_of_last_increase_founders_salary'],
					'core_team_current_salary' => $formdata['core_team_current_salary'],
					'total_salary_including_core_team_salary' => $formdata['total_salary_including_core_team_salary'],
					'f13_status'=>$formdata['f13_status'],
				];
			} else if($no=='14') {
				$post_data = [
					'have_you_raised_fund_for_startup' => $formdata['have_you_raised_fund_for_startup'],
						'round_1_date'=>$formdata['round_1_date'],
				      'round_1_pre_money_validation'=>$formdata['round_1_pre_money_validation'],
				      'round_1_amount_raised'=>$formdata['round_1_amount_raised'],
				      'round_1_name_of_investor'=>$formdata['round_1_name_of_investor'],
				      'round_1_other_specific_details'=>$formdata['round_1_other_specific_details'],

				      'round_2_date'=>$formdata['round_2_date'],
				      'round_2_pre_money_validation'=>$formdata['round_2_pre_money_validation'],
				      'round_2_amount_raised'=>$formdata['round_2_amount_raised'],
				      'round_2_name_of_investor'=>$formdata['round_2_name_of_investor'],
				      'round_2_other_specific_details'=>$formdata['round_2_other_specific_details'],

				      'round_3_date'=>$formdata['round_3_date'],
				      'round_3_pre_money_validation'=>$formdata['round_3_pre_money_validation'],
				      'round_3_amount_raised'=>$formdata['round_3_amount_raised'],
				      'round_3_name_of_investor'=>$formdata['round_3_name_of_investor'],
				      'round_3_other_specific_details'=>$formdata['round_3_other_specific_details'],

				      'round_4_date'=>$formdata['round_4_date'],
				      'round_4_pre_money_validation'=>$formdata['round_4_pre_money_validation'],
				      'round_4_amount_raised'=>$formdata['round_4_amount_raised'],
				      'round_4_name_of_investor'=>$formdata['round_4_name_of_investor'],
				      'round_4_other_specific_details'=>$formdata['round_4_other_specific_details'],

				      'any_one_of_previous_investors_during_this_round'=>$formdata['any_one_of_previous_investors_during_this_round'],
				      'any_one_of_previous_investors_during_this_current_round'=>$formdata['any_one_of_previous_investors_during_this_current_round'],
				      'f14_status'=>$formdata['f14_status'],
				];
			} else if($no=='15') {
				$post_data = [
					'funds_required' => $formdata['funds_required'],
					'expected_runway_with_current_fund_raise' => $formdata['expected_runway_with_current_fund_raise'],
					'desired_valuation_for_current_fund_raise' => $formdata['desired_valuation_for_current_fund_raise'],
					'logic_for_desired_valuation' => $formdata['logic_for_desired_valuation'],
					'logical_and_realistic_lower_valuation' => $formdata['logical_and_realistic_lower_valuation'],
					'capex_immediately' => $formdata['capex_immediately'],
					'capex_future_plans' => $formdata['capex_future_plans'],
					'use_of_funds_product_development' => $formdata['use_of_funds_product_development'],
					'use_of_funds_marketing' => $formdata['use_of_funds_marketing'],
					'use_of_funds_repayment' => $formdata['use_of_funds_repayment'],
					'use_of_funds_salaries_in_per' => $formdata['use_of_funds_salaries_in_per'],
					'use_of_funds_cost_and_commision' => $formdata['use_of_funds_cost_and_commision'],
					'use_of_funds_other' => $formdata['use_of_funds_other'],
					'are_you_open_to_consider_logical_lower_valuation' => $formdata['are_you_open_to_consider_logical_lower_valuation'],
					'f15_status' => $formdata['f15_status'],
				];
			} else if($no=='16') {
				$post_data = [
					'are_you_registered_for_gst' => $formdata['are_you_registered_for_gst'],
					'status_of_gst_compliance' => $formdata['status_of_gst_compliance'],
					'date_of_last_audited_balance_sheet' => $formdata['date_of_last_audited_balance_sheet'],
					'date_of_filling_last_itr' => $formdata['date_of_filling_last_itr'],
					'date_of_last_agm' => $formdata['date_of_last_agm'],
					'pending_complience_related_to_roc' => $formdata['pending_complience_related_to_roc'],
					'past_days' => $formdata['past_days'],
					'list_of_other_situatory' => $formdata['list_of_other_situatory'],
					'email_and_mobile_of_ca' => $formdata['email_and_mobile_of_ca'],
					'email_and_mobile_of_cs' => $formdata['email_and_mobile_of_cs'],
					'name_email_and_mobile_of_any_other' => $formdata['name_email_and_mobile_of_any_other'],
					'f16_status'=>$formdata['f16_status'],
				];
			} else if($no=='17') {
				$post_data = [
					  'what_valuation_will_safe'=>$formdata['what_valuation_will_safe'],
				      'dependence_on_any_specific_founder'=>$formdata['dependence_on_any_specific_founder'],
				      'regulartory_issues'=>$formdata['regulartory_issues'],
				      'licences_and_permissions'=>$formdata['licences_and_permissions'],
				      'team_size'=>$formdata['team_size'],
				      'is_company_paying_commision_above_5_per'=>$formdata['is_company_paying_commision_above_5_per'],
				      'is_company_paying_commision_above_10_per'=>$formdata['is_company_paying_commision_above_10_per'],
				      'possible_exit_opportunities'=>$formdata['possible_exit_opportunities'],
				      'subsidiaries'=>$formdata['subsidiaries'],
				      'sister_concerns'=>$formdata['sister_concerns'],
				      'related_party_transactions'=>$formdata['related_party_transactions'],
				      'legal_risk_plan_to_migrate'=>$formdata['legal_risk_plan_to_migrate'],
				      'amy_change_by_founders'=>$formdata['amy_change_by_founders'],
				      'demo_video_link'=>$formdata['demo_video_link'],
				      'supported_documents'=>$formdata['supported_documents'],
				      'media_coverage'=>$formdata['media_coverage'],
				      'awards_and_recognitions'=>$formdata['awards_and_recognitions'],
				      'recognized_as_startup_by_dpiit'=>$formdata['recognized_as_startup_by_dpiit'],
				      'any_specific_information_to_share'=> $formdata['any_specific_information_to_share'],
				      'f17_status'=>$formdata['f17_status'],
				];
			} else if($no=='18') {
				$post_data = [
					'reference_of_customers' => $formdata['reference_of_customers'],
					'reference_of_vendors' => $formdata['reference_of_vendors'],
					'reference_of_past_employer' => $formdata['reference_of_past_employer'],
					'reference_of_guide_from_college' => $formdata['reference_of_guide_from_college'],
					'f18_status'=>$formdata['f18_status'],
				];
			}else if($no=='19') {
				$post_data = [
					'send_me_copy_of_response' => $formdata['send_me_copy_of_response'],
				];
			}
			$main_founder_id=$formdata['main_founder_id'];
			$sql="SELECT * FROM `founders` WHERE main_founder_id='$main_founder_id'";
			$query=$this->db->query($sql);
			$count=$query->num_rows();
			$res ='';
			if(intval($count)>0){
				$this->db->where('main_founder_id', $main_founder_id);
	        	$res = $this->db->update('founders', $post_data);
			}else{
				$post_data['main_founder_id']=$main_founder_id;
	        	$res = $this->db->insert('founders', $post_data);
			}
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Updated successfully.',
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
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

	function getFounderDetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$founder_id = $formdata['founder_id'];

			$sql = "SELECT * FROM `founders` WHERE main_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result = $query->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Founder details fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
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

	function uploadpitchfile(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($_POST)) {
			$id=$this->input->post('founder_id');
			$status=$this->input->post('status');
			if($id) {	
				if($status=='save' || $status=='next' || $status=='prev'){
					// uploading pitch file
					if(isset($_FILES['pitch']['name']) && $_FILES['pitch']['name'] != "") {
			            $dir = FCPATH . "uploads/founders/pitch/" . $id ."/";
			            if(!is_dir($dir)) {
			                @mkdir($dir, 0777,true);
			            }

			            $image = $_FILES['pitch']['tmp_name'];
			            $temp = explode(".", $_FILES["pitch"]["name"]);
						$newfilename = round(microtime(true)) . '.' . end($temp);

			            $hash = $_FILES['pitch']['name'];

			            if(move_uploaded_file($image, $dir.$newfilename)) {
			                $image_details = array(
			                    "pitch" => $newfilename,
			                );
			                $this->db->where('main_founder_id', $id);
			                $this->db->update('founders', $image_details);
			            }
			        }
			        if((isset($_FILES['pitch']) && $_FILES['pitch']['name'] != "") ||
			        	(isset($_FILES['documents']) && $_FILES['documents']['name'] != "")
			    	) {
			    		sleep(15);
			    		$response = [
							'status' => '1',
							'message' => 'Image is uploaded successfully. ok'
						];	
			        } else {
			        	sleep(2);
			        	$response = [
							'status' => '1',
							'message' => 'Image is uploaded successfully. not ok'
						];	
			        }
				} else{
					if(isset($_FILES['pitch']['name']) && $_FILES['pitch']['name'] != "") {
			            $dir = FCPATH . "uploads/founders/pitch/" . $id ."/";

			            if(!is_dir($dir)) {
			                @mkdir($dir, 0777,true);
			            }

			            $image = $_FILES['pitch']['tmp_name'];
			            $temp = explode(".", $_FILES["pitch"]["name"]);
						$newfilename = round(microtime(true)) . '.' . end($temp);

			            $hash = $_FILES['pitch']['name'];

			            if(move_uploaded_file($image, $dir.$newfilename)) {
			                $image_details = array(
			                    "pitch" => $newfilename,
			                );
			                $this->db->where('main_founder_id', $id);
			                $this->db->update('founders', $image_details);
			            }
			        }
			        $sql = "SELECT * FROM `founders` WHERE main_founder_id='$id'";
					$query=$this->db->query($sql);
					$result = $query->result();
					$num_rows=$query->num_rows();
					$documents=[];
					if(intval($num_rows)>0){
						$documents=!empty($result[0]->documents) ? 
						(count(json_decode($result[0]->documents))>=3? [] : json_decode($result[0]->documents))
						 : [];
					}	
					if(isset($_FILES['documents']['name']) && $_FILES['documents']['name'] != "") {
			            $dir = FCPATH . "uploads/founders/documents/" . $id ."/";
			            if(!is_dir($dir)) {
			                @mkdir($dir, 0777,true);
			            }
			            $image = $_FILES['documents']['tmp_name'];
			            $temp = explode(".", $_FILES["documents"]["name"]);
						$newfilename = time().round(microtime(true)) .mt_rand(100000,999999). '.' . end($temp);

			            $hash = $_FILES['documents']['name'];
			            array_push($documents,$newfilename);
			            if(move_uploaded_file($image, $dir.$newfilename)) {
			                $image_details = array(
			                    "documents" => json_encode($documents),
			                );
			                $this->db->where('main_founder_id', $id);
			                $this->db->update('founders', $image_details);
			            }
		        	}	
		        	$sql="select * from `founders` where main_founder_id='$id'";
			        $query=$this->db->query($sql);
			        $result=$query->result();
			        $num_rows=$query->num_rows();
		        	// updating status
	        		$image_details = array(
	                    "f19_status" => $this->input->post('f19_status'),
	                );
	                $this->db->where('main_founder_id', $id);
	                $this->db->update('founders', $image_details);
			        $response = [
						'status' => '1',
						'message' => 'Image is uploaded successfully.'
					];
				}
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
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
	function delete_startup_form_document(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$removed_document = $formdata['removed_document'];
			$documents = $formdata['documents'] ? json_encode($formdata['documents']) :'';
			$sql = "UPDATE `founders` SET documents='$documents' WHERE main_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result = $query;
			if(isset($result)) {
				$path=FCPATH.'uploads/founders/documents/'.$founder_id.'/'.$removed_document;
				$this->deleteDirectory($path);
				$response = [
					'status' => '1',
					'message' => 'Document is deleted successfully.',
					'data' => $result,
					'path'=>$path
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
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
	function deleteDirectory($dir) {
	    if (!file_exists($dir)) {
	        return true;
	    }
	    if (!is_dir($dir)) {
	        return unlink($dir);
	    }
	    foreach (scandir($dir) as $item) {
	        if ($item == '.' || $item == '..') {
	            continue;
	        }

	        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
	            return false;
	        }
	         return rmdir($dir);
		}

    }

    function delete_pitch_file(){
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$pitch=$formdata['pitch'];
			$sql="UPDATE `founders` SET pitch='' WHERE main_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result = $query;
			if(isset($result)) {
				$path=FCPATH.'uploads/founders/pitch/'.$founder_id.'/'.$pitch;
				$this->deleteDirectory($path);
				$response = [
					'status' => '1',
					'message' => 'Pitch file is deleted successfully.',
					'data' => $result,
					'path'=>$path
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
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

   
}
