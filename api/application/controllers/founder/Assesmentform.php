<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Assesmentform extends CI_Controller {
	// get founder startup details
	function get_startup_form_details() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$sql = "SELECT * FROM `startups`";
			$query=$this->db->query($sql);
			$result = $query->result();
			$arr=[];
			$startup_id='';
			for($c=0;$c<count($result);$c++){
				$founder_list=json_decode($result[$c]->founder_id);
				$res=in_array($founder_id,$founder_list);
				if($res==true){
					$startup_id=$result[0]->startupid;	
				}
			}
			if($startup_id) {
				$response = [
					'status' => '1',
					'message' => 'Startup form details fetched successfully.',
					'startup_id'=>$startup_id
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