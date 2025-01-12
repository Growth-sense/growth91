
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Analytics extends CI_Controller {

	public function getdealsbystartupid(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {
            $startupid = $formdata['startupid'];

            $sql="
            	SELECT * FROM `deals`
				WHERE deal_name='$startupid'
            ";
            $query=$this->db->query($sql);
            $result = $query->result();

            $sql2="
            	SELECT * FROM `startups`
				WHERE startupid='$startupid'
            ";
            $query2=$this->db->query($sql2);
            $result2 = $query2->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Deal list is fetched successfully.',
					'data' => $result,
					'data2' => $result2,
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