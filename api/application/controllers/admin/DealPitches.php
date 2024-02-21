<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DealPitches extends CI_Controller {
	// DEAL LIST
    public function list() {
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$deal_id=$formdata['deal_id'];
			// var_dump($deal_id);
			// sql query
			$sql = "SELECT * FROM `deal_pitch_images` where deal_id='$deal_id'";
			$query=$this->db->query($sql);
			$list =$query->result();
			if($list) {
				$response = [
					'status' => '1',
					'message' => 'Deal pitch list is fetched successfully.',
					'data' => $list,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}else{
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
    }

    function add(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($_POST)) {
			$id=$this->input->post('deal_id');
			$pitch_order=$this->input->post('pitch_order');
			if($id) {
				if(isset($_FILES['pitch_files']['name']) && $_FILES['pitch_files']['name'] != "") {
		            $dir = FCPATH . "uploads/deal/pitch_images/" . $id ."/";
		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }
		            $image=$_FILES['pitch_files']['tmp_name'];
		            $temp=explode(".", $_FILES["pitch_files"]["name"]);
					$newfilename=round(microtime(true)) . '.' . end($temp);
		            $hash=$_FILES['pitch_files']['name'];
		            if(move_uploaded_file($image, $dir.$newfilename)) {
		                $image_details = array(
		                    "image" => $newfilename,
		                    'deal_id'=>$id,
		                    'pitch_order'=>$pitch_order,
		                );
		               	$d= $this->db->insert('deal_pitch_images', $image_details);
		               	if($d){
		               		$response = [
								'status' => '1',
								'message' => 'Image is added successfully.'
							];
		               	}else{
		               		$response = [
								'status' => '0',
								'message' => 'Something is went wrong. Please try again.'
							];	
		               	}
		            }
		        }
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
			$id = $formdata['pitch_id'];
			$this->db->where('id', $id);
			$res = $this->db->delete('deal_pitch_images');
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'Pitch image is deleted successfully.'
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

	function update(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($_POST)) {
			$pitch_id=$this->input->post('pitch_id');
			$id=$this->input->post('deal_id');
			$pitch_order=$this->input->post('pitch_order');
			if($id) {
				if(isset($_FILES['pitch_files']['name']) && $_FILES['pitch_files']['name'] != "") {
		            $dir = FCPATH . "uploads/deal/pitch_images/" . $id ."/";
		            if(!is_dir($dir)) {
		                @mkdir($dir, 0777,true);
		            }
		            $image = $_FILES['pitch_files']['tmp_name'];
		            $temp = explode(".", $_FILES["pitch_files"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);
		            $hash = $_FILES['pitch_files']['name'];
		            if(move_uploaded_file($image, $dir.$newfilename)){
		                $image_details = array(
		                    "image"=>$newfilename,
		                    "pitch_order"=>$pitch_order,
		                );
		                $this->db->where('id',$pitch_id);
		               	$d= $this->db->update('deal_pitch_images', $image_details);
		               	if($d){
		               		$response = [
								'status' => '1',
								'message' => 'Image is updated successfully.'
							];
		               	}else{
		               		$response = [
								'status' => '0',
								'message' => 'Something is went wrong. Please try again.'
							];	
		               	}
		            }
		        }else{
		        	$image_details = array(
	                    "pitch_order"=>$pitch_order,
	                );
	                $this->db->where('id',$pitch_id);
	               	$d= $this->db->update('deal_pitch_images', $image_details);
	               	if($d){
	               		$response = [
							'status' => '1',
							'message' => 'Image is updated successfully.'
						];
	               	}else{
	               		$response = [
							'status' => '0',
							'message' => 'Something is went wrong. Please try again.'
						];	
	               	}
		        }
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