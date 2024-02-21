<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Community extends CI_Controller {

    public function setsignindata() {

    	error_reporting(E_ALL);
    	ini_set('display_errors', 1);

        header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		var_dump($_POST);
		var_dump($formdata);
		if(!empty($formdata)) {

			$investor_email = $formdata['investor_email'];
			$investor_id = $formdata['investor_id'];
			
			if($investor_id) {

				$this->session->setuserdata('mysession', $investor_email),
				$this->session->setuserdata('user_id', $investor_id),

				$response = [
					'status' => '1',
					'message' => 'Done successfully',
					'data' => $id,
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