<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InstitutionalReferral extends CI_Controller {

	// institutional Referral LIST
    public function list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `institutional_referral_master`";
		$query=$this->db->query($sql);
		$list =$query->result();
		for ($i = 0; $i < count($list); $i++) {
			$referral_code=$list[$i]->referral_code;
			$totalSql="SELECT SUM(Investment_amt) AS total_investment FROM `users` LEFT JOIN `investments` ON investments.investor_id=users.investor_id WHERE referred_by='$referral_code'";
			$query1 = $this->db->query($totalSql);
			$data2=$query1->result();
			$list[$i]->total_invested_amount=$data2[0]->total_investment;
		}
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Institutional Referral list is fetched successfully.',
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

	// institutional Referral LIST
    public function get_edit_list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			// sql query
			$referral_id=$formdata["referral_id"];
			$sql = "SELECT * FROM `institutional_referral_master` where referral_id='$referral_id'";
			$query=$this->db->query($sql);
			$list =$query->result();
			if(count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'edit list is fetched successfully.',
					'data' => $list,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}
		
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    // to add new referral
	function add() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$name =$formdata['name'];
			$email=$formdata['email'];
			$post_data = [
				'name'=> $name,
	            'email'=> $email,
				'mobile'=>$formdata['mobile'],
	            'bank_account_no'=> $formdata['bankAccountNo'],
	            'ifsc_code'=> $formdata['ifscCode'],
	            'bank_name'=>$formdata['bankName'],
	            'facebook'=> $formdata['facebook'],
	            'instagram'=> $formdata['instagram'],
	            'linkedin' => $formdata['linkedIn'],
	            'twitter' => $formdata['twitter'],
				// 'total_invested_amount'=>$formdata['totalInvestedAmount'],
                // 'toggle'=>$formdata['toggle']
			];
			
			$this->db->insert('institutional_referral_master', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {
				
				$response = [
					'status' => '1',
					'message' => 'New Institutional Referral is created successfully.',
					'data' => $id,
					'name'=>$name,
					'email'=>$email,
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
	// this is for updating data
	function edit() {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$id = $formdata['referral_id'];
			if(!empty($id)){
				$post_data = [
					'name'=> $formdata['name'],
					'email'=> $formdata['email'],
					'mobile'=>$formdata['mobile'],
					// 'referral_code'=> $formdata['referralCode'],
					// 'referral_link'=> $formdata['referralLink'],
					'bank_account_no'=> $formdata['bankAccountNo'],
					'ifsc_code'=> $formdata['ifscCode'],
					'bank_name'=> $formdata['bankName'],
					'facebook'=> $formdata['facebook'],
					'instagram'=> $formdata['instagram'],
					'linkedin' => $formdata['linkedIn'],
					'twitter' => $formdata['twitter'],
					// 'total_invested_amount'=>$formdata['totalInvestedAmount'],
					// 'toggle'=>$formdata['toggle']
				];
				
				$this->db->where('referral_id', $id);
				$res = $this->db->update('institutional_referral_master', $post_data);
				
				if($res) {
					$response = [
						'status' => '1',
						'message' => 'Referral details is updated successfully.'
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

	function delete() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		
		if(!empty($_POST)) {
			$id = $this->input->post('referral_id');
		
			$this->db->where('referral_id', $id);
			$res = $this->db->delete('institutional_referral_master');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Referral is deleted successfully.'
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

	function updatestatus() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$id = $formdata['referral_id'];
		
			$post_data = [
				'toggle'=> $formdata['toggle'],
			];
			
			$this->db->where('referral_id', $id);
	        $this->db->update('institutional_referral_master', $post_data);
	        $affected_rows= $this->db->affected_rows();
			
			if($affected_rows) {
				$response = [
					'status' => '1',
					'message' => 'Referral status is updated successfully.'
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

    // for uploading image and pdf
    function uploadreferralimg(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		if(!empty($_POST)) {
			$id=$this->input->post('referral_id');
			if($id) {
				// profile
				if( isset($_FILES['profile_img']['name']) && $_FILES['profile_img']['name'] != "") {
		            $dir = FCPATH . "uploads/institutional_referral/profile_img/" . $id ."/";
		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }
		            $image = $_FILES['profile_img']['tmp_name'];
		            $temp = explode(".", $_FILES["profile_img"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "profile_img" => $newfilename,
		                );
		                $this->db->where('referral_id', $id);
		                $this->db->update('institutional_referral_master', $image_details);
		            }
		        }
				
		        // for pdf
		        if( isset($_FILES['accordance']['name']) && $_FILES['accordance']['name'] != "") {
		            $dir = FCPATH . "uploads/institutional_referral/accordance/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['accordance']['tmp_name'];
		            $temp = explode(".", $_FILES["accordance"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['accordance']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "accordance" => $newfilename,
		                );
		                $this->db->where('referral_id', $id);
		                $this->db->update('institutional_referral_master', $image_details);
		            }
		        }

				$response = [
					'status' => '1',
					'message' => 'file is uploaded successfully.'
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

	// add form users
	function sendreferrallink(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$referral_id=$formdata['referral_id'];
			$referral_code=$formdata['referralCode'];
			$referral_link=$formdata['referralLink'];
			$name=$formdata['name'];
			$email=$formdata['email'];
			$post_data=[
				'referral_code'=>$referral_code,
				'referral_link'=>$referral_link,
			];
			$this->db->where('referral_id', $referral_id);
	        $this->db->update('institutional_referral_master', $post_data);
			if($referral_id) {
				// query for company name
				// SELECT * FROM `startups` where founder_id LIKE '["9%';
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
				$msg='
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
								<p>Dear <strong>'.$name.'</strong></p> <br><br>

								Join me on Growth91. <br><br>
								Growth91 platform provides access to highly vetted growth
								opportunities.<br>
								<br/>
								<a href="'.WEB_BASE_URL.'Signup?referral_code='.$referral_link.'">
								'.WEB_BASE_URL.'Signup?referral_code='.$referral_link.' 
								</a>
								<h4> OR </h4>
								<p>use my code:- &nbsp;&nbsp; <b>'.$referral_code.'</b></p><br>
								Thanks,<br>
								'.$name.' <br><br>
								PS: This is an automated email. Please do not reply.
							</div>
							</div>

					</body>
					</html>
				';
				$this->load->library("email", $config);
				$result = $this->email
				->from(SMTP_FROM_EMAIL,SMTP_FROM_NAME)
				->subject("'.$name.' is inviting you to Join Growth91 Platform")
				->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
				->message($msg)->set_mailtype('html');
				$this->email->to($email)->send();

				$response = [
					'status' => '1',
					'message' => 'Institutional referral added successful.',
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

	public function get_institutional_investor_list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$reffered_by=$formdata['reffered_by'];
			$sql = "SELECT * FROM `users` where referred_by='$reffered_by'";
			$query=$this->db->query($sql);
			$list =$query->result();
			for ($i = 0; $i < count($list); $i++) {
				$reffered_by_i=$list[$i]->referred_by;
				$email=$list[$i]->email;
				$totalSql="SELECT SUM(Investment_amt) AS total_investment FROM `users` LEFT JOIN `investments` ON investments.investor_id=users.investor_id WHERE users.email='$email' AND referred_by='$reffered_by_i'";
				$query1 = $this->db->query($totalSql);
				$data2=$query1->result();
				$list[$i]->total_invested_amount=$data2[0]->total_investment;
			}
			if($list) {
				$response = [
					'status' => '1',
					'message' => 'Institutional Referral list is fetched successfully.',
					'data' => $list,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}else{
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }
	//get all each investment by details amount by id
	public function get_details_investment_by_investors() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)){
			$reffered_by=$formdata['referred_by'];
			$investor_email=$formdata['email'];
			$sql="SELECT deals.deal_name,deals.deal_id,investments.Investment_amt,investments.Invested_dt,investments.payment_ref FROM `users` LEFT JOIN `investments` ON investments.investor_id=users.investor_id LEFT JOIN `deals` ON investments.deal_id=deals.deal_id LEFT JOIN `startups` ON startups.startupid=deals.startup_id WHERE users.email='$investor_email' AND users.referred_by='$reffered_by'";
			$query=$this->db->query($sql);
			$list =$query->result();
			if($list) {
				$response = [
					'status' => '1',
					'message' => 'Institutional Referral user Details of investment fetched successfully.',
					'data' => $list,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}else{
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

}