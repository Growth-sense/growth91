<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Analytics extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		$this->load->model(['admin/Blogmodel']);
	}

	// DEAL LIST
	public function get_analytics_list()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			// sql query
			$sql = "SELECT * FROM `startups` LEFT JOIN `analytics` ON analytics.startup_id=startups.startupid WHERE operational_founder='$founder_id'";
			$query = $this->db->query($sql);
			$list = $query->result();
			if (count($list) >= 0) {
				$response = [
					'status' => '1',
					'message' => 'Analytics list is fetched successfully.',
					'data' => $list,
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
				'message' => 'Please logged in as founder'
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	}

	// DEAL LIST
	public function getdeallist()
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
		ORDER BY deal_id  DESC";
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
				'month_year' => $formdata['monthyear'],
				'Revenue' => $formdata['revenue'],
				'Gross_Profit_Margin' => $formdata['grossprofitmargin'],
				'Customer_churn_rate' => $formdata['customerchurnrate'],
				'Mthly_active_users' => $formdata['monthlyactiveusers'],
				'Ltv_cac_ratio' => $formdata['ration'],
				'deal_id' => $formdata['deal_id'],
				'remarks' => $formdata['remark'],
			];

			$this->db->insert('analytics', $post_data);
			$id = $this->db->insert_id();

			if ($id) {
				$response = [
					'status' => '1',
					'message' => 'New analytics is added successfully.',
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
				'month_year' => $formdata['monthyear'],
				'Revenue' => $formdata['revenue'],
				'Gross_Profit_Margin' => $formdata['grossprofitmargin'],
				'Customer_churn_rate' => $formdata['customerchurnrate'],
				'Mthly_active_users' => $formdata['monthlyactiveusers'],
				'Ltv_cac_ratio' => $formdata['ration'],
				'deal_id' => $formdata['deal_id'],
				'remarks' => $formdata['remark'],
			];
			$this->db->where('analytic_id', $id);
			$res = $this->db->update('analytics', $post_data);

			if ($res) {
				$response = [
					'status' => '1',
					'message' => 'Analytics details is updated successfully.'
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
			$this->db->where('analytic_id', $id);
			$res = $this->db->delete('analytics');

			if ($res) {
				$response = [
					'status' => '1',
					'message' => 'Analytics is deleted successfully.'
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

		if (!empty($formdata)) {
			$id = $formdata['id'];

			$post_data = [
				'deal_status' => $formdata['dealstatus'],
				'user_status' => $formdata['approvestatus'],
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
	//adding new anlytics 30-08-2022	
	function add_analytics()
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
				'month_year' => $formdata['month_year'],
				'startup_id' => $formdata['startup_id'],
				'gross_monetary_value' => $formdata['gross_monetary_value'],
				'gross_revenue' => $formdata['gross_revenue'],
				'net_revenue' => $formdata['net_revenue'],
				'net_revenue_remarks' => $formdata['net_revenue_remarks'],
				'users' => $formdata['users'],
				'total_active' => $formdata['total_active'],
				'user_remarks' => $formdata['user_remarks'],
				'android' => $formdata['android'],
				'play_store_rating' => $formdata['play_store_rating'],
				'ios' => $formdata['ios'],
				'app_store_rating' => $formdata['app_store_rating'],
				'fixed_expenses' => $formdata['fixed_expenses'],
				'variable_expenses' => $formdata['variable_expenses'],
				'one_time_expenses' => $formdata['one_time_expenses'],
				'total_expenses' => $formdata['total_expenses'],
				'expenses_remarks' => $formdata['expenses_remarks'],
				'customer_acquisition' => $formdata['customer_acquisition'],
				'life_time_value' => $formdata['life_time_value'],
				'customer_value_remarks' => $formdata['customer_value_remarks'],
				'founder_id' => $formdata['founder_id'],
				'updated_by' => $formdata['updated_by'],

			];

			$this->db->insert('analytics', $post_data);
			$id = $this->db->insert_id();

			if ($id) {
				$response = [
					'status' => '1',
					'message' => 'New analytics is added successfully.',
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
				"formdata" => json_decode($formdata)
			];
		}

		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));

	
}	
//getting startup name of founder by using by founder id -06-09-22	(shubham)
function getstartup_by_operational_founder()
	{
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		// sql query
		$formdata = json_decode(file_get_contents('php://input'), true);
		if (!empty($formdata)) {
			$founder_id = $formdata['founder_id'];
			$sql = "SELECT * FROM `startups` WHERE `operational_founder`=$founder_id";
			$query = $this->db->query($sql);
			$list = $query->result();
			if ($list) {
				$response = [
					'status' => '1',
					'message' => 'Startup list is fetched successfully.',
					'data' => $list,
				];
			}
			else {
				$response = [
					'status' => '0',
					'message' => 'You Are Not Able To Add Analytics, Please Contact to Administrator'
				];
			}

		}
		else {
			$response = [
				'status' => '0',
				'message' => 'Please Login As A Founder.',
			];
		}
		$this->output
			->set_content_type('application/json')
			->set_output(json_encode($response));
	
}
}