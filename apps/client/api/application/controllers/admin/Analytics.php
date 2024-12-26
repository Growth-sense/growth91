
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Analytics extends CI_Controller {

	public function getdealsbystartupid(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {
            $startupid = $formdata['startupid'];

            $sql="SELECT * FROM `deals` WHERE deal_name='$startupid'";
            $query=$this->db->query($sql);
            $result = $query->result();

            $sql2="SELECT * FROM `startups` WHERE startupid='$startupid'";
            $query2=$this->db->query($sql2);
            $result2 = $query2->result();
			
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Deal list is fetched successfully.',
					'data' => $result,
					'data2' => $result2,
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

	//7-09-22 for admin startup analytics
	public function get_analytics(){
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);

		if(!empty($formdata)) {
            $startupid = $formdata['startup_id'];

            $sql="SELECT * FROM `analytics` WHERE `startup_id`='$startupid'";
            $query=$this->db->query($sql);
            $result = $query->result();
			if($result) {
				$response = [
					'status' => '1',
					'message' => 'Deal list is fetched successfully.',
					'data' => $result,
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

	//update analytics
function update_analytics(){
	    header("Access-Control-Allow-Origin: *");
		header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
		header("Access-Control-Allow-Origin: *");
		header("Access-Control-Allow-Headers: access");
		header("Content-Type: application/json; charset=UTF-8");
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
		$formdata = json_decode(file_get_contents('php://input'), true);
		
		if(!empty($formdata)) {
			$id=$formdata['analytics_id'];
			$post_data = [
	            'month_year'=> $formdata['month_year'],
				'gross_monetary_value'=>$formdata['gross_monetary_value'],
				'gross_revenue'=>$formdata['gross_revenue'],
				'net_revenue'=>$formdata['net_revenue'],
				'net_revenue_remarks'=>$formdata['net_revenue_remarks'],
				'users'=>$formdata['users'],
				'total_active'=>$formdata['total_active'],
				'user_remarks'=>$formdata['user_remarks'],
				'android'=>$formdata['android'],
				'play_store_rating'=>$formdata['play_store_rating'],
				'ios'=>$formdata['ios'],
				'app_store_rating'=>$formdata['app_store_rating'],
				'fixed_expenses'=>$formdata['fixed_expenses'],
				'variable_expenses'=>$formdata['variable_expenses'],
				'one_time_expenses'=>$formdata['one_time_expenses'],
				'total_expenses'=>$formdata['total_expenses'],
				'expenses_remarks'=>$formdata['expenses_remarks'],
				'customer_acquisition'=>$formdata['customer_acquisition'],
				'life_time_value'=>$formdata['life_time_value'],
				'customer_value_remarks'=>$formdata['customer_value_remarks'],
			];
			
			$this->db->where('analytic_id', $id);
	        $res = $this->db->update('analytics', $post_data);
			
			if($res) {
				$response = [
					'status' => '1',
					'message' => 'New analytics is added successfully.',
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
				"formdata"=>json_decode($formdata)
			];
		}
		
		$this->output
		->set_content_type('application/json')
		->set_output(json_encode($response));	

}
//delete analytics 07-09-2022
function delete_analytics(){
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	$formdata = json_decode(file_get_contents('php://input'), true);
	
	if(!empty($formdata)) {
		$id = $formdata['analytics_id'];
		$this->db->where('analytic_id', $id);
		$res = $this->db->delete('analytics');
		if($res) {
			$response = [
				'status' => '1',
				'message' => 'Founder is deleted successfully.'
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
}