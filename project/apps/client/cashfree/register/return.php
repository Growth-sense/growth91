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

      // Query active deals for dynamic section
      $today = date('Y-m-d');
      $sql_deals = "SELECT * FROM `deals` WHERE `show_status` = '1' AND DATE(`deal_st_date`) <= '$today' AND DATE(`deal_end_date`) >= '$today' ORDER BY `deal_id` DESC";
      $query_deals = mysqli_query($con, $sql_deals);
      $active_deals = [];
      if ($query_deals) {
        while ($row = mysqli_fetch_object($query_deals)) {
          $active_deals[] = $row;
        }
      }

      $deals_html = '';
      if (!empty($active_deals)) {
        $deal_custom_data = [
          'FreshLeaf' => [
            'category' => "Foods and Beverages",
            'description' => "Freshleaf is building India's modern tea brand by upgrading the country's most consumed beverage category.",
            'aif_amount' => "₹2,00,000",
            'show_direct_cap' => 1
          ],
          'Rezlytix' => [
            'category' => "Artificial Intelligence",
            'description' => "Rezlytix is a deep-tech, AI-powered subsurface intelligence company improving oil & gas exploration through proprietary seismic super-resolution technology.",
            'aif_amount' => "₹3,00,000",
            'show_direct_cap' => 0
          ],
          'Zwilling' => [
            'category' => "Industrial AI / Deep Tech / Manufacturing SaaS (Digital Twin)",
            'description' => "Zwilling builds Zwillio, an AI-powered industrial digital twin platform that creates a live, intelligent replica of machines, shopfloors and entire factories.",
            'aif_amount' => "₹5,00,000",
            'show_direct_cap' => 1
          ],
          'Scrapify' => [
            'category' => "CLEANTECH",
            'description' => "Scrapify Ecotech restores aquatic ecosystems through AI-driven automation. Its flagship product, EcoFloater, is an autonomous surface vehicle that detects and removes floating waste, water hyacinth, and oil spills while monitoring water quality in real time.",
            'aif_amount' => "₹3,00,000",
            'show_direct_cap' => 1
          ],
          'SalesAgents AI' => [
            'category' => "Artificial Intelligence / SaaS",
            'description' => "Deeply Integrated AI Sales force for BFSI. Global BFSI infrastructure for sales expansion. At scale, SalesAgents AI will be powering the entire financial industry's sales expansion by offering highest conversion and highest market access expansion, with a plug & play product for end-to-end sales. This will make credit-worthy lending frictionless, insurance universal, & wealth creation intuitive.",
            'aif_amount' => "₹5,00,000",
            'show_direct_cap' => 1
          ],
          'Goodmelts Round 2' => [
            'category' => "Consumer / D2C — Home & Lifestyle Fragrance",
            'description' => "Changing the Way India Experiences Scent. Building India's largest scent-led consumer platform across home, mobility, personal care, laundry and cleaning.",
            'aif_amount' => "₹5,00,000",
            'show_direct_cap' => 1
          ],
          'Uprear Build' => [
            'category' => "Construction Tech / Modular Infrastructure Manufacturing",
            'description' => "Turning Construction into Factory-Built Products. Bootstrapped to ~₹63 Cr cumulative revenue with 300+ structures delivered. Now scaling standardized, patented factory-built infrastructure across institutional, hospitality, workforce housing and energy.",
            'aif_amount' => "₹5,00,000",
            'show_direct_cap' => 1
          ]
        ];

        $format_indian = function ($num) {
          if (!is_numeric($num)) return $num;
          $num = round($num);
          $str = (string)$num;
          $len = strlen($str);
          if ($len <= 3) return $str;
          $last3 = substr($str, -3);
          $rem = substr($str, 0, -3);
          $rem = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $rem);
          return $rem . "," . $last3;
        };

        $deals_html .= '<div style="margin: 25px 0 15px 0; border-top: 2px solid #e0e0e0; padding-top: 20px;">';
        $deals_html .= '<h3 style="font-family: sans-serif; font-size: 16px; font-weight: bold; color: #100050; margin: 0 0 15px 0;">Current Active Startup Investment Opportunities:</h3>';
        $deals_html .= '</div>';

        $counter = 1;
        foreach ($active_deals as $deal) {
          $deal_name = !empty($deal->deal_name) ? $deal->deal_name : 'Startup Opportunity';
          
          $matched_custom = null;
          foreach ($deal_custom_data as $key => $data) {
            if (strcasecmp(trim($key), trim($deal_name)) === 0) {
              $matched_custom = $data;
              break;
            }
          }

          $sector = '';
          if (!empty($matched_custom['category'])) {
            $sector = $matched_custom['category'];
          } elseif (!empty($matched_custom['deal_category'])) {
            $sector = $matched_custom['deal_category'];
          } elseif (!empty($deal->deal_category)) {
            $cat_decoded = json_decode($deal->deal_category, true);
            if (is_array($cat_decoded)) {
              $sector = implode(", ", $cat_decoded);
            } else {
              $sector = $deal->deal_category;
            }
          } else {
            $sector = 'General';
          }

          // Look up custom description from manual map (not from DB)
          $desc_text = isset($matched_custom['description']) ? $matched_custom['description'] : "A high-potential startup curated by Growth91.";
          $desc_html = '<p style="font-family: sans-serif; font-size: 13px; margin: 0 0 12px 0; color: #444; line-height: 1.5;">' . $desc_text . '</p>';

          // Direct Cap Table amount (from DB field Min_inv_amt formatted in Indian numbering system)
          $min_inv = !empty($deal->Min_inv_amt) && is_numeric($deal->Min_inv_amt) ? '₹' . $format_indian($deal->Min_inv_amt) : '₹' . ($deal->Min_inv_amt ? $deal->Min_inv_amt : '10,00,000');

          // Look up custom AIF amount from manual map (not from DB)
          $aif_text = isset($matched_custom['aif_amount']) ? $matched_custom['aif_amount'] : "₹2,00,000";

          // Link
          $deal_link = !empty($deal->page_link) ? $deal->page_link : 'deals';
          if (strpos($deal_link, 'http://') !== 0 && strpos($deal_link, 'https://') !== 0) {
            $deal_url = 'https://growth91.com/' . ltrim($deal_link, '/');
          } else {
            $deal_url = $deal_link;
          }

          $deals_html .= '<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; background-color: #fafafa;">';
          $deals_html .= '<p style="font-family: sans-serif; font-size: 15px; font-weight: bold; margin: 0 0 5px 0; color: #100050;">' . $counter . '. ' . htmlspecialchars($deal_name) . '</p>';
          $deals_html .= '<p style="font-family: sans-serif; font-size: 13px; margin: 0 0 10px 0; color: #555;"><strong>Sector:</strong> ' . htmlspecialchars($sector) . '</p>';
          $deals_html .= $desc_html;
          $deals_html .= '<p style="font-family: sans-serif; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">Minimum Investment:</p>';
          $deals_html .= '<ul style="font-family: sans-serif; font-size: 13px; margin: 0 0 15px 0; padding-left: 20px; color: #333;">';
          if (isset($matched_custom['show_direct_cap']) && $matched_custom['show_direct_cap'] == 1) {
            $deals_html .= '<li style="margin-bottom: 4px;">Invest through Direct Cap Table: <strong>' . $min_inv . '</strong></li>';
          }
          $deals_html .= '<li style="margin-bottom: 4px;">Invest through Alternative Investment Fund (AIF): <strong>' . $aif_text . '</strong></li>';
          $deals_html .= '</ul>';
          $deals_html .= '<div style="margin-top: 10px;">';
          $deals_html .= '<a href="' . $deal_url . '" style="background-color: #100050; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; font-size: 13px;">Explore Deal &rarr;</a>';
          $deals_html .= '</div>';
          $deals_html .= '</div>';

          $counter++;
        }

        $deals_html .= '<div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">';
        $deals_html .= '<a href="https://growth91.com/deals" style="background-color: #34495e; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; font-size: 14px;">Explore More Startup Investment Opportunities</a>';
        $deals_html .= '</div>';
      }

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
                                          <div style="text-align: center; margin-bottom: 20px;" class="imgRes col-sm-12 col-md-12 col-lg-12">
                                            <img src="https://growth91.com/web/Growth91Logonew.png" alt="Growth91 Logo" width="140" border="0" style="width:140px; max-width:140px; height:auto; display:inline-block; border:none; outline:none; text-decoration:none;">
                                          </div>
                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>'.$name.'</strong>, 
                                          <br><br>
                                          Thank you for registering on Growth91.
                                          <br><br>
                                          We are delighted to welcome you to the Growth91 community - a startup investment marketplace that connects investors with carefully curated, high-potential startups seeking growth capital.
                                          <br><br>
                                          We have successfully upgraded you as a premium member.
                                          '.($membership_fees=="0" ? "" : "We have received Rs. 999 towards the premium membership subscription.").'
                                          <br><br>
                                          As a premium member, you have early access to view listed deals and priority for investment.
                                          <br><br>
                                          As a member of Growth91, you can:
                                          </p>
                                          <ul style="font-family: sans-serif; font-size: 14px; margin: 0 0 15px 0; padding-left: 20px; line-height: 1.6;">
                                              <li>Explore curated startup investment opportunities across diverse sectors.</li>
                                              <li>Access detailed information on startups, including their business model, traction, financials, and investment terms.</li>
                                              <li>Track startups that are currently raising funds.</li>
                                              <li>Build a diversified startup investment portfolio.</li>
                                              <li>Receive updates on newly listed investment opportunities and key platform developments.</li>
                                          </ul>
                                          ' . $deals_html . '
                                          <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
                                              If you need any assistance or have any questions, our team will be happy to help. Simply write to <a href="mailto:contact@growth91.com" style="color: #100050; text-decoration: underline;">contact@growth91.com</a>.
                                              <br><br>
                                              Thank you for choosing Growth91. We look forward to being a part of your startup investment journey.
                                              <br><br>
                                              Warm regards,<br>
                                              Growth91 Team <br><br>
                                            
                                            PS: This is an automated email. Please do not reply. 
                                          </p>
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
