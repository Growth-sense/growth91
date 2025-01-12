<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Blogcategory extends CI_Controller {

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
		$sql="SELECT * FROM blog_categories ORDER BY category_id DESC"; 
		$query=$this->db->query($sql);
		$list=$query->result();
		if(isset($list)) {
			$response = [
				'status' => '1',
				'message' => 'Blog category list is fetched successfully.',
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
		
		if(!empty($formdata)) {
			$name=$formdata['name'];
			$sql="SELECT * FROM blog_categories WHERE name='$name'"; 
			$query=$this->db->query($sql);
			$list=$query->result();
			$num_rows=$query->num_rows();
			if(intval($num_rows)>0){
				$response =[
					'status' => '0',
					'message' => 'Category is already present. Please try another one.'
				];	
			} else{
				$post_data = [
					'name'=>$name,
				];
				$this->db->insert('blog_categories',$post_data);
				$id = $this->db->insert_id();
				if($id) {
					$response = [
						'status' => '1',
						'message' => 'New category is added successfully.'
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Please try again!'
					];
				}
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
		$formdata = json_decode(file_get_contents('php://input'), true);
	
		if(!empty($formdata)) {
			$name=$formdata['name'];
			$category_id=$formdata['category_id'];
			$post_data = [
				'name'=>$name,
			];

			$this->db->where('category_id', $category_id);
			$res = $this->db->update('blog_categories', $post_data);
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Category is updated successfully.'
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
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {
			$category_id = $formdata['category_id'];
			$this->db->where('category_id',$category_id);
			$query=$this->db->delete('blog_categories');
			if($query) {
				$response = [
					'status' => '1',
					'message' => 'Category is deleted successfully.'
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