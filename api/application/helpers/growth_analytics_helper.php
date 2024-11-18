<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

function track_session()
{
	session_start();

	echo"<pre>";print_r($_SESSION);
}