<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Deal extends CI_Controller {

	public function pitch_list() {
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

    function get_document_list() {
    	
    	header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$deal_id=$formdata['deal_id'];
		
			$sql = "
				SELECT deals.deal_id,startupdocuments.documentid,startupdocuments.docname,startupdocuments.paid,startupdocuments.regular_price,
				startupdocuments.premium_price,startupdocuments.document,startupdocuments.startupid
				,deals.page_link FROM `deals`
				left JOIN startups on startups.startupid=deals.startup_id
				LEFT JOIN startupdocuments on startupdocuments.startupid=startups.startupid
				WHERE deals.deal_id='$deal_id'
			";
			$query=$this->db->query($sql);
			$list =$query->result();
			if($list) {
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
    // get purchased document list
    function get_document_purchased_list(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$deal_id=$formdata['deal_id'];
			$investor_id=$formdata['investor_id'];
			$sql = "
				SELECT * FROM `buyed_documents`
				WHERE deal_id='$deal_id' and investor_id='$investor_id'
			";
			$query=$this->db->query($sql);
			$list =$query->result();
			$num_rows=$query->num_rows();
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

    // get purchased document list
    function get_document_purchased_list_admin(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$deal_id=$formdata['deal_id'];
			$investor_id=$formdata['investor_id'];
			$sql = "
				SELECT buyed_documents.id,buyed_documents.investor_id,buyed_documents.document_id,buyed_documents.deal_id,
				buyed_documents.order_Id,buyed_documents.pay_status,buyed_documents.order_amount,buyed_documents.payment_mode,buyed_documents.created_at,users.membership_type,
				users.first_name,users.last_name FROM `buyed_documents`
				LEFT JOIN users on users.investor_id=buyed_documents.investor_id
				WHERE buyed_documents.deal_id='$deal_id' and buyed_documents.investor_id='$investor_id';
			";
			$query=$this->db->query($sql);
			$list =$query->result();
			$num_rows=$query->num_rows();
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


}