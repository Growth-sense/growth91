<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Authenticate extends CI_Controller
{
	function get_startup_name(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$founder_id = $formdata['founder_id'];
			$sql="SELECT startup_name FROM `users` WHERE investor_id='$founder_id'";
			$query=$this->db->query($sql);
			$res=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				$response = [
					'status' => '1',
					'message' => 'Data fetched successfully.',
					'data' => $res,
				];
			} else{
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	function verify_user(){
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
			$founder_id = $formdata['founder_id'];
			$sql="SELECT * FROM `users_selected_by_founder` WHERE email='$email' 
			 AND otp='$otp' AND by_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$res=$query->result();
			$num_rows=$query->num_rows();
			if(isset($res)){
				// send email
				// $config = array(
				// 	'protocol' => 'smtp',
				// 	'smtp_host' => SMTP_HOST,
				// 	'smtp_port' => SMTP_PORT,
				// 	'smtp_user' => SMTP_USER,
				// 	'smtp_pass' => SMTP_PASS,
				// 	'mailtype' => 'text/html',
				// 	'starttls' => true,
				// 	'newline' => "\r\n",
				// 	'smtp_crypto' => 'ssl',
				// 	'charset' => 'utf-8',
				// );

				// $msg = "OTP for login is $otp.";

				// $this->load->library("email", $config);

				// $result = $this->email
				// 	->from(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
				// 	->subject("OTP Notification")
				// 	->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
				// 	->message($msg)->set_mailtype('html');

				// if ($this->email->to($email)->send()) {
					// echo 'sent';
					$response = [
						'status' => '1',
						'message' => 'User verified successfully.',
						'data' => $res,
					];
				}else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
		}else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	// get form details
	function get_form_user_details()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$id = $formdata['founder_id'];

			$sql = "SELECT * FROM `users_selected_by_founder` WHERE by_founder_id='$id'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				$response = [
					'status' => '1',
					'message' => 'Form details fetched successfully.',
					'data' => $res,
				];
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
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function save_startup_form_2()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$post_data = [
				'name' => $formdata['name'],
				'email' => $formdata['email'],
				'role_type' => $formdata['roleType'],
				'leadership' => $formdata['leaderShip'],
				'understanding_finance' => $formdata['understandFinance'],
				'understanding_hr' => $formdata['understandHr'],
				'understanding_low' => $formdata['understandLaw'],
				'passion_for_current_project' => $formdata['passionCurProject'],
				'passion_of_business' => $formdata['passionOfBusiness'],
				'experimental_mindset' => $formdata['experimentalMindset'],
				'out_of_box_thinking' => $formdata['outOFBox'],
				'problem_solving' => $formdata['problemSolving'],
				'network_business' => $formdata['networkBusiness'],
				'network_social' => $formdata['networkSocial'],
				'user_type' => $formdata['user_type'],
				'submitted_by_user_id' => $formdata['submmited_by_founder_id'],
				'form_id' => $formdata['form_id'],
			];
			$form_id = $formdata['form_id'];
			$email = $formdata['email'];
			$submmited_by_founder_id = $formdata['submmited_by_founder_id'];
			$sql = "select * from founder_startup_form_by_users where (email='$email' AND submitted_by_user_id='$submmited_by_founder_id' AND form_id='$form_id')";
			$query = $this->db->query($sql);
			$res = $query->result();
			$row_count = $query->num_rows();
			if (intval($row_count) > 0) {
				$multiClause = array('email' => $email, 'submitted_by_user_id' => $submmited_by_founder_id,
					'form_id' => $form_id);
				$this->db->where($multiClause);
				$resp = $this->db->update('founder_startup_form_by_users', $post_data);
				if ($resp) {
					$response = [
						'status' => '1',
						'message' => 'Form Saved successfully',
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
			}
			else {
				$this->db->insert('founder_startup_form_by_users', $post_data);
				$id = $this->db->insert_id();
				if ($id) {
					$response = [
						'status' => '1',
						'message' => 'Form Saved successfully',
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
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
	// save self assesment form
	function save_startup_founder2_form_self_assesment_form()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$post_data = [
				'name' => $formdata['name'],
				'email' => $formdata['email'],
				'user_type' => $formdata['roleType'],
				'role_type' => $formdata['roleType'],
				'mobile' => $formdata['mobile'],
				'linkedIn' => $formdata['linkedIn'],
				'timeCommitment' => $formdata['timeCommitment'],
				'educationInstitute' => $formdata['educationInstitute'],
				'yearsOfExperience' => $formdata['yearsOfExperience'],
				'previousEmployment' => $formdata['previousEmployment'],
				'briefFamilyBackground' => $formdata['briefFamilyBackground'],
				'anyOtherSpecificInfo' => $formdata['anyOtherSpecificInfo'],
				'dtOfJoinBusiness' => $formdata['dtOfJoinBusiness'],
				'strength' => $formdata['strength'],
				'weakness' => $formdata['weakness'],
				'dreams' => $formdata['dreams'],
				'longTermVision' => $formdata['longTermVision'],
				'shortTermVision' => $formdata['shortTermVision'],
				'leadership' => $formdata['leaderShip'],
				'leaderShipReview' => $formdata['leaderShipReview'],
				'understanding_finance' => $formdata['understandFinance'],
				'understandFinanceReview' => $formdata['understandFinanceReview'],
				'understanding_hr' => $formdata['understandHr'],
				'understandHrReview' => $formdata['understandHrReview'],
				'understanding_low' => $formdata['understandLaw'],
				'understandLawReview' => $formdata['understandLawReview'],
				'passion_of_business' => $formdata['passionBusiness'],
				'passionBusinessReview' => $formdata['passionBusinessReview'],
				'passion_for_current_project' => $formdata['passionCurProject'],
				'passionCurProjectReview' => $formdata['passionCurProjectReview'],
				'experimental_mindset' => $formdata['experimentalMindset'],
				'experimentalMindsetReview' => $formdata['experimentalMindsetReview'],
				'out_of_box_thinking' => $formdata['outOfBox'],
				'outOfBoxReview' => $formdata['outOfBoxReview'],
				'problem_solving' => $formdata['problemSolving'],
				'problemSolvingReview' => $formdata['problemSolvingReview'],
				'network_business' => $formdata['networkBusiness'],
				'networkBusinessReview' => $formdata['networkBusinessReview'],
				'network_social' => $formdata['networkSocial'],
				'networkSocialReview' => $formdata['networkSocialReview'],
				'submitted_by_user_id' => $formdata['submmited_by_founder_id'],
				'form_id' => $formdata['form_id'],
				'form_type' => 'self-assesment',
			];

			$email = $formdata['email'];
			$form_id = $formdata['form_id'];
			$submmited_by_founder_id = $formdata['submmited_by_founder_id'];
			$sql = "select * from founder_startup_form_by_users where email='$email' and submitted_by_user_id='$submmited_by_founder_id' AND form_id='$form_id'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$row_count = $query->num_rows();

			if (intval($row_count) > 0) {
				$multiClause = array('email' => $email, 'submitted_by_user_id' => $submmited_by_founder_id,
					'form_id' => $form_id);
				$this->db->where($multiClause);
				$resp = $this->db->update('founder_startup_form_by_users', $post_data);
				if ($resp) {
					$response = [
						'status' => '1',
						'message' => 'Form Saved successfully',
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
			}
			else {
				$this->db->insert('founder_startup_form_by_users', $post_data);
				$id = $this->db->insert_id();
				if ($id) {
					$response = [
						'status' => '1',
						'message' => 'Form Saved successfully',
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
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

	// save self assesment form
	function save_startup_founder2_form_self_assesment_form_advisor()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$post_data = [
				'name' => $formdata['name'],
				'email' => $formdata['email'],
				'user_type' => $formdata['roleType'],
				'role_type' => $formdata['roleType'],
				'mobile' => $formdata['mobile'],
				'linkedIn' => $formdata['linkedIn'],
				'dtOfJoinBusiness' => $formdata['dtOfJoinBusiness'],
				'credentials' => $formdata['credentials'],
				'specific_responsibilities' => $formdata['specific_responsibilities'],
				'commercialsAndOthers' => $formdata['commercialsAndOthers'],
				'formalAppointment' => $formdata['formalAppointment'],
				'submitted_by_user_id' => $formdata['submmited_by_founder_id'],
				'form_id' => $formdata['form_id'],
				'form_type' => 'self-assesment',
			];

			$email = $formdata['email'];
			$form_id = $formdata['form_id'];
			$submmited_by_founder_id = $formdata['submmited_by_founder_id'];
			$sql = "select * from founder_startup_form_by_users where email='$email' and submitted_by_user_id='$submmited_by_founder_id' AND form_id='$form_id'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$row_count = $query->num_rows();

			if (intval($row_count) > 0) {
				$multiClause = array('email' => $email, 'submitted_by_user_id' => $submmited_by_founder_id,
					'form_id' => $form_id);
				$this->db->where($multiClause);
				$resp = $this->db->update('founder_startup_form_by_users', $post_data);
				if ($resp) {
					$response = [
						'status' => '1',
						'message' => 'Form Saved successfully',
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
			}
			else {
				$this->db->insert('founder_startup_form_by_users', $post_data);
				$id = $this->db->insert_id();
				if ($id) {
					$response = [
						'status' => '1',
						'message' => 'Form Saved successfully',
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Invalid request. Please try again.',
					];
				}
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
	// get form details
	function get_startup_form2_details()
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
			$submitted_by_user_id = $formdata['submitted_by_user_id'];
			$form_id = $formdata['form_id'];
			$sql = "SELECT * FROM `founder_startup_form_by_users` WHERE email='$email' AND submitted_by_user_id='$submitted_by_user_id' AND form_id='$form_id'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				$response = [
					'status' => '1',
					'message' => 'Form details fetched successfully.',
					'data' => $res,
				];
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
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function update_form2_last_step()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {

			$form_id = $formdata['form_id'];
			$form_email = $formdata['email'];
			$send_response = $formdata['send_response'];



			$sql = "UPDATE `founder_startup_form_by_users` SET send_response='$send_response',form_status='submitted' WHERE form_id='$form_id' ";
			$query = $this->db->query($sql);
			$res = $query;
			if ($res) {

				$survay_date = date('Y-m-d');
				$sql = "UPDATE `users_selected_by_founder` SET survey_submit_date='$survay_date',form_status='submitted' WHERE id='$form_id' ";
				$query = $this->db->query($sql);
				if ($form_email != '') {
					$this->send_response($form_email, $form_id);
				}

				$response = [
					'status' => '1',
					'message' => 'Form is submitted fetched successfully.',
				];

				// Sending mail to founder for successfull submitted assesment form
				// $subject='Welcome to Growth91 platform as premium member';
				// $cc='';
				// $email=$form_email;
				// $this->load->helper('send_email');
				// $body='<!doctype html>
				// <html>
				// 	<head>
				// 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
				// 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
				// 	<title> Deal Payment Success</title>
				// 	<style>
				// 		@media only screen and (max-width: 620px) {
				// 			table.body h1 {
				// 			font-size: 28px !important;
				// 			margin-bottom: 10px !important;
				// 			}
						
				// 			table.body p,
				// 		table.body ul,
				// 		table.body ol,
				// 		table.body td,
				// 		table.body span,
				// 		table.body a {
				// 			font-size: 16px !important;
				// 			}
						
				// 			table.body .wrapper,
				// 		table.body .article {
				// 			padding: 10px !important;
				// 			}
						
				// 			table.body .content {
				// 			padding: 0 !important;
				// 			}
						
				// 			table.body .container {
				// 			padding: 0 !important;
				// 			width: 100% !important;
				// 			}
						
				// 			table.body .main {
				// 			border-left-width: 0 !important;
				// 			border-radius: 0 !important;
				// 			border-right-width: 0 !important;
				// 			}
						
				// 			table.body .btn table {
				// 			width: 100% !important;
				// 			}
						
				// 			table.body .btn a {
				// 			width: 100% !important;
				// 			}
						
				// 			table.body .img-responsive {
				// 			height: auto !important;
				// 			max-width: 100% !important;
				// 			width: auto !important;
				// 			}
				// 		}
				// 		@media all {
				// 			.ExternalClass {
				// 			width: 100%;
				// 			}
						
				// 			.ExternalClass,
				// 		.ExternalClass p,
				// 		.ExternalClass span,
				// 		.ExternalClass font,
				// 		.ExternalClass td,
				// 		.ExternalClass div {
				// 			line-height: 100%;
				// 			}
						
				// 			.apple-link a {
				// 			color: inherit !important;
				// 			font-family: inherit !important;
				// 			font-size: inherit !important;
				// 			font-weight: inherit !important;
				// 			line-height: inherit !important;
				// 			text-decoration: none !important;
				// 			}
						
				// 			#MessageViewBody a {
				// 			color: inherit;
				// 			text-decoration: none;
				// 			font-size: inherit;
				// 			font-family: inherit;
				// 			font-weight: inherit;
				// 			line-height: inherit;
				// 			}
						
				// 			.btn-primary table td:hover {
				// 			background-color: #34495e !important;
				// 			}
						
				// 			.btn-primary a:hover {
				// 			background-color: #34495e !important;
				// 			border-color: #34495e !important;
				// 			}
				// 		}
				// 		</style>
				// 			</head>
				// 			<body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
				// 			<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
				// 				<tr>
				// 				<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
				// 				<td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
				// 					<div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
						
				// 					<!-- START CENTERED WHITE CONTAINER -->
				// 					<table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
						
				// 						<!-- START MAIN CONTENT AREA -->
				// 						<tr>
				// 						<td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
				// 							<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
				// 							<tr>
				// 								<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
				// 								<p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
				// 									<br>
				// 									<br>
				// 									Thanks for registering on Growth91 platform. We have successfully upgraded you as a premium member.
				// 									<br>
				// 									<br>
				// 									As a premium member, you have priority in viewing the listed deals, priority for investment, and priority in equity allocation.
							
				// 									<br>
				// 									<br>
				// 									As a next step, would request you to complete the
				// 									<ul style="padding-left:20px;">
				// 										<li type="none">1) Know Your Customer (KYC) by providing your PAN, Aadhar, and Bank Account Details. If not done already.</li>
				// 										<li type="none">2) You can also invest in exciting deals on the Deals Page. </li>
				// 									</ul>
				// 									<br>
				// 									<br>
				// 									'.($membership_fees=="0" ? "" : "We have received Rs. 999 towards the premium membership subscription.").'
				// 									<br>
				// 									<br>
				// 									<i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
				// 									<br>
				// 									<br>
				// 									Thank you <br/>
				// 									Growth91 Team  <br/>
				// 									<br>
				// 									PS: This is system generated email. Please do not reply.
				// 									</p>
				// 								</br>
				// 								<img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:7vw;height:auto;">
				// 								</td>
				// 							</tr>
				// 							</table>
				// 						</td>
				// 						</tr>
						
				// 					<!-- END MAIN CONTENT AREA -->
				// 					</table>
				// 					<!-- END CENTERED WHITE CONTAINER -->
						
				// 					<!-- START FOOTER -->
				// 					<div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
				// 						<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
				// 						<tr>
				// 							<td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
				// 							<span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
				// 							</td>
				// 						</tr>
				// 						<tr>
				// 							<td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
				// 							Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
				// 							</td>
				// 						</tr>
				// 						</table>
				// 					</div>
				// 					<!-- END FOOTER -->
						
				// 					</div>
				// 				</td>
				// 				<td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
				// 				</tr>
				// 			</table>
				// 			</body>
				// </html>';
				// $res=send_email($body,$subject,$email,$cc);

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
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	function send_response($email, $form_id)
	{

		$sql = "SELECT * FROM `founder_startup_form_by_users` WHERE form_id='$form_id'";
		$query = $this->db->query($sql);
		$list = $query->result();
		// var_dump($list);

		$msg2 = '
			<!DOCTYPE html>
					<html lang="en">
					  <head>
					    <meta charset="UTF-8" />
					    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
					    <title></title>
					    <style>
					      p {
					        font-size: 18px;
					      }
					      p {
					        font-size: 19px;
					        line-height: 34px;
					      }
					    </style>
					  </head>
					  <body>
					    
					    <div class="container"
					    style=" width: 803px;
					        margin: 0 auto;
					        box-shadow: 4px 3px 19px rgb(192 192 192);
					        padding: 38px 25px;
					        font-family: sans-serif;
					        margin-top: 40px;
					        border-radius: 8px;" 
					    >
					      <div style="padding:20px;font-family:sans-serif;text-align:center;background:#29176f;color:#fff;">
					        Form Details
					      </div>
					      <p style="text-align:left;margin-bottom:20px;">
					        form response is given below:
					      </p>
					      <hr/>
		';
		for ($c = 0; $c < count($list); $c++) {
			$msg2 .= '
					      <p style="font-size:17px;">
					          <b>Name</b>:  ' . $list[$c]->name . '<br>
					          <b>Email:</b>  ' . $list[$c]->email . '<br>
					          <b>Role Type:</b>  ' . $list[$c]->role_type . '<br>
					          <b>Leader Ship Rating:</b> ' . $list[$c]->leadership . '<br>
					          <b>Understanding of Finance Rating:</b> ' . $list[$c]->understanding_finance . ' <br>
					          <b>Understanding of HR Rating:</b> ' . $list[$c]->understanding_hr . '<br>
					          <b>Understanding of Law and Statutory Compliances Rating:</b> ' . $list[$c]->understanding_low . '<br>
					          <b>Passion for business Rating:</b> ' . $list[$c]->passion_of_business . '<br>
					          <b>Passion for Current Project Rating:</b> ' . $list[$c]->passion_for_current_project . '<br>
					           <b>Experimental Mindset Rating:</b> ' . $list[$c]->experimental_mindset . '<br>
					           <b>Out of Box Thinking Rating:</b> ' . $list[$c]->out_of_box_thinking . '<br>
					           <b>Problem Solving Skills Rating:</b> ' . $list[$c]->problem_solving . '<br>
					           <b>Networking- Business Rating:</b> ' . $list[$c]->network_business . '<br>
					           <b>Networking- Social Rating: </b>' . $list[$c]->network_social . '<br>
					           <b>Mobile:</b> ' . $list[$c]->mobile . '<br>
					           <b>Linkedin:</b> ' . $list[$c]->linkedIn . '<br>
					           <b>Time Commitment:</b> ' . $list[$c]->timeCommitment . '<br>
					          <b> Education, Institute, Year:</b> ' . $list[$c]->educationInstitute . '<br>
					          <b> Year of Experience:</b> ' . $list[$c]->yearsOfExperience . '<br>
					           <b>Previous employment briefs:</b> ' . $list[$c]->previousEmployment . '<br>
					          <b> Brief family background:</b> ' . $list[$c]->briefFamilyBackground . '<br>
					           <b>Any other specific information:</b> ' . $list[$c]->anyOtherSpecificInfo . '<br>
					           <b>Date of Joining the business:</b> ' . $list[$c]->dtOfJoinBusiness . '<br>
					           <b>Your Strength:</b> ' . $list[$c]->strength . '<br>
					           <b>Your Weakness:</b> ' . $list[$c]->weakness . '<br>
					           <b>What are your dreams?: </b>' . $list[$c]->dreams . '<br>
					           <b>What is your long-term vision?:</b> ' . $list[$c]->longTermVision . '<br>
					           <b>What is your short-term vision?:</b> ' . $list[$c]->shortTermVision . '<br>
					           <b>Leadership Review:</b>' . $list[$c]->leaderShipReview . '<br>
					           <b>Understanding Of Finance:</b> ' . $list[$c]->understandFinanceReview . '<br>
					           <b> Understanding of Law Review:</b> ' . $list[$c]->understandLawReview . '<br>
					           <b> Understanding of HR Review:</b> ' . $list[$c]->understandHrReview . '<br>
					           <b>Passion of Business Review: </b>' . $list[$c]->passionBusinessReview . '<br>
					           <b>Passion of Current Project Review:</b> ' . $list[$c]->passionCurProjectReview . '<br>
					           <b>Experimental Mindset Review:</b> ' . $list[$c]->experimentalMindsetReview . '<br>
					          <b> Out of Box Review:</b> ' . $list[$c]->outOfBoxReview . '<br>
					           <b>Problem Solving Review:</b> ' . $list[$c]->problemSolvingReview . '<br>
					           <b>Network  Business Review:</b> ' . $list[$c]->networkBusinessReview . '<br>
					          <b> Network Social Review:</b> ' . $list[$c]->networkSocialReview . '<br>
					      </p>
					      <hr/>

				';
		}
		$msg2 .= '
					      <br />
					      <br />
					    </div>
					  </body>
					</html>
		';
		$config = array(
			'protocol' => 'smtp',
			'smtp_host' => SMTP_HOST,
			'smtp_port' => SMTP_PORT,
			'smtp_user' => SMTP_USER,
			'smtp_pass' => SMTP_PASS,
			'mailtype' => 'text/html',
			'starttls' => true,
			'newline' => "\r\n",
			'smtp_crypto' => 'ssl',
			'charset' => 'utf-8',
		);
		$this->load->library("email", $config);
		$result = $this->email
			->from(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
			->subject("Startup Form Response")
			->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
			->message($msg2)->set_mailtype('html');
		if ($this->email->to($email)->send()) {

		}
		else {

		}
	}
	// check validation
	function check_validation()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		// error_reporting(E_ALL);
		// ini_set('display_errors',1);
		if (!empty($formdata)) {
			$form_id = $formdata['form_id'];
			$sql = "SELECT * FROM `founder_startup_form_by_users` WHERE form_id='$form_id'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$num_rows = $query->num_rows();
			$count = '';
			if ($num_rows == '0' || intval($num_rows) > 0) {
				$count = '1';
			}
			else {
				$count = '';
			}
			if (!empty($count)) {
				$response = [
					'status' => '1',
					'message' => 'Form details fetched successfully.',
					'data' => $res,
				];
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
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function invite_members(){

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$company_id = $formdata['company_id'];
			$arr=json_decode($formdata['arr']);
			$error=[];
			$emailArr=[];

			$sql2 = "SELECT * FROM `users` WHERE investor_id='$founder_id'";
			$query2 = $this->db->query($sql2);
			$result2 = $query2->result();
			$num_rows=$query2->num_rows();
			$founder_name='';
			$company_name='';
			if(intval($num_rows)>0){
				$company_name=$result2[0]->startup_name;
				$founder_name=$result2[0]->first_name.' '.$result2[0]->last_name;
			}
			for($c=0;$c<count($arr);$c++){
				$name = $arr[$c]->name;
				$role = $arr[$c]->role;
				$email = $arr[$c]->email;
				$step = $arr[$c]->step;

				$sql = "SELECT * FROM `users_selected_by_founder` WHERE email='$email' and by_founder_id='$founder_id'";
				$query = $this->db->query($sql);
				$result = $query->result();
				$num_rows = $query->num_rows();
				if ($num_rows > 0) {
					array_push($error,'0');
					array_push($emailArr,$email);
				}else{
					array_push($error,'1');
					array_push($emailArr,$email);
				}	
			}
			$is_error=false;
			$email='';
			foreach ($error as $key => $value) {
				if($value=='0'){
					$email=$emailArr[$key];
					$is_error=true;
				}
			}
			if($is_error==true){
				$response = [
					'status'=>'0',
					'message'=>"'$email' this email address is already used.Please add another email"
				];	
			}else{
				for($c=0;$c<count($arr);$c++){
					$name = $arr[$c]->name;
					$role = $arr[$c]->role;
					$email = $arr[$c]->email;
					$step = $arr[$c]->step;
					$otp = rand(111111, 888888);
					$post_data = [
						'name' => $name,
						'role' => $role,
						'email' => $email,
						'by_founder_id' => $founder_id,
						'otp' => $otp,
						'company_id'=>$company_id,
					];
					$this->db->insert('users_selected_by_founder', $post_data);
					$id=$this->db->insert_id();
					if ($id) {
					$data = [
						'form_status' => 'submitted',
						'step' => $step,
					];
					$this->db->where('submiited_by_founder_id', $founder_id);
					$this->db->update('founder_startup_form', $data);
					$sql = "SELECT * FROM `startups` WHERE startupid='$company_id'";
					$query = $this->db->query($sql);
					$result = $query->result();
					$num_rows = $query->num_rows();

					// 029 : Assessment Survey Form

					$body = '
					
						<!DOCTYPE html>
							<html lang="en">
							<head>
								<meta charset="UTF-8">
								<meta name="viewport" content="width=device-width, initial-scale=1.0">
								<title>Success</title>
							</head>
							<body style="color:black; background:#ebebeb;">
							<br/>
									<div 
									class="container" 
									style="
										font-size:18px;
										font-family:sans-serif;
										padding:25px;
										width:600px;
										margin: 0 auto;
										background: #fff;
									"
									>
									 <div>
							            <img src="'.WEB_BASE_URL.'web/glogo.png" style="max-width:150px;display:flex;justify-content:center;margin:0 auto 51px auto;" />
							          </div>
									  
											Dear <strong>' . $name.'</strong>,
											<br>
											<br>
											'.$founder_name.' has invited you to complete the team
											assessment form for ' . $company_name . ' as '.$role.'. 
										<br>
										<br>
										Request you to participate in the assessment.	
										<br>
										Use this OTP to authenticate'.$otp.'.
										<a 
										href="'.WEB_BASE_URL.'authenticate?email=' . $email . '&secret='.$otp.'&founder_id='.$founder_id.'"
							              target="_blank"
							              style="background:#29176F;
							                color: #fff;
							                padding: 13px 33px;
							                text-decoration: none;
							                border-radius: 7px;
							                display: flex;
							                justify-content: center;
							                width: fit-content;
							                margin: 23px auto 23px auto;"
							              > Give your opinion </a>
										<i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
										<br><br>
											Thank you, <br>
											Growth91 Team<br><br>
									PS: This is an automated email. Please do not reply.
								<br/>
								
							</body>
							</html>
					';
					$subject="Request for Assessment Form Completion for $company_name";
					$this->load->helper("send_email");
					$res=send_email($body,$subject,$email,'');
						if(count($arr)==($c+1)){
							$response = [
								'status' => '1',
								'message' => 'Invite sent successfully.',
							];
						}
					}
				}
			}
		}else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output->set_content_type('application/json')->set_output(json_encode($response));
	}

	function get_invited_user_list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		// sql query
		$sql = "SELECT * FROM `users_selected_by_founder` order by id desc ";
		$query = $this->db->query($sql);
		$list = $query->result();

		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Status data is fetched successfully.',
				'data' => $list,
			];
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

}