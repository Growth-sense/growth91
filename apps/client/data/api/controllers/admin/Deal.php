<?php
use LDAP\Result;
defined('BASEPATH') or exit('No direct script access allowed');

class Deal extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
	}
	// DEAL LIST
	public function list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$sql = "SELECT * FROM `deals` 
		LEFT JOIN startups on startups.startupid = deals.deal_name
		ORDER BY deal_id DESC;";
		$query = $this->db->query($sql);
		$list = $query->result();
		for ($i = 0; $i < count($list); $i++) {
			$deal_id=$list[$i]->deal_id;
			$totalSql="SELECT SUM(Investment_amt) As total_investment FROM `investments` WHERE `deal_id`='$deal_id'";
			$query1 = $this->db->query($totalSql);
			$data2=$query1->result();
			$list[$i]->total_invested_amount=$data2[0]->total_investment;
		}
		if (count($list) >= 0) {
			$response = [
				'status' => '1',
				'message' => 'Deal list is fetched successfully.',
				'data' => $list,
			];
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please try again!'
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	//get signer(founder) details from the deal table
	// DEAL LIST
	public function getsigner()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$deal_id = $formdata['deal_id'];
			// sql query
			$sql = "SELECT  `signer_name`,`signer_email`,`signer_mobile` FROM `deals` WHERE `deal_id`=$deal_id";
			$query = $this->db->query($sql);
			$list = $query->result();

			if (count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'Deal list is fetched successfully.',
					'data' => $list,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		} else{
			$response=[
				'status'=>'0',
				'message'=>'deal is required'
			];
		}


		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}
	// add new deal
	function add()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {

			$post_data = [
				'deal_name' => $formdata['startupname'],
				'deal_st_date' => $formdata['dealstartdate'],
				'deal_start_dt_prem' => $formdata['dealStartDtPrem'],
				'deal_end_date' => $formdata['dealenddate'],
				'deal_end_dt_prem' => $formdata['dealEndDtPrem'],
				'deal_fund_requested' => $formdata['targetamount'],
				'Min_inv_amt' => $formdata['mintargetamount'],
				'Max_inv_amt' => $formdata['maxtargetamount'],
				'Muliples_of' => $formdata['multipleofdescription'],
				'backed_by' => $formdata['backedby'],
				'deal_category' => json_encode($formdata['category']),
				'youtubelink' => $formdata['youtubelink'],
				'multiples_of' => $formdata['multiples_of'],
				'regular_show_date' => $formdata['regular_show_date'],
				'premium_show_date' => $formdata['premium_show_date'],
				'escrowact' => $formdata['escrowAct'],
				'escrow_account_ifsc' => $formdata['escrow_account_ifsc'],
				'raiegap' => $formdata['raiseGap'],
				'digio_template_id' => $formdata['digioTemplateId'],
				'investor_sign_coordinate'=>$formdata['investor_sign_coordinate'] ? $formdata['investor_sign_coordinate'] : '',
				'founder_sign_coordinate'=>$formdata['founder_sign_coordinate'] ? $formdata['founder_sign_coordinate'] : '',
				'page_link' => $formdata['page_link'],
				'signer_mobile' => $formdata['signer_mobile'],
				'signer_name' => $formdata['signer_name'],
				'signer_email' => $formdata['signer_email'],
				'eligibility_id'=>$formdata['eligibility_id'],
				'deal_type'=>$formdata['deal_type'],
			];

			$this->db->insert('deals', $post_data);
			$id = $this->db->insert_id();

			if ($id) {
				// $this->uploaddealimg();
				$response = [
					'status' => '1',
					'message' => 'New deal is added successfully.',
					'data' => $id,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function edit()
	{

		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			$id = $formdata['id'];

			$post_data = [
				'deal_name' => $formdata['startupname'],
				'deal_st_date' => $formdata['dealstartdate'],
				'deal_start_dt_prem' => $formdata['dealStartDtPrem'],
				'deal_end_date' => $formdata['dealenddate'],
				'deal_end_dt_prem' => $formdata['dealEndDtPrem'],
				'deal_fund_requested' => $formdata['targetamount'],
				'Min_inv_amt' => $formdata['mintargetamount'],
				'Max_inv_amt' => $formdata['maxtargetamount'],
				'Muliples_of' => $formdata['multipleofdescription'],
				'backed_by' => $formdata['backedby'],
				'deal_category' => json_encode($formdata['category']),
				'youtubelink' => $formdata['youtubelink'],
				'multiples_of' => $formdata['multiples_of'],
				'regular_show_date' => $formdata['regular_show_date'],
				'premium_show_date' => $formdata['premium_show_date'],
				'escrowact' => $formdata['escrowAct'],
				'escrow_account_ifsc' => $formdata['escrow_account_ifsc'],
				'raiegap' => $formdata['raiseGap'],
				'digio_template_id' => $formdata['digioTemplateId'],
				'investor_sign_coordinate'=>$formdata['investor_sign_coordinate'] ? $formdata['investor_sign_coordinate'] : '',
				'founder_sign_coordinate'=>$formdata['founder_sign_coordinate'] ? $formdata['founder_sign_coordinate'] : '',
				'page_link' => $formdata['page_link'],
				'signer_mobile' => $formdata['signer_mobile'],
				'signer_name' => $formdata['signer_name'],
				'signer_email' => $formdata['signer_email'],
			];

			$this->db->where('deal_id', $id);
			$res = $this->db->update('deals', $post_data);

			if ($res) {
				// $this->uploaddealimg();
				$response = [
					'status' => '1',
					'message' => 'Deal details is updated successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function delete()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

		if (!empty($_POST)) {
			$id = $this->input->post('id');

			$this->db->where('deal_id', $id);
			$res = $this->db->delete('deals');

			if ($res) {
				$response = [
					'status' => '1',
					'message' => 'Deal is deleted successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function updatestatus()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		error_reporting(E_ALL);
		ini_set('display_errors', 1);
		if (!empty($formdata)) {
			$id = $formdata['id'];
			$post_data = [
				'deal_status' => $formdata['dealstatus'],
				'user_status' => $formdata['approvestatus'],
				'deal_type' => $formdata['dealtype'],
				'show_status' => $formdata['show_status'],
			];
			$this->db->where('deal_id', $id);
			$this->db->update('deals', $post_data);
			$affected_rows = $this->db->affected_rows();
			if ($affected_rows) {
				$response = [
					'status' => '1',
					'message' => 'Deal status is updated successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}
		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	function uploaddealimg()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($_POST)) {
			$id = $this->input->post('deal_id');
			if ($id) {
				// logo
				if (isset($_FILES['pitch_files']['name']) && $_FILES['pitch_files']['name'] != "") {
					$dir = FCPATH . "uploads/deal/pitch_images/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['pitch_files']['tmp_name'];
					$temp = explode(".", $_FILES["pitch_files"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['pitch_files']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"pitch_files" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}
				// logo
				if (isset($_FILES['logo']['name']) && $_FILES['logo']['name'] != "") {
					$dir = FCPATH . "uploads/deal/logo/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['logo']['tmp_name'];
					$temp = explode(".", $_FILES["logo"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['logo']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"logo" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}
				// banner
				if (isset($_FILES['banner']['name']) && $_FILES['banner']['name'] != "") {
					$dir = FCPATH . "uploads/deal/banner/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['banner']['tmp_name'];
					$temp = explode(".", $_FILES["banner"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['banner']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"banner_img" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}

				// pdf
				if (isset($_FILES['pdffile']['name']) && $_FILES['pdffile']['name'] != "") {
					$dir = FCPATH . "uploads/deal/pitch/" . $id . "/";

					if (!is_dir($dir)) {
						@mkdir($dir, 0777, true);
					}

					$image = $_FILES['pdffile']['tmp_name'];
					$temp = explode(".", $_FILES["pdffile"]["name"]);
					$newfilename = round(microtime(true)) . '.' . end($temp);

					$hash = $_FILES['pdffile']['name'];

					if (move_uploaded_file($image, $dir . $newfilename)) {
						$image_details = array(
							"pitch_file" => $newfilename,
						);
						$this->db->where('deal_id', $id);
						$this->db->update('deals', $image_details);
					}
				}

				$response = [
					'status' => '1',
					'message' => 'Image is uploaded successfully.'
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	//for confirmation of creating new deal
	function confirmation_of_eligibility()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if (!empty($formdata)) {
			if(empty($formdata['confirmation'])){
				$response=[
					'status'=>'0',
					'message'=>'Please tick the Checkbox to create new Deal'
				];
			}
			$post_data = [
				'confirmation' => $formdata['confirmation'],
				'date' => $formdata['date'],
				'remarks' => $formdata['remarks'],
			];

			$this->db->insert('fund_raise_eligibility', $post_data);
			$id = $this->db->insert_id();

			if ($id) {
				// $this->uploaddealimg();
				$response = [
					'status' => '1',
					'message' => 'Eligibility Added successfully.',
					'data' => $id,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'Please try again!'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please enter values of all fields.',
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

}