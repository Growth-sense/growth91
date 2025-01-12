<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Webhook extends CI_Controller {
	// vendor split function
	function vendor_split(){
		// get response data
		$data = file_get_contents("php://input");
		$events = json_decode($data, true);
		if(!empty($events)){
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Allow-Headers: access");
			header("Content-Type: application/json; charset=UTF-8");
			header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
				// $order_id='1667463525_14_6_0_0___1';
				$order_id = $events['data']['order']['order_id'];
				
				$sql="SELECT * FROM `investments`
				LEFT JOIN deals on deals.deal_id=investments.deal_id 
				WHERE investments.payment_ref LIKE '$order_id%'";
				$query=$this->db->query($sql);
				$result=$query->result();								
				if(isset($result)){

					$vendor_status=$result[0]->vendor_split_status;
					$vendor_id=$result[0]->vendor_id;
					// echo $order_id=$result[0]->payment_ref;
					
						$prod_url='https://api.cashfree.com/api/v2/easy-split/orders/'.$order_id.'/split';
						$testd_url='https://test.cashfree.com/api/v2/easy-split/orders/'.$order_id.'/split';

						$client_id='1752697da8998afc47f79979e9962571';
						$client_secret='eff50fe08b011e306633afac01581736de9ad639';	
						$curl = curl_init();
						curl_setopt_array($curl, array(
						  CURLOPT_URL => 'https://test.cashfree.com/api/v2/easy-split/orders/'.$order_id.'/split',
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
						            "vendorId": "'.$vendor_id.'",
						            "amount": 0,
						            "percentage": 100
						        }
						    ],
						    "splitType": "ORDER_AMOUNT"
						}',
						  CURLOPT_HTTPHEADER => array(
						    'X-Client-Id: '.$client_id.'',
						    'X-Client-Secret: '.$client_secret.'',
						    'Content-Type: application/json'
						  ),
						));

						$response = curl_exec($curl);
						curl_close($curl);
						echo $response;
						if($response){
							$post_data=[
								'data'=>json_encode($response),
								'type' => json_encode($events)
							];
							$this->db->insert('test', $post_data);
						}
						// if($events && $events['data']){
						// 	$post_data=[
						// 		'data'=>json_encode($events),
						// 	];
						// 	$this->db->insert('test', $post_data);
						// }
				}
		}		
		
	}
}