<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Centralized Notification Helper for Growth91
 * Contains structured email templates for Admin, Seller, and Buyer modules.
 */

// Centralized Admin Email Address
if (!defined('ADMIN_NOTIFICATION_EMAIL')) {
    define('ADMIN_NOTIFICATION_EMAIL', 'cloudgenz.dev@gmail.com');
}

/**
 * ============================================================================
 * STANDARD HTML EMAIL TEMPLATE WRAPPER
 * ============================================================================
 */
function get_growth91_email_template($content)
{
    // Make sure WEB_BASE_URL is defined, fallback if not
    $baseUrl = defined('WEB_BASE_URL') ? WEB_BASE_URL : 'https://growth91.com/';
    $html = '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: sans-serif; font-size: 14px; line-height: 1.4; color: #333; margin: 0; padding: 0; background-color: #f6f6f6;">
    <div style="padding: 20px; background-color: #f6f6f6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background: #ffffff; border-radius: 5px; border: 1px solid #ddd;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="https://growth91.com/web/glogo.png" alt="Growth91 Logo" style="width: 150px; height: auto; max-width: 100%;">
            </div>
            <div style="margin-bottom: 20px;">
                ' . $content . '
            </div>
            <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 10px;">
                <p>This is an automated email. Please do not reply.</p>
                <p>&copy; ' . date("Y") . ' Growth91. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>';
    return $html;
}

/**
 * ============================================================================
 * ADMIN MODULE NOTIFICATIONS
 * ============================================================================
 */

/**
 * Notify Admin of a new Seller Listing submission.
 */
function notify_admin_new_seller_listing($listing)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $subject = "New Seller Listing Submitted - #" . $listing['sdSdID'];
    
    $body = "<h3>New Seller Listing Submission</h3>";
    $body .= "<p>A new seller listing has been submitted and requires review.</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Listing ID</th><td>" . $listing['sdSdID'] . "</td></tr>";
    $body .= "<tr><th>Username</th><td>" . $listing['sdUserName'] . "</td></tr>";
    $body .= "<tr><th>Startup Name</th><td>" . $listing['sdStartupName'] . "</td></tr>";
    $body .= "<tr><th>Instrument Type</th><td>" . $listing['sdInstrumentType'] . "</td></tr>";
    $body .= "</table>";
    $body .= "<br><p>Please log in to the admin panel to review the details.</p>";

    return send_email($body, $subject, ADMIN_NOTIFICATION_EMAIL, '');
}

/**
 * Notify Admin of a Seller Listing edit.
 */
function notify_admin_seller_listing_edit($listing, $oldStatus)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $subject = "Seller Listing Edited - #" . $listing['sdSdID'];
    
    $body = "<h3>Seller Listing Edited</h3>";
    $body .= "<p>A seller has edited an existing listing. The status has been reset from <strong>{$oldStatus}</strong> to <strong>Under Review</strong>.</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Listing ID</th><td>" . $listing['sdSdID'] . "</td></tr>";
    $body .= "<tr><th>Username</th><td>" . $listing['sdUserName'] . "</td></tr>";
    $body .= "<tr><th>Startup Name</th><td>" . $listing['sdStartupName'] . "</td></tr>";
    $body .= "<tr><th>Instrument Type</th><td>" . $listing['sdInstrumentType'] . "</td></tr>";
    $body .= "</table>";
    $body .= "<br><p>Please log in to the admin panel to review the updated details.</p>";

    return send_email($body, $subject, ADMIN_NOTIFICATION_EMAIL, '');
}

/**
 * Notify Admin of a new Buyer Interest.
 */
function notify_admin_buyer_interest($interest, $opportunityName)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $subject = "New Buyer Interest Received - " . $opportunityName;
    
    $body = "<h3>New Buyer Interest Received</h3>";
    $body .= "<p>A buyer has expressed interest in an opportunity.</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Buyer Name</th><td>" . $interest['buyer_name'] . "</td></tr>";
    $body .= "<tr><th>Buyer Email</th><td>" . $interest['buyer_email'] . "</td></tr>";
    $body .= "<tr><th>Buyer Mobile</th><td>" . $interest['buyer_mobile'] . "</td></tr>";
    $body .= "<tr><th>Opportunity</th><td>" . $opportunityName . "</td></tr>";
    $body .= "</table>";
    $body .= "<br><p>Please log in to the admin panel to process this interest.</p>";

    return send_email($body, $subject, ADMIN_NOTIFICATION_EMAIL, '');
}

/**
 * Notify Admin of a Status Escalation (Status change by Admin).
 */
function notify_admin_status_escalation($listing, $newStatus, $additionalInfo = null, $adminName = 'Unknown Admin')
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $subject = "Listing Status Escalation - #" . $listing['sdSdID'] . " changed to " . $newStatus;
    
    $body = "<h3>Listing Status Escalation</h3>";
    $body .= "<p>An administrator has updated the status of a seller listing.</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Listing ID</th><td>" . $listing['sdSdID'] . "</td></tr>";
    $body .= "<tr><th>Startup Name</th><td>" . $listing['sdStartupName'] . "</td></tr>";
    $body .= "<tr><th>Seller Name</th><td>" . $listing['sdUserName'] . "</td></tr>";
    $body .= "<tr><th>New Status</th><td><strong>" . $newStatus . "</strong></td></tr>";
    $body .= "<tr><th>Action By (Admin)</th><td>" . $adminName . "</td></tr>";
    
    if (!empty($additionalInfo)) {
        $body .= "<tr><th>Admin Comment</th><td>" . nl2br($additionalInfo) . "</td></tr>";
    }

    $body .= "</table>";

    return send_email($body, $subject, ADMIN_NOTIFICATION_EMAIL, '');
}

/**
 * ============================================================================
 * SELLER MODULE NOTIFICATIONS
 * ============================================================================
 */

function _get_user_email($userId)
{
    $CI =& get_instance();
    $user = $CI->db->get_where('users', ['investor_id' => $userId])->row_array();
    if (!$user) {
        $user = $CI->db->get_where('users', ['founder_id' => $userId])->row_array();
    }
    return $user ? $user['email'] : null;
}

function notify_seller_listing_submitted($listing)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $email = _get_user_email($listing['sdUserId']);
    if (!$email) return false;

    $subject = "Your Seller Listing has been Submitted";
    
    $body = "<h3>Listing Submitted Successfully</h3>";
    $body .= "<p>Dear " . $listing['sdUserName'] . ",</p>";
    $body .= "<p>Your listing has been submitted for review. Here are the details:</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Startup Name</th><td>" . $listing['sdStartupName'] . "</td></tr>";
    $body .= "<tr><th>Instrument Type</th><td>" . $listing['sdInstrumentType'] . "</td></tr>";
    $body .= "<tr><th>Quantity</th><td>" . $listing['sdQuantity'] . "</td></tr>";
    $body .= "<tr><th>Ask Price</th><td>" . $listing['sdAskPriceExpected'] . "</td></tr>";
    $body .= "</table>";
    $body .= "<br><p>Our team will review the details and get back to you shortly.</p>";

    $htmlBody = get_growth91_email_template($body);
    return send_email($htmlBody, $subject, $email, '');
}

function notify_seller_status_update($listing, $newStatus, $adminComment = '')
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $email = _get_user_email($listing['sdUserId']);
    if (!$email) return false;

    $subject = "Update on your Seller Listing - " . $listing['sdStartupName'];
    
    $body = "<h3>Listing Status Update</h3>";
    $body .= "<p>Dear " . $listing['sdUserName'] . ",</p>";

    if ($newStatus === 'Additional Information Required') {
        $body .= "<p>We need some additional information to process your listing for <strong>" . $listing['sdStartupName'] . "</strong>.</p>";
        if (!empty($adminComment)) {
            $body .= "<div style='background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;'>";
            $body .= "<strong>Admin Note:</strong><br/>" . nl2br($adminComment);
            $body .= "</div>";
        }
    } else if ($newStatus === 'Approved') {
        $body .= "<p>Great news! Your listing for <strong>" . $listing['sdStartupName'] . "</strong> has been approved.</p>";
    } else if ($newStatus === 'Rejected') {
        $body .= "<p>We regret to inform you that your listing for <strong>" . $listing['sdStartupName'] . "</strong> has been rejected.</p>";
    } else {
        $body .= "<p>The status of your listing for <strong>" . $listing['sdStartupName'] . "</strong> has been updated to <strong>" . $newStatus . "</strong>.</p>";
    }

    $body .= "<br><p>Log in to your dashboard to view more details.</p>";

    $htmlBody = get_growth91_email_template($body);
    return send_email($htmlBody, $subject, $email, '');
}

/**
 * ============================================================================
 * BUYER MODULE NOTIFICATIONS
 * ============================================================================
 */

function notify_buyer_interest_submitted($interest, $opportunityName)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $email = _get_user_email($interest['user_id']);
    if (!$email) return false;

    $subject = "Your Interest in " . $opportunityName . " has been received";
    
    $body = "<h3>Interest Submitted Successfully</h3>";
    $body .= "<p>Thank you for expressing interest in <strong>" . $opportunityName . "</strong>.</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Opportunity Name</th><td>" . $opportunityName . "</td></tr>";
    $body .= "<tr><th>Interest Type</th><td>" . $interest['interest_type'] . "</td></tr>";
    $body .= "<tr><th>Interest Value</th><td>" . $interest['interest_value'] . "</td></tr>";
    $body .= "</table>";
    $body .= "<br><p>Our team will review your submission and contact you soon.</p>";

    $htmlBody = get_growth91_email_template($body);
    return send_email($htmlBody, $subject, $email, '');
}

function notify_buyer_status_update($interest, $opportunityName, $oldStatus, $newStatus)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $email = _get_user_email($interest['user_id']);
    if (!$email) return false;

    $subject = "Status Update: Your Interest in " . $opportunityName;
    
    $body = "<h3>Interest Status Update</h3>";
    $body .= "<p>There is an update regarding your interest in <strong>" . $opportunityName . "</strong>.</p>";

    if ($newStatus === 'Cancelled') {
        $body .= "<p>Your opportunity interest has been <strong>Withdrawn</strong>.</p>";
    } else {
        $body .= "<p>The status of your interest has changed from <strong>" . $oldStatus . "</strong> to <strong>" . $newStatus . "</strong>.</p>";
    }

    $body .= "<br><p>Log in to your dashboard to view more details.</p>";

    $htmlBody = get_growth91_email_template($body);
    return send_email($htmlBody, $subject, $email, '');
}
?>
