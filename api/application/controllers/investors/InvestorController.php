
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InvestorController extends CI_Controller {

	function __construct() {
        parent::__construct();
        $this->check_for_db_class();
    }

    function check_for_db_class(){
    	if(!$this->load->is_loaded('database')){
		      $this->load->database();
		} 
    }

	public function getinvestordetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

            $id = $formdata['investor_id'];

            $sql="
            	SELECT email,first_name,last_name,kycstatus,investor_id FROM `users`
				WHERE investor_id = '$id'
            ";
            $query=$this->db->query($sql);
            $result = $query->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Details are fetched successfully.',
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

	public function getInvestments(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
            $investor_id = $formdata['investor_id'];
			$payment_status = "payment_success";
            $sql="SELECT * FROM `investments`
            	LEFT JOIN deals on deals.deal_id=investments.deal_id
            	LEFT JOIN startups on startups.startupid=deals.startup_id
				WHERE investments.investor_id = '$investor_id' AND investments.payment_status = '$payment_status' ORDER BY investments.created_at DESC";
            $query=$this->db->query($sql);
            $result = $query->result();
            $num_rows=$query->num_rows();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Investments are fetched successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '1',
					'message' => 'Investments are fetched successfully.',
					'data' => [],
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

	public function updateaccountdetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {
            $investor_id = $formdata['id'];
            $accountno = $formdata['accountno'];
            $ifsccode = $formdata['ifsccode'];
            $data=[
            	'bank_ac_no' => $accountno,
            	'ifsc_code' => $ifsccode,
            	'bank_kyc_status'=>'success'
            ];
            $this->db->where('investor_id',$investor_id);
            $result= $this->db->update('users',$data);
			
			if($result) {
				$this->updatebankaccountdetails($formdata);
				$this->check_for_kyc_status($formdata);
				$response = [
					'status' => '1',
					'message' => 'Bank account details are updated successfully.',
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

	function updatebankaccountdetails($formdata){
		$user_id=$formdata['id'];
		// bank details
		$sql="SELECT * FROM `user_bank_details` WHERE user_id='$user_id'";
		$query=$this->db->query($sql);
		$num_rows3=$query->num_rows();
		if(intval($num_rows3)>0){
			$post_data=[
				'account_exists' => $formdata['account_exists'],
				'amount_deposited' => $formdata['amount_deposited'],
				'name_at_bank' => $formdata['name_at_bank'],
				'ref_id' => $formdata['ref_id'],
			];
			// var_dump($post_data);
			$this->db->where('user_id',$user_id);
			$this->db->update('user_bank_details',$post_data);
		} else {
			$post_data=[
				'account_exists' => $formdata['account_exists'],
				'amount_deposited' => $formdata['amount_deposited'],
				'name_at_bank' => $formdata['name_at_bank'],
				'ref_id' => $formdata['ref_id'],
				'user_id' => $user_id,
			];
			// var_dump($post_data);
			$this->db->insert('user_bank_details',$post_data);
		}
	}

	function updateprofiledetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$investor_id=$this->input->post('investor_id');
			$post_data = [
				'first_name'=>$this->input->post('first_name'),
				'middle_name'=>$this->input->post('middle_name'),
				'last_name'=>$this->input->post('last_name'),
				'mobile'=>$this->input->post('mobile'),
			];
			$this->db->where('investor_id', $investor_id);
			$res = $this->db->update('users',$post_data);
			
			if($res) {

				if( isset($_FILES['user_profile_picture']['name']) && $_FILES['user_profile_picture']['name'] != "" ) {
					$dir = "uploads/profile/".$investor_id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['user_profile_picture']['tmp_name'];
					$hash = $_FILES['user_profile_picture']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"user_profile_picture" => $hash
						);
						$this->db->where('investor_id', $investor_id);
						$this->db->update('users', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'Profile is updated successfully.'
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
	// check for kyc statis
	 function check_for_kyc_status($formdata){
	 	$investor_id=$formdata['id'];
	 	$sql="SELECT * FROM `users` WHERE investor_id='$investor_id'";
		$query=$this->db->query($sql);
		$result=$query->result();
		$num_rows=$query->num_rows();
		if(intval($num_rows)>0){
			$bank_kyc_status=$result[0]->bank_kyc_status;
			$adhar_kyc_status=$result[0]->adhar_kyc_status;
			$pan_kyc_status=$result[0]->pan_kyc_status;
			if(
				$adhar_kyc_status=='success' && 
				$bank_kyc_status=='success' && 
				$pan_kyc_status=='success' 
			){
				$data=[
					'kycstatus'=>'system_approved'
				];
				$this->db->where('investor_id',$investor_id);
				$this->db->update('users',$data);
			}
		}
	 }
	

}
