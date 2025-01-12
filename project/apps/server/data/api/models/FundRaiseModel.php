<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class FundRaiseModel extends CI_Model {
	
	// register new fund raise 
	public function register($data) {
        $this->db->insert('fundraise',$data);
        return $this->db->insert_id();
    }

}