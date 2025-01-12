<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Msg extends CI_Controller {
	function transaction_success(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {
			$order_id=$formdata['order_id'];
			$sql="SELECT * FROM `investments`
			LEFT JOIN deals on deals.deal_id=investments.deal_id 
			WHERE investments.payment_ref='$order_id'";
			$query=$this->db->query($sql);
			$result=$query->result();
			if(isset($result)){
				$vendor_status=$result[0]->vendor_split_status;
				$vendor_id=$result[0]->vendor_id;
				// sleep(120);
				// exit();
				// if($vendor_status!='success'){
					$curl = curl_init();
					curl_setopt_array($curl, array(
					  CURLOPT_URL => 'https://api.cashfree.com/api/v2/easy-split/orders/'.$order_id.'/split',
					  CURLOPT_RETURNTRANSFER => true,
					  CURLOPT_ENCODING => '',
					  CURLOPT_MAXREDIRS => 10,
					  CURLOPT_TIMEOUT => 0,
					  CURLOPT_FOLLOWLOCATION => true,
					  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
					  CURLOPT_CUSTOMREQUEST => 'POST',
					  CURLOPT_POSTFIELDS =>'{
					    "split": [
					        {
					            "vendorId": "'.strval($vendor_id).'",
					            "amount": null,
					            "percentage": 100
					        }
					    ],
					    "splitType": "ORDER_AMOUNT"
					}',
					  CURLOPT_HTTPHEADER => array(
					    'X-Client-Id: 240429732f7516a654227081e7924042',
					    'X-Client-Secret: a46de13a568b327521537f0cc9b4de8873665026',
					    'Content-Type: application/json'
					  ),
					));
					$response = curl_exec($curl);
					curl_close($curl);
					//$sql="UPDATE `investments` set vendor_split_status='success' WHERE payment_ref='$order_id'";
					//$query=$this->db->query($sql);
				// }
			}
		}else{

		}
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
}