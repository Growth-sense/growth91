<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Startup extends CI_Controller {

	function list() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		// sql query
		$sql = "SELECT * FROM `users_selected_by_founder` order by id desc ";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Status data is fetched successfully.',
				'data' => $list,
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
	// get startup form details
	function getstartupformdetails(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$sql="SELECT * FROM `founder_startup_form` WHERE submiited_by_founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result=$query->result();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Details updated successfully.',
					'data' => $result,
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

	// update startup form
	function update_startup_form_entry(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$founder_count=$formdata['founder_count'];
			$core_team_count=$formdata['core_team_count'];
			$advisor_count=$formdata['advisor_count'];
			$post_data=[
				'no_of_founder'=>$founder_count,
				'no_of_core_team_member'=>$core_team_count,
				'no_of_advisor'=>$advisor_count,
			];
			$this->db->where('submiited_by_founder_id',$founder_id);
			$id=$this->db->update('founder_startup_form',$post_data);
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Form details updated successfully.',
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