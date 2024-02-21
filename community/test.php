<?php  
	session_start();
	var_dump($_GET);
	if(isset($_GET)) {
		$investor_email = $_GET['email'];
		$investor_id = $_GET['user_id'];
		$name = $_GET['name'];
		$img = $_GET['img'];

		$_SESSION['investor_email'] = $investor_email;
		$_SESSION['user_id'] = $investor_id;
		$_SESSION['investor_user_name'] = $name;
		$_SESSION['investor_profile_img'] = $img;
		

		if($_SESSION['investor_email']) {
			echo $_SESSION['investor_email'];
			header('Location: http://forum.growth91.com/login');	
		}
	}
	

?>