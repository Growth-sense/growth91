<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Form extends CI_Controller {
	// add form users
	function invite_startup_form_users(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
			// var_dump($formdata);
			// exit();
		if(!empty($formdata)){
			$founder_id=$formdata['founder_id'];
			$name=$formdata['name'];
			$role=$formdata['role'];
			$email=$formdata['email'];
			$step=$formdata['step'] ?$formdata['step'] : 0;
			$otp=rand(111111,888888);
			$post_data=[
				'name'=>$name,
				'role'=>$role,
				'email'=>$email,
				'by_founder_id'=>$founder_id,
				'otp'=>$otp,
			];

			$this->db->insert('users_selected_by_founder',$post_data);
			$id=$this->db->insert_id();
			
			if($id) {
				if($step=='3'){
					$data=[
						'form_status'=> 'submitted'
					];
					$this->db->where('submiited_by_founder_id',$founder_id);
					$this->db->update('founder_startup_form',$data);
				}

				$sql="SELECT * FROM `startups`";
				$query=$this->db->query($sql);
				$result=$query->result();
				
				$company_name='Test';
				// $founders=json_decode($result[0]->founder_id);
				// $ok = in_array($founder_id, $founders)	
				// if($ok){
				// 	$company_name=count($result) > 0 > $result[0]->name : '';
				// }
				$config = Array(
			    'protocol'  => 'smtp',
			    'smtp_host' => SMTP_HOST,
			    'smtp_port' => SMTP_PORT,
			    'smtp_user' => SMTP_USER,
			    'smtp_pass' => SMTP_PASS,
			    'mailtype'  => 'text/html',
			    'starttls'  => true,
			    'newline'   => "\r\n",
			    'smtp_crypto' => 'ssl',
			    'charset' => 'utf-8',
			);

				$msg='
					<!DOCTYPE html>
                        <html lang="en">
                          <head>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                            <title></title>
                            <style>
                              p {
                                font-size: 18px;
                              }
                              a {
                                
                              }
                              p {
                                font-size: 19px;
                                line-height: 34px;
                              }
                            </style>
                          </head>
                          <body>
                            <div class="container"
                            style="width: 600px;
                            max-widyj:600px;
                            border:1px solid #ddd;
                                margin: 0 auto;
                                box-shadow: 4px 3px 19px #ddd;
                                padding: 38px 25px;
                                font-family: sans-serif;
                                margin-top: 40px;
                                border-radius: 8px;"
                            >
                              <p style="text-align:center;font-size:18px;line-height:34px;">
                              Hi '.$name.'</p>
                              <p style="font-size:18px;line-height:34px;text-align:center;">
                                Please fill the form through the link  for '.$company_name.'.
                              </p>
                              <br />
                              <a href="https://betag91.growth91.com/authenticate?email=.'$email'."
                              target="_blank"
                              style="background: red;
                                color: #fff;
                                padding: 13px 33px;
                                text-decoration: none;
                                border-radius: 7px;
                                display: flex;
                                justify-content: center;
                                width: fit-content;
                                margin: 0 auto;"
                              > Try to login </a>
                              <br />
                              <br/>
                              <br />
                            </div>
                          </body>
                        </html>
				';
				$this->load->library("email", $config);
				$result = $this->email
				->from(SMTP_FROM_EMAIL,SMTP_FROM_NAME)
				->subject("Supporting Form Notification")
				->reply_to(SMTP_FROM_EMAIL, SMTP_FROM_NAME)
				->message($msg)->set_mailtype('html');
				$this->email->to($email)->send();

				$response = [
					'status' => '1',
					'message' => 'Invite sent successfully.',
					'data' => $id,
				];
			} else {
				$response =[
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

	// save startup form
	function save_startup_form_2(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {

			$name= $formdata['name'];
			$email= $formdata['email'];
			$roleType= $formdata['roleType'];
			$leaderShip= $formdata['leaderShip'];
			$understandFinance= $formdata['understandFinance'];
			$understandHr= $formdata['understandHr'];
			$understandLaw= $formdata['understandLaw'];
			$passionCurProject= $formdata['passionCurProject'];
			$passionOfBusiness=$formdata['passionOfBusiness'];
			$experimentalMindset= $formdata['experimentalMindset'];
			$outOFBox= $formdata['outOFBox'];
			$problemSolving= $formdata['problemSolving'];
			$networkBusiness= $formdata['networkBusiness'];
			$networkSocial= $formdata['networkSocial'];
			$user_type=$formdata['user_type'];
			$submmited_by_founder_id= $formdata['submmited_by_founder_id'],
			$founder_id=$formdata['founder_id'];

			var_dump($formdata);

			// $data=[
			// 	'user_type'=>$user_type,	
			// 	'submitted_by_user_id'=>$submmited_by_founder_id,	
			// 	'user_id'=>$founder_id,	
			// 	'name'=>$name,	
			// 	'email'=>$email,	
			// 	'role_type'=>$roleType,	
			// 	'leadership'=>$leaderShip,	
			// 	'understanding_finance'=>$understandFinance,	
			// 	'understanding_hr'=>$understandHr,	
			// 	'understanding_low'=>$understandLaw,	
			// 	'passion_of_business'=>$passionOfBusiness,	
			// 	'passion_for_current_project'=>$passionCurProject,	
			// 	'experimental_mindset'=>$experimentalMindset,	
			// 	'out_of_box_thinking'=>$outOFBox,	
			// 	'problem_solving'=>$problemSolving,	
			// 	'network_business'=>$networkBusiness,	
			// 	'network_social'=>$networkSocial,
			// ];
			// var_dump($data);
			// $this->db->insert('founder_startup_form_by_users',$data);
			// $insert_id=$this->db->insert_id();
;
			// if($insert_id) {
			// 	$response = [
			// 		'status' => '1',
			// 		'message' => 'Data is saved successfully.',
			// 		'data' => $res,
			// 	];
			// }else {
			// 	$response =[
			// 		'status' => '0',
			// 		'message' => 'Invalid email address. Please try again!',
			// 	];
			// }
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

}