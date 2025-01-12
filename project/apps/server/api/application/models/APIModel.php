<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class APIModel extends CI_Model {
	
	// contact
	public function contact($data) {
        $this->db->insert('contacts',$data);
        return $this->db->insert_id();
    }

    // get blog list
    public function blogs() {
        $sql="
            SELECT * FROM posts 
            LEFT JOIN blog_types ON blog_types.id=posts.post_type
            LEFT JOIN category_master on category_master.category_id = posts.category_id
            ORDER BY posts.blog_id DESC
        ";
        $query = $this->db->query($sql);
        return $query->result();
    }

    // Get post details
    public function postdetails($blog_id) {
        $sql = "
            SELECT * FROM posts 
            LEFT JOIN blog_types ON blog_types.id=posts.post_type
            LEFT JOIN category_master on category_master.category_id = posts.category_id
            where posts.blog_id='$blog_id'
        ";
        $query = $this->db->query($sql);
        return $query->result();
    }

}
