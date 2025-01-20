<?php
defined('BASEPATH') or exit('No direct script access allowed');


class Investor extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model(['InvestorModel']);
	}
	// This functuion is for Generating OTP on Server (Dhaval)
	public function GenerateOTP($n)
	{
		$generator = "135792468";
		$result = "";
		for ($i = 1; $i <= $n; $i++) {
			$result .= substr($generator, (rand() % (strlen($generator))), 1);
		}
		//$result = "1234";
		return $result;
	}
	// register as new investor
	public function register()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$email = $formdata['email'];
			$typeofmember = $formdata['nationality'];
			$refferal_code = $formdata['refferal_code'];
			$is_refferal_code_matched = $formdata['is_refferal_code_matched'];
			$international_contact = $formdata['phone1'];
			$contact = $formdata['phone'];
			$country_code = $formdata['country_code'];

			$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
			$post_data = [
				'first_name' => $first_name,
				'middle_name' => $middle_name,
				'last_name' => $last_name,
				'email' => $email,
				// 'nationality' => $typeofmember=='1' ? 'Indian Resident' :'Non Resident',
				'nationality' => $typeofmember,
				'user_type' => 'investor',
				'mobile' => $contact,
				'international_contact' => $international_contact,
				'membership_start_date' => date('Y-m-d H-i a'),
				'membership_end_date' => $end_date,
				'membership_duration' => '1',
				'membership_type' => 'regular',
				'user_registered_dt' => date('Y-m-d'),
				'country_code' => $country_code,
				//'email_otp' => $this->GenerateOTP(6);
				//'mobile_otp' => $this->GenerateOTP(6);
			];
			$sql = "SELECT membership_payment_status,investor_id,membership_type FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$result = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				if ($result[0]->membership_type == 'premium' && ($result[0]->membership_payment_status == 'FAILED' || $result[0]->membership_payment_status == '')) {
					$id = $result[0]->investor_id;
					$this->db->where('investor_id', $id);
					$resp = $this->db->update('users', $post_data);
					if ($resp) {
						$response = [
							'status' => '1',
							'message' => 'Registration is completed successfully.',
							'data' => $id,
						];
					} else {
						$response = [
							'status' => '0',
							'message' => 'Email already used by someone else.'
						];
					}
				} else {
					$response = [
						'status' => '0',
						'message' => 'Email already used by someone else.'
					];
				}
			} else {
				// $id = $this->InvestorModel->register($post_data);
				$this->db->insert('users', $post_data);
				$id = $this->db->insert_id();
				if ($id) {

					// check in invitation id os present or not 
					$sql2 = "SELECT * FROM `private_deal_invities` WHERE email='$email'";
					$query2 = $this->db->query($sql2);
					$num_rows = $query2->num_rows();
					if (intval($num_rows) > 0) {
						$sql3 = "UPDATE `private_deal_invities` SET investor_id='$id' WHERE email='$email'";
						$this->db->query($sql3);
					}
					if ($is_refferal_code_matched == true) {
						$data2 = [
							'referred_by' => $refferal_code,
							'referral_code' => $formdata['reffered_code2'] . '0' . $id,
						];
						$this->db->where('investor_id', $id);
						$this->db->update('users', $data2);
					} else {
						$data2 = [
							'referral_code' => $formdata['reffered_code2'] . '0' . $id,
						];
						$this->db->where('investor_id', $id);
						$this->db->update('users', $data2);
					}
					$response = [
						'status' => '1',
						'message' => 'Registration is done successfully.',
						'data' => $id,
					];
				} else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}



	public function addInvestor()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$group_id = $formdata['group_id'];
			$first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$email = $formdata['email'];
			$typeofmember = $formdata['nationality'];
			$refferal_code = $formdata['refferal_code'];
			$is_refferal_code_matched = $formdata['is_refferal_code_matched'];
			$international_contact = $formdata['phone1'];
			$contact = $formdata['phone'];
			$country_code = $formdata['country_code'];

			$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
			$post_data = [
				'first_name' => $first_name,
				'middle_name' => $middle_name,
				'last_name' => $last_name,
				'email' => $email,
				// 'nationality' => $typeofmember=='1' ? 'Indian Resident' :'Non Resident',
				'nationality' => $typeofmember,
				'user_type' => 'investor',
				'mobile' => $contact,
				'international_contact' => $international_contact,
				'membership_start_date' => date('Y-m-d H-i a'),
				'membership_end_date' => $end_date,
				'membership_duration' => '1',
				'membership_type' => 'regular',
				'user_registered_dt' => date('Y-m-d'),
				'country_code' => $country_code,
				//'email_otp' => $this->GenerateOTP(6);
				//'mobile_otp' => $this->GenerateOTP(6);
			];
			$sql = "SELECT membership_payment_status,investor_id,membership_type FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$result = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				if ($result[0]->membership_type == 'premium' && ($result[0]->membership_payment_status == 'FAILED' || $result[0]->membership_payment_status == '')) {
					$id = $result[0]->investor_id;
					$this->db->where('investor_id', $id);
					$resp = $this->db->update('users', $post_data);
					if ($resp) {
						$response = [
							'status' => '1',
							'message' => 'Registration is completed successfully.',
							'data' => $id,
						];
					} else {
						$response = [
							'status' => '0',
							'message' => 'Email already used by someone else.'
						];
					}
				} else {
					$response = [
						'status' => '0',
						'message' => 'Email already used by someone else.'
					];
				}
			} else {
				// $id = $this->InvestorModel->register($post_data);
				$this->db->insert('users', $post_data);
				$id = $this->db->insert_id();
				if ($id) {

					// check in invitation id os present or not 
					$sql2 = "SELECT * FROM `private_deal_invities` WHERE email='$email'";
					$query2 = $this->db->query($sql2);
					$num_rows = $query2->num_rows();
					if (intval($num_rows) > 0) {
						$sql3 = "UPDATE `private_deal_invities` SET investor_id='$id' WHERE email='$email'";
						$this->db->query($sql3);
					}
					if ($is_refferal_code_matched == true) {
						$data2 = [
							'referred_by' => $refferal_code,
							'referral_code' => $formdata['reffered_code2'] . '0' . $id,
						];
						$this->db->where('investor_id', $id);
						$this->db->update('users', $data2);
					} else {
						$data2 = [
							'referral_code' => $formdata['reffered_code2'] . '0' . $id,
						];
						$this->db->where('investor_id', $id);
						$this->db->update('users', $data2);
					}
					$response = [
						'status' => '1',
						'message' => 'Registration is done successfully.',
						'data' => $id,
					];
				} else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	public function addInvestorViaFamily()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {


			$first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$email = $formdata['email'];

			// check if user exist with this email if yes pass the user id 
			$sql = "SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$result = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				$id = $result[0]->investor_id;
				$response = [
					'status' => '1',
					'message' => 'User already exist.',
					'data' => $id,
				];
			} else {
				$post_data = [
					'first_name' => $first_name,
					'middle_name' => $middle_name,
					'last_name' => $last_name,
					'email' => $email,
					'user_type' => 'nvestor',
					'user_registered_dt' => date('Y-m-d'),
				];
				$this->db->insert('users', $post_data);
				$id = $this->db->insert_id();
				if ($id) {
					$response = [
						'status' => '1',
						'message' => 'Registration is done successfully.',
						'data' => $id,
					];
				} else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}



	//addInvestorViaFamilyWithoutEmail
	public function addInvestorViaFamilyWithoutEmail()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {

			$first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$group_id = $formdata['groupID'];
			$user_id = $formdata['userID'];


			
			
				$post_data = [
					'first_name' => $first_name,
					'middle_name' => $middle_name,
					'last_name' => $last_name,
					'user_type' => 'nvestor',
					'user_registered_dt' => date('Y-m-d'),
					'groupID' => $group_id,
				];
				$this->db->insert('users', $post_data);
				$id = $this->db->insert_id();


				$temp_email = 'temp' . $id . '@growth91.com';
				$temp_mobile = '0000000000' . $id;
				// 				// After registering the user, insert into the group_invite table
				$group_invite_data = [
					'invite_email' => $temp_email,
					'invite_mobile' => $temp_mobile,
					'member_id' => $id,
					'userID' => $user_id,          // Use the newly created user_id
					'groupID' => $group_id,   // Use the group_id from the request
					'invite_sent' => date('Y-m-d H:i:s'), // Add the invitation timestamp
				];

				// Insert into group_invite table
				$this->db->insert('group_invites', $group_invite_data);

				// if ($id) {



				$response = [
					'status' => '1',
					'message' => 'Registration is done successfully.',
					'data' => $id,
				];
				// } else {
				// $response = [
				// 	'status' => '0',
				// 	'message' => 'Please try again!'
				// ];
				// }
			}
		
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	// public function addInvestorViaFamilyWithoutEmail()
	// {
	// 	header("Access-Control-Allow-Origin: *");
	// 	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	// 	header("Access-Control-Allow-Origin: *");
	// 	header("Access-Control-Allow-Headers: access");
	// 	header("Content-Type: application/json; charset=UTF-8");
	// 	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	// 	// Get the form data (assuming this is a POST request with JSON body)
	// 	$formdata = json_decode(file_get_contents('php://input'), true);

	// 	if (!empty($formdata)) {

	// 		$response = [
	// 			'status' => '1',
	// 			'message' => 'User already exists.',
	// 			'data' => $formdata,
	// 		];

	// 			// Send the response back as JSON
	// 	$this->output
	// 	->set_content_type('application/json')
	// 	->set_output(json_encode($response));

	// 	exit;

	// 		// Extract necessary fields from the form data
	// 		$first_name = $formdata['first_name'];
	// 		$middle_name = $formdata['middle_name'];
	// 		$last_name = $formdata['last_name'];
	// 		$group_id = $formdata['group_id'];  // Assuming group_id is provided in the request
	// 		$user_id = $formdata['user_id'];    // Assuming user_id is provided in the request


	// 			// If user does not exist, create a new user
	// 			$post_data = [
	// 				'first_name' => $first_name,
	// 				'middle_name' => $middle_name,
	// 				'last_name' => $last_name,
	// 				'user_type' => 'nvestor',
	// 				'user_registered_dt' => date('Y-m-d'),
	// 			];
	// 			$this->db->insert('users', $post_data);
	// 			$id = $this->db->insert_id();

	// 			if ($id) {
	// 				// After registering the user, insert into the group_invite table
	// 				$group_invite_data = [
	// 					'member_id' => $id,
	// 					'user_id' => $user_id,          // Use the newly created user_id
	// 					'group_id' => $group_id,   // Use the group_id from the request
	// 					'invited_at' => date('Y-m-d H:i:s'), // Add the invitation timestamp
	// 				];

	// 				// Insert into group_invite table
	// 				$this->db->insert('group_invite', $group_invite_data);

	// 				// Prepare response for successful registration and group invite
	// 				$response = [
	// 					'status' => '1',
	// 					'message' => 'Registration is done successfully and user is invited to the group.',
	// 					'data' => $id,
	// 				];
	// 			} else {
	// 				// If registration failed
	// 				$response = [
	// 					'status' => '0',
	// 					'message' => 'Please try again!',
	// 				];
	// 			}

	// 	} else {
	// 		// If form data is empty
	// 		$response = [
	// 			'status' => '0',
	// 			'message' => 'Please enter values for all fields.',
	// 		];
	// 	}

	// 	// Send the response back as JSON
	// 	$this->output
	// 		->set_content_type('application/json')
	// 		->set_output(json_encode($response));
	// }


	public function sendotp()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$email = $formdata['email'];
			$otp = $formdata['otp'];
			//'email_otp' => $this->GenerateOTP(6);
			//'mobile_otp' => $this->GenerateOTP(6);

			$sql = "SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res = $query->result();

			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				// send email

				if ($num_rows) {
					$response = [
						'status' => '1',
						'message' => 'OTP is sent successfully. Please check your registered email address',
						'data' => $res,
					];
				} else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			} else {
				$response = [
					'status' => '0',
					'message' => 'Invalid email address. Please try again!',
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	public function updaterstatus()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {

			$id = $formdata['id'];
			$riskstatus = $formdata['riskstatus'];
			$limitedstatus = $formdata['limitedstatus'];
			$divesestatus = $formdata['divesestatus'];
			$cancellationstatus = $formdata['cancellationstatus'];
			$researchstatus = $formdata['researchstatus'];
			$is_investor = $formdata['is_investor'];
			$data = [
				'riskstatus' => $riskstatus,
				'limitedstatus' => $limitedstatus,
				'divesestatus' => $divesestatus,
				'cancellationstatus' => $cancellationstatus,
				'researchstatus' => $researchstatus,
				'is_investor' => $is_investor,
				'ip_address' => $_SERVER['REMOTE_ADDR'],
			];
			$this->db->where('investor_id', $id);
			$res = $this->db->update('users', $data);

			if ($res) {
				$response = [
					'status' => '1',
					'message' => 'Registration is completed successfully.',
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	// REGISTER PREMIUM MEMBER
	public function register_premium_member()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {

			$first_name = $formdata['first_name'];
			$middle_name = $formdata['middle_name'];
			$last_name = $formdata['last_name'];
			$email = $formdata['email'];
			$mobile = $formdata['mobile'];
			$otp = $formdata['otp'];

			$sql = "SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				$response = [
					'status' => '0',
					'message' => 'Please try to register with another email or mobile.',
				];
			} else {
				$post_data = [
					'first_name' => $first_name,
					'middle_name' => $middle_name,
					'last_name' => $last_name,
					'email' => $email,
					'mobile' => $mobile,
					'user_type' => 'investor',
					'are_premium_members' => '1',
					'user_registered_dt' => date('Y-m-d'),
				];

				$id = $this->InvestorModel->register($post_data);

				if ($id) {
					$response = [
						'status' => '1',
						'message' => 'Registration is done successfully.',
						'data' => $id,
					];
				} else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	public function sendregisterotp($email, $otp)
	{

		$email = $email;
		$otp = $otp;

		// check for the email
		// $sql ="SELECT * FROM `users` WHERE email='$email'";
		// $query = $this->db->query($sql);
		// $res =$query->result();

		// $num_rows =$query->num_rows();
		if (!empty($email)) {
			$body = '<!doctype html>
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
										<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear User, 
											<br>
											<br>
											Use the following OTP to complete the growth91 signup process. OTP is valid for 10 mins. 
											<br>
											<br>
											OTP is ' . $otp . '
											<br>
											<br>
										
											Thank you, <br/>
											Growth91 Team  <br/>
											<br>
											PS: This is system generated email. Please do not reply.
										</br>
										<div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
											<img src="' . WEB_BASE_URL . 'web/glogo.png" alt="logo" style="width:120px;height:auto;">
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
									Powered by <a href="' . WEB_BASE_URL . '" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
			$subject = "Growth91 Signup OTP $otp";
			$this->load->helper('send_email');
			$res = send_email($body, $subject, $email, '');
			if ($res == '1') {
				$response = [
					'status' => '1',
					'message' => 'Otp is sent successfully.',
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Invalid email. Please try to register first.'
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}


	public function invest()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {

			$investor_id = $formdata['investor_id'];
			$deal_id = $formdata['deal_id'];
			$Investment_amt = $formdata['Investment_amt'];
			$deductstatus = $formdata['deductstatus'];
			$agreestatus = $formdata['agreestatus'];
			$payment_ref = $formdata['payment_ref'];
			$Invested_dt = date('Y-m-d H:i');
			$tdsstatus = $formdata['tdsstatus'];
			$processingfees = $formdata['processingfees'];
			$gst = $formdata['gst'];
			$legalfees = $formdata['legalfees'];

			$post_data = [
				'investor_id' => $investor_id,
				'deal_id' => $deal_id,
				'Investment_amt' => $Investment_amt,
				'deductstatus' => $deductstatus,
				'agreestatus' => $agreestatus,
				'Invested_dt' => $Invested_dt,
				'payment_ref' => $payment_ref,
				'tdsstatus' => $tdsstatus,
				'processingfees' => $formdata['processingfees'],
				'gst' => $formdata['gst'],
				'legalfees' => $formdata['legalfees'],
			];
			$this->db->insert('investments', $post_data);
			$id = $this->db->insert_id();

			if ($id) {

				$data2 = [
					'investor_id' => $investor_id,
					'deal_id' => $deal_id,
					'payment_date' => date('Y-m-d'),
					'payment_amount' => $Investment_amt,
					'description' => 'User invested in deal',
					'payment_ref' => $payment_ref,
				];

				$this->db->insert('payments', $data2);
				$response = [
					'status' => '1',
					'message' => 'Congratulations.You have invested successfully.',
					'data' => $id,
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	public function getinvestmentdetails()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {

			$investor_id = $formdata['investor_id'];
			$deal_id = $formdata['deal_id'];

			$sql = "SELECT * FROM `investments` WHERE investor_id='$investor_id' AND deal_id='$deal_id'";
			$query = $this->db->query($sql);
			$result = $query->result();
			$num = $query->num_rows();

			if ($num) {
				$response = [
					'status' => '1',
					'message' => 'Invested status is fetched successfully.',
					'data' => $num,
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	public function upgradeplan()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		date_default_timezone_set("Asia/Kolkata");
		if (!empty($formdata)) {
			$id = $formdata['id'];
			$membership_fees = $formdata['membership_fees'];
			$registered_amt = $formdata['registered_amt'];
			$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
			$post_data = [
				'membership_start_date' => date('Y-m-d H-i a'),
				'membership_end_date' => $end_date,
				'membership_duration' => '1',
				'membership_type' => 'premium',
				'membership_fees' => $membership_fees,
				'registered_amt' => $registered_amt,
			];
			$this->db->where('investor_id', $id);
			$res = $this->db->update('users', $post_data);
			if ($res) {
				$response = [
					'status' => '1',
					'message' => '',
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	function updateexpirystatus()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$membership_type = 'expired';
			$id = $formdata['id'];
			$post_data = [
				'membership_type' => $membership_type,
			];
			$this->db->where('investor_id', $id);
			$res = $this->db->update('users', $post_data);
			if ($res) {
				$response = [
					'status' => '1',
					'message' => 'Data is updated successfully.',
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	// check for membership type
	function check_for_membership_type()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$investor_id = $formdata['investor_id'];
			$sql = "SELECT * FROM `users` WHERE investor_id='$investor_id'";
			$query = $this->db->query($sql);
			$list = $query->result();
			if (isset($list)) {
				$response = [
					'status' => '1',
					'message' => '',
					'data' => $list,
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Not premium memmber.'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	// check for membership type
	function check_referral_code_ins()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$refferal_code = $formdata['refferal_code'];
			$sql = "SELECT * FROM `institutional_referral_master` WHERE referral_code='$refferal_code' and toggle='1'";
			$query = $this->db->query($sql);
			$list = $query->result();
			$num_rows = $query->num_rows();

			$sql2 = "SELECT * FROM `users` WHERE referral_code='$refferal_code'";
			$query2 = $this->db->query($sql2);
			$list2 = $query2->result();
			$num_rows2 = $query2->num_rows();

			if (intval($num_rows) > 0 || intval($num_rows2) > 0) {
				$response = [
					'status' => '1',
					'message' => 'Data is matched',
					'data' => $list,
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Not matched'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	// get investor referral code
	function  get_investor_referral_code()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$investor_id = $formdata['investor_id'];
			$sql = "SELECT referral_code FROM `users` WHERE investor_id='$investor_id'";
			$query = $this->db->query($sql);
			$list = $query->result();
			if (count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'Data get successfully',
					'data' => $list,
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Not matched'
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	// send otp on mobile
	public function sendotponmobile()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		$mobile = $_GET['mobile'];
		if (!empty($mobile)) {
			$otp = $_GET['otp'];

			$this->load->helper('send_sms_investor');
			$resp = investor_otp_sms($otp, $mobile);
			if ($resp == '1') {
				$response = [
					'status' => '1',
					'message' => 'OTP sent to your mobile no.',
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'OTP is not correct',
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Invalid mobile no. pleae try again.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	// send sms
	function sendsms($mobile, $message)
	{
		$curl = curl_init();
		$API_KEY = 'uXBLhCNkKUsPDrq62Y73c5gjtodzQabISMO10pmevw4fTE8RVlhzKG9twWyTRrjuDBv3YMkSmZNiEcpb';
		$url = "https://www.fast2sms.com/dev/bulkV2?authorization=" . $API_KEY . "&route=dlt&sender_id=GrowNI&message=147470&variables_values=" . urlencode($otp) . "%7C&flash=0&numbers=" . urlencode($mobileNo);
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_SSL_VERIFYPEER => 0,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => "GET",
			CURLOPT_HTTPHEADER => array(
				"cache-control: no-cache"
			),
		));
		$response = curl_exec($curl);
		$err = curl_error($curl);
		curl_close($curl);
		if ($err) {
			return '0';
		} else {
			return '1';
		}
	}

	// This function is used for premium membership
	function change_membership_details()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$investor_id = $formdata['investor_id'];
			$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
			$start_date = date('Y-m-d H-i a');
			$membership_duration = '1';
			$data = [
				'membership_duration' => $membership_duration,
				'membership_end_date' => $end_date,
				'membership_start_date' => $start_date,
				'membership_type' => 'premium',
			];
			$this->db->where('investor_id', $investor_id);
			$res = $this->db->update('users', $data);
			if (isset($res)) {
				$this->send_premium_member_email($investor_id);
				$response = [
					'status' => '1',
					'message' => 'Data is updated successfully.',
				];
			} else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!',
				];
			}
		} else {
			$response = [
				'status' => '0',
				'message' => 'Something went wrong. Please try again.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	function send_premium_member_email($investor_id)
	{
		$sql = "SELECT * FROM users WHERE investor_id='$investor_id'";
		$query = $this->db->query($sql);
		$result = $query->result();
		$name = $result[0]->first_name . ' ' . $result[0]->last_name;
		$email = $result[0]->email;
		$investment = $result[0]->email;
		$membership_fees = $result[0]->membership_fees;
		$subject = 'Welcome to Growth91 platform as premium member';
		$email = $email;
		$cc = '';
		$this->load->helper('send_email');
		$body = '<!doctype html>
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
										<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>' . $name . '</strong>, 
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
											' . ($membership_fees == "0" ? "" : "<br>
											<br>We have received Rs. 999 towards the premium membership subscription.") . '
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
											<img src="' . WEB_BASE_URL . 'web/glogo.png" alt="logo" style="width:120px;height:auto;">
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
									Powered by <a href="' . WEB_BASE_URL . '" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
		$res = send_email($body, $subject, $email, $cc);
	}
}
