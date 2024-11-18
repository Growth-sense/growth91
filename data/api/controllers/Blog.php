<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['APIModel']);
	}

	public function comment()
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
			$comment = $formdata['comment'];
			$website = $formdata['website'];
			$post_id=$formdata['id'];
			$post_date=date('d-m-Y');

			$post_data = [
				'name' => $name,
				'email' => $email,
				'comment' => $comment,
				'website' => $website,
                'post_date' => $post_date,
                'post_id' => $post_id,
			];
			$this->db->insert('comment_master',$post_data);
            $id= $this->db->insert_id();
			
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'Thanks to comment and give an precious time.'
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

	public function commentlist() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        $formdata = json_decode(file_get_contents('php://input'), true);
        if(!empty($formdata)) {
            $id=$formdata['id'];
            $sql="
                SELECT * FROM `comment_master` 
                WHERE post_id='$id'
                ORDER BY id DESC
            ";
            $query=$this->db->query($sql);
            $resp=$query->result(); 
            $response = [
                'status' => '1',
                'message'=> 'Comments feched successfully.',
                'data'=> $resp,
            ];
        } else {
            $response = [
                'status' => '0',
                'message'=> 'Please try again!',
            ];     
        }
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