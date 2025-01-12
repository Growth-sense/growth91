<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Analytics extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this -> load -> helper(["growth_analytics","cookie"]);
	}

	public function start_analytics_session()
	{
		date_default_timezone_set("Asia/kolkata");

		$data["page"] = $this -> input -> post("page");
		$data["count"] = 1;
		$data["date"] = date("Y-m-d");
		$data["time"] = date("h:i:s");

		$data["code"] = get_cookie("home_page_code");

		if(!isset($data["code"]) && empty($data["code"]))
		{
			$data["code"] = "home_page_code_".random_int(123456, 987654);
			set_cookie("home_page_code",$data["code"],time() + (10 * 365 * 24 * 60 * 60));

			$this -> db -> insert("growth_analytics",$data);
		}
		else
		{
			$this -> db -> where(["code" => $data["code"]]) -> update("growth_analytics",$data);
		}

	}

	public function delete_analytics_session()
	{
		date_default_timezone_set("Asia/kolkata");
		$data = $this -> db -> get("growth_analytics") -> result_array();

		foreach ($data as $key => $value)
		{
			if(date("h:i:s",strtotime($value["time"]." +2 Seconds")) < date("h:i:s"))
			{
				delete_cookie("home_page_code");
				$this -> db -> delete("growth_analytics",["id" => $value["id"]]);
			}
		}
	}
	
	public function display_to_admin()
	{
		$this->db->group_by('page');
		return $this->db->count_all('growth_analytics');
	}
}
