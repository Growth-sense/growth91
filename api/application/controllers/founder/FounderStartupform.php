<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FounderStartupform extends CI_Controller {

	function startup_form_success_mail() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		// sql query
		$id=$formdata['founder_id'];
		$sql = "SELECT users.email, users.first_name FROM `founders` LEFT JOIN `users` ON users.investor_id=founders.main_founder_id WHERE main_founder_id='$id'";
		$query=$this->db->query($sql);
		$list =$query->result();
		
		if(count($list)>0) {
			// 27/09/2022 shubham
            $this->load->helper('send_email');
            $first_name=$list[0]->first_name;
            $email=$list[0]->email;
            $body='<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title> StartUp form Success</title>
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
                                            Thankyou, for submitting the Start-up Form on Growth91 platform.   
                                          <br>
                                          <br>
                                          Appreciate it if you could also submit the Team Assessment Form (if not
                                          done already).
                
                                          <br>
                                          <br>
                                          Growth91 team will perform the due diligence and get back to you for any clarifications. 
                                          <br>
                                          <br>
                                          <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
                                          <br>
                                          <br>
                                          Thank you, <br>
                                          Growth91 Team <br>
                                          <br>
                                          <br>
                                          
                                          PS: This is an automated email. Please do not reply. 

                                        </br>
                                        <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
                                          <img src="'.WEB_BASE_URL.'web/glogo.png" alt="logo" style="width:120px;height:auto;">
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
            $subject='Start-up Form Submitted Successfully ';
            $cc='';
            $ress=send_email($body,$subject,$email,$cc);

            // 27/09/22 Changes done (shubham)
		} 
		
		// $this->output
		// ->set_content_type('application/json')
		// ->set_output(json_encode($ress));	
	}

}