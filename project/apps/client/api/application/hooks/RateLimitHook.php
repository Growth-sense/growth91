<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class RateLimitHook {

    public function check_global_ip() {

        if (is_cli()) {
            return;
        }

        $CI =& get_instance();
        
        $CI->load->library('RateLimiter');

        // Apply global IP limit: 10 requests per second (1000ms window)
        $CI->ratelimiter->check(array(
            'prefix'   => 'global_ip',
            'windowMs' => 1000,
            'max'      => 10,   
            'message'  => 'Rate limit exceeded. Maximum 10 requests per second allowed from your IP address.'
        ));
    }
}
