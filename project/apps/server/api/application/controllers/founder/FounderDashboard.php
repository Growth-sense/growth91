<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FounderDashboard extends CI_Controller {
//created at 14-09-2022
	public function get_founder_dashboard_details() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		// founder count
        if(!empty($formdata)){
        $startup_id=$formdata['startup_id'];
		$fsql = "SELECT SUM(Investment_amt) as total_investment, COUNT(*) as total_investor FROM investments LEFT JOIN deals ON deals.deal_id=investments.deal_id 
		WHERE deals.startup_id='$startup_id' AND investments.payment_status='payment_success'";
		$investquery=$this->db->query($fsql);
		$investment_count =$investquery->result();

		if($investment_count) {
			$response = [
				'status' => '1',
				'message' => 'Counts are fetched successfully.',
				'data' => $investment_count,
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
        'message'=>'need to login as founder'
        ];

    }
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
		
    }

}