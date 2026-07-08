<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class RateLimiter {

    protected $CI;
    protected $cache_adapter = 'file'; 

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->driver('cache', array('adapter' => $this->cache_adapter, 'backup' => 'file'));
    }

    
    public function check($options = array()) {
    
        $windowMs = isset($options['windowMs']) ? (int) $options['windowMs'] : 1000;
        $max      = isset($options['max'])      ? (int) $options['max']      : 10;
        $message  = isset($options['message'])  ? $options['message']        : 'Too many requests from this IP, please try again later.';
        $prefix   = isset($options['prefix'])   ? $options['prefix']         : 'global_ip';

   
        $ip = '';
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
        } elseif (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $ip = trim($ipList[0]);
        } elseif (!empty($_SERVER['REMOTE_ADDR'])) {
            $ip = $_SERVER['REMOTE_ADDR'];
        }
        if (empty($ip) || !filter_var($ip, FILTER_VALIDATE_IP)) {
            $ip = '0.0.0.0';
        }

        
        $windowSeconds = (int) ceil($windowMs / 1000);
        if ($windowSeconds < 1) {
            $windowSeconds = 1;
        }

        $cacheKey = "rl_" . md5("{$prefix}_{$ip}");

        
        $currentCount = (int) $this->CI->cache->get($cacheKey);

        
        if ($currentCount >= $max) {

            header('HTTP/1.1 429 Too Many Requests');
            header('Content-Type: application/json; charset=utf-8');
            header('Retry-After: ' . $windowSeconds);

            echo json_encode(array(
                'status'  => false,
                'error'   => 'RATE_LIMIT_EXCEEDED',
                'message' => $message
            ));
            exit;
        }

    
        $this->CI->cache->save($cacheKey, $currentCount + 1, $windowSeconds);
        return true;
    }
}
