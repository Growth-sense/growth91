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
		$iamtsql = "SELECT SUM(Investment_amt) as total_investment FROM `investments`";
		$iamtquery=$this->db->query($iamtsql);
		$invested_amt =$iamtquery->result();

		// total expected deals amount
		$sql_eamount = "SELECT SUM(deal_fund_requested) as Total_expected_deals_amount FROM `deals`";
		$sql_eamount1=$this->db->query($sql_eamount);
		$Total_expected_deals_amount =$sql_eamount1->result();

		// total convience fees
		$sql_con = "SELECT SUM(processing_fees) as Total_convience_amount FROM `payments`";
		$sql_con1=$this->db->query($sql_con);
		$Total_convience_amount =$sql_con1->result();

		// total commitments
		$sql_con = "SELECT SUM(totalamount) as Total_commitment_amount FROM `investor_commitment`";
		$sql_con1=$this->db->query($sql_con);
		$Total_commitment_amount =$sql_con1->result();


		// total Completed Deal
		$sql_con = "SELECT COUNT(deal_id) as Total_completed_deal FROM `deals` WHERE `deal_status`='Closed'";
		$sql_con1=$this->db->query($sql_con);
		$Total_completed_deal =$sql_con1->result();

		// total open deal
		$sql_con = "SELECT COUNT(deal_id) as Total_open_deal FROM `deals` WHERE `deal_status`='Open'";
		$sql_con1=$this->db->query($sql_con);
		$Total_open_deal =$sql_con1->result();

		// SUM(!ISNULL(visited)) AS visited
		if($founder_count) {
			$response = [
				'status' => '1',
				'message' => 'Counts are is fetched successfully.',
				'founder' => $founder_count,
				'investor' => $investor_count,
				'investment' => $invested_amt,
				'Total_expected_deals_amount' => $Total_expected_deals_amount,
				'Total_convience_amount' => $Total_convience_amount,
				'Total_commitment_amount'=> $Total_commitment_amount,
				'Total_completed_deal' => $Total_completed_deal,
				'Total_open_deal'=> $Total_open_deal,
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