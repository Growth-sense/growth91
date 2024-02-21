<?php
defined('BASEPATH') or exit('No direct script access allowed');

class WalletHistory extends CI_Controller
{
	public function getwallethistory()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
        $formdata = json_decode(file_get_contents('php://input'), true);
        if(!empty($formdata)){
        $investor_id=$formdata['investor_id'];
        $sql = "SELECT * FROM `wallet_history` WHERE investor_id='$investor_id'"; 
		$query = $this->db->query($sql);
		$list = $query->result();

		if (count($list) >=0) {
			$response = [
				'status' => '1',
				'message' => 'Deal list is fetched successfully.',
				'data' => $list,
			];
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}

        }
        else{
            $response=[
                'status'=>'0',
                'message'=>'Please Select any deal'
            ];
        }
		
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
}