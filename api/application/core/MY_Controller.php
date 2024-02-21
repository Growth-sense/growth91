<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->checkForLogin();
	}

    // CHECK FOR LOGIN
    function checkForLogin() {
        if(!$this->session->userdata('admin')) {
            redirect(base_url());
        }
    }

}