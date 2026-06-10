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
    $body .= "<tr><th>Buyer Name</th><td>" . $interest['user_name'] . "</td></tr>";
    $body .= "<tr><th>Buyer Email</th><td>" . $interest['user_email'] . "</td></tr>";
    $body .= "<tr><th>Buyer Mobile</th><td>" . $interest['user_phone'] . "</td></tr>";
    $body .= "<tr><th>Opportunity</th><td>" . $opportunityName . "</td></tr>";
    $body .= "</table>";
    $body .= "<br><p>Please log in to the admin panel to process this interest.</p>";

    return send_email($body, $subject, ADMIN_NOTIFICATION_EMAIL, '');
}

/**
 * Notify Admin of a Status Escalation (Status change by Admin).
 */
function notify_admin_status_escalation($listing, $newStatus, $additionalInfo = null)
{
    $CI =& get_instance();
    $CI->load->helper('send_email');

    $subject = "Listing Status Escaplation - #" . $listing['sdSdID'] . " changed to " . $newStatus;
    
    $body = "<h3>Listing Status Escalation</h3>";
    $body .= "<p>An administrator has updated the status of a seller listing.</p>";
    $body .= "<table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; text-align: left;'>";
    $body .= "<tr><th>Listing ID</th><td>" . $listing['sdSdID'] . "</td></tr>";
    $body .= "<tr><th>Startup Name</th><td>" . $listing['sdStartupName'] . "</td></tr>";
    $body .= "<tr><th>Seller Name</th><td>" . $listing['sdUserName'] . "</td></tr>";
    $body .= "<tr><th>New Status</th><td><strong>" . $newStatus . "</strong></td></tr>";
    
    if (!empty($additionalInfo)) {
        $body .= "<tr><th>Admin Comment</th><td>" . nl2br($additionalInfo) . "</td></tr>";
    }

    $body .= "</table>";

    return send_email($body, $subject, ADMIN_NOTIFICATION_EMAIL, '');
}

/**
 * ============================================================================
 * SELLER MODULE NOTIFICATIONS (Reserved)
 * ============================================================================
 */

/**
 * ============================================================================
 * BUYER MODULE NOTIFICATIONS (Reserved)
 * ============================================================================
 */
?>
