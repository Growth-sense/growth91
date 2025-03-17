<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Adminmodel extends CI_Model {
	
	// contact
	// public function signin($username,$password) {
    //     $sql="select * from admin_master where username='$username' and password='$password'";
    //     $query=$this->db->query($sql);
    //     return $query->result();
    // }

    public function signin($username, $password) {
        // First check if user exists and is not blocked
        $checkUser = "SELECT * FROM admin_master WHERE username = '$username'";
        $userQuery = $this->db->query($checkUser);
        $user = $userQuery->row();
    
        // If user doesn't exist
        if (!$user) {
            return array(
                'status' => false,
                'message' => 'Invalid credentials'
            );
        }
    
        // Check if user is blocked
        if ($user->blocked == 1) {
            return array(
                'status' => false,
                'message' => 'Account is blocked. Please contact administrator.'
            );
        }
    
        // Verify credentials
        $sql = "SELECT * FROM admin_master WHERE username = '$username' AND password = '$password'";
        $query = $this->db->query($sql);
        
        if ($query->num_rows() > 0) {
            // Successful login - reset fail attempts
            $resetAttempts = "UPDATE admin_master 
                             SET failAttempt = 0 
                             WHERE username = '$username'";
            $this->db->query($resetAttempts);
            
            return array(
                'status' => true,
                'data' => $query->result(),
                'message' => 'Login successful'
            );
        } else {
            // Failed login - increment fail attempts
            $newAttempts = $user->failAttempt + 1;
            
            // Check if should block user
            $shouldBlock = $newAttempts >= 3;
            
            // Update fail attempts and blocked status
            $updateAttempts = "UPDATE admin_master 
                              SET failAttempt = $newAttempts,
                                  blocked = " . ($shouldBlock ? "1" : "0") . "
                              WHERE username = '$username'";
            $this->db->query($updateAttempts);
    
            return array(
                'status' => false,
                'message' => $shouldBlock ? 
                    'Account has been blocked due to multiple failed attempts.' : 
                    'Invalid credentials. Attempts remaining: ' . (3 - $newAttempts)
            );
        }
    }
    

}