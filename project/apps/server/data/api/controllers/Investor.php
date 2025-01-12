<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Investor extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['InvestorModel']);
	}

	public function register(){
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
			$nationality = $formdata['nationality'];
			$refferal_code = $formdata['refferal_code'];
			$is_refferal_code_matched = $formdata['is_refferal_code_matched'];
			$post_data = [
				'first_name' => $first_name,
				'middle_name' => $middle_name,
				'last_name' => $last_name,
				'email' => $email,
				'nationality' => $nationality,
				'user_type' => 'investor',
				'user_registered_dt' => date('Y-m-d'),
			];
			$sql="SELECT membership_payment_status,investor_id,membership_type FROM `users` WHERE email='$email'";
			$query=$this->db->query($sql);
			$result=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				if($result[0]->membership_type=='premium' && ($result[0]->membership_payment_status=='FAILED' || $result[0]->membership_payment_status=='')){
					$id=$result[0]->investor_id;
					$this->db->where('investor_id',$id);
					$resp=$this->db->update('users',$post_data);
					if($resp){
						$response =[
							'status' => '1',
							'message' => 'Registration is completed successfully.',
							'data' => $id,
						];		
					}else{
						$response =[
							'status' => '0',
							'message' => 'You have been registered already.'
						];		
					}
				}else{
					$response =[
						'status' => '0',
						'message' => 'You have been registered already.'
					];	
				}
			}else{
				$id = $this->InvestorModel->register($post_data);
				if($id) {
					if($is_refferal_code_matched==true){
						$data2=[
							'referred_by'=>$refferal_code,
							'referral_code' => $formdata['reffered_code2'].'0'.$id,
						];
						$this->db->where('investor_id',$id);
						$this->db->update('users',$data2);
						$data=[
							'investor_id'=>$id,
							'description'=>'Registered by referring',
							'type'=>'credited',
							'amount'=>'1000',
						];
						$this->db->insert('wallet_history',$data);
					}
					$response = [
						'status' => '1',
						'message' => 'Registration is done successfully.',
						'data' => $id,
					];
				} else {
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
			$otp = $formdata['otp'];
		
			$sql ="SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res =$query->result();
			
			$num_rows =$query->num_rows();
			if(intval($num_rows) > 0) {
				// send email
				$config = Array(
					'protocol'  => 'ssmtp',
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
	
				$result = $this->email->to($email)->send();
				if($num_rows) {
					$response = [
						'status' => '1',
						'message' => 'Otp is sent successfully. Please check once you email address',
						'data' => $res,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Please try again!'
					];
				}	
			}else {
				$response =[
					'status' => '0',
					'message' => 'Invalid email address. Please try again!',
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

	public function updaterstatus() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$id = $formdata['id'];
			$riskstatus = $formdata['riskstatus'];
			$limitedstatus = $formdata['limitedstatus'];
			$divesestatus = $formdata['divesestatus'];
			$cancellationstatus = $formdata['cancellationstatus'];
			$researchstatus = $formdata['researchstatus'];

			$data=[
				'riskstatus' => $riskstatus,
				'limitedstatus' => $limitedstatus,
				'divesestatus' => $divesestatus,
				'cancellationstatus' => $cancellationstatus,
				'researchstatus' => $researchstatus,
			];
			$this->db->where('investor_id', $id);
			$res =$this->db->update('users',$data);

			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Registration is completed successfully.',
				];
			}else {
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

	// REGISTER PREMIUM MEMBER
	public function register_premium_member() {
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
			$mobile = $formdata['mobile'];
			$otp = $formdata['otp'];

			$sql ="SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res =$query->result();
			$num_rows =$query->num_rows();
			if(intval($num_rows) > 0) {
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
				
				if($id) {
					$this->sendregisterotp($email,$otp);
					$response = [
						'status' => '1',
						'message' => 'Registration is done successfully.',
						'data' => $id,
					];
				} else {
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


	public function sendregisterotp($email, $otp) {

			$email = $email;
			$otp = $otp;
			
			// check for the email
			$sql ="SELECT * FROM `users` WHERE email='$email'";
			$query = $this->db->query($sql);
			$res =$query->result();

			$num_rows =$query->num_rows();
		if(intval($num_rows) > 0) {

			// send email
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

			$result = $this->email->to($email)->send();
			
			if($num_rows) {
				$response = [
					'status' => '1',
					'message' => 'Otp is sent successfully. Please check once you email address',
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}	
		}else {
			$response =[
				'status' => '0',
				'message' => 'Invalid email. Please try to register first.'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}


	public function invest() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

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
			$this->db->insert('investments',$post_data);
			$id=$this->db->insert_id();
			
			if($id) {
	
				$data2 = [
					'investor_id'=>$investor_id,
					'deal_id'=>$deal_id,
					'payment_date'=> date('Y-m-d'),
					'payment_amount'=>$Investment_amt,
					'description'=> 'User invested in deal',
					'payment_ref' => $payment_ref,
				];

				$this->db->insert('payments',$data2);
				$response = [
					'status' => '1',
					'message' => 'Congratulations.You have invested successfully.',
					'data' => $id,
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

	public function getinvestmentdetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$investor_id = $formdata['investor_id'];
			$deal_id = $formdata['deal_id'];
			
			$sql="SELECT * FROM `investments` WHERE investor_id='$investor_id' AND deal_id='$deal_id'";
			$query=$this->db->query($sql);
			$result = $query->result();
			$num = $query->num_rows();
			
			if($num) {
				$response = [
					'status' => '1',
					'message' => 'Invested status is fetched successfully.',
					'data' => $num,
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

	public function upgradeplan() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		date_default_timezone_set("Asia/Kolkata");
		if(!empty($formdata)) {
			$id = $formdata['id'];
			$membership_fees = $formdata['membership_fees'];
			$registered_amt = $formdata['registered_amt'];
			$end_date = date('Y-m-d H-i a', strtotime('+1 years'));
			$post_data =[
				'membership_start_date' => date('Y-m-d H-i a'),
				'membership_end_date' => $end_date,
				'membership_duration'=>'1',
				'membership_type' => 'premium',
				'membership_fees'=>$membership_fees,
				'registered_amt' => $registered_amt,
			];
			$this->db->where('investor_id', $id);
			$res =$this->db->update('users',$post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => '',
				];
			}else {
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
	function updateexpirystatus(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$membership_type='expired';
			$id=$formdata['id'];
			$post_data =[
				'membership_type'=>$membership_type,
			];
			$this->db->where('investor_id', $id);
			$res =$this->db->update('users',$post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Data is updated successfully.',
				];
			}else {
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
	// check for membership type
	function check_for_membership_type(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$investor_id=$formdata['investor_id'];
			$sql = "SELECT * FROM `users` WHERE user_type='investor' and approvestatus='Approve' and investor_id='$investor_id'";
			$query=$this->db->query($sql);
			$list =$query->result();

			if($list) {
				$response = [
					'status' => '1',
					'message' => 'Data is updated successfully.',
					'data'=>$list,
				];
			}else {
				$response =[
					'status' => '0',
					'message' => 'Not premium memmber.'
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

	// check for membership type
	function check_referral_code_ins(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$refferal_code=$formdata['refferal_code'];
			$sql = "SELECT * FROM `institutional_referral_master` WHERE referral_code='$refferal_code'";
			$query=$this->db->query($sql);
			$list =$query->result();
			$num_rows=$query->num_rows();

			$sql2 = "SELECT * FROM `users` WHERE referral_code='$refferal_code'";
			$query2=$this->db->query($sql2);
			$list2 =$query2->result();
			$num_rows2=$query2->num_rows();

			if(intval($num_rows)>0 || intval($num_rows2)>0) {
				$response = [
					'status' => '1',
					'message' => 'Data is matched',
					'data'=>$list,
				];
			}else {
				$response =[
					'status' => '0',
					'message' => 'Not matched'
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