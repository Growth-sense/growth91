<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	public function getdashboarddetails() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		// founder count
		$fsql = "SELECT count(*) as founder_count FROM `users` WHERE user_type='founder'";
		$fquery=$this->db->query($fsql);
		$founder_count =$fquery->result();

		// investor count
		$isql = "SELECT count(*) as investor_count FROM `users` WHERE user_type='investor'";
		$iquery=$this->db->query($isql);
		$investor_count =$iquery->result();

		// total investment amount
		$iamtsql = "SELECT SUM(Investment_amt) as total_investment FROM `investments`;";
		$iamtquery=$this->db->query($iamtsql);
		$invested_amt =$iamtquery->result();

		
		if($founder_count) {
			$response = [
				'status' => '1',
				'message' => 'Counts are is fetched successfully.',
				'founder' => $founder_count,
				'investor' => $investor_count,
				'investment' => $invested_amt,
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

}