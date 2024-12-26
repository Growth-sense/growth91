<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Investors extends CI_Controller {

	function list() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	

    	$sql="
		SELECT *, startups.founder_id as s_founder_id,startups.name as s_name,investments.roc_remarks as froc_remarks FROM `investments`
		LEFT JOIN deals on deals.deal_id=investments.deal_id
		LEFT JOIN startups on startups.startupid = deals.deal_name
		LEFT JOIN users on users.investor_id = investments.investor_id
    	";
    	$query=$this->db->query($sql);
    	$res = $query->result();
		
		if($res) {
			$response = [
				'status' => '1',
				'message' => 'Investor list is fetched successfully.',
				'data' => $res,
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
	//for updating roc
	public function roc_update() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$investment_id = $formdata['investment_id'];
			$roc_status = $formdata['roc_status'];
			$roc_remarks=$formdata['roc_remarks'];
			$roc_status_date=$formdata['roc_status_date'];

			$post_data = [
	            'roc_status' => $roc_status,
	            'roc_remarks' => $roc_remarks,
	            'roc_status_date' =>$roc_status_date,
			];
			// var_dump($investment_id);exit();
			
			$this->db->where('investment_id', $investment_id);
			$result =  $this->db->update('investments', $post_data);
        	if($result) {
				$response = [
					'status' => '1',
					'message' => 'ROC Updated successfully.',
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

	//14-09-2022 (this is about investor details invested in that particular company)
	function get_startup_founder_investor() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
		$startup_id=$formdata['startup_id'];
		$sql="SELECT *, startups.founder_id as s_founder_id,startups.name as s_name,investments.roc_remarks as froc_remarks FROM `investments`
		LEFT JOIN deals on deals.deal_id=investments.deal_id
		LEFT JOIN startups on startups.startupid = deals.startup_id
		LEFT JOIN users on users.investor_id = investments.investor_id WHERE deals.startup_id='$startup_id' AND investments.payment_status='payment_success'";
    	$query=$this->db->query($sql);
    	$res = $query->result();
		
		if($res) {
			$response = [
				'status' => '1',
				'message' => 'Investor list is fetched successfully.',
				'data' => $res,
			];
		} else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}

		}else{
			$response=[
				'status'=>'0',
				'message'=>'not a founder/ invalid data'
			];
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
}