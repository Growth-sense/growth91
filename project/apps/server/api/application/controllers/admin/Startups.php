<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Startups extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
	}

	// DEAL LIST
    public function list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `startups` 
		ORDER BY startups.startupid DESC";
		
		
		$sql = "SELECT `startups`.*,concat(users.first_name,' ', users.middle_name,' ',users.last_name) as founder_name,users.email as founder_email,users.mobile as founder_mobile, sum(investments.Investment_amt) as total_investment, count(investments.investment_id) as investors_count, sum(processingfees) as total_fees FROM startups LEFT JOIN users on users.investor_id = startups.authorised_founder LEFT JOIN deals on deals.startup_id = startups.startupid LEFT JOIN investments on investments.deal_id = deals.deal_id group by startups.startupid";
		//echo $sql;die;
//	where startupid=1;
		
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if($list) {
			$response = [
				'status' => '1',
				'message' => 'Startup list is fetched successfully.',
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

    // add new deal
	function add() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			
			$post_data = [
	            'name' => $formdata['name'],
	            'status' => $formdata['status'],
	            'founder_id' => json_encode($formdata['founder_id']),
				'operational_founder'=>$formdata['operational_founder'],
				'authorised_founder'=>$formdata['authorised_founder'],
			];
			
			$this->db->insert('startups', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'New Startup is added successfully.',
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

	function edit() {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$startupid = $formdata['startupid'];
			$post_data = [
				'name' => $formdata['name'],
	            'status' => $formdata['status'],
	            'founder_id' =>json_encode($formdata['founder_id']),
				'operational_founder'=>$formdata['operational_founder'],
				'authorised_founder'=>$formdata['authorised_founder'],
			];
			
			$this->db->where('startupid', $startupid);
	        $res = $this->db->update('startups', $post_data);
	        
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Startup details are updated successfully.'
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

	function delete() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$startupid = $formdata['startupid'];
		
			$this->db->where('startupid', $startupid);
			$res = $this->db->delete('startups');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Startup is deleted successfully.'
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