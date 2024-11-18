<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blog extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
	}

    public function list() {
    	 header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$list = $this->Blogmodel->list();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Blog list is fetched successfully.',
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

	function add() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			
			$post_data = [
				'title'=>$this->input->post('title'),
				'description'=>$this->input->post('description'),
				'type'=>$this->input->post('type'),
				'tags'=>$this->input->post('tags'),
			];
			
			$id = $this->Blogmodel->addpost($post_data);
			
			
			if($id) {

				

				if(isset($_FILES['filename']['name']) && $_FILES['filename']['name'] != "" ) {
					$dir =  FRONTEND_PATH."api/uploads/blog/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['filename']['tmp_name'];
					$hash = $_FILES['filename']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"filename" => $hash
						);
						$this->db->where('id', $id);
						$this->db->update('blog_post_master', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'New post is added successfully.'
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

	function edit() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// $formdata = json_decode(file_get_contents('php://input'), true);
			
		if(!empty($_POST)) {
			$id = $this->input->post('id');
		
			$post_data = [
				'title'=>$this->input->post('title'),
				'description'=>$this->input->post('description'),
				'type'=>$this->input->post('type'),
				'tags'=>$this->input->post('tags'),
			];
			
			$data = $this->Blogmodel->updatepost($id,$post_data);
		
			
			if($data) {

				if( isset($_FILES['filename']['name']) && $_FILES['filename']['name'] != "" ) {
					$dir = FRONTEND_PATH."api/uploads/blog/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['filename']['tmp_name'];
					$hash = $_FILES['filename']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
							$image_details = array(
							"filename" => $hash
						);
						$this->db->where('id', $id);
						$this->db->update('blog_post_master', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'Post is updated successfully.'
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

	function delete() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		
		
		if(!empty($_POST)) {
			$id = $this->input->post('id');
		
			$post_data = [
				'deleted_at'=>$this->input->post('title'),
			];
			
			$data = $this->Blogmodel->updatepost($id,$post_data);
			
			if($data) {
				$response = [
					'status' => '1',
					'message' => 'Post is deleted successfully.'
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