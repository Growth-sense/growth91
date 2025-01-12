<?php
include('../db/database.php');
include('../db/config.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
//Load Composer's autoloader
require '../libraries/phpmailer/vendor/autoload.php';
$Invested_dt = date('Y-m-d');

$exploded = explode("_", $_POST["orderId"]);

$investor_id = $exploded[1];
$membership_fees=$exploded[2];
$registered_amt=$exploded[3];


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
      //AFTER FAILURE
        $sql="UPDATE `users` SET registered_amt='$orderAmount',membership_payment_status='$txStatus',
        membership_type='regular' WHERE investor_id='$investor_id'";
        if ($con->query($sql) === TRUE) {
          $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
          VALUES ('$investor_id','0','$Invested_dt','$orderAmount','New registration','$orderId','0','$txStatus',
            '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
          if ($con->query($sql2) === TRUE) {
            send_premium_member_email('fail',$investor_id,$con);
             header('Location: '.$BASE_URL.'register-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId.'&done=failed');
          }
        }
    }else if($txStatus=='SUCCESS'){
      //AFTER SUCCESS
      $end_date = date('Y-m-d H-i a', strtotime('+1 years'));
      $start_date=date('Y-m-d H-i a');
      $membership_duration='1';
      $sql="UPDATE `users` SET registered_amt='$orderAmount',membership_payment_status='$txStatus',
        membership_type='premium',membership_duration='$membership_duration',
        membership_start_date='$start_date',membership_end_date='$end_date',
        membership_fees='$membership_fees' WHERE investor_id='$investor_id'";
      if ($con->query($sql) === TRUE) {
        $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
        VALUES ('$investor_id','0','$Invested_dt','$orderAmount','Membership Upgrade','$orderId','0','$txStatus',
          '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
        if ($con->query($sql2) === TRUE) {
            send_premium_member_email('success',$investor_id,$con);
           header('Location: '.$BASE_URL.'register-success?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId.'&done=success');
        }
      }
    } else {
      //AFTER CANCELLD
      $sql="UPDATE `users` SET registered_amt='$orderAmount',membership_payment_status='$txStatus',
        membership_type='regular' WHERE investor_id='$investor_id'";
        if ($con->query($sql) === TRUE) {
          $sql2="INSERT INTO payments (investor_id,deal_id,payment_date,payment_amount,description,payment_ref,investment_id,payment_status,orderId, paymentMode, referenceId, signature, txMsg, txStatus, txTime)
          VALUES ('$investor_id','0','$Invested_dt','$orderAmount','New registration','$orderId','0','$txStatus',
            '$orderId','$paymentMode','$referenceId','$signature','$txMsg','$txStatus','$txTime')"; 
          if ($con->query($sql2) === TRUE) {
             send_premium_member_email('cancel',$investor_id,$con);
             header('Location: '.$BASE_URL.'register-error?order_id='.$orderId.'&amount='.$orderAmount.'&referenceId='.$referenceId.'&done=cancelled');
          }
        }
    }
 } else {
   echo "<h1>Something went wrong</h1>";
  // Reject this call
}

  function send_premium_member_email($type,$investor_id,$con){
    
    $query = "SELECT * FROM users where investor_id='$investor_id'";
    $result = mysqli_query($con, $query);
    $result=mysqli_fetch_array($result);
    $name=$result['first_name'].' '.$result['last_name'];
    $email=$result['email'];
    $membership_fees = $result[0]->membership_fees;
    $subject='';
    if($type=='success'){
      $subject='Welcome to Growth91 platform as premium member';
    } else if($type=='fail'){
      $subject='Payment Failed.';
    } else if($type=='cancel'){
      $subject='You have cancelled payment.';
    }
    $mail = new PHPMailer;
    //$mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp-relay.sendinblue.com';                     // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'growth91@saamaancart.com';   // SMTP username
    $mail->Password = 'daxGHM07Tpk1SwqR'; 
    $mail->SMTPSecure = 'tls';    
    $mail->From = 'noreply@saamaancart.com';
    $mail->FromName = 'Growth91 Admin';
    $mail->addAddress($email);  
    $mail->WordWrap = 50; 
    $mail->isHTML(true);
    $body='';
    if($type=='success'){

      // Mail reference : 005
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
                    <body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                        <tr>
                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                          <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                            <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                              <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                                <tr>
                                  <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                      <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
                                          <br>
                                          <br>
                                          Thank you for registering on Growth91 as an investor.
                                          <br>
                                          <br>
                                          Growth91 platform provides access to highly vetted growth opportunities. 
                              
                                          <br>
                                          <br>
                                          We have successfully upgraded you as a premium member.
                                          '.($membership_fees=="0" ? "" : "We have received Rs. 999 towards the premium membership subscription.").'
                                          <br>
                                          <br>
                                          As a premium member, you have early access to view listed deals and priority for investment.
                                          <br>
                                          <br>
                                          You can invest in exciting Deals using the link below:
                                          <br>
                                          <br>
                                          https://growth91.com/deals
                                          <br>
                                          <br>
                                          <i> Note: If you face any difficulty, please reach out to contact@growth91.com .</i>
                                          <br>
                                          <br>
                                            Thank you, <br/>
                                            Growth91 Team  <br/>
                                            <br>
                                            PS: This is system generated email. Please do not reply.
                                          </br>
                                          <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
                                                <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
                                              </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                              <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                  <tr>
                                    <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                      <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                      Powered by <a href="'.constant("BASE_URL").'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </td>
                          <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                        </tr>
                      </table>
                    </body>
              </html>';
    } else if($type=='fail'){
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
              <body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                  <tr>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                      <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                        <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                          <tr>
                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                <tr>
                                  <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                    <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
                                        <br>
                                        <br>
                                        We regret to inform you that the payment for premium membership was not successful. Any amount debited will be credited back to your account.
                                      <br>
                                      <br/>
                                      Request you please initiate the membership renewal again on the Growth91 platform.
                                      <br>
                                      <br/>
                                      <i>If you face any difficulty, please reach out to contact@growth91.com .</i>
                                      <br>
                                      <br>
                                      Thank you, <br/>
                                      Growth91 Team  <br/><br/>
                                      PS: This is an automated email. Please do not reply. 
                                    </br>
                                    <div style="text-align: center;" class="imgRes col-sm-12 col-md-12 col-lg-12">
                                          <img src="https://growth91.com/web/growth91LOGO%20(4).png" alt="logo" style="width:120px;height:auto;">
                                        </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                        <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                            <tr>
                              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
                              </td>
                            </tr>
                            <tr>
                              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                Powered by <a href="'.constant("BASE_URL").'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </td>
                    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                  </tr>
                </table>
              </body>
        </html>';
    } 
    // else if($type=='cancel'){
    //   $body='<!doctype html>
    //     <html>
    //       <head>
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    //         <title> Deal Payment Success</title>
    //         <style>
    //         @media only screen and (max-width: 620px) {
    //           table.body h1 {
    //             font-size: 28px !important;
    //             margin-bottom: 10px !important;
    //           }
            
    //       table.body p,
    //         table.body ul,
    //         table.body ol,
    //         table.body td,
    //         table.body span,
    //         table.body a {
    //             font-size: 16px !important;
    //           }
            
    //           table.body .wrapper,
    //         table.body .article {
    //             padding: 10px !important;
    //           }
            
    //           table.body .content {
    //             padding: 0 !important;
    //           }
            
    //           table.body .container {
    //             padding: 0 !important;
    //             width: 100% !important;
    //           }
            
    //           table.body .main {
    //             border-left-width: 0 !important;
    //             border-radius: 0 !important;
    //             border-right-width: 0 !important;
    //           }
            
    //           table.body .btn table {
    //             width: 100% !important;
    //           }
            
    //           table.body .btn a {
    //             width: 100% !important;
    //           }
            
    //           table.body .img-responsive {
    //             height: auto !important;
    //             max-width: 100% !important;
    //             width: auto !important;
    //           }
    //         }
    //         @media all {
    //           .ExternalClass {
    //             width: 100%;
    //           }
            
    //           .ExternalClass,
    //         .ExternalClass p,
    //         .ExternalClass span,
    //         .ExternalClass font,
    //         .ExternalClass td,
    //         .ExternalClass div {
    //             line-height: 100%;
    //           }
            
    //           .apple-link a {
    //             color: inherit !important;
    //             font-family: inherit !important;
    //             font-size: inherit !important;
    //             font-weight: inherit !important;
    //             line-height: inherit !important;
    //             text-decoration: none !important;
    //           }
            
    //           #MessageViewBody a {
    //             color: inherit;
    //             text-decoration: none;
    //             font-size: inherit;
    //             font-family: inherit;
    //             font-weight: inherit;
    //             line-height: inherit;
    //           }
            
    //           .btn-primary table td:hover {
    //             background-color: #34495e !important;
    //           }
            
    //           .btn-primary a:hover {
    //             background-color: #34495e !important;
    //             border-color: #34495e !important;
    //           }
    //         }
    //         </style>
    //           </head>
    //           <body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    //             <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
    //               <tr>
    //                 <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
    //                 <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
    //                   <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
    //                     <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
    //                       <tr>
    //                         <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
    //                           <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
    //                             <tr>
    //                               <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
    //                                 <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear '.$name.', 
    //                                     <br>
    //                                     We regret to inform you that the payment for Deal is not successful
    //                                     so far.
    //                                   <br>
    //                                   <br/>
    //                                   <a href="'.constant("BASE_URL").'membership-plan" target="_blank" style="
    //                                     background: #29176f;
    //                                     color: #fff;
    //                                     padding: 14px 22px;
    //                                     border-radius: 5px;
    //                                     display: flex;
    //                                     justify-content: center;
    //                                     width: fit-content;
    //                                     margin: auto;
    //                                   ">
    //                                   Request you to please retry the payment for Deal on the deal page
    //                                   </a>
    //                                   <br>
    //                                   <br>
    //                                   If you face any difficulty, please reach out to contact@growth91.com
    //                                   <br>
    //                                   <br>
    //                                   Thanks, <br/>
    //                                   Growth91 Team  <br/>
    //                                   contact@growth91.com <br/><br/>
    //                                   PS: This is an automated email. Please do not reply.
    //                                   </p>
    //                                 </br>
    //                                 <img src="'.constant("BASE_URL").'web/glogo.png" alt="logo" style="width:120px;height:50px;display: block;margin-left: auto;margin-right: auto;">
    //                               </td>
    //                             </tr>
    //                           </table>
    //                         </td>
    //                       </tr>
    //                     </table>
    //                     <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
    //                       <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
    //                         <tr>
    //                           <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
    //                             <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
    //                           </td>
    //                         </tr>
    //                         <tr>
    //                           <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
    //                             Powered by <a href="'.constant("BASE_URL").'" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
    //                           </td>
    //                         </tr>
    //                       </table>
    //                     </div>
    //                   </div>
    //                 </td>
    //                 <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
    //               </tr>
    //             </table>
    //           </body>
    //     </html>';
    // }
    // $cc = 'contact@growth91.com';
    // $mail->AddCC("contact@growth91.com");
    $mail->Subject = $subject;
    $mail->Body  = $body;

    if(!$mail->send()) {
       // echo 'Message could not be sent.';
        //echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        //echo 'Message has been sent';
    }
  }
 
?>
