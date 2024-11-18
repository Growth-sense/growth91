<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

    // public function __construct() {
    //  parent::__construct();
    //  $this->load->model(['AuthModel']);
    // }

    // public function index() {
    //     header("Access-Control-Allow-Origin: *");
    //  header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
    //  header("Access-Control-Allow-Origin: *");
    //  header("Access-Control-Allow-Headers: access");
    //  header("Content-Type: application/json; charset=UTF-8");
    //  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    //  $formdata = json_decode(file_get_contents('php://input'), true);
    //   // Load PHPMailer library
    //     $this->load->library('phpmailer_lib');
    //  $mail = $this->phpmailer_lib->load();

    //     $mail->isSMTP();                                      // Set mailer to use SMTP
    //     $mail->Host = 'smtp.mailgun.org';                     // Specify main and backup SMTP servers
    //     $mail->SMTPAuth = true;                               // Enable SMTP authentication
    //     $mail->Username = 'postmaster@mg.growth91.com';   // SMTP username
    //     $mail->Password = '4d495072d983d38836a89f661b174d3b-c76388c3-f6797a0b';                           // SMTP password
    //     $mail->SMTPSecure = 'tls';                            // Enable encryption, only 'tls' is accepted

    //     $mail->From = 'noreply@growth91.com';
    //     $mail->FromName = 'Growth91 Admin';
    //     $mail->addAddress('sushilparekh1234@gmail.com');                 // Add a recipient

    //     $mail->WordWrap = 50; 
    //     $mail->isHTML(true);
    //     $html='';   
        
    //       $html='
    //       <!DOCTYPE html>
    //       <html lang="en">
    //       <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Success</title>
    //       </head>
    //       <body>
    //           <div 
    //           class="container" 
    //           style="
    //             font-size:18px;
    //             font-family:sans-serif;
    //             padding:25px;
    //             width:600px;
    //             margin: 0 auto;
    //           "
    //           >
    //            <div>
    //             <img src="https://betag91.growth91.com/web/glogo.png" style="max-width:150px;    max-width: 170px;
    //     margin: 0 auto;
    //     display: flex;
    //     margin-bottom: 54px;" />
    //           </div>
    //             <p style="padding-bottom:30px;">
    //               Dear <strong>Firstname</strong>, <br/>
    //               Thank you for investing in &lt;Company Name&gt; on Growth91 platform.
    //             </p>
    //             <table>
    //               <tr>
    //                 <td>
    //                   <strong>Investment Summary:</strong>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <td>
    //                   <strong>Amount Invested in &lt;Company Name&gt; :</strong>
    //                 </td>
    //                 <td> Rs. &lt;1&gt;</td>
    //               </tr>
    //               <tr>
    //                 <td>
    //                   <strong>Convenience Fees:</strong>
    //                 </td>
    //                 <td>
    //                   Rs &lt;&gt;
    //                 </td>
    //               </tr>
    //             </table>  <br>
    //             <p>
    //               As a next step, you are required to digitally sign the investment
    //       document. Instruction for Digital Signing can be found here.
    //             </p>
    //             <p>
    //               If you face any difficulty, please reach out to contact@growth91.com
    //             </p>
    //             <br><br>
    //             <p>
    //               Thanks <br>
    //               Growth91 Team<br>
    //               contact@growth91.com<br>
    //             </p>    

    //             <p>PS: This is system generated email. Please do not reply.</p>
    //           </div>

    //       </body>
    //       </html>
    //     ';       

    //     $mail->Subject = 'Growth91 = Deal Payment Received';
    //     $mail->Body  = $html;

    //     if(!$mail->send()) {
    //         echo 'Message could not be sent.';
    //         echo 'Mailer Error: ' . $mail->ErrorInfo;
    //     } else {
    //         echo 'Message has been sent';
    //     }

    // }
    // sebd email
    // function test(){
    //  $this->load->helper('send_email');
    //  $this->load->library('phpmailer_lib');
    //     $html='
    //       <!DOCTYPE html>
    //       <html lang="en">
    //       <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Success</title>
    //       </head>
    //       <body>
    //           <div 
    //           class="container" 
    //           style="
    //             font-size:18px;
    //             font-family:sans-serif;
    //             padding:25px;
    //             width:600px;
    //             margin: 0 auto;
    //           "
    //           >
    //            <div>
    //             <img src="https://betag91.growth91.com/web/glogo.png" style="max-width:150px;    max-width: 170px;
    //     margin: 0 auto;
    //     display: flex;
    //     margin-bottom: 54px;" />
    //           </div>
    //             <p style="padding-bottom:30px;">
    //               Dear <strong>Firstname</strong>, <br/>
    //               Thank you for investing in &lt;Company Name&gt; on Growth91 platform.
    //             </p>
    //             <table>
    //               <tr>
    //                 <td>
    //                   <strong>Investment Summary:</strong>
    //                 </td>
    //               </tr>
    //               <tr>
    //                 <td>
    //                   <strong>Amount Invested in &lt;Company Name&gt; :</strong>
    //                 </td>
    //                 <td> Rs. &lt;1&gt;</td>
    //               </tr>
    //               <tr>
    //                 <td>
    //                   <strong>Convenience Fees:</strong>
    //                 </td>
    //                 <td>
    //                   Rs &lt;&gt;
    //                 </td>
    //               </tr>
    //             </table>  <br>
    //             <p>
    //               As a next step, you are required to digitally sign the investment
    //       document. Instruction for Digital Signing can be found here.
    //             </p>
    //             <p>
    //               If you face any difficulty, please reach out to contact@growth91.com
    //             </p>
    //             <br><br>
    //             <p>
    //               Thanks <br>
    //               Growth91 Team<br>
    //               contact@growth91.com<br>
    //             </p>    

    //             <p>PS: This is system generated email. Please do not reply.</p>
    //           </div>

    //       </body>
    //       </html>
    //     ';   
    //     $subject='Growth91 = Deal Payment Received';
    //     $email='sushilparekh1234@gmail.com';
    //  $response=send_email($html,$subject,$email);
    //  var_dump($response);
    // }

    function test_email_code(){
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: access");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        //27-09-2022bhanu
        $sql = "SELECT email FROM users WHERE investor_id='136'";
        $query1 = $this->db->query($sql);
        $data2=$query1->result();
        //  $email=$data2[0]->email;
        //  $sql = "SELECT * FROM users WHERE investor_id='$investor_id'";
        //  $query1 = $this->db->query($sql);
        //  $data2=$query1->result();
        //  $email=$data2[0]->email;
        //  $first_name=$data2[0]->first_name;
 
         $this->load->helper('send_email');
         
         $body='
         <!doctype html>
         <html>
           <head>
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
             <title> Premium Membership Failure</title>
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
                <body style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Thanks for Joining the Growth91 community.</span>
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
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Welcome</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Thanks for Joining the Growth91 community.</p>
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
                                            We regret to inform you that the payment for Deal is not successful
                                            so far. Any amount debited will be credited back to your account.
                                        <br>
                                        <br>
                                        Request you to please retry the payment for <Deal> on the deal page. 
                                            
                                        <br>
                                        <br>
                                        <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
                                        <br>
                                        <br>
                                        Thanks, <br>
                                        Growth91 Team <br>
                                        <br>
                                    PS: This is an automated email. Please do not reply.
                                        </br>
                                        <br>
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
         </html>
         ';   
         $subject='Growth91 – Payment Failed';
         $cc='contact@growth91.com';
         send_email($body,$subject,'bhanupratap11698@gmail.com',$cc);
         
        //end
        // if($email) {
        //  $response = [
        //    'status' => '1',
        //    'message' => 'user email',
        //    'data' => $email,
        //  ];
        //   } else {
        //  $response =[
        //    'status' => '0',
        //    'message' => 'Please try again!'
        //  ];
        //   }

        //   $this->output
        // ->set_content_type('application/json')
        // ->set_output(json_encode($response));
    }

    function test_sms(){
        $message='Test message';
        $mobile='9307507369';
        $this->load->helper('send_sms');;
        echo $res=sendSMS($message,$mobile);
    }


    //10-18-2022
    //teaching class of curd

}
