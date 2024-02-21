<?php
defined('BASEPATH') or exit('No direct script access allowed');

class RetailReferral extends CI_Controller
{	// add form users
	function sendretailreferrallink()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: *");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$referral_code = $formdata['referralCode'];
			$email = $formdata['email'];
			if (!empty($email)) {
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
				$msg = '
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title></title>
						<style>
							p{
								font-size:18px;
							}
						</style>
					</head>
					<body>
							
							<div class="container">
							<div class="card">
								<p>HI </p> <br><br>

								<p>
								Join me on Growth91 Through the link

							
								</p>
								<br/>
								<a href="https://betag91.growth91.com/Signup?referral_code=' . $referral_code . '">
								https://betag91.growth91.com/Signup?referral_code=' . $referral_code . ' 
								</a>
								<br/>
								<h4>OR</h4>
								<p> use my code:- &nbsp;&nbsp; <b>' . $referral_code . '</b></p>
							</div>
							</div>

					</body>
					</html>
				';
				$this->load->library("email", $config);
				$result = $this->email
					->from(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
					->subject("Invitation")
					->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
					->message($msg)->set_mailtype('html');

				$this->email->to($email)->send();

				$response = [
					'status' => '1',
					'message' => 'An invitation email has been sent to the users name.',
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'email can not be an empty'];
			}
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Something Went Wrong!!'
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	public function get_referral_investor_list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$referral_code = $formdata['referral_code'];
			$sql = "SELECT * FROM `users` WHERE referred_by='$referral_code'";
			$query = $this->db->query($sql);
			$list = $query->result();

			if (count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'Referral list is fetched successfully.',
					'data' => $list,
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
				'message' => 'Please Select any deal'
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	//for admin dashboard to view all invited user through referral
	public function get_all_referral_investor_list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$sql = "SELECT users.investor_id,users.first_name,users.last_name,users.email,payments.deal_id,payments.payment_amount,payments.payment_ref FROM `users` LEFT JOIN payments ON users.investor_id=payments.investor_id WHERE referred_by  LIKE '%RR%'";
		$query = $this->db->query($sql);
		$list = $query->result();

		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Referral list is fetched successfully.',
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