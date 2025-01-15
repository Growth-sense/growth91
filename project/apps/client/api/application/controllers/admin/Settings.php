
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Settings extends CI_Controller {

	// get deal settings
	public function getdealsettings(){

		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		// header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `dealsettings`";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Settings are fetched successfully.',
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
	// get cashfree details
	public function get_cashfree_details(){

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `cashfree_details`";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(isset($list)) {
			$response = [
				'status' => '1',
				'message' => 'Settings are fetched successfully.',
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

	function updatedealsettings() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$id = $formdata['id'];
			$post_data = [
				'label'=> $formdata['label'],
	            'regular_member_deal_percentage'=> $formdata['regular_member_deal_percentage'],
	            'premium_member_deal_percentage'=> $formdata['premium_member_deal_percentage'],
	            // 'fee'=> $formdata['fee'],
			];
			$this->db->where('id', $id);
	        $res = $this->db->update('dealsettings', $post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Deal settings are updated successfully.'
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

	// add new category
	function category() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			
			$post_data = [
	            'name' => $formdata['category'],
			];
			
			$this->db->insert('blog_categories', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'New Category is added successfully.',
					'data' => $id,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Error !'
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

	// get category
	function getcategories(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `blog_categories`";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Categories are fetched successfully.',
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

	function getsettings(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `settings`";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Settings are fetched successfully.',
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
	function updatesetting(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$id = $formdata['id'];
			$post_data = [
				'amount'=> $formdata['amount'],
				'discount'=> $formdata['discount'],
				'discount_for_old_member' => $formdata['discount_for_old_member']
			];
			$this->db->where('setting_id', $id);
	        $res = $this->db->update('settings', $post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Data updated successfully.'
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
	function updatetaxationsetting(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$id = $formdata['id'];
			$post_data = [
				'taxation_percentage'=>$formdata['taxation_percentage']
			];
			$this->db->where('setting_id', $id);
	        $res = $this->db->update('settings', $post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Data updated successfully.'
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
	// update cashfree details
	function update_cashfree_details(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$id = $formdata['id'];
			$post_data = [
				'test_base_url'=> $formdata['test_base_url'],
				'production_base_url'=> $formdata['production_base_url'],
				'prod_app_id'=> $formdata['prod_app_id'],
				'prod_app_secret'=> $formdata['prod_app_secret'],
				'prod_payment_url'=> $formdata['prod_payment_url'],
				'test_app_id'=> $formdata['test_app_id'],
				'test_app_secret'=> $formdata['test_app_secret'],
				'test_payment_url'=> $formdata['test_payment_url'],
				'test_client_id'=>$formdata['test_client_id'],
		        'test_client_secret'=>$formdata['test_client_secret'],
		        'prod_client_id'=>$formdata['prod_client_id'],
		        'prod_client_secret'=>$formdata['prod_client_secret'],
		        'test_pan_url'=>$formdata['test_pan_url'],
		        'prod_pan_url'=>$formdata['prod_pan_url'],
		        'test_adhar_url'=>$formdata['test_adhar_url'],
		        'prod_adhar_url'=>$formdata['prod_adhar_url'],
		        'test_bank_url'=>$formdata['test_bank_url'],
		        'prod_bank_url'=>$formdata['prod_bank_url'],
		        'test_bank_client_id'=>$formdata['test_bank_client_id'],
		        'test_bank_client_secret'=>$formdata['test_bank_client_secret'],
				'env'=> $formdata['env'],
			];
			$this->db->where('id', $id);
	        $res = $this->db->update('cashfree_details', $post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Cashfree details are updated successfully.'
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