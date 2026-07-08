<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class InvestorSuccess extends CI_Controller
{

  function send_success_msg()
  {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Request-Headers: GET,POST,OPTIONS,DELETE,PUT");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    $formdata = json_decode(file_get_contents('php://input'), true);
    // sql query
    $id = $formdata['investor_id'];
    $sql = "SELECT * FROM `users` WHERE investor_id='$id'";
    $query = $this->db->query($sql);
    $list = $query->result();


    if (isset($list)) {
      // 27/09/2022 shubham  (Mail reference : 004)
      $this->load->helper('send_email');
      $first_name = $list[0]->first_name;
      $email = $list[0]->email;

      // Query active deals for dynamic section
      $today = date('Y-m-d');
      $sql_deals = "SELECT * FROM `deals` WHERE `show_status` = '1' AND DATE(`deal_st_date`) <= '$today' AND DATE(`deal_end_date`) >= '$today' ORDER BY `deal_id` DESC";
      $query_deals = $this->db->query($sql_deals);
      $active_deals = $query_deals->result();

      $deals_html = '';
      if (!empty($active_deals)) {
        // Manual mapping of Deal Description and AIF Amount by Deal Name (not from DB - edit manually as needed)
        $deal_custom_data = [
          'FreshLeaf' => [
            'category' => "Foods and Beverages",
            'description' => "Freshleaf is building India's modern tea brand by upgrading the country's most consumed beverage category.",
            'aif_amount' => "₹2,00,000",
            'show_direct_cap' => 1
          ],
          'Rezlytix' => [
            'category' => "Artificial Intelligence",
            'description' => "Rezlytix is a deep-tech, AI-powered subsurface intelligence company improving oil & gas exploration through proprietary seismic super-resolution technology.",
            'aif_amount' => "₹3,00,000",
            'show_direct_cap' => 0
          ]
        ];

        // Helper to format numbers in Indian numbering system (e.g., 1000000 -> 10,00,000)
        $format_indian = function ($num) {
          if (!is_numeric($num)) return $num;
          $num = round($num);
          $str = (string)$num;
          $len = strlen($str);
          if ($len <= 3) return $str;
          $last3 = substr($str, -3);
          $rem = substr($str, 0, -3);
          $rem = preg_replace("/\B(?=(\d{2})+(?!\d))/", ",", $rem);
          return $rem . "," . $last3;
        };

        $deals_html .= '<p style="font-family: sans-serif; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px; color: #100050;">Featured Startup Investment Opportunities</p>';
        $deals_html .= '<p style="font-family: sans-serif; font-size: 14px; margin: 0; margin-bottom: 15px;">We currently have the following startups open for investment:</p>';

        $counter = 1;
        foreach ($active_deals as $deal) {
          $deal_name = !empty($deal->deal_name) ? trim($deal->deal_name) : 'Startup';

          // Match deal name against custom data (case-insensitive exact match)
          $matched_custom = null;
          foreach ($deal_custom_data as $key => $data) {
            if (strcasecmp(($key), trim($deal_name)) === 0) {
              $matched_custom = $data;
              break;
            }
          }

          // Format category/sector (use custom field if provided, otherwise from DB)
          $sector = '';
          if (!empty($matched_custom['category'])) {
            $sector = $matched_custom['category'];
          } elseif (!empty($matched_custom['deal_category'])) {
            $sector = $matched_custom['deal_category'];
          } elseif (!empty($deal->deal_category)) {
            $cat_decoded = json_decode($deal->deal_category, true);
            if (is_array($cat_decoded)) {
              $sector = implode(", ", $cat_decoded);
            } else {
              $sector = $deal->deal_category;
            }
          } else {
            $sector = 'General';
          }

          // Look up custom description from manual map (not from DB)
          $desc_text = isset($matched_custom['description']) ? $matched_custom['description'] : "A high-potential startup curated by Growth91.";
          $desc_html = '<p style="font-family: sans-serif; font-size: 13px; margin: 0 0 12px 0; color: #444; line-height: 1.5;">' . $desc_text . '</p>';

          // Direct Cap Table amount (from DB field Min_inv_amt formatted in Indian numbering system)
          $min_inv = !empty($deal->Min_inv_amt) && is_numeric($deal->Min_inv_amt) ? '₹' . $format_indian($deal->Min_inv_amt) : '₹' . ($deal->Min_inv_amt ? $deal->Min_inv_amt : '10,00,000');

          // Look up custom AIF amount from manual map (not from DB)
          $aif_text = isset($matched_custom['aif_amount']) ? $matched_custom['aif_amount'] : "₹2,00,000";

          // Link
          $deal_link = !empty($deal->page_link) ? $deal->page_link : 'deals';
          if (strpos($deal_link, 'http://') !== 0 && strpos($deal_link, 'https://') !== 0) {
            $deal_url = 'https://growth91.com/' . ltrim($deal_link, '/');
          } else {
            $deal_url = $deal_link;
          }

          $deals_html .= '<div style="margin-bottom: 20px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; background-color: #fafafa;">';
          $deals_html .= '<p style="font-family: sans-serif; font-size: 15px; font-weight: bold; margin: 0 0 5px 0; color: #100050;">' . $counter . '. ' . htmlspecialchars($deal_name) . '</p>';
          $deals_html .= '<p style="font-family: sans-serif; font-size: 13px; margin: 0 0 10px 0; color: #555;"><strong>Sector:</strong> ' . htmlspecialchars($sector) . '</p>';
          $deals_html .= $desc_html;
          $deals_html .= '<p style="font-family: sans-serif; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">Minimum Investment:</p>';
          $deals_html .= '<ul style="font-family: sans-serif; font-size: 13px; margin: 0 0 15px 0; padding-left: 20px; color: #333;">';
          if (isset($matched_custom['show_direct_cap']) && $matched_custom['show_direct_cap'] == 1) {
            $deals_html .= '<li style="margin-bottom: 4px;">Invest through Direct Cap Table: <strong>' . $min_inv . '</strong></li>';
          }
          $deals_html .= '<li style="margin-bottom: 4px;">Invest through Alternative Investment Fund (AIF): <strong>' . $aif_text . '</strong></li>';
          $deals_html .= '</ul>';
          $deals_html .= '<div style="margin-top: 10px;">';
          $deals_html .= '<a href="' . $deal_url . '" style="background-color: #100050; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; font-size: 13px;">Explore Deal &rarr;</a>';
          $deals_html .= '</div>';
          $deals_html .= '</div>';

          $counter++;
        }

        $deals_html .= '<div style="text-align: center; margin-top: 25px; margin-bottom: 25px;">';
        $deals_html .= '<a href="https://growth91.com/deals" style="background-color: #34495e; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; font-size: 14px;">Explore More Startup Investment Opportunities</a>';
        $deals_html .= '</div>';
      }

      $body = '<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Welcome to Growth91 – Invest in High-Potential Startups</title>
                <style>
                @media only screen and (max-width: 620px) {
                  table.body h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                  }
                
                  table.body p,
                table.body ul,
                table.body ol,
                table.body td,
                table.body span,
                table.body a {
                    font-size: 16px !important;
                  }
                
                  table.body .wrapper,
                table.body .article {
                    padding: 10px !important;
                  }
                
                  table.body .content {
                    padding: 0 !important;
                  }
                
                  table.body .container {
                    padding: 0 !important;
                    width: 100% !important;
                  }
                
                  table.body .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
                
                  table.body .btn table {
                    width: 100% !important;
                  }
                
                  table.body .btn a {
                    width: 100% !important;
                  }
                
                  table.body .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                  }
                }
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
                
                  .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                  }
                
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
                
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
                
                  .btn-primary table td:hover {
                    background-color: #34495e !important;
                  }
                
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important;
                  }
                }
                </style>
                  </head>
                  <body style="color: black; background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; color:black">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                
                            <!-- START CENTERED WHITE CONTAINER -->
                            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                
                              <!-- START MAIN CONTENT AREA -->
                              <tr>
                                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                        <div style="text-align: center; margin-bottom: 20px;" class="imgRes col-sm-12 col-md-12 col-lg-12">
                                          <img src="https://growth91.com/web/Growth91Logonew.png" alt="Growth91 Logo" width="140" border="0" style="width:140px; max-width:140px; height:auto; display:inline-block; border:none; outline:none; text-decoration:none;">
                                        </div>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Dear <strong>' . $first_name . '</strong>, 
                                            <br><br>
                                            Thank you for registering on Growth91.
                                            <br><br>
                                            We are delighted to welcome you to the Growth91 community - a startup investment marketplace that connects investors with carefully curated, high-potential startups seeking growth capital.
                                            <br><br>
                                            As a member of Growth91, you can:
                                        </p>
                                        <ul style="font-family: sans-serif; font-size: 14px; margin: 0 0 15px 0; padding-left: 20px; line-height: 1.6;">
                                            <li>Explore curated startup investment opportunities across diverse sectors.</li>
                                            <li>Access detailed information on startups, including their business model, traction, financials, and investment terms.</li>
                                            <li>Track startups that are currently raising funds.</li>
                                            <li>Build a diversified startup investment portfolio.</li>
                                            <li>Receive updates on newly listed investment opportunities and key platform developments.</li>
                                        </ul>
                                        
                                        ' . $deals_html . '

                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">
                                            If you need any assistance or have any questions, our team will be happy to help. Simply write to <a href="mailto:contact@growth91.com" style="color: #100050; text-decoration: underline;">contact@growth91.com</a>.
                                            <br><br>
                                            Thank you for choosing Growth91. We look forward to being a part of your startup investment journey.
                                            <br><br>
                                            Warm regards,<br>
                                            Growth91 Team <br><br>
                                          
                                          PS: This is an automated email. Please do not reply. 
                                        </p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                
                            <!-- END MAIN CONTENT AREA -->
                            </table>
                            <!-- END CENTERED WHITE CONTAINER -->
                
                            <!-- START FOOTER -->
                            <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                <tr>
                                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                    <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Growth91 Advisors Private Limited</span>
                                  </td>
                                </tr>
                                <tr>
                                <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                Powered by <a href="https://growth91.com" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">Growth91</a>.
                              </td>
                                </tr>
                              </table>
                            </div>
                            <!-- END FOOTER -->
                
                          </div>
                        </td>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                      </tr>
                    </table>
                  </body>
            </html>';
      $subject = 'Welcome to Growth91 – Invest in High-Potential Startups';
      $cc = '';
      $ress = send_email($body, $subject, $email, $cc);

      // 27/09/22 Changes done (shubham)
    }

    $this->output
      ->set_content_type('application/json')
      ->set_output(json_encode($ress));
  }

}