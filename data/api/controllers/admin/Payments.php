<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Payments extends CI_Controller {

	public function list() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		$sql="
			SELECT payments.paymentid, payments.investor_id,payments.deal_id, payments.payment_date, payments.payment_amount,
			users.first_name, users.last_name,payments.description,startups.name,payments.payment_ref,
			payments.payment_status
			FROM `payments`
			LEFT JOIN users on users.investor_id=payments.investor_id
			LEFT JOIN deals ON deals.deal_id =  payments.deal_id
			LEFT JOIN startups on startups.startupid = deals.deal_name
			ORDER BY paymentid DESC
		";
		$query=$this->db->query($sql);
		$result=$query->result();

		if($result) {
			$response = [
				'status' => '1',
				'message' => 'Transaction list is fetched successfully.',
				'data' => $result,
			];
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

