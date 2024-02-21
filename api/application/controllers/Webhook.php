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
				// $order_id='1670171395_10_5_0_0___1';
				$order_id = $events['data']['order']['order_id'];
				$res_payment_status = $events['data']['payment']['payment_status'];	
				// $res_payment_status='SUCCESS';
				sleep(2);
				
				$sql="SELECT deals.vendor_id,investments.payment_status,payments.wallet,investments.investor_id,investments.deal_id,investments.processingfees,payments.referenceId,payments.total_paid_amount FROM `investments`
				LEFT JOIN deals on deals.deal_id=investments.deal_id
				LEFT JOIN payments on payments.payment_ref=investments.payment_ref 
				WHERE investments.payment_ref='$order_id'";
				$query=$this->db->query($sql);
				$result=$query->result();								
				if(isset($result)){
					// $vendor_status=$result[0]->vendor_split_status;
					var_dump($result);
					$vendor_id=$result[0]->vendor_id;
					$payment_status=$result[0]->payment_status;
					$wallet=$result[0]->wallet;
					$investor_id=$result[0]->investor_id;
					$deal_id=$result[0]->deal_id;
					$referenceId=$result[0]->referenceId;
					$processingfees=$result[0]->processingfees;
					$orderAmount=$result[0]->total_paid_amount;
					$amount=intval($orderAmount)-(intval($processingfees)-intval($wallet));	
				
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
						$url='https://api.cashfree.com/api/v2/easy-split/orders/'.$order_id.'/split';
					} else{
						$client_id=$cash_data[0]->test_app_id;
						$client_secret=$cash_data[0]->test_app_secret;
						$url='https://test.cashfree.com/api/v2/easy-split/orders/'.$order_id.'/split';
					}
					if($res_payment_status=='SUCCESS') {
						$curl = curl_init();
						curl_setopt_array($curl, array(
						  CURLOPT_URL => $url,
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
								'type' => json_encode($events),
								'vendor_id'=> !empty($vendor_id) ? $vendor_id.'-'.$environment : 'empty',
								'order_id'=>!empty($order_id) ? $order_id : 'empty',
								'result' => json_encode($result)
							];
							$this->db->insert('test', $post_data);
						}
					}
					
						// IF NOT VISITED ON PAYMENT PAGE BUT PAYMENT IS COMPLETED
						if($payment_status=='PENDING'){
							$subject="Request for Assessment Form Completion for $company_name";
							$this->load->helper("send_email");
							$res=send_email($body,$subject,$email,'');
							if($res_payment_status=='SUCCESS') {
								// UPDATING STATUS TO SUCCESS send_email_to_investor
								$payment_date=date('Y-m-d');								
								$sql1="UPDATE investments SET payment_status='payment_success',payment_status_date='$payment_date' WHERE payment_ref='$order_id'";
								$query1=$this->db->query($sql1);
								$resp1=$query1;

								if($wallet!='0' && $wallet!=''){
							        $sql3="INSERT INTO wallet_history (investor_id,description,type,amount)
							        VALUES ('$investor_id','Invested in deal','debited','$wallet')"; 
							        $query3=$this->db->query($sql3);
									$resp3=$query3;
							    }
							    $this->send_email_to_investor('success',$investor_id,$deal_id,$order_id,$referenceId,$amount,$processingfees);
								// UPDATING PAYMENT HISTORY
								$sql2="UPDATE payments SET payment_date='$payment_date',payment_status='SUCCESS',wallet='$wallet' WHERE payment_ref='$order_id'"; 
								$query2=$this->db->query($sql2);
								$resp2=$query2;
							} else if($res_payment_status=='FAILED') {
								// PAYMENT STATUS UPDATING STATUS TO FAILED
								$payment_date=date('Y-m-d');
								$sql="UPDATE payments SET payment_date='$payment_date',payment_status='FAILED'
										WHERE payment_ref='$order_id'";
								$query=$this->db->query($sql);
								$resp=$query;
								$this->send_email_to_investor('warning',$investor_id,$deal_id,$order_id,$referenceId,$amount,$processingfees);
							} else {
								// PAYMENT STATUS UPDATING STATUS TO FAILED
								$payment_date=date('Y-m-d');
								$sql="UPDATE payments SET payment_date='$payment_date',payment_status='ERROR'
										WHERE payment_ref='$order_id'";
								$query=$this->db->query($sql);
								$resp=$query;
								$this->send_email_to_investor('warning',$investor_id,$deal_id,$order_id,$referenceId,$amount,$processingfees);
							}
						} 
				}
		}		
		
	}

	function send_email_to_investor($status,$investor_id,$deal_id,$orderId,$referenceId,$orderAmount,$processingfees){
	    $query2 = "SELECT * FROM users where investor_id='$investor_id'";
	    $result2 = $this->db->query($query2);
	    $response2=$result2->result();
	    $email=$response2[0]->email;
	    $first_name=$response2[0]->first_name;
	    $kyc_status = $response2[0]->kycstatus;

	    //28-09-22
	    $query3 = "SELECT startups.name FROM deals LEFT JOIN startups ON startups.startupid=deals.startup_id WHERE deals.deal_id='$deal_id'";
	    $result3=$this->db->query($query3);
	    $response3=$result3->result();
	    $startup_name=$response3[0]->name;
	    $html='';   
	    $invested_amount = $orderAmount;
	    if($status=='success')  {
	      $html='<!doctype html>
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
	                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$first_name.'</strong>, 
	                                        <br>
	                                        <br>
	                                        Your investment in '.$startup_name.' on Growth91 has been received.  
	                                      <br>
	                                      <br>
	                                      Investment Summary: <br>
	                                      Amount Invested in '.$startup_name.' : Rs.'.$invested_amount.' <br>
	                              
	                                      Convenience Fees:  Rs.'.$processingfees.' 

	                                     '.
	                                    ($kyc_status=="Pending" ? "<br> <br> Your KYC is pending. Please complete the KYC on the investor dashboard by clicking 
	                                      <a href='".BASE_URL."kyc-instructions'>here</a>."
	                                       : "")
	                                    .'
	              
	                                      <br>
	                                      <br>
	                                      Once the deal is fully subscribed and your investment is approved, you would receive an email to digitally sign the investment document. Instructions for digitally signing the document can be found here 
	                                      <a href='.BASE_URL.'Template> Document Signing Instruction</a>
	                                        
	                                      <br>
	                                      <br>
	                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
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
	                                Powered by <a href="'.BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
	    }else{
	      $html='<!doctype html>
	      <html>
	              <head>
	                <meta name="viewport" content="width=device-width, initial-scale=1.0">
	                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	                <title> Deal Payment Failure</title>
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
	              <body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
	                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$first_name.'</strong>, 
	                                        <br>
	                                        <br>
	                                        We regret to inform you that the payment for '.$startup_name.' is not successful so far.  Any amount debited will be credited back to your account.   
	                                        <br>
	                                        <br>
	                                      Request you to please retry the payment for '.$startup_name.' on the deal page.
	                                      <br>
	                                      <br>
	                                      <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i> <br>
	                                      <br>
	                                      Thank you, <br> 
	                                      Growth91 Team  <br>

	                                      <br>
	                                      
	                                      PS: This is an automated email. Please do not reply.
	                                      </p>
	                                    </br>
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
	                                Powered by <a href="'.BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
	    } 
	    $this->load->helper("send_email");
	    $subject = $status=='success' ? 'Deal Payment Received':'Payment Failed';
	    $res=send_email($html,$subject,$email,'');
	}
}