<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InvestorModel extends CI_Model {
	
	// register new fund raise 
	public function register($data) {
        $this->db->insert('users',$data);
        return $this->db->insert_id();
    }

}