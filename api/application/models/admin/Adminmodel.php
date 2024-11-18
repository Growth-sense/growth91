<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Adminmodel extends CI_Model {
	
	// contact
	public function signin($username,$password) {
        $sql="select * from admin_master where username='$username' and password='$password'";
        $query=$this->db->query($sql);
        return $query->result();
    }

}