<?php
defined('BASEPATH') or exit('No direct script access allowed');


class Authenticate extends CI_Controller
{

	function sendotp()
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

			$sql = "SELECT * FROM `users_selected_by_founder` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res = $query->result();
			$num_rows = $query->num_rows();
			if (intval($num_rows) > 0) {
				// send email
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

				$msg = "OTP for login is $otp.";

				$this->load->library("email", $config);

				$result = $this->email
					->from(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
					->subject("OTP Notification")
					->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
					->message($msg)->set_mailtype('html');

				if ($this->email->to($email)->send()) {
					// echo 'sent';
					$response = [
						'status' => '1',
						'message' => 'Otp is sent successfully. Please check once you email address',
						'data' => $res,
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Invalid email address. Please try again!',
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

	function invite_members()
	{

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$name = $formdata['name'];
			$role = $formdata['role'];
			$email = $formdata['email'];
			$step = $formdata['step'];

			$sql = "SELECT * FROM `users_selected_by_founder` WHERE email='$email'";
			$query = $this->db->query($sql);
			$result = $query->result();
			$num_rows = $query->num_rows();
			if ($num_rows > 0) {
				$response = [
					'status' => '0',
					'message' => "'$email' this email address is already used.Please add another email",
				];
			}
			else {
				$otp = rand(111111, 888888);
				$post_data = [
					'name' => $name,
					'role' => $role,
					'email' => $email,
					'by_founder_id' => $founder_id,
					'otp' => $otp,
				];

				$this->db->insert('users_selected_by_founder', $post_data);
				$id = $this->db->insert_id();
				if ($id) {
					$data = [
						'form_status' => $step == '3' ? 'submitted' : '',
						'step' => $step,
					];
					$this->db->where('submiited_by_founder_id', $founder_id);
					$this->db->update('founder_startup_form', $data);

					$sql = "SELECT * FROM `startups`";
					$query = $this->db->query($sql);
					$result = $query->result();
					$company_name = 'Test';
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

					$msg = '
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
	                              a {
	                                
	                              }
	                              p {
	                                font-size: 19px;
	                                line-height: 34px;
	                              }
	                            </style>
	                          </head>
	                          <body>
	                            <div class="container"
	                            style="width: 600px;
	                            max-widyj:600px;
	                            border:1px solid #ddd;
	                                margin: 0 auto;
	                                box-shadow: 4px 3px 19px #ddd;
	                                padding: 38px 25px;
	                                font-family: sans-serif;
	                                margin-top: 40px;
	                                border-radius: 8px;"
	                            >
	                              <p style="text-align:center;font-size:18px;line-height:34px;">
	                              Hi ' . $name . '</p>
	                              <p style="font-size:18px;line-height:34px;text-align:center;">
	                                Please fill the form through the link  for ' . $company_name . '.
	                              </p>
	                              <br />
	                              <a href="https://betag91.growth91.com/authenticate?email=' . $email . '"
	                              target="_blank"
	                              style="background: red;
	                                color: #fff;
	                                padding: 13px 33px;
	                                text-decoration: none;
	                                border-radius: 7px;
	                                display: flex;
	                                justify-content: center;
	                                width: fit-content;
	                                margin: 0 auto;"
	                              > Try to login </a>
	                              <br />
	                              <br/>
	                              <br />
	                            </div>
	                          </body>
	                        </html>
					';
					$this->load->library("email", $config);
					$result = $this->email
						->from(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
						->subject("Supporting Form Notification")
						->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
						->message($msg)->set_mailtype('html');
					$this->email->to($email)->send();
					$response = [
						'status' => '1',
						'message' => 'Invite sent successfully.',
						'data' => $id,
					];
				}
				else {
					$response = [
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
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