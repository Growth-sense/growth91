<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Founders extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
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
		$sql = "SELECT * FROM `users` WHERE user_type='founder' ORDER BY investor_id DESC";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Founder list is fetched successfully.',
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

    // add new deal
	function add() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			
			$post_data = [
	            'first_name' => $formdata['first_name'],
	            'last_name' => $formdata['last_name'],
	            'mobile' => $formdata['mobile'],
	            'email' => $formdata['email'],
	            'startup_name' => $formdata['startup_name'],
	            'nationality' => $formdata['nationality'],
	            'date_of_birth' => $formdata['dob'],
	            'legal_name' => $formdata['legal_name'],
	            'fathers_name' => $formdata['father_name'],
	            'address' => $formdata['address'],
	            'bank_ac_no' => $formdata['bank_ac_no'],
	            'ifsc_code'=> $formdata['ifsc_code'],
	            'user_type' => 'founder',
	            'user_registered_dt' => date('Y-m-d H:i:s a'),
			];
			
			$this->db->insert('users', $post_data);
        	$id =  $this->db->insert_id();
			
			if($id) {
				$response = [
					'status' => '1',
					'message' => 'New founder is added successfully.',
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
		
		if(!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$post_data = [
				'first_name' => $formdata['first_name'],
	            'last_name' => $formdata['last_name'],
	            'mobile' => $formdata['mobile'],
	            'email' => $formdata['email'],
				'startup_name' => $formdata['startup_name'],
	            'nationality' => $formdata['nationality'],
	            'date_of_birth' => $formdata['dob'],
	            'legal_name' => $formdata['legal_name'],
	            'fathers_name' => $formdata['father_name'],
	            'address' => $formdata['address'],
	            'bank_ac_no' => $formdata['bank_ac_no'],
	            'ifsc_code'=> $formdata['ifsc_code'],
			];
			
			$this->db->where('investor_id', $founder_id);
	        $res = $this->db->update('users', $post_data);
	        
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Founder details are updated successfully.'
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

	function updatestatus() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$id = $formdata['id'];
		
			$post_data = [
				'deal_status'=> $formdata['dealstatus'],
	            'user_status'=> $formdata['approvestatus'],
			];
			
			$this->db->where('deal_id', $id);
	        $this->db->update('deals', $post_data);
	        $affected_rows= $this->db->affected_rows();
			
			if($affected_rows) {
				$response = [
					'status' => '1',
					'message' => 'Deal status is updated successfully.'
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

	function uploaddealimg(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($_POST)) {
			$id=$this->input->post('deal_id');
			if($id) {
				// logo
				if( isset($_FILES['logo']['name']) && $_FILES['logo']['name'] != "") {
		            $dir = FCPATH . "uploads/deal/logo/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['logo']['tmp_name'];
		            $temp = explode(".", $_FILES["logo"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['logo']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "logo" => $newfilename,
		                );
		                $this->db->where('deal_id', $id);
		                $this->db->update('deals', $image_details);
		            }
		        }
		        // banner
		        if( isset($_FILES['banner']['name']) && $_FILES['banner']['name'] != "") {
		            $dir = FCPATH . "uploads/deal/banner/" . $id ."/";

		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }

		            $image = $_FILES['banner']['tmp_name'];
		            $temp = explode(".", $_FILES["banner"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

		            $hash = $_FILES['banner']['name'];

		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "banner_img" => $newfilename,
		                );
		                $this->db->where('deal_id', $id);
		                $this->db->update('deals', $image_details);
		            }
		        }

				$response = [
					'status' => '1',
					'message' => 'Image is uploaded successfully.'
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
			$id = $formdata['founder_id'];
		
			$this->db->where('investor_id', $id);
			$res = $this->db->delete('users');
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Founder is deleted successfully.'
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


	// DEAL LIST
    public function admin_get_founder_form_details() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `founders` 
			LEFT JOIN users on users.investor_id=founders.main_founder_id
			ORDER BY founder_id DESC";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Founder details is fetched successfully.',
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
   


}