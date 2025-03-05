<?php

defined("BASEPATH") OR exit("No direct script access allowed");

class InvestorCommitment extends CI_Controller
{
	public function save_investor_interest_deal()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$commitment["deal_id"] = $this -> input -> post("deal_id");
		$commitment["investor_id"] = $this -> input -> post("investor_id");
		$commitment["created_at"] = date("Y-m-d H:i:s");

		if(empty($commitment["deal_id"]) || empty($commitment["investor_id"]))
		{
			$response = [
				'status' => '0',
				'message' => 'All Field Data Required'
			];
		}
		else
		{
			$this -> db -> insert("deals_interested_log",$commitment);
			$status = $this -> db -> insert_id();

			if($status) {
				$response = [
					'status' => '1',
					'message' => 'Interested Log Saved successfully.',
					'data' => $status,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Interested Log Saved Failed, Please try again!'
				];
			}
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}

	public function save_investor_commitment()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$delete_log["interested_id"] = $this -> input -> post("interested_id");

		$commitment["deal_id"] = $this -> input -> post("deal_id");
		$commitment["investor_id"] = $this -> input -> post("investor_id");
		$commitment["amount"] = $this -> input -> post("amount");
		$commitment["processingfees"] = $this -> input -> post("processingfees");
		$commitment["totalamount"] = $this -> input -> post("totalamount");
		$commitment["deduct"] = $this -> input -> post("deduct");
		$commitment["agree"] = $this -> input -> post("agree");
		$commitment["order_token"] = $this -> input -> post("order_token");
		$commitment["tdsstatus"] = $this -> input -> post("tdsstatus");
		$commitment["gst"] = $this -> input -> post("gst");
		$commitment["gstvalue"] = $this -> input -> post("gstvalue");
		$commitment["igst"] = $this -> input -> post("igst");
		$commitment["igstvalue"] = $this -> input -> post("igstvalue");
		$commitment["cgst"] = $this -> input -> post("cgst");
		$commitment["cgstvalue"] = $this -> input -> post("cgstvalue");
		$commitment["sgst"] = $this -> input -> post("sgst");
		$commitment["sgstvalue"] = $this -> input -> post("sgstvalue");
		$commitment["legalfee"] = $this -> input -> post("legalfee");
		$commitment["walletDeductionMoney"] = $this -> input -> post("walletDeductionMoney");
		$commitment["created_at"] = date("Y-m-d H:i:s");

		if(empty($commitment["totalamount"]) || empty($commitment["deal_id"]) || empty($commitment["investor_id"]) || empty($commitment["amount"]) || empty($commitment["processingfees"]) || empty($delete_log["interested_id"]))
		{
		 	$response = [
		 		'status' => '0',
		 		'message' => 'All Field Data Required'
		 	];
		}
		else
		{

			$investor_details = $this -> db -> where("investor_id",$commitment["investor_id"]) -> get("users") -> result_array(); 
			$deal_details = $this -> db -> select("deals.*,startups.name") -> from("deals") -> join("startups","startups.startupid = deals.startup_id","left") -> where("deals.deal_id",$commitment["deal_id"]) -> get() -> result_array();

			$this->load->helper('send_email');
			$body='';		

			$already_committed = $this -> db -> where("deal_id",$commitment["deal_id"]) -> where("investor_id",$commitment["investor_id"]) -> where("parent_id",0) -> order_by("id","ASC") -> get("investor_commitment") -> result_array();
		
			if(count($already_committed) > 0)
			{
				$total["totalamount"] =	$already_committed[0]["totalamount"] + $commitment["totalamount"];	
				$total["amount"] =	$already_committed[0]["amount"] + $commitment["amount"];	
				$total["processingfees"] =	$already_committed[0]["processingfees"] + $commitment["processingfees"];

				$total["igst"] =	$already_committed[0]["igst"] + $commitment["igst"];
				$total["igstvalue"] =	$already_committed[0]["igstvalue"] + $commitment["igstvalue"];
				$total["cgst"] =	$already_committed[0]["cgst"] + $commitment["cgst"];
				$total["cgstvalue"] =	$already_committed[0]["cgstvalue"] + $commitment["cgstvalue"];
				$total["sgst"] =	$already_committed[0]["sgst"] + $commitment["sgst"];
				$total["sgstvalue"] =	$already_committed[0]["sgstvalue"] + $commitment["sgstvalue"];
				
				$this -> db -> where("deal_id",$commitment["deal_id"]) -> where("investor_id",$commitment["investor_id"]) -> where("parent_id",0)  -> update("investor_commitment",$total);
				
				$child_commitment["parent_id"] = $already_committed[0]["id"];
				$child_commitment["deal_id"] = $commitment["deal_id"];
				$child_commitment["investor_id"] = $commitment["investor_id"];
				$child_commitment["amount"] = $commitment["amount"];
				$child_commitment["processingfees"] = $commitment["processingfees"];
				$child_commitment["totalamount"] = $commitment["totalamount"];
				$child_commitment["created_at"] = date("Y-m-d H:i:s");

				$child_commitment["igst"] = $commitment["igst"];
				$child_commitment["igstvalue"] = $commitment["igstvalue"];
				$child_commitment["cgst"] = $commitment["cgst"];
				$child_commitment["cgstvalue"] = $commitment["cgstvalue"];
				$child_commitment["sgst"] = $commitment["sgst"];
				$child_commitment["sgstvalue"] = $commitment["sgstvalue"];

				$status = $this -> db -> insert("investor_commitment",$child_commitment);

				if($status) {

					// mail refernece : 033
			          $body='<!doctype html>
					      <html>
					              <head>
					                <meta name="viewport" content="width=device-width, initial-scale=1.0">
					                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					                <title> Deal Payment Success</title>
					                <style>
					            @media only screen and (max-width: 620px) {
					              table.body h1 {
					                font-size: 28px !important;
					                margin-bottom: 10px !important;
					              }
					            
					              table.body p,
					            table.body ul,
					            table.body ol,
					            table.body td,
					            table.body span,
					            table.body a {
					                font-size: 16px !important;
					              }
					            
					              table.body .wrapper,
					            table.body .article {
					                padding: 10px !important;
					              }
					            
					              table.body .content {
					                padding: 0 !important;
					              }
					            
					              table.body .container {
					                padding: 0 !important;
					                width: 100% !important;
					              }
					            
					              table.body .main {
					                border-left-width: 0 !important;
					                border-radius: 0 !important;
					                border-right-width: 0 !important;
					              }
					            
					              table.body .btn table {
					                width: 100% !important;
					              }
					            
					              table.body .btn a {
					                width: 100% !important;
					              }
					            
					              table.body .img-responsive {
					                height: auto !important;
					                max-width: 100% !important;
					                width: auto !important;
					              }
					            }
					            @media all {
					              .ExternalClass {
					                width: 100%;
					              }
					            
					              .ExternalClass,
					            .ExternalClass p,
					            .ExternalClass span,
					            .ExternalClass font,
					            .ExternalClass td,
					            .ExternalClass div {
					                line-height: 100%;
					              }
					            
					              .apple-link a {
					                color: inherit !important;
					                font-family: inherit !important;
					                font-size: inherit !important;
					                font-weight: inherit !important;
					                line-height: inherit !important;
					                text-decoration: none !important;
					              }
					            
					              #MessageViewBody a {
					                color: inherit;
					                text-decoration: none;
					                font-size: inherit;
					                font-family: inherit;
					                font-weight: inherit;
					                line-height: inherit;
					              }
					            
					              .btn-primary table td:hover {
					                background-color: #34495e !important;
					              }
					            
					              .btn-primary a:hover {
					                background-color: #34495e !important;
					                border-color: #34495e !important;
					              }
					            }
					            </style>
					              </head>
					              <body style="color: black !important; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
					                  <tr>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
					                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
					            
					                        <!-- START CENTERED WHITE CONTAINER -->
					                        <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
					            
					                          <!-- START MAIN CONTENT AREA -->
					                          <tr>
					                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
					                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                                <tr>
					                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
					                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
					                                      <tbody>
					                                        <tr>
					                                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
					                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
					                                              
					                                            </table>
					                                          </td>
					                                        </tr>
					                                      </tbody>
					                                    </table>
					                                    <div">
					                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$investor_details[0]["first_name"].'</strong>, 
					                                        <br>
					                                        <br>
					                                        Your commitment in '.$deal_details[0]["deal_name"].' on Growth91 has been received for Rs. '.$commitment["amount"].' on '.date("d/m/Y").'
					                                        <br>
					                                      <br>
					                                      Total Amount Committed in '.$deal_details[0]["deal_name"].': Rs.'.$total["amount"].'
					                                       <br>
					                                       
                                                          Total convenience fee: Rs '.($total["processingfees"] + $total["igstvalue"] + $total["cgstvalue"] + $total["sgstvalue"]).'
                                                          <br>
					                                      <br>
                                                          Your commitment history can be found here: <a href='.WEB_BASE_URL.'investor-commitment>History</a>
                                                            <br>
					                                      <br>
					                                      
					                                     Payment link will be enabled on your dashboard once the deal is completed and your investment is approved. Please note that this is a hard commitment and you will be required to process the payment upon deal completion.

                                                           
					                                     '.
					                                    ($investor_details[0]["kycstatus"]=="Pending" ? "<br> <br> Please complete your KYC in the meantime. Complete your KYC here : 
					                                      <a href='".WEB_BASE_URL."kyc-instructions'>here</a>."
					                                       : "")
					                                    .'
                        					              <br><br>
                        					              View your dashboard here : <a href='.WEB_BASE_URL.'investor-dashboard> Dashboard </a>
					                                      
					                                        
					                                      <br>
					                                      <br>
					                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
														  <br>
                                                        	<br>
                                                        <small>Convenience Fee of 2% on the investment amount at the time of
															investment and 2% on the sale proceeds at the time of exit is applicable.
															For any specific investment, if fee is different, it will be mentioned at the
															time of commitment (GST if any, shall be added at applicable rates).</small>
					                                      <br>
					                                      <br>
					                                    </br>
					                                    Thank you,
					                                    <br>
					                                    Growth91 Team <br><br>
					                                    PS: This is an automated email. Please do not reply.
					                                    
					                                    <br>
					                                    <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
					                                      <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
					                                    </div>
					                                  </td>
					                                </tr>
					                              </table>
					                            </td>
					                          </tr>
					            
					                        <!-- END MAIN CONTENT AREA -->
					                        </table>
					                        <!-- END CENTERED WHITE CONTAINER -->
					            
					                        <!-- START FOOTER -->
					                        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
					                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                            <tr>
					                              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
					                              </td>
					                            </tr>
					                            <tr>
					                              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
					                              </td>
					                            </tr>
					                          </table>
					                        </div>
					                        <!-- END FOOTER -->
					            
					                      </div>
					                    </td>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                  </tr>
					                </table>
					              </body>
					      </html>';  

			          	$subject="Commitment of Rs. ".$commitment["amount"]." received for ".$deal_details[0]["deal_name"];
				        $cc='contact@growth91.com';
				        send_email($body,$subject,$investor_details[0]["email"],$cc);

					$response = [
						'status' => '1',
						'message' => 'Investor Child Committment saved successfully.',
						'data' => $status,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Investor Child Committment Saved Failed, Please try again!'
					];
				}
			}
			else
			{
				$parent_commitment["amount"] = $commitment["amount"];
				$parent_commitment["processingfees"] = $commitment["processingfees"];
				$parent_commitment["deal_id"] = $commitment["deal_id"];
				$parent_commitment["investor_id"] = $commitment["investor_id"];
				$parent_commitment["totalamount"] = $commitment["totalamount"];
				$parent_commitment["deduct"] = $commitment["deduct"];
				$parent_commitment["agree"] = $commitment["agree"];
				$parent_commitment["order_token"] = $commitment["order_token"];
				$parent_commitment["tdsstatus"] = $commitment["tdsstatus"];
				$parent_commitment["gst"] = $commitment["gst"];
				$parent_commitment["legalfee"] = $commitment["legalfee"];
				$parent_commitment["walletDeductionMoney"] = $commitment["walletDeductionMoney"];
				$parent_commitment["created_at"] = date("Y-m-d H:i:s");

				$parent_commitment["igst"] = $commitment["igst"];
				$parent_commitment["igstvalue"] = $commitment["igstvalue"];
				$parent_commitment["cgst"] = $commitment["cgst"];
				$parent_commitment["cgstvalue"] = $commitment["cgstvalue"];
				$parent_commitment["sgst"] = $commitment["sgst"];
				$parent_commitment["sgstvalue"] = $commitment["sgstvalue"];

				
				$status = $this -> db -> insert("investor_commitment",$parent_commitment);
				$parent_committ_id = $this -> db -> insert_id();

				if($status) {
					
					$child_commitment["parent_id"] = $parent_committ_id;
					$child_commitment["deal_id"] = $commitment["deal_id"];
					$child_commitment["investor_id"] = $commitment["investor_id"];
					$child_commitment["amount"] = $commitment["amount"];
					$child_commitment["processingfees"] = $commitment["processingfees"];
					$child_commitment["totalamount"] = $commitment["totalamount"];
					$child_commitment["created_at"] = date("Y-m-d H:i:s");

					$child_commitment["igst"] = $commitment["igst"];
					$child_commitment["igstvalue"] = $commitment["igstvalue"];
					$child_commitment["cgst"] = $commitment["cgst"];
					$child_commitment["cgstvalue"] = $commitment["cgstvalue"];
					$child_commitment["sgst"] = $commitment["sgst"];
					$child_commitment["sgstvalue"] = $commitment["sgstvalue"];
					
					$this -> db -> insert("investor_commitment",$child_commitment);
// echo"<pre>";print_r($deal_details);exit();
					
				
					// mail refernece : 033
			          $body='<!doctype html>
					      <html>
					              <head>
					                <meta name="viewport" content="width=device-width, initial-scale=1.0">
					                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
					                <title> Deal Payment Success</title>
					                <style>
					            @media only screen and (max-width: 620px) {
					              table.body h1 {
					                font-size: 28px !important;
					                margin-bottom: 10px !important;
					              }
					            
					              table.body p,
					            table.body ul,
					            table.body ol,
					            table.body td,
					            table.body span,
					            table.body a {
					                font-size: 16px !important;
					              }
					            
					              table.body .wrapper,
					            table.body .article {
					                padding: 10px !important;
					              }
					            
					              table.body .content {
					                padding: 0 !important;
					              }
					            
					              table.body .container {
					                padding: 0 !important;
					                width: 100% !important;
					              }
					            
					              table.body .main {
					                border-left-width: 0 !important;
					                border-radius: 0 !important;
					                border-right-width: 0 !important;
					              }
					            
					              table.body .btn table {
					                width: 100% !important;
					              }
					            
					              table.body .btn a {
					                width: 100% !important;
					              }
					            
					              table.body .img-responsive {
					                height: auto !important;
					                max-width: 100% !important;
					                width: auto !important;
					              }
					            }
					            @media all {
					              .ExternalClass {
					                width: 100%;
					              }
					            
					              .ExternalClass,
					            .ExternalClass p,
					            .ExternalClass span,
					            .ExternalClass font,
					            .ExternalClass td,
					            .ExternalClass div {
					                line-height: 100%;
					              }
					            
					              .apple-link a {
					                color: inherit !important;
					                font-family: inherit !important;
					                font-size: inherit !important;
					                font-weight: inherit !important;
					                line-height: inherit !important;
					                text-decoration: none !important;
					              }
					            
					              #MessageViewBody a {
					                color: inherit;
					                text-decoration: none;
					                font-size: inherit;
					                font-family: inherit;
					                font-weight: inherit;
					                line-height: inherit;
					              }
					            
					              .btn-primary table td:hover {
					                background-color: #34495e !important;
					              }
					            
					              .btn-primary a:hover {
					                background-color: #34495e !important;
					                border-color: #34495e !important;
					              }
					            }
					            </style>
					              </head>
					              <body style="color: black !important; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
					                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
					                  <tr>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
					                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
					            
					                        <!-- START CENTERED WHITE CONTAINER -->
					                        <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
					            
					                          <!-- START MAIN CONTENT AREA -->
					                          <tr>
					                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
					                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                                <tr>
					                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
					                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
					                                      <tbody>
					                                        <tr>
					                                          <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
					                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
					                                              
					                                            </table>
					                                          </td>
					                                        </tr>
					                                      </tbody>
					                                    </table>
					                                    <div">
					                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$investor_details[0]["first_name"].'</strong>, 
					                                        <br>
					                                        <br>
					                                        Your commitment in '.$deal_details[0]["deal_name"].' on Growth91 has been received for Rs. '.$commitment["amount"].' on '.date("d/m/Y").'.
					                                        <br>
					                                      <br>
					                                      Total Amount Committed in '.$deal_details[0]["deal_name"].': Rs.'.$commitment["amount"].'
					                                       <br>
					                                       
                                                          Total convenience fee: Rs '.($commitment["processingfees"] + $commitment["igstvalue"] + $commitment["cgstvalue"] + $commitment["sgstvalue"]).'
                                                          <br>
					                                      <br>
                                                          Your commitment history can be found here: <a href='.WEB_BASE_URL.'investor-commitment>History</a>
                                                            <br>
					                                      <br>
					                                      
					                                     Payment link will be enabled on your dashboard once the deal is completed and your investment is approved. Please note that this is a hard commitment and you will be required to process the payment upon deal completion.
                                                           
					                                     '.
					                                    ($investor_details[0]["kycstatus"]=="Pending" ? "<br> <br> Please complete your KYC in the meantime. Complete your KYC here : 
					                                      <a href='".WEB_BASE_URL."kyc-instructions'>here</a>."
					                                       : "")
					                                    .'
                        					              <br><br>
                        					              View your dashboard here : <a href='.WEB_BASE_URL.'investor-dashboard> Dashboard </a>
					                                      
					                                        
					                                      <br>
					                                      <br>
					                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
														   <br>
                                                        	<br>
                                                        <small>Convenience Fee of 2% on the investment amount at the time of
															investment and 2% on the sale proceeds at the time of exit is applicable.
															For any specific investment, if fee is different, it will be mentioned at the
															time of commitment (GST if any, shall be added at applicable rates).</small>
					                                      <br>
					                                      <br>
					                                    </br>
					                                    Thank you,
					                                    <br>
					                                    Growth91 Team <br><br>
					                                    PS: This is an automated email. Please do not reply.
					                                    
					                                    <br>
					                                    <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
					                                      <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
					                                    </div>
					                                  </td>
					                                </tr>
					                              </table>
					                            </td>
					                          </tr>
					            
					                        <!-- END MAIN CONTENT AREA -->
					                        </table>
					                        <!-- END CENTERED WHITE CONTAINER -->
					            
					                        <!-- START FOOTER -->
					                        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
					                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
					                            <tr>
					                              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
					                              </td>
					                            </tr>
					                            <tr>
					                              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
					                                Powered by <a href="'.WEB_BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
					                              </td>
					                            </tr>
					                          </table>
					                        </div>
					                        <!-- END FOOTER -->
					            
					                      </div>
					                    </td>
					                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
					                  </tr>
					                </table>
					              </body>
					      </html>';  

			          	$subject="Commitment of Rs. ".$commitment["amount"]." received for ".$deal_details[0]["deal_name"];
				        $cc='contact@growth91.com';
				        send_email($body,$subject,$investor_details[0]["email"],$cc);
					
					$response = [
						'status' => '1',
						'message' => 'Investor Committment saved successfully.',
						'data' => $status,
					];
				} else {
					$response =[
						'status' => '0',
						'message' => 'Investor Committment Saved Failed, Please try again!'
					];
				}
			}	
		}

		$this -> db -> where("id",$delete_log["interested_id"]) -> delete("deals_interested_log");

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	public function display_investor_commitment()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$investor_id = $this -> input -> get("investor_id");

		if(empty($investor_id))
		{
			$response = [
				'status' => '0',
				'message' => 'Investor Id Required'
			];
		}
		else
		{
			$this -> db -> select("deals.escrow_account_bank,deals.escrow_account_branch,deals.escrow_account_name,offline_payment.offline_payment_id,deals.deal_status,deals.escrowact,deals.escrow_account_ifsc,deals.startup_id,deals.deal_name,investor_commitment.*,deals.page_link,deals.accept_payment,users.first_name,users.last_name,users.kycstatus");
			// $this -> db -> select("SUM(investor_commitment.amount) as total_amount");
			// $this -> db -> select("SUM(investor_commitment.processingfees) as total_fee");
			$this -> db -> from("investor_commitment");
			$this -> db -> join("deals","deals.deal_id = investor_commitment.deal_id","left");
			$this -> db -> join("users","users.investor_id = investor_commitment.investor_id","left");
			$this -> db -> join("offline_payment","offline_payment.commitment_id = investor_commitment.id","left");
			$this -> db -> where("investor_commitment.investor_id",$investor_id);
			$this -> db -> where("investor_commitment.commitment_satus","In_commitment");
			$this -> db -> where("investor_commitment.parent_id",0);
			$status = $this -> db -> order_by("id","ASC") -> get() -> result_array();

			if($status) {

				foreach($status as $Key => $Value)
				{
					$this -> db -> select("deals.escrow_account_bank,deals.escrow_account_branch,deals.escrow_account_name,deals.deal_status,deals.escrowact,deals.escrow_account_ifsc,deals.startup_id,deals.deal_name,investor_commitment.*,deals.page_link,deals.accept_payment,users.first_name,users.last_name,users.kycstatus");
					$this -> db -> from("investor_commitment");
					$this -> db -> join("deals","deals.deal_id = investor_commitment.deal_id","left");
					$this -> db -> join("users","users.investor_id = investor_commitment.investor_id","left");
					$this -> db -> where("investor_commitment.investor_id",$investor_id);
					$this -> db -> where("investor_commitment.commitment_satus","In_commitment");
					$this -> db -> where("investor_commitment.parent_id",$Value['id']);
					$status[$Key][] = $this -> db -> order_by("id","ASC") -> get() -> result_array();
				}

				$response = [
					'status' => '1',
					'message' => 'Investor Committment list is fetched successfully.',
					'data' => $status,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Investor Commitment List Empty, Please try again!'
				];
			}
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}

	public function get_investor_investment_for_deal()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		$investor_id = $this -> input -> get("investor_id");
		$deal_id = $this -> input -> get("deal_id");

		if(empty($investor_id) || empty($deal_id))
		{
			$response = [
				'status' => '0',
				'message' => 'Investor & Deal Id Required'
			];
		}
		else
		{
			$this -> db -> select_sum("totalamount");
			$this -> db -> from("investor_commitment");
			$this -> db -> where("deal_id",$deal_id);
			$this -> db -> where("investor_id",$investor_id);
			$this -> db -> where("parent_id",0);
			$status = $this -> db -> get() -> result();

			if($status) {
				$response = [
					'status' => '1',
					'message' => 'Investor Committment list is fetched successfully.',
					'data' => $status,
				];
			} else {
				$response =[
					'status' => '0',
					'message' => 'Investor Commitment Is 0, Please try again!'
				];
			}
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));
	}
}
