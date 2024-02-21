<?php

include('./config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$formdata = json_decode(file_get_contents('php://input'), true);

	
	//echo"<pre>";print_r(constant('BASE_URL'));exit();



$investor_id = $_POST["investor_id"];

if($_POST["form-type"] == "pan")
{

	if(isset($_FILES["pan_image"]["name"]) && $_FILES["pan_image"]["name"] != "")
	{
		$dir = constant('BASE_URL')."uploads/pan/".$investor_id."/";
		if(!is_dir($dir))
		{
			@mkdir($dir,0777,true);
		}
		
		$image = $_FILES['pan_image']['tmp_name'];
	        $temp = explode(".", $_FILES["pan_image"]["name"]);
	        $newfilename = round(microtime(true)) . '.' . end($temp);

	        if(move_uploaded_file($image, $dir.$newfilename)) 
	        {
	        	$this -> db -> where("investor_id",$investor_id);
			$this -> db -> update("users",[
				"investor_id" => $investor_id,
				"pan_image" => $newfilename
			]);
	        }
	}
	
}

if($_POST["form-type"] == "aadhaar")
{
	if(isset($_FILES["aadhaar_front"]["name"]) && $_FILES["aadhaar_front"]["name"] != "")
	{
		$dir = constant('BASE_URL')."uploads/adhar-front/".$investor_id."/";
		if(!is_dir($dir))
		{
			@mkdir($dir,0777,true);
		}
		
		$image = $_FILES['aadhaar_front']['tmp_name'];
	        $temp = explode(".", $_FILES["aadhaar_front"]["name"]);
	        $newfilename = round(microtime(true)) . '.' . end($temp);

	        if(move_uploaded_file($image, $dir.$newfilename)) 
	        {
	        	$this -> db -> where("investor_id",$investor_id);
			$this -> db -> update("users",[
				"investor_id" => $investor_id,
				"adharFront" => $newfilename
			]);
	        }
	}
	
	if(isset($_FILES["aadhaar_back"]["name"]) && $_FILES["aadhaar_back"]["name"] != "")
	{
		$dir = constant('BASE_URL')."uploads/adhar-back/".$investor_id."/";
		if(!is_dir($dir))
		{
			@mkdir($dir,0777,true);
		}
		
		$image = $_FILES['aadhaar_back']['tmp_name'];
	        $temp = explode(".", $_FILES["aadhaar_back"]["name"]);
	        $newfilename = round(microtime(true)) . '.' . end($temp);

	        if(move_uploaded_file($image, $dir.$newfilename)) 
	        {
	        	$this -> db -> where("investor_id",$investor_id);
			$this -> db -> update("users",[
				"investor_id" => $investor_id,
				"adharFront" => $newfilename
			]);
	        }
	}
}
