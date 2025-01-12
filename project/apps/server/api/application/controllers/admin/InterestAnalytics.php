<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InterestAnalytics extends CI_Controller
{
	public function display_deal_interested_investor()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$this -> db -> select("deals_interested_log.created_at,users.mobile,users.email, users.first_name, users.last_name, deals.deal_name");
		$this -> db -> from("deals_interested_log");
		$this -> db -> join("deals","deals.deal_id = deals_interested_log.deal_id");
		$this -> db -> join("users","users.investor_id = deals_interested_log.investor_id");

		$status = $this -> db -> order_by("id","DESC") -> get() -> result();

		if($status)
		{
			$response = [
				'status' => '1',
				'message' => 'Investor Deal Interested Fetch Successfully.',
				'data' => $status,
			];
		}
		else
		{
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
