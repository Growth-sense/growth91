<?php
 include "SSOHelper.php";
$sso = new Cviebrock\DiscoursePHP\SSOHelper();

// this should be the same in your code and in your Discourse settings:
$secret = 'mysteriesWorld';
$sso->setSecret( $secret );
 
// load the payload passed in by Discourse
$payload = $_GET['sso'];
$signature = $_GET['sig'];

// validate the payload
if (!($sso->validatePayload($payload,$signature))) {
    // invaild, deny
    header("HTTP/1.1 403 Forbidden");
    echo("Bad SSO request");
    die();
}

$nonce = $sso->getNonce($payload);

// Insert your user authentication code here ...

// Required and must be unique to your application


// Required and must be consistent with your application
session_start();
$userId = $_SESSION['user_id'] ? $_SESSION['user_id'] : 0;
if(empty($userId)){
    header("location: https://betag91.growth91.com/Login");
    exit();
}
// $userEmail = $_SESSION['investor_email'];
// $myvar = "<script>localStorage.getItem('investor_email');</script>";
// echo $myvar = "<script>localStorage.getItem('investor_id');</script>";
// var_dump($_COOKIE['investor_email']);
// var_dump($_SESSION);
// exit();

echo $userEmail =$_SESSION['investor_email'];

// exit();
if(empty($userEmail)){
    echo "login page";
    header("location: https://betag91.growth91.com/Login");
    return;
}

// Optional - if you don't set these, Discourse will generate suggestions
// based on the email address
$name = $_SESSION['investor_user_name'];
$investor_profile_img = $_SESSION['investor_profile_img'];

$extraParameters = array(
    'username'     => $userUsername,
    'name'     => $name,
    'avatar_url' => $investor_profile_img,
    'avatar_force_update' => true,
);

// build query string and redirect back to the Discourse site
$query = $sso->getSignInString($nonce, $userId, $userEmail, $extraParameters);
header('Location: http://forum.growth91.com/session/sso_login?' . $query);
exit(0);