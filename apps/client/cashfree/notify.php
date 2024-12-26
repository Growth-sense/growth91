<?php

include('./db/database.php');
include('./db/config.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require './libraries/phpmailer/vendor/autoload.php';


$Invested_dt = date('Y-m-d');

$exploded = explode("_", $_POST["orderId"]);

// var_dump($exploded);

$investor_id = $exploded[1];
$deal_id = $exploded[2];
$legalfees = $exploded[3];
$wallet = $exploded[4];
$person_from = $exploded[5];
$person_id = $exploded[6];
$invest_status = $exploded[7];
// echo '<pre>';

$deductstatus='0';
$agreestatus='0';
$tdsstatus='0';
$processingfees = $_GET["processingfees"];
$gst = $_GET['gst'];


$orderId = $_POST["orderId"];
$orderAmount = $_POST["orderAmount"];
$referenceId = $_POST["referenceId"];
$txStatus = $_POST["txStatus"];
$paymentMode = $_POST["paymentMode"];
$txMsg = $_POST["txMsg"];
$txTime = $_POST["txTime"];
$signature = $_POST["signature"];
$data = $orderId.$orderAmount.$referenceId.$txStatus.$paymentMode.$txMsg.$txTime;

$secretKey = constant('APP_SECRET_KEY');
$hash_hmac = hash_hmac('sha256', $data, $secretKey, true);
$computedSignature = base64_encode($hash_hmac);
$BASE_URL=constant('BASE_URL');

if ($signature == $computedSignature) {
  if($txStatus=='FAILED'){
      $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
      VALUES ('$investor_id','$deal_id','$Invested_dt','$orderAmount','User invested in deal','$orderId',
    '0','$txStatus','$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
      send_email('warning',$investor_id,$con,$deal_id,$orderId,$referenceId,$orderAmount,$processingfees);
      if ($con->query($sql2) === TRUE) {
         header('Location: '.$BASE_URL.'transaction-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId.'&deal_id='.$deal_id);
      }
  }else if($txStatus=='SUCCESS'){
    $payment_date=date('Y-m-d');
    $sql="INSERT INTO investments (investor_id, deal_id, Investment_amt, deductstatus, agreestatus, Invested_dt,
      payment_ref,tdsstatus,processingfees,gst,legalfees,payment_status,payment_status_date,vendor_split_status)
    VALUES ('$investor_id','$deal_id','$orderAmount','$deductstatus','$agreestatus','$Invested_dt','$orderId','$txStatus',
    '$processingfees','$gst','$legalfees','payment_success','$payment_date','pending')"; 
    if ($con->query($sql) === TRUE) {
      $last_id = $con->insert_id;

    if($wallet!='0' && $wallet!=''){
        $sql3="INSERT INTO wallet_history (investor_id,description,type,amount)
        VALUES ('$investor_id','Invested in deal','debited','$wallet')"; 
        $con->query($sql3);
    }
    run_query_to_update_wallet($investor_id,$person_from,$person_id,$con);

    $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status)
    VALUES ('$investor_id','$deal_id','$Invested_dt','$orderAmount','User invested in deal','$orderId',
    '$last_id','$txStatus')"; 
      send_email('success',$investor_id,$con, $deal_id,$orderId,$referenceId,$orderAmount,$processingfees);
      if ($con->query($sql2) === TRUE){
         header('Location: '.$BASE_URL.'transaction-success?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId.'&deal_id='.$deal_id);
      }
  }
  }
 } else {
   echo "<h1>Something went wrong</h1>";
  // Reject this call
}

function run_query_to_update_wallet($investor_id,$person_from,$person_id,$con) {

  // ======================  check invest status='';
  $query2 = "SELECT * FROM users where investor_id='$investor_id' and isinvested='0'";
  $result2 = mysqli_query($con, $query2);
  $response2=mysqli_fetch_array($result2);
  $num_rows2=intval(mysqli_num_rows($result2));
  $registration_date= !empty($response2['registration_date']) ? date('Y-m-d', strtotime($response2['registration_date'])) : '';
  $current_date=date('Y-m-d');
  $six_month_date = date('Y-m-d', strtotime("+6 months", strtotime($registration_date)));

  if(intval($num_rows2)>0 && ($current_date>=$registration_date || $current_date<=$six_month_date)){
    if($person_from=='0'){
        
          $sql4="INSERT INTO wallet_history (investor_id,description,type,amount)
          VALUES ('$person_id','By Referral','credited','1000')"; 
          $con->query($sql4);
          $current_date=date('Y-m-d');
          $sql5="UPDATE users SET isinvested='1',dateofinvestment='$current_date',invested_referral='RR' where investor_id='$investor_id'"; 
          $con->query($sql5);  
       
    } else if($person_from=='1'){
      
        $sql5="SELECT * FROM `institutional_referral_master` WHERE referral_id='$person_id'"; 
        $result2 = mysqli_query($con, $sql5);
        $response2=mysqli_fetch_array($result2);

        // $earned_points=intval($response2['earned_points']+1000);

        // $sql6="UPDATE `institutional_referral_master` SET earned_points='$earned_points' WHERE referral_id='$person_id'"; 
        // $result6 = mysqli_query($con, $sql6);
      
        $current_date=date('Y-m-d');
        $sql5="UPDATE users SET isinvested='1',dateofinvestment='$current_date',invested_referral='IR' where investor_id='$investor_id'"; 
        $con->query($sql5);  

    }
  }
}
  
  // send email
  function send_email($status,$investor_id,$con,$deal_id,$orderId,$referenceId,$orderAmount,$processingfees){

    $query2 = "SELECT * FROM users where investor_id='$investor_id'";
    $result2 = mysqli_query($con, $query2);
    $response2=mysqli_fetch_array($result2);
    $email=$response2['email'];
    $first_name=$response2['first_name'];
    $kyc_status = $response2['kycstatus'];

    //28-09-22
    $query3 = "SELECT startups.name FROM deals LEFT JOIN startups ON startups.startupid=deals.startup_id WHERE deals.deal_id='$deal_id'";
    $result3=mysqli_query($con,$query3);
    $response3=mysqli_fetch_array($result3);
    $startup_name=$response3['name'];
    //end

    $mail = new PHPMailer;

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.mailgun.org';                     // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'postmaster@mg.growth91.com';   // SMTP username
    $mail->Password = '4d495072d983d38836a89f661b174d3b-c76388c3-f6797a0b';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable encryption, only 'tls' is accepted

    $mail->From = 'noreply@growth91.com';
    $mail->FromName = 'Growth91';
    $mail->addAddress($email);                 // Add a recipient

    $mail->WordWrap = 50; 
    $mail->isHTML(true);
    $html='';   
    $invested_amount = $orderAmount;

    // email : 9 and 13
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
                                  Dear <strong>'.$first_name.'</strong>, 
                                      <br>
                                      <br>
                                      Your investment in '.$startup_name.' on Growth91 has been received. 
                                    <br>
                                    <br>
                                    Investment Summary: <br>
                                    Amount Invested in '.$startup_name.' : Rs'.$invested_amount.' <br>
                            
                                    Convenience Fees:  Rs'.$processingfees.' <br>
                                    
                                    <br>
                                    <br>'
                                    if($kyc_status == 'Pending'){
                                      'Your KYC is pending. Please complete the KYC on the investor dashboard by clicking
                                      <a href='.WEB_BASE_URL.'/kyc-instructions>here</a>.
                                      '
                                    }
                                    '<br>
                                    <br>
                                    Once the deal is fully subscribed and your investment is approved, you would receive an email to digitally sign the investment document.
                                    Instructions for digitally signing the document can be found here 
          
                                      
                                    <br>
                                    <br>
                                    <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
                                    <br>
                                    <br>
                                    
                                    PS: This is system generated email. Please do not reply.
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
                              Powered by <a href="'.$BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
                                  Dear <strong>'.$first_name.'</strong>, 
                                  <br>
                                  <br>
                                  We regret to inform you that the payment for '.$startup_name.' is not successful so far. Any amount debited will be credited back to your account.    
                                <br>
                                <br>
                                Request you please retry the payment for '.$startup_name.' on the deal page.
                                <br>
                                <br>
                                <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
                                <br>
                                <br>
                                Thank you, <br> 
                                Growth91 Team  <br>

                                <br>
                                <br>
                                
                                PS: This is an automated email. Please do not reply. 
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
                              Powered by <a href="'.$BASE_URL.'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
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
    }                    // Set word wrap to 50 characters

    
    $mail->Subject = $status=='success' ? 'Payment Received':'Payment Failed';
    $mail->Body  = $html;
    $mail->BCC = 'contact@growth91.com';

    if(!$mail->send()) {
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'Message has been sent';
    }

  }

 ?>
