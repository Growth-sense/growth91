<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class DocSignWebhook extends CI_Controller {
	// vendor split function
	function webhook_response(){
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

			//geting webhook data and temporary storing into variable
            $resquestedDate1=$events['payload']['document']['updated_at']; //returning sign request date
			$resquestedby=$events['payload']['document']['sign_request_details']['identifier']; //returning sign request email
			$aggrementStatus=$events['payload']['document']['agreement_status']; //it shows the status either completed or something else;
			$aggrementdocid=$events['payload']['document']['id']; //final sign document id 

			//investor details
			$investor=$events['payload']['document']['signing_parties'][0]['identifier']; //investor email or mobile number
			$investSignType=$events['payload']['document']['signing_parties'][0]['signature_type']; //signature type like aadhaar or electronic
			// $investorSignDate=$events['payload']['document']['signing_parties'][0]['updated_at']; //date last sign status in current time stamp
			$investorName=$events['payload']['document']['signing_parties'][0]['name'];  //given name in growth91 application
			$investorAadhaarName=$events['payload']['document']['signing_parties'][0]['pki_signature_details']['name']; // actual  name given by aadhaar application
			// $investorSignStatus=$events['payload']['document']['signing_parties'][0]['status'];  //status of doc signing 
			// $investSignSt=($investorSignStatus=='signed')?'invester_sign_success':'pending';
			//for getting founder sign details
			$founder=$events['payload']['document']['signing_parties'][1]['identifier']; //founder email or mobile number
			$founderSignType=$events['payload']['document']['signing_parties'][1]['signature_type']; //signature type like aadhaar or electronic
			// $founderSignDate=$events['payload']['document']['signing_parties'][1]['updated_at']; //date last sign status in current time stamp
			$founderName=$events['payload']['document']['signing_parties'][1]['name'];     //given name in growth91 application
			$founderAadhaarName=$events['payload']['document']['signing_parties'][1]['pki_signature_details']['name']; // actual  name given by aadhaar application
			// $founderSignStatus=$events['payload']['document']['signing_parties'][1]['status']; //status of doc signing 
			// $fndrSignst=($founderSignStatus=='signed')?'fndr_sign_success':'pending';

			$founderSignEmail=$events['payload']['document']['others']['last_signed_by'];   //a person email or phone number which is sign the document at last time
			$allSign=$events['payload']['document']['others']['has_all_signed'];  //boolean value true or false

			//other details
			$createdAt=$events['created_at'];   //created at
			$id=$events['id'];    //uknown id
			$actionOrEvent=$events['event'];  //event doc.signed

		
			//for insert all semple data in temporary table
			$data1=[
				'data'=>json_encode($events)
			];
			$this->db->insert('doc_sign_webhook_data',$data1);
        	$id =  $this->db->insert_id();
			//end webhook code

			//dynamic environmnet code
			 //for digio document environment settings
			 $sql = "SELECT * FROM `digio_settings` where id='1'";
			 $query=$this->db->query($sql);
			 $list =$query->result();
			 $env=$list[0]->environment;
			 if($env=='prod'){
				 $user=$list[0]->prod_client_id;
				 $password=$list[0]->prod_client_secret;
				 $url=$list[0]->prod_url;
			 }else{
				 $user=$list[0]->test_client_id;
				 $password=$list[0]->test_client_secret;
				 $url=$list[0]->test_url;
			 }

			//get document details by document id using digio api code
			$curl = curl_init();
			curl_setopt_array($curl, array(
			CURLOPT_URL => $url.'v2/client/document/'.$aggrementdocid,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'GET',
			CURLOPT_HTTPHEADER => array(
				'Content-Type:application/json',
                'Authorization: Basic '. base64_encode($user.":".$password)
			),
			));
			$respd = json_decode(curl_exec($curl),true);
			curl_close($curl);
			//getting document details
			$investorSignDate=$respd['signing_parties'][0]['updated_at']; //date last sign status in current time stamp
			$investorSignStatus=$respd['signing_parties'][0]['status']; 
			$investSignSt=($investorSignStatus=='signed')?'Inv_sign_success':'pending';
			$founderSignDate=$respd['signing_parties'][1]['updated_at'];  //date last sign status in current time stamp
			$founderSignStatus=$respd['signing_parties'][1]['status'];  //status of doc signing  
			$fndrSignst=($founderSignStatus=='signed')?'fndr_sign_success':'pending';
			// $mainRes="$investorSignDate,$investSignSt,$founderSignDate,$fndrSignst";
			// if($id){
			// 	$this->load->helper('send_email');

			// 	$res=send_email($mainRes,"webbhook notice","yashamsoftware0722@gmail.com",'bhanupratap11698@gmail.com');
			// }

			// //for insert main status in investment table
			$data=[
                'founder_document_sign_status'=>$fndrSignst,
				'founder_document_sign_status_date'=>$founderSignDate,
				'investor_document_sign_status'=>$investSignSt,
				'investor_document_sign_status_date'=>$investorSignDate
                
            ];
			if($aggrementdocid){
				$this->db->where('document_signed_id',$aggrementdocid);
                $this->db->update('investments',$data);
			}
			
			
          
		}		
		
	}
}