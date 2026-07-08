<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class RateLimitHook {

    public function check_global_ip() {

        if (is_cli()) {
            return;
        }

        $CI =& get_instance();
        
        $CI->load->library('RateLimiter');

        // 1. Apply global IP limit: 5 requests per second (1000ms window)
        $CI->ratelimiter->check(array(
            'prefix'   => 'global_ip',
            'windowMs' => 1000,
            'max'      => 5,   
            'message'  => 'Rate limit exceeded. Maximum 5 requests per second allowed from your IP address.'
        ));

        // 2. Define Explicit Whitelist Arrays for Signup and Login/OTP endpoints
        $signupEndpoints = array(
            'investor/register',
            'investor/sendregisterotp',
            'investor/register_premium_member',
            'investor/addinvestor',
            'investor/addinvestorviafamily',
            'investor/addinvestorviafamilywithoutemail',
            'users/sendregisterotp',
            'founders/registernewfounder',
            'founders/addnewfounder',
            'fundraise/register'
        );

        $loginEndpoints = array(
            'login/signin',
            'investor/sendotp',
            'investor/sendotponmobile',
            'founders/sendotp',
            'users/loginusinggoogle',
            'users/loginusinggoogleforfounder',
            'users/setsignindata',
            'community/setsignindata',
            'authenticate/verify_user',
            'adharverification/verify_adhar_otp',
            'investors/investorcontroller/familyinviteotp'
        );

        // Extract normalized route information
        $class  = strtolower($CI->router->fetch_class());
        $method = strtolower($CI->router->fetch_method());
        $uri    = strtolower($CI->uri->uri_string());
        $route  = $class . '/' . $method;

        // Exclude admin controllers as requested
        if ($class === 'admin' || strpos($uri, 'admin/') === 0) {
            return;
        }

        // 3. Check if current request matches any Signup Endpoint
        $isSignup = false;
        foreach ($signupEndpoints as $endpoint) {
            if ($route === $endpoint || $uri === $endpoint || strpos($uri, $endpoint) !== false || strpos($route, $endpoint) !== false) {
                $isSignup = true;
                break;
            }
        }

        if ($isSignup) {
            // Daily cap: 5 requests per day (86400000 ms)
            $CI->ratelimiter->check(array(
                'prefix'   => 'signup_day',
                'windowMs' => 86400000,
                'max'      => 5,
                'message'  => 'Daily signup attempt limit reached (5 per day). Please try again tomorrow.'
            ));

            // Short burst limit: 1 request per 10 seconds
            $CI->ratelimiter->check(array(
                'prefix'   => 'signup_10s',
                'windowMs' => 10000,
                'max'      => 1,
                'message'  => 'Too many signup attempts. Please wait 10 seconds before trying again.'
            ));
            return;
        }

        // 4. Check if current request matches any Login / OTP Endpoint
        $isLogin = false;
        foreach ($loginEndpoints as $endpoint) {
            if ($route === $endpoint || $uri === $endpoint || strpos($uri, $endpoint) !== false || strpos($route, $endpoint) !== false) {
                $isLogin = true;
                break;
            }
        }

        if ($isLogin) {
            // Daily cap: 10 requests per day (86400000 ms)
            $CI->ratelimiter->check(array(
                'prefix'   => 'login_day',
                'windowMs' => 86400000,
                'max'      => 10,
                'message'  => 'Daily login attempt limit reached (10 per day). Please try again tomorrow.'
            ));

            // Short burst limit: 1 request per 10 seconds
            $CI->ratelimiter->check(array(
                'prefix'   => 'login_10s',
                'windowMs' => 10000,
                'max'      => 1,
                'message'  => 'Too many login attempts. Please wait 10 seconds before trying again.'
            ));
            return;
        }
    }
}

