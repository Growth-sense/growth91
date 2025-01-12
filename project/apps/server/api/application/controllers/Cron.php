<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Cron extends CI_Controller {

	// CHECK FOR PAYMENT STATUS
	function check_for_payment_status(){
		$sql="SELECT * FROM payments WHERE payment_status='PENDING'";
		$query=$this->db->query($sql);
		$result=$query->result();
		echo '<pre>';

		for ($i=0; $i<count($result) ; $i++) { 
			// code...
			$item=$result[$i];
			$order_id=$item->payment_ref;
			$sql3 = "SELECT * FROM `cashfree_details` where `id`='1'";
			$query = $this->db->query($sql3);
			$cash_data =$query->result();
			$environment=$cash_data[0]->env;
			$client_id='';
			$client_secret='';
			$url='';
			if($environment=='prod'){
				$client_id=$cash_data[0]->prod_app_id;
				$client_secret=$cash_data[0]->prod_app_secret;
				$url='https://api.cashfree.com/pg/orders/'.$order_id.'/payments';
			} else{
				$client_id=$cash_data[0]->test_app_id;
				$client_secret=$cash_data[0]->test_app_secret;
				$url='https://sandbox.cashfree.com/pg/orders/'.$order_id.'/payments';
			}
			$curl = curl_init();
			curl_setopt_array($curl, array(
			  CURLOPT_URL => $url,
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => '',
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 0,
			  CURLOPT_FOLLOWLOCATION => true,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => 'GET',
			  CURLOPT_HTTPHEADER => array(
			    'accept: application/json',
			    'x-api-version: 2022-09-01',
			    'x-client-id: '.$client_id.'',
			    'x-client-secret: '.$client_secret.''
			  ),
			));
			$response = curl_exec($curl);
			curl_close($curl);
			echo $response;
			echo is_array($response)==true  ? 'Yes' :'No';
			if(!empty($response->code)){				
			} else if(is_array($response) && $response[0]->payment_status!='PENDING'){
				echo $response;	
				// echo $response[0]->payment_status;
			}else {
				// echo 'Error';
			}

		}
	}

}