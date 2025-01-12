<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Documents extends CI_Controller {

	public function __construct() {
		parent::__construct();
	}

	// DEAL LIST
    public function list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$startupid=$formdata['startupid'];
			$sql = "SELECT * FROM `startupdocuments` where startupid='$startupid' ORDER BY documentid DESC";
			$query=$this->db->query($sql);
			$list =$query->result();
			
			if(isset($list)) {
				$response = [
					'status' => '1',
					'message' => 'Document list is fetched successfully.',
					'data' => $list,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
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

    // add new deal
	function add() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$startupid=$_POST['startupid'];
			$post_data = [
	            'docname' => $_POST['docname'],
	            'paid' => $_POST['paid'],
	            'startupid' => $_POST['startupid'],
	            'premium_price' => $_POST['premium_price'],
	            'regular_price' => $_POST['regular_price'],
			];
			
			$this->db->insert('startupdocuments', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {

				if( isset($_FILES['document']['name']) && $_FILES['document']['name'] != "" ) {
					$dir = "uploads/docs/".$id.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['document']['tmp_name'];
					$hash = $_FILES['document']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"document" => $hash
						);
						$this->db->where('documentid', $id);
						$this->db->update('startupdocuments', $image_details);
					}
					
				}
				$d=[
					'documentsid' => $id,
				];
				$this->db->where('startupid', $_POST['startupid']);
				$this->db->update('startups', $d);

				$response = [
					'status' => '1',
					'message' => 'Document is added successfully.',
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

	function edit() {

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($_POST)) {
			$documentid = $_POST['documentid'];
			$post_data = [
				'docname' => $_POST['docname'],
	            'paid' => $_POST['paid'],
	            'premium_price' => $_POST['premium_price'],
	            'regular_price' => $_POST['regular_price'],
			];
			
			$this->db->where('documentid', $documentid);
	        $res = $this->db->update('startupdocuments', $post_data);
	        
			if($res) {

				if( isset($_FILES['document']['name']) && $_FILES['document']['name'] != "" ) {
					$dir = "uploads/docs/".$documentid.'/';
		
					if(!is_dir($dir)) {
						@mkdir($dir, 0777,true);
					}
		
					$image = $_FILES['document']['tmp_name'];
					$hash = $_FILES['document']['name'];
		
					if(move_uploaded_file($image, $dir.$hash)) {
						 $image_details = array(
							"document" => $hash
						);
						$this->db->where('documentid', $documentid);
						$this->db->update('startupdocuments', $image_details);
					}
					
				}

				$response = [
					'status' => '1',
					'message' => 'Document details are updated successfully.'
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
		
		if(!empty($_POST)) {
			$documentid = $_POST['documentid'];
		
			$this->db->where('documentid', $documentid);
			$res = $this->db->delete('startupdocuments');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Document is deleted successfully.'
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