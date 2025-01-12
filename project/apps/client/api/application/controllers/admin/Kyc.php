<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Kyc extends CI_Controller {
  // update kyc details
	function updatekycdetails() {
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if(!empty($formdata)) {

			$pan_status = $formdata['pan_status'];
			$adhar_status = $formdata['adhar_status'];
			$bank_status = $formdata['bank_status'];
			$kyc_status = $formdata['kyc_status'];
      $investor_id = $formdata['investor_id'];
			$kyc_remark = $formdata['kyc_remark'];
      $investor_id=$formdata['investor_id'];
      $legal_name=$formdata['legal_name'];
      $legal_address=$formdata['legal_address'];
      $pan_kyc_status=''; 
      $adhar_kyc_status='';
      $bank_kyc_status='';
      if($formdata['kyc_status']=='Pending'){
        $pan_kyc_status='pending'; 
        $adhar_kyc_status='pending';
        $bank_kyc_status='pending';
      } else if($formdata['kyc_status']=='admin_approved'){
        $pan_kyc_status='success'; 
        $adhar_kyc_status='success';
        $bank_kyc_status='success';
      }
      $post_data=[];
      if($formdata['kyc_status']=='Pending' || $formdata['kyc_status']=='admin_approved'){
          $post_data = [
            'pan_status' => $pan_status,
            'adhar_status' => $adhar_status,
            'bank_status' => $bank_status,
            'kycstatus' => $kyc_status,
            'kyc_date' => $kyc_status=='Approved' ? date('Y-m-d'): '',
            'kyc_remark'=>$kyc_remark,
            'legal_name'=>$legal_name,
            'address'=>$legal_address,
            'pan_kyc_status' => $pan_kyc_status,
            'adhar_kyc_status' => $adhar_kyc_status,
            'bank_kyc_status' => $bank_kyc_status,
          ];
      } else {
          $post_data = [
            'pan_status' => $pan_status,
            'adhar_status' => $adhar_status,
            'bank_status' => $bank_status,
            'kycstatus' => $kyc_status,
            'kyc_date' => $kyc_status=='Approved' ? date('Y-m-d'): '',
            'kyc_remark'=>$kyc_remark,
            'legal_name'=>$legal_name,
            'address'=>$legal_address,
          ];
      }
			$this->db->where('investor_id',$investor_id);
			$res=$this->db->update('users',$post_data);
			if($res) {
				$response=[
					'status' => '1',
					'message' => 'KYC status is updated successfully.',
				];

       //sending kyc 28-09-2022 completion email
        $sql2="SELECT * FROM users WHERE investor_id='$investor_id'";
        $query2=$this->db->query($sql2);
        $res1=$query2->result();
        $first_name=$res1[0]->first_name;
        $email=$res1[0]->email;
        $kyc_remark=$res1[0]->kyc_remark;

        $this->load->helper('send_email');
        $body='';
        if($kyc_status=='admin_approved'|| $kyc_status=='Approved'){

          // mail refernece : 008
          $body='<!doctype html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title> Investor KYC Success </title>
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
			<body style="color:black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
              We are pleased to inform you that your KYC is verified successfully.  
            <br>
            Please explore exciting investment opportunities on the Deals Page.
            <br>
            <br>
						<i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
						<br>
						<br>
						Thank you,<br>
            Growth91 Team <br><br>
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
          </html>';
        }else{

          // mail refernece : 033
          $body='<!doctype html>
          <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title> Investor KYC Success </title>
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
			<body style="color:black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
							Thank you for submitting your KYC information with Growth91.  
						<br>
						<br>
						We have reviewed your application. Please note the following comments from the admin team:
						<br>
						<br>
            '.$kyc_remark.'
            <br> <br>
						<i>Please submit the information through email on contact@growth91.com </i>
						<br>
             <br>Thank you,
            <br>Growth91 Team <br><br>
            
						PS: This is an automated email. Please do not reply.
						
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
          </html>';
        }
        
        
        $subject=($kyc_status=='Approved'||$kyc_status=='admin_approved')?'KYC Successful':'KYC Update';
        $cc='contact@growth91.com';
        send_email($body,$subject,$email,$cc);
            //end


			} else {
				$response=[
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		} else {
			$response = [
				'status' => '0',
				'message'=> 'Please enter values of all fields.',
			];
		}

		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	
	}
  // update non resident kyc details
  function update_non_resident_kyc_details(){
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    $formdata = json_decode(file_get_contents('php://input'), true);
    if(!empty($formdata)) {
      $legal_name=$formdata['legal_name'];
      $legal_address=$formdata['legal_address'];
      $bank_account_swift=$formdata['bank_account_swift'];
      $bank_account_no=$formdata['bank_account_no'];
      $verify_kyc=$formdata['verify_kyc'];
      $tax_id=$formdata['tax_id'];
      $national_id=$formdata['national_id'];
      $remark=$formdata['remark'];
      $resident_country=$formdata['resident_country'];
      $investor_id=$formdata['investor_id'];
      $kyc_status = $formdata['kyc_status'];
      $post_data=[
        'legal_name'=>$legal_name,
        'legal_address'=>$legal_address,
        'bank_account_swift'=>$bank_account_swift,
        'bank_account_no'=>$bank_account_no,
        'verify_kyc'=>$verify_kyc,
        'tax_id'=>$tax_id,
        'national_id'=>$national_id,
        'remark'=>$remark,
        'resident_country'=>$resident_country,
      ];
      $this->db->where('investor_id',$investor_id);
      $respo=$this->db->update('non_resident_investors',$post_data);
      if(isset($respo)){
          $this->change_kyc_details($formdata);
          $response = [
            'status' => '1',
            'message'=> 'Data is updated successfully.',
          ];
      } else{
          $response = [
            'status' => '0',
            'message'=> 'Something went wrong. Please try again.',
          ];
      }
    } else{
      $response = [
        'status' => '0',
        'message'=> 'Please enter values of all fields.',
      ];
    }
    $this->output->set_content_type('application/json')->set_output(json_encode($response)); 
  }
  // change kyc detaikks for non resident users
  function change_kyc_details($formdata){
      $pan_kyc_status=''; 
      $adhar_kyc_status='';
      $bank_kyc_status='';
      $kyc_status=$formdata['kyc_status'];
      $investor_id=$formdata['investor_id'];
      if($formdata['kyc_status']=='Pending'){
        $pan_kyc_status='pending'; 
        $adhar_kyc_status='pending';
        $bank_kyc_status='pending';
      } else if($formdata['kyc_status']=='admin_approved'){
        $pan_kyc_status='success'; 
        $adhar_kyc_status='success';
        $bank_kyc_status='success';
      }
      $post_data=[];
      if($formdata['kyc_status']=='Pending' || $formdata['kyc_status']=='admin_approved'){
          $post_data = [
            'kycstatus' => $kyc_status,
            'kyc_date' => $kyc_status=='Approved' ? date('Y-m-d'): '',
            'pan_kyc_status' => $pan_kyc_status,
            'adhar_kyc_status' => $adhar_kyc_status,
            'bank_kyc_status' => $bank_kyc_status,
          ];
      } else {
          $post_data = [
            'kycstatus' => $kyc_status,
            'kyc_date' => $kyc_status=='Approved' ? date('Y-m-d'): '',
          ];
      }
      $this->db->where('investor_id',$investor_id);
      $res=$this->db->update('users',$post_data);
      //sending kyc 28-09-2022 completion email
        $sql2="SELECT * FROM users WHERE investor_id='$investor_id'";
        $query2=$this->db->query($sql2);
        $res1=$query2->result();
        $first_name=$res1[0]->first_name;
        $email=$res1[0]->email;
        $kyc_remark=$res1[0]->kyc_remark;

        $this->load->helper('send_email');
        $body='';
        if($kyc_status=='admin_approved'|| $kyc_status=='Approved'){

          // mail refernece : 008
          $body='
          <!doctype html>
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title> Investor KYC Success </title>
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
        <body style="color:black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
                We are pleased to inform you that your KYC is verified successfully.  
              <br>
              Please explore exciting investment opportunities on the Deals Page.
              <br>
              <br>
              <i> Note: If you face any difficulty, please reach out to contact@growth91.com </i>
              <br>
              <br>
              Thank you,<br>
              Growth91 Team <br><br>
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
            </html>';
          }else{

            // mail refernece : 033
            $body='<!doctype html>
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <title> Investor KYC Success </title>
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
        <body style="color:black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
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
                Thank you for submitting your KYC information with Growth91.  
              <br>
              <br>
              We have reviewed your application. Please note the following comments from the admin team:
              <br>
              <br>
              '.$kyc_remark.'
              <br> <br>
              <i>Please submit the information through email on contact@growth91.com </i>
              <br>
               <br>Thank you,
              <br>Growth91 Team <br><br>
              
              PS: This is an automated email. Please do not reply.
              
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
          </html>';
        }
        
        $subject=($kyc_status=='Approved'||$kyc_status=='admin_approved')?'KYC Successful':'KYC Update';
        $cc='contact@growth91.com';
        send_email($body,$subject,$email,$cc);

  }
}

