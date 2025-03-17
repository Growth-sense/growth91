<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['admin/Adminmodel']);
	}

    public function signin() {
        header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {

			$username = $formdata['username'];
			$password = md5($formdata['password']);
			
			$result = $this->Adminmodel->signin($username,$password);
			if ($result['status']) {
				// Successful login
				// Set session/return success response
				$response = array(
					'status' => '1',
					'message' => $result['message'],
					'data' => $result['data']
				);
			} else {
				// Failed login
				$response = array(
					'status' => '0',
					'message' => $result['message']
				);
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