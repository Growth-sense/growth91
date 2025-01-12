<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FundRaise extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['FundRaiseModel']);
	}

	public function register() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$data2 = [
				'first_name' => $formdata['name'],
				'email' => $formdata['companyemail'],
				'user_type' => 'founder',
			];
			$this->db->insert('users',$data2);
			$id = $this->db->insert_id();
			
			if($id) {

				$post_data = [
					'name'=>$formdata['name'],
					'user_id'=>$id,
					'companyemail'=>$formdata['companyemail'],
					'flinkedinurl1'=>$formdata['flinkedinurl1'],
					'flinkedinurl2'=>$formdata['flinkedinurl2'],
					'rcompanyname'=>$formdata['rcompanyname'],
					'companylinkedinurl'=>$formdata['companylinkedinurl'],
					'companywebsiteurl'=>$formdata['companywebsiteurl'],
					'previousfundrounds'=>$formdata['previousfundrounds'],
					'productdescription'=>$formdata['productdescription'],
					'tractiondescription'=>$formdata['tractiondescription'],
					'currentrevenue'=>$formdata['currentrevenue'],
					'currentteamsize'=>$formdata['currentteamsize'],
					'raiseincommunity'=>$formdata['raiseincommunity'],
					'istykefitforyou'=>$formdata['istykefitforyou'],
					'commitments'=>$formdata['commitments'],
					'interestedraisingprivatefund'=>$formdata['interestedraisingprivatefund'],
				];
				
				$this->FundRaiseModel->register($post_data);
				
				$response = [
					'status' => '1',
					'message' => 'Fund raise user registration is done successfully.'
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