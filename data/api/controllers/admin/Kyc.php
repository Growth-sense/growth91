<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kyc extends CI_Controller {
	function updatekycdetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {

			$pan_status = $formdata['pan_status'];
			$adhar_status = $formdata['adhar_status'];
			$bank_status = $formdata['bank_status'];
			$kyc_status = $formdata['kyc_status'];
			$investor_id = $formdata['investor_id'];

			$post_data = [
				'pan_status' => $pan_status,
				'adhar_status' => $adhar_status,
				'bank_status' => $bank_status,
				'kycstatus' => $kyc_status,
				'kyc_date' => $kyc_status=='Approved' ? date('Y-m-d'): '',
			];

			$this->db->where('investor_id',$investor_id);
			$res=$this->db->update('users',$post_data);
			
			if($res) {
				$response=[
					'status' => '1',
					'message' => 'KYC status is updated successfully.',
				];
			} else {
				$response=[
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

