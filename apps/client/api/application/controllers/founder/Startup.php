<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Startup extends CI_Controller {

	// get startup detailss
	function get_startup_details() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$sql = "SELECT * FROM `startup_founder_form` WHERE founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$result = $query->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Startup form details fetched successfully.',
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

	// update startup form details
	function update_startup_founder() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$num=$formdata['num'];
			$founder_id=$formdata['founder_id'];
			$post_data=[];
			if($num=='1'){
				$post_data=[
					'email'=>$formdata['email'],
		            'startup_name'=>$formdata['startup_name'],
		            'your_email'=>$formdata['your_email'],
		            'your_name'=>$formdata['your_name'],
		            'designation'=>$formdata['designation'],
				];
			} else if($num=='2'){
				$post_data=[
					'mobile_number'=> $formdata['mobile_number'],
			      'founder_linkedin_url'=> $formdata['founder_linkedin_url'],
			      'founder_designation'=> $formdata['founder_designation'],
			      'founder_time_commitment'=> $formdata['founder_time_commitment'],
			      'founder_education_year'=> $formdata['founder_education_year'],
			      'founder_year_of_experience'=> $formdata['founder_year_of_experience'],
			      'founder_previour_employment_briefs'=> $formdata['founder_previour_employment_briefs'],
			      'founder_brief_familty_background'=> $formdata['founder_brief_familty_background'],
			      'founder_any_specific_info'=> $formdata['founder_any_specific_info'],
			      'founder_date_of_joining'=> $formdata['founder_date_of_joining'],
			      'founder_strength'=> $formdata['founder_strength'],
			      'founder_weakness'=> $formdata['founder_weakness'],
			      'founder_dreams'=> $formdata['founder_dreams'],
			      'founder_long_term_vision'=> $formdata['founder_long_term_vision'],
			      'founder_short_term_vision'=> $formdata['founder_short_term_vision'],
				];
			} else if($num=='3'){
				$post_data=[
					'leadership'=> $formdata['leadership'],
					'leadership_support_your_rating'=> $formdata['leadership_support_your_rating'],
					'understanding_of_finance'=> $formdata['understanding_of_finance'],
					'ufinance_support_your_rating'=> $formdata['ufinance_support_your_rating'],
					'understanding_of_hr'=> $formdata['understanding_of_hr'],
					'uhr_support_your_rating'=> $formdata['uhr_support_your_rating'],
					'understanding_of_low_and_statutory'=> $formdata['understanding_of_low_and_statutory'],
					'ulow_support_your_rating'=> $formdata['ulow_support_your_rating'],
					'passion_for_business'=> $formdata['passion_for_business'],
					'passion_for_business_support_rating'=> $formdata['passion_for_business_support_rating'],
					'passion_for_current_project'=> $formdata['passion_for_current_project'],
					'passion_for_current_project_support_rating'=> $formdata['passion_for_current_project_support_rating'],
					'experimental_mindset'=> $formdata['experimental_mindset'],
					'experimental_mindset_support_rating'=> $formdata['experimental_mindset_support_rating'],
					'out_of_box_thinking'=> $formdata['out_of_box_thinking'],
					'out_of_box_thinking_support_rating'=> $formdata['out_of_box_thinking_support_rating'],
					'problem_solving_skills'=> $formdata['problem_solving_skills'],
					'problem_solving_skills_support_rating'=> $formdata['problem_solving_skills_support_rating'],
					'networking_business'=> $formdata['networking_business'],
					'networking_business_support_rating'=> $formdata['networking_business_support_rating'],
					'networking_social'=> $formdata['networking_social'],
					'networking_social_support_rating'=> $formdata['networking_social_support_rating'],
					'other_memebers_in_founding_core_team'=> $formdata['other_memebers_in_founding_core_team'],
				];
			} else if($num=='5'){
				$post_data=[
					'send_response'=> $formdata['send_response'],
				];
			}
			$sql="SELECT * FROM `startup_founder_form` WHERE founder_id='$founder_id'";
			$query=$this->db->query($sql);
			$count=$query->num_rows();
			$id='';
			if(intval($count)>0){
			    $this->db->where('founder_id', $founder_id);
			    $id = $this->db->update('startup_founder_form', $post_data);
			}else{
			    $post_data['founder_id']=$founder_id;
			    $this->db->insert('startup_founder_form', $post_data);
			    $id=$this->db->insert_id();
			}
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Details are updated successfully.',
					'id' => $id,
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

	// update startup form details
	function add_member_for_founder() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$post_data=[];
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Details are updated successfully.',
					'id' => $id,
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
	}
	// add startup form
	function add_startup_form_entry(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$founder_id=$formdata['founder_id'];
			$post_data=[
				'submiited_by_founder_id'=>$founder_id,
			];
			$this->db->insert('founder_startup_form',$post_data);
			$id=$this->db->insert_id();
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Details updated successfully.',
					'id' => $id,
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
	

}