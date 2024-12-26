<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class investments extends CI_Controller {

	public function __construct() {
		parent::__construct();
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
		
		$sql = "SELECT * FROM `investments`
		LEFT JOIN deals on deals.deal_id = investments.deal_id
		LEFT JOIN startups on startups.startupid = deals.deal_name
		left join users on users.investor_id = investments.investor_id
		ORDER BY investments.investment_id  DESC
		";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(($list)) {
			$response = [
				'status' => '1',
				'message' => 'Investment list is fetched successfully.',
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

    // DEAL LIST
    public function approve() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$investment_id = $formdata['investment_id'];
			$investment_remarks = $formdata['investment_remarks'];

			$post_data = [
	            'investment_remarks' => $formdata['investment_remarks'],
	            'isapproved' => 'Approved',
	            'admin_approval_status_date' => date('Y-m-d'),
	            'admin_approval_status' => 'admin_approval',
			];
			
			$this->db->where('investment_id', $investment_id);
			$result =  $this->db->update('investments', $post_data);
        	if($result) {
				$response = [
					'status' => '1',
					'message' => 'Investment is approved successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		} else {
			$response =[
				'status' => '0',
				'message' => 'Please enter the value of the remarks field.'
			];
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    public function transferfund() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$investment_id = $formdata['investment_id'];
			$fundremarks = $formdata['fundremarks'];
			$referenceno = $formdata['referenceno'];
			$transferdate = $formdata['transferdate'];
			$fundtransfer = $formdata['fundtransfer'];

			$post_data = [
	            'fundremarks' => $formdata['fundremarks'],
	            'referenceno' => $formdata['referenceno'],
	            'transferdate' => $formdata['transferdate'],
	            'fundtransfer' => $formdata['fundtransfer'],
			];
			
			$this->db->where('investment_id', $investment_id);
			$result =  $this->db->update('investments', $post_data);
        	if($result) {
				$response = [
					'status' => '1',
					'message' => 'Fund is transffered successfully.',
					'data' => $result,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		} else {
			$response =[
				'status' => '0',
				'message' => 'Please enter the value of the remarks field.'
			];
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    // DEAL LIST
    public function get_founder_basic_details() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$deal_id=$formdata['deal_id'];
		
			$sql = "SELECT users.first_name,users.last_name,users.mobile,users.investor_id FROM `investments`
		    LEFT join deals on deals.deal_id='$deal_id'
		    LEFT JOIN startups on startups.startupid=deals.deal_name
		    LEFT JOIN users on users.investor_id=startups.founder_id
		    WHERE investments.deal_id='$deal_id'
			";
			$query=$this->db->query($sql);
			$list =$query->result();
			if(($list)) {
				$response = [
					'status' => '1',
					'message' => 'Founder details area fetched successfully.',
					'data' => $list,
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
				'message' => 'Please try again!'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

}