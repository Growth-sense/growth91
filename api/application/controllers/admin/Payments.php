<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Payments extends CI_Controller {

	public function list() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		$sql="
			SELECT payments.paymentid, payments.investor_id,payments.deal_id, payments.payment_date, payments.payment_amount,payments.total_paid_amount,
			users.first_name, users.last_name,payments.description,startups.name,payments.payment_ref,
			payments.payment_status,payments.payment_type,payments.processing_fees,payments.wallet, deals.deal_name
			FROM `payments`
			LEFT JOIN users on users.investor_id=payments.investor_id
			LEFT JOIN deals ON deals.deal_id =  payments.deal_id
			LEFT JOIN startups on startups.startupid = deals.startup_id
			ORDER BY paymentid DESC
		";
		$query=$this->db->query($sql);
		$result=$query->result();

		if($result) {
			$response = [
				'status' => '1',
				'message' => 'Transaction list is fetched successfully.',
				'data' => $result,
			];
		}else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	//for getting onlin payments record
	function get_all_offline_payment_history(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$sql="
			SELECT OP.* FROM `offline_payment` AS OP
			LEFT JOIN `investments` AS I ON OP.investor_id = I.investor_id
			LEFT JOIN `payments` AS P ON OP.investor_id = P.investor_id
			WHERE OP.reference_id = I.payment_ref AND OP.reference_id = P.payment_ref AND P.payment_status = 'SUCCESS' AND I.payment_type = 'offline_payment'
			GROUP By OP.offline_payment_id
			ORDER BY OP.created_at DESC
		";

		$query=$this->db->query($sql);
		$result=$query->result();

		if($result) {
			$response = [
				'status' => '1',
				'message' => 'Offline Payment Transaction list is fetched successfully.',
				'data' => $result,
			];
		}else {
			$response =[
				'status' => '0',
				'message' => 'Please try again!'
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	function get_all_pending_offline_payment_history()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$sql = "
			SELECT OP.* FROM `offline_payment` AS OP
			LEFT JOIN `investments` AS I ON OP.investor_id = I.investor_id
			LEFT JOIN `payments` AS P ON OP.investor_id = P.investor_id
			WHERE OP.reference_id = I.payment_ref AND OP.reference_id = P.payment_ref AND P.payment_status = 'PENDING' AND I.payment_type = 'offline_payment'
			GROUP By OP.offline_payment_id
			ORDER BY OP.created_at DESC
		";

		$result = $this -> db -> query($sql) -> result(); 

		if($result)
		{
			$response = [
				"status" => "1",
				"message" => "Pending Offline Payment Transaction List Is Fetch Successfully",
				"data" => $result
			];
		}
		else
		{
			$response = [
				"status" => "0",
				"message" => "Please Try Again!"
			];
		}

		$this -> output
				-> set_content_type("application/json")
				-> set_output(json_encode($response));
	}

	function post_offline_payment_status_by_admin()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = $_POST;

		$response = [
			"status" => "0",
			"message" => "Please Provide ID"
		];

		if(isset($formdata["id"]))
		{
			$id = $formdata["id"];

			$offline_payment = $this -> db -> where("reference_id",$id) -> get("offline_payment") -> result_array();

			if(isset($offline_payment[0]["commitment_id"]) && $offline_payment[0]["commitment_id"] != 0)
			{
				$result = $this -> db -> where("id",$offline_payment[0]["commitment_id"]) -> update("investor_commitment",["commitment_satus" => "committed"]);
					
				if($result)
				{
					$result = $this -> db -> where("parent_id",$offline_payment[0]["commitment_id"]) -> update("investor_commitment",["commitment_satus" => "committed"]);

					if($result)
					{
						$sql = "
							UPDATE `investments` AS I, `payments` AS P
							SET I.payment_status = 'payment_success', P.payment_status = 'SUCCESS'
							WHERE I.payment_ref = P.payment_ref AND I.payment_ref = '$id' AND P.payment_ref = '$id'
						";

						$result = $this -> db -> query($sql);

						if($result)
						{
								$response = [
								"status" => "1",
								"message" => "Payment Status Update"
							];
						}
						else
						{
							$this -> db -> where("id",$offline_payment[0]["commitment_id"]) -> update("investor_commitment",["commitment_satus" => "In_commitment"]);

							$this -> db -> where("parent_id",$offline_payment[0]["commitment_id"]) -> update("investor_commitment",["commitment_satus" => "In_commitment"]);
						}
					}
					else
					{
						$this -> db -> where("id",$offline_payment[0]["commitment_id"]) -> update("investor_commitment",["commitment_satus" => "In_commitment"]);
					}
				}
			}

			$response = [
				"status" => "0",
				"message" => "Payment Update Failed!"
			];			
		}

		$this -> output
		-> set_content_type("application/json")
		-> set_output(json_encode($response));
	}

	//for getting onlin payments record
	function get_all_online_paid_document_by_admin(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$sql="SELECT buyed_documents.investor_id,users.first_name,users.middle_name,users.last_name,
		buyed_documents.created_at,buyed_documents.deal_id,deals.deal_name,startups.name,
		startups.startupid,buyed_documents.document_id,buyed_documents.order_amount,
		buyed_documents.order_Id,startupdocuments.docname,startupdocuments.document 
		FROM buyed_documents LEFT JOIN users ON users.investor_id=buyed_documents.investor_id 
		LEFT JOIN deals ON deals.deal_id=buyed_documents.deal_id LEFT JOIN startups 
		ON startups.startupid=deals.startup_id LEFT JOIN startupdocuments 
		ON startupdocuments.documentid=buyed_documents.document_id 
		WHERE buyed_documents.pay_status='SUCCESS' order by buyed_documents.created_at desc" ;
		$query=$this->db->query($sql);
		$result=$query->result();

		if($result) {
			$response = [
				'status' => '1',
				'message' => 'Document payment list is fetched successfully.',
				'data' => $result,
			];
		}else {
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