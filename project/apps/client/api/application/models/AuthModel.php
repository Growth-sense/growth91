<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AuthModel extends CI_Model {
	
	// Check for login
	public function checkForLogin($email,$password) {
        $query = $this->db->query("SELECT * FROM `user_master` where email='$email' and 
        	password='$password'");
        return $query->result();
    }

}
