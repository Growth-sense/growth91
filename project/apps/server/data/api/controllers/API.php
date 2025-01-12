<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class API extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['APIModel']);
	}

	public function contact()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {

			$name = $formdata['name'];
			$email = $formdata['email'];
			$subject = $formdata['subject'];
			$message = $formdata['message'];
			
			$post_data = [
				'name' => $name,
				'email' => $email,
				'subject' => $subject,
				'message' => $message,
			];
			
			$id = $this->APIModel->contact($post_data);
			
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Request sent successfully. Will get back to you soon.'
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

	public function blogs() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$data = $this->APIModel->blogs();
		$response = [
			'status' => '1',
			'message'=> 'Posts retrieved successfully.',
			'data'=> $data,
		];
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function postdetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$blog_id = $formdata['id'];
			$data = $this->APIModel->postdetails($blog_id);
			$response =[
				'status' => '1',
				'message' => 'Post details retrived successfully.',
				'data' => $data,
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