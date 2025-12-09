import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  Button,
  Spin,
  Checkbox,
  message,
  Modal,
  Input,
  Divider,
} from "antd";
import Navbar from "./common/Navbar";
import Sidebar2 from "./common/Sidebar2";
import BottomBar from "./common/BottomBar";
import axios from "axios";

const { Content } = Layout;

class RolesPermissions extends Component {
  state = {
    roles: [],
    selectedRoleId: null,
    permsLoading: false,
    perms: {},
    addRoleVisible: false,
    newRoleName: "",
  };

  componentDidMount() {
    this.loadRoles();
  }

  getCurrentAdminId = () => {
    const raw = localStorage.getItem("admin_login");
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed.value;
    } catch {
      return null;
    }
  };

  loadRoles = async () => {
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/listRoles`,
        {
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        const allRoles = res.data.data || [];
        const roles = allRoles.filter((r) => r.name !== "super_admin");

        this.setState({ roles });

        if (roles.length > 0) {
          const firstId = parseInt(roles[0].id, 10);
          this.loadRolePermissions(firstId);
        }
      } else {
        message.error(res.data?.message || "Failed to load roles");
      }
    } catch (err) {
      console.error(err);
      message.error("Error loading roles");
    }
  };

  loadRolePermissions = async (roleId) => {
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    this.setState({ permsLoading: true, selectedRoleId: roleId, perms: {} });

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/getRole`,
        {
          params: { role_id: roleId },
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        const pj = res.data.data.permissions_json || "{}";
        const perms = JSON.parse(pj);
        this.setState({ perms });
      } else {
        message.error(res.data?.message || "Failed to load role");
      }
    } catch (err) {
      console.error(err);
      message.error("Error loading role");
    } finally {
      this.setState({ permsLoading: false });
    }
  };

  // toggle using checked flag from Checkbox
  togglePerm = (module, action, checked) => {
    this.setState((prev) => {
      const perms = { ...prev.perms };
      if (!perms[module]) perms[module] = {};

      if (checked) {
        perms[module][action] = true;
      } else {
        delete perms[module][action];
        if (Object.keys(perms[module]).length === 0) {
          delete perms[module];
        }
      }

      return { perms };
    });
  };

  renderPermissionsMatrix = (perms) => {
    const check = (m, a) => !!(perms[m] && perms[m][a]);

    return (
      <>
        {/* Master Data – Startups */}
        <h6>Master Data – Startups</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("startups", "view")}
            onChange={(e) =>
              this.togglePerm("startups", "view", e.target.checked)
            }
          >
            View
          </Checkbox>

          <Checkbox
            checked={check("startups", "add")}
            onChange={(e) =>
              this.togglePerm("startups", "add", e.target.checked)
            }
          >
            Add New Startup
          </Checkbox>

          <Checkbox
            checked={check("startups", "edit")}
            onChange={(e) =>
              this.togglePerm("startups", "edit", e.target.checked)
            }
          >
            Edit
          </Checkbox>

          <Checkbox
            checked={check("startups", "delete")}
            onChange={(e) =>
              this.togglePerm("startups", "delete", e.target.checked)
            }
          >
            Delete
          </Checkbox>

          <Checkbox
            checked={check("startups", "export")}
            onChange={(e) =>
              this.togglePerm("startups", "export", e.target.checked)
            }
          >
            Export Data
          </Checkbox>

          <Checkbox
            checked={check("startups", "documents")}
            onChange={(e) =>
              this.togglePerm("startups", "documents", e.target.checked)
            }
          >
            Documents
          </Checkbox>
          <Checkbox
            checked={check("startups", "analytics")}
            onChange={(e) =>
              this.togglePerm("startups", "analytics", e.target.checked)
            }
          >
            Analytics
          </Checkbox>
        </div>

        <Divider/>

        {/* Master Data – Investors */}
        <h6>Master Data – Investors</h6>
        <div className="mb-2">
          {/* View list & basic info */}
          <Checkbox
            checked={check("investors", "view")}
            onChange={(e) =>
              this.togglePerm("investors", "view", e.target.checked)
            }
          >
            View
          </Checkbox>

          {/* Create new investor records */}
          <Checkbox
            checked={check("investors", "add")}
            onChange={(e) =>
              this.togglePerm("investors", "add", e.target.checked)
            }
          >
            Add Investor
          </Checkbox>

          {/* Edit existing investor profile fields */}
          <Checkbox
            checked={check("investors", "edit")}
            onChange={(e) =>
              this.togglePerm("investors", "edit", e.target.checked)
            }
          >
            Edit Investor
          </Checkbox>

          {/* Block / Unblock investor account */}
          <Checkbox
            checked={check("investors", "block")}
            onChange={(e) =>
              this.togglePerm("investors", "block", e.target.checked)
            }
          >
            Block / Unblock Investor
          </Checkbox>

          {/* Export investor list */}
          <Checkbox
            checked={check("investors", "export")}
            onChange={(e) =>
              this.togglePerm("investors", "export", e.target.checked)
            }
          >
            Export Data
          </Checkbox>

          {/* KYC verification & approval actions */}
          <Checkbox
            checked={check("investors", "approve")}
            onChange={(e) =>
              this.togglePerm("investors", "approve", e.target.checked)
            }
          >
            KYC Approve / Update
          </Checkbox>

          {/* View individual investor dashboard/portfolio */}
          <Checkbox
            checked={check("investors", "dashboard")}
            onChange={(e) =>
              this.togglePerm("investors", "dashboard", e.target.checked)
            }
          >
            View Investor Dashboard
          </Checkbox>

          {/* G91 Money modal & operations */}
          <Checkbox
            checked={check("investors", "g91_money")}
            onChange={(e) =>
              this.togglePerm("investors", "g91_money", e.target.checked)
            }
          >
            Manage G91 Money
          </Checkbox>
        </div>

         <Divider/>

        {/* Master Data – Founders */}
        <h6>Master Data – Founders</h6>
        <div className="mb-2">
          {/* View list & basic info */}
          <Checkbox
            checked={check("founders", "view")}
            onChange={(e) =>
              this.togglePerm("founders", "view", e.target.checked)
            }
          >
            View
          </Checkbox>

          {/* Create new founder records */}
          <Checkbox
            checked={check("founders", "add")}
            onChange={(e) =>
              this.togglePerm("founders", "add", e.target.checked)
            }
          >
            Add Founder
          </Checkbox>

          {/* Edit existing founder profile fields */}
          <Checkbox
            checked={check("founders", "edit")}
            onChange={(e) =>
              this.togglePerm("founders", "edit", e.target.checked)
            }
          >
            Edit Founder
          </Checkbox>

          {/* Export founders list */}
          <Checkbox
            checked={check("founders", "export")}
            onChange={(e) =>
              this.togglePerm("founders", "export", e.target.checked)
            }
          >
            Export Data
          </Checkbox>

          {/* Block / Unblock founder account */}
          <Checkbox
            checked={check("founders", "block")}
            onChange={(e) =>
              this.togglePerm("founders", "block", e.target.checked)
            }
          >
            Block / Unblock Founder
          </Checkbox>

          {/* Access founder dashboard */}
          <Checkbox
            checked={check("founders", "dashboard")}
            onChange={(e) =>
              this.togglePerm("founders", "dashboard", e.target.checked)
            }
          >
            Access Dashboard
          </Checkbox>

          {/* Edit unicorn plan details */}
          <Checkbox
            checked={check("founders", "unicorn_plan")}
            onChange={(e) =>
              this.togglePerm("founders", "unicorn_plan", e.target.checked)
            }
          >
            Edit Unicorn Plan
          </Checkbox>
        </div>

        <Divider />

        <h6>Master Data – Investments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("investments", "view")}
            onChange={(e) =>
              this.togglePerm("investments", "view", e.target.checked)
            }
          >
            View
          </Checkbox>

          <Checkbox
            checked={check("investments", "export")}
            onChange={(e) =>
              this.togglePerm("investments", "export", e.target.checked)
            }
          >
            Export Data
          </Checkbox>

          <Checkbox
            checked={check("investments", "approve")}
            onChange={(e) =>
              this.togglePerm("investments", "approve", e.target.checked)
            }
          >
            Approve Investment
          </Checkbox>

          <Checkbox
            checked={check("investments", "transfer")}
            onChange={(e) =>
              this.togglePerm("investments", "transfer", e.target.checked)
            }
          >
            Transfer Funds
          </Checkbox>

          <Checkbox
            checked={check("investments", "edit")}
            onChange={(e) =>
              this.togglePerm("investments", "edit", e.target.checked)
            }
          >
            Edit Investment
          </Checkbox>

          <Checkbox
            checked={check("investments", "request_sign")}
            onChange={(e) =>
              this.togglePerm("investments", "request_sign", e.target.checked)
            }
          >
            Request Document Signing
          </Checkbox>
        </div>

        <Divider />

        {/* Groups */}
        <h6>Group Investments Data - Group Investments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("groups", "view")}
            onChange={(e) =>
              this.togglePerm("groups", "view", e.target.checked)
            }
          >
            View Group Investments
          </Checkbox>

          <Checkbox
            checked={check("groups", "export")}
            onChange={(e) =>
              this.togglePerm("groups", "export", e.target.checked)
            }
          >
            Export Group Investments
          </Checkbox>

          <Checkbox
            checked={check("groups", "manage")}
            onChange={(e) =>
              this.togglePerm("groups", "manage", e.target.checked)
            }
          >
            Manage / Remove
          </Checkbox>
        </div>

        <Divider />

        <h6>Group Investments Data - Group Remove Requests</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("group_remove_requests", "view")}
            onChange={(e) =>
              this.togglePerm("group_remove_requests", "view", e.target.checked)
            }
          >
            View Group Remove Requests
          </Checkbox>

          <Checkbox
            checked={check("group_remove_requests", "export")}
            onChange={(e) =>
              this.togglePerm("group_remove_requests", "export", e.target.checked)
            }
          >
            Export Group Remove Requests
          </Checkbox>

          <Checkbox
            checked={check("group_remove_requests", "approve")}
            onChange={(e) =>
              this.togglePerm("group_remove_requests", "approve", e.target.checked)
            }
          >
            Approve / Delete Requests
          </Checkbox>
        </div>

        <Divider />

        {/* Future Unicorn – View Published Unicorns */}
        <h6>Future Unicorn – View Published Unicorns</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("unicorns_published", "view")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "view", e.target.checked)
            }
          >
            View Published Unicorns
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "export")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "export", e.target.checked)
            }
          >
            Export Unicorns List
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "preview")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "preview", e.target.checked)
            }
          >
            Unicorn Preview
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "view_plan")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "view_plan", e.target.checked)
            }
          >
            View Unicorn Plan
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "view_form")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "view_form", e.target.checked)
            }
          >
            Unicorn Form Preview
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "view_additional_form")}
            onChange={(e) =>
              this.togglePerm(
                "unicorns_published",
                "view_additional_form",
                e.target.checked
              )
            }
          >
            Unicorn Additional Form Preview
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "view_enquiries")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "view_enquiries", e.target.checked)
            }
          >
            View Enquiries
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "export_enquiries")}
            onChange={(e) =>
              this.togglePerm(
                "unicorns_published",
                "export_enquiries",
                e.target.checked
              )
            }
          >
            Export Enquiries
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "edit_publish")}
            onChange={(e) =>
              this.togglePerm("unicorns_published", "edit_publish", e.target.checked)
            }
          >
            Edit Publish / Category
          </Checkbox>

          <Checkbox
            checked={check("unicorns_published", "toggle_highlight")}
            onChange={(e) =>
              this.togglePerm(
                "unicorns_published",
                "toggle_highlight",
                e.target.checked
              )
            }
          >
            Mark / Remove Highlight
          </Checkbox>
        </div>

        <Divider />

        {/* Future Unicorn – View All Unicorns */}
        <h6>Future Unicorn – View All Unicorns</h6>
        <div className="mb-2">
          <Checkbox
            checked={!!(perms["unicorns_all"] && perms["unicorns_all"].view)}
            onChange={(e) =>
              this.togglePerm("unicorns_all", "view", e.target.checked)
            }
          >
            View All Unicorns
          </Checkbox>

          <Checkbox
            checked={!!(perms["unicorns_all"] && perms["unicorns_all"].export)}
            onChange={(e) =>
              this.togglePerm("unicorns_all", "export", e.target.checked)
            }
          >
            Export All Unicorns List
          </Checkbox>

          <Checkbox
            checked={!!(perms["unicorns_all"] && perms["unicorns_all"].export_single)}
            onChange={(e) =>
              this.togglePerm("unicorns_all", "export_single", e.target.checked)
            }
          >
            Export Single Unicorn Data
          </Checkbox>

          <Checkbox
            checked={!!(perms["unicorns_all"] && perms["unicorns_all"].download_product_deck)}
            onChange={(e) =>
              this.togglePerm("unicorns_all", "download_product_deck", e.target.checked)
            }
          >
            Download Product Deck
          </Checkbox>

          <Checkbox
            checked={!!(perms["unicorns_all"] && perms["unicorns_all"].download_pitch_deck)}
            onChange={(e) =>
              this.togglePerm("unicorns_all", "download_pitch_deck", e.target.checked)
            }
          >
            Download Pitch Deck
          </Checkbox>
        </div>

        <Divider />



        {/* Future Unicorn – Payments */}
        <h6>Future Unicorn – Payments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("unicorns_payments", "view")}
            onChange={(e) =>
              this.togglePerm("unicorns_payments", "view", e.target.checked)
            }
          >
            View Payments
          </Checkbox>

          <Checkbox
            checked={check("unicorns_payments", "export")}
            onChange={(e) =>
              this.togglePerm("unicorns_payments", "export", e.target.checked)
            }
          >
            Export Payments Data
          </Checkbox>

          <Checkbox
            checked={check("unicorns_payments", "add_offline_payment")}
            onChange={(e) =>
              this.togglePerm(
                "unicorns_payments",
                "add_offline_payment",
                e.target.checked
              )
            }
          >
            Add Offline Payment
          </Checkbox>
        </div>

        <Divider/>
        

        {/* Premium Members */}
        <h6>Premium Members</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("premium_members", "view")}
            onChange={(e) =>
              this.togglePerm("premium_members", "view", e.target.checked)
            }
          >
            View
          </Checkbox>

          <Checkbox
            checked={check("premium_members", "export")}
            onChange={(e) =>
              this.togglePerm("premium_members", "export", e.target.checked)
            }
          >
            Export Data
          </Checkbox>
        </div>

        <Divider/>

        {/* Deal Setup */}
        <h6>Deal Setup - Open Deal</h6>
        <div className="mb-2">
          {/* Existing */}
          <Checkbox
            checked={check("deals", "view_open")}
            onChange={(e) =>
              this.togglePerm("deals", "view_open", e.target.checked)
            }
          >
            View Open Deals
          </Checkbox>

          <Checkbox
            checked={check("deals", "create")}
            onChange={(e) =>
              this.togglePerm("deals", "create", e.target.checked)
            }
          >
            Create Deals
          </Checkbox>

          <Checkbox
            checked={check("deals", "export")}
            onChange={(e) =>
              this.togglePerm("deals", "export", e.target.checked)
            }
          >
            Export Deals Overview
          </Checkbox>

          {/* NEW granular actions for OpenDeals.js */}
          <Checkbox
            checked={check("deals", "update_status")}
            onChange={(e) =>
              this.togglePerm("deals", "update_status", e.target.checked)
            }
          >
            Update Deal Status
          </Checkbox>
          
          <Checkbox
            checked={check("deals", "view_pitches")}
            onChange={(e) =>
              this.togglePerm("deals", "view_pitches", e.target.checked)
            }
          >
            View Pitch List
          </Checkbox>

          <Checkbox
            checked={check("deals", "edit")}
            onChange={(e) =>
              this.togglePerm("deals", "edit", e.target.checked)
            }
          >
            Edit Deal 
          </Checkbox>

          <Checkbox
            checked={check("deals", "view_commitments")}
            onChange={(e) =>
              this.togglePerm("deals", "view_commitments", e.target.checked)
            }
          >
            View Commitments
          </Checkbox>

          <Checkbox
            checked={check("deals", "invite_investors")}
            onChange={(e) =>
              this.togglePerm("deals", "invite_investors", e.target.checked)
            }
          >
            Invite Investors
          </Checkbox>

          <Checkbox
            checked={check("deals", "offline_payment")}
            onChange={(e) =>
              this.togglePerm("deals", "offline_payment", e.target.checked)
            }
          >
            Offline Payment
          </Checkbox>

           <Checkbox
            checked={check("deals", "copy_url")}
            onChange={(e) =>
              this.togglePerm("deals", "copy_url", e.target.checked)
            }
          >
            Copy Deal URL
          </Checkbox>

          <Checkbox
            checked={check("deals", "add_commitment")}
            onChange={(e) =>
              this.togglePerm("deals", "add_commitment", e.target.checked)
            }
          >
            Add Commitment
          </Checkbox>

          <Checkbox
            checked={check("deals", "export_commitments_founder")}
            onChange={(e) =>
              this.togglePerm("deals", "export_commitments_founder", e.target.checked)
            }
          >
            Export For Startup Founder
          </Checkbox>

          <Checkbox
            checked={check("deals", "export_commitments_reconciliation")}
            onChange={(e) =>
              this.togglePerm(
                "deals",
                "export_commitments_reconciliation",
                e.target.checked
              )
            }
          >
            Export For Reconciliation
          </Checkbox>

         
        </div>
        <Divider/>

        <h6>Deal Setup - Completed Deal</h6>
        <Checkbox
          checked={check("deals_completed", "view")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "view", e.target.checked)
          }
        >
          View Completed Deals page
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "export")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "export", e.target.checked)
          }
        >
          Export Deals Overview
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "update_status")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "update_status", e.target.checked)
          }
        >
          Update Deal Status
        </Checkbox>

         <Checkbox
          checked={check("deals_completed", "view_pitches")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "view_pitches", e.target.checked)
          }
        >
          View Pitch List
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "edit_deal")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "edit_deal", e.target.checked)
          }
        >
          Edit Deal
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "view_commitments")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "view_commitments", e.target.checked)
          }
        >
          View Commitments
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "manage_payment_link")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "manage_payment_link", e.target.checked)
          }
        >
          Activate Payment Link
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "invite_investors")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "invite_investors", e.target.checked)
          }
        >
          Invite Investors
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "offline_payment")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "offline_payment", e.target.checked)
          }
        >
          Offline Payment
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "copy_url")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "copy_url", e.target.checked)
          }
        >
          Copy Deal URL
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "add_commitment")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "add_commitment", e.target.checked)
          }
        >
          Add New Commitment
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "edit_commitment")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "edit_commitment", e.target.checked)
          }
        >
          Edit / Update Commitment 
        </Checkbox>

        <Checkbox
          checked={check("deals_completed", "export_commitments")}
          onChange={(e) =>
            this.togglePerm("deals_completed", "export_commitments", e.target.checked)
          }
        >
          Export Commitment List
        </Checkbox>

        <Divider />

        {/* Retail Referral */}
        <h6>Referral - Retail Referral</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("retail_referral", "view")}
            onChange={(e) =>
              this.togglePerm("retail_referral", "view", e.target.checked)
            }
          >
            View Retail Referral
          </Checkbox>

          <Checkbox
            checked={check("retail_referral", "export")}
            onChange={(e) =>
              this.togglePerm("retail_referral", "export", e.target.checked)
            }
          >
            Export Retail Referral
          </Checkbox>
        </div>
        <Divider />

        {/* Institutional Referral */}
        <h6>Referral - Institutional Referral</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("institutional_referral", "view")}
            onChange={(e) =>
              this.togglePerm("institutional_referral", "view", e.target.checked)
            }
          >
            View Institutional Referral
          </Checkbox>

          <Checkbox
            checked={check("institutional_referral", "create")}
            onChange={(e) =>
              this.togglePerm("institutional_referral", "create", e.target.checked)
            }
          >
            Add New Institutional Referral
          </Checkbox>

          <Checkbox
            checked={check("institutional_referral", "update_status")}
            onChange={(e) =>
              this.togglePerm(
                "institutional_referral",
                "update_status",
                e.target.checked
              )
            }
          >
            Update Referral Status
          </Checkbox>

          <Checkbox
            checked={check("institutional_referral", "delete")}
            onChange={(e) =>
              this.togglePerm("institutional_referral", "delete", e.target.checked)
            }
          >
            Delete Referral
          </Checkbox>

          <Checkbox
            checked={check("institutional_referral", "view_detail")}
            onChange={(e) =>
              this.togglePerm("institutional_referral", "view_detail", e.target.checked)
            }
          >
            View Referral Details
          </Checkbox>

          <Checkbox
            checked={check("institutional_referral", "export")}
            onChange={(e) =>
              this.togglePerm("institutional_referral", "export", e.target.checked)
            }
          >
            Export Institutional Referral
          </Checkbox>
        </div>

        <Divider />

        {/* Payments – Online Payments */}
        <h6>Payments – Online Payments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("payments_online", "view")}
            onChange={(e) =>
              this.togglePerm("payments_online", "view", e.target.checked)
            }
          >
            View Online Payments
          </Checkbox>

          {/* Optional: export permission, if/when you add export button */}
          <Checkbox
            checked={check("payments_online", "export")}
            onChange={(e) =>
              this.togglePerm("payments_online", "export", e.target.checked)
            }
          >
            Export Online Payments
          </Checkbox>
        </div>

        <Divider />

        {/* Payments – Offline Payments */}
        <h6>Payments – Offline Payments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("payments_offline", "view")}
            onChange={(e) =>
              this.togglePerm("payments_offline", "view", e.target.checked)
            }
          >
            View Offline Payments
          </Checkbox>

          <Checkbox
            checked={check("payments_offline", "export")}
            onChange={(e) =>
              this.togglePerm("payments_offline", "export", e.target.checked)
            }
          >
            Export Offline Payments
          </Checkbox>
        </div>

        <Divider />

        {/* Payments – Pending Offline Payments */}
        <h6>Payments – Pending Offline Payments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("payments_offline_pending", "view")}
            onChange={(e) =>
              this.togglePerm("payments_offline_pending", "view", e.target.checked)
            }
          >
            View Pending Offline Payments
          </Checkbox>

          <Checkbox
            checked={check("payments_offline_pending", "export")}
            onChange={(e) =>
              this.togglePerm("payments_offline_pending", "export", e.target.checked)
            }
          >
            Export Pending Offline Payments
          </Checkbox>

          <Checkbox
            checked={check("payments_offline_pending", "approve")}
            onChange={(e) =>
              this.togglePerm("payments_offline_pending", "approve", e.target.checked)
            }
          >
            Approve Pending Offline Payments
          </Checkbox>
        </div>

        <Divider />

        {/* Payments – Document Payments */}
        <h6>Payments – Document Payments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("payments_documents", "view")}
            onChange={(e) =>
              this.togglePerm("payments_documents", "view", e.target.checked)
            }
          >
            View Document Payments
          </Checkbox>

          <Checkbox
            checked={check("payments_documents", "export")}
            onChange={(e) =>
              this.togglePerm("payments_documents", "export", e.target.checked)
            }
          >
            Export Document Payments
          </Checkbox>
        </div>

        <Divider />

        {/* Master Data – Founder Documents */}
        <h6>Founder Documents</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("founder_documents", "view")}
            onChange={(e) =>
              this.togglePerm("founder_documents", "view", e.target.checked)
            }
          >
            View Founder Documents
          </Checkbox>

          <Checkbox
            checked={check("founder_documents", "founder")}
            onChange={(e) =>
              this.togglePerm("founder_documents", "founder", e.target.checked)
            }
          >
            Founder
          </Checkbox>

          <Checkbox
            checked={check("founder_documents", "assessment")}
            onChange={(e) =>
              this.togglePerm("founder_documents", "assessment", e.target.checked)
            }
          >
            Founder Assessment
          </Checkbox>
        </div>

        <Divider />
        
        {/* Documents */}
        <h6>Documents</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("documents", "view")}
            onChange={(e) =>
              this.togglePerm("documents", "view", e.target.checked)
            }
          >
            View Documents
          </Checkbox>

          <Checkbox
            checked={check("documents", "add")}
            onChange={(e) =>
              this.togglePerm("documents", "add", e.target.checked)
            }
          >
            Add Document
          </Checkbox>

          <Checkbox
            checked={check("documents", "edit")}
            onChange={(e) =>
              this.togglePerm("documents", "edit", e.target.checked)
            }
          >
            Edit Document
          </Checkbox>

          <Checkbox
            checked={check("documents", "delete")}
            onChange={(e) =>
              this.togglePerm("documents", "delete", e.target.checked)
            }
          >
            Delete Document
          </Checkbox>

          <Checkbox
            checked={check("documents", "download")}
            onChange={(e) =>
              this.togglePerm("documents", "download", e.target.checked)
            }
          >
            Download Document
          </Checkbox>
        </div>

        <Divider />

        {/* Settings */}
        <h6>Settings</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("settings", "view")}
            onChange={(e) =>
              this.togglePerm("settings", "view", e.target.checked)
            }
          >
            View Settings
          </Checkbox>

          <Checkbox
            checked={check("settings", "deals")}
            onChange={(e) =>
              this.togglePerm("settings", "deals", e.target.checked)
            }
          >
            Update Deal Settings
          </Checkbox>

          <Checkbox
            checked={check("settings", "membership")}
            onChange={(e) =>
              this.togglePerm("settings", "membership", e.target.checked)
            }
          >
            Update Membership Amount
          </Checkbox>

          <Checkbox
            checked={check("settings", "taxation")}
            onChange={(e) =>
              this.togglePerm("settings", "taxation", e.target.checked)
            }
          >
            Update Taxation
          </Checkbox>

          <Checkbox
            checked={check("settings", "cashfree")}
            onChange={(e) =>
              this.togglePerm("settings", "cashfree", e.target.checked)
            }
          >
            Update Cashfree Environment
          </Checkbox>

          <Checkbox
            checked={check("settings", "digio")}
            onChange={(e) =>
              this.togglePerm("settings", "digio", e.target.checked)
            }
          >
            Update Digio Environment
          </Checkbox>
        </div>

        <Divider />

        {/* Dropoff Analytics */}
        <h6>Analytics - Dropoff</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("dropoff", "view")}
            onChange={(e) =>
              this.togglePerm("dropoff", "view", e.target.checked)
            }
          >
            View Dropoff
          </Checkbox>

          <Checkbox
            checked={check("dropoff", "export")}
            onChange={(e) =>
              this.togglePerm("dropoff", "export", e.target.checked)
            }
          >
            Export Dropoff Data
          </Checkbox>
        </div>

        <Divider/>

        {/* Guest Analytics */}
        <h6>Analytics - Guest</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("guest_analytics", "view")}
            onChange={(e) =>
              this.togglePerm("guest_analytics", "view", e.target.checked)
            }
          >
            View Guest Analytics
          </Checkbox>
        </div>
      </>
    );
  };

  openAddRoleModal = () => {
    this.setState({
      addRoleVisible: true,
      newRoleName: "",
    });
  };

  closeAddRoleModal = () => {
    this.setState({ addRoleVisible: false });
  };

  handleCreateRole = async () => {
    const { newRoleName } = this.state;
    const name = (newRoleName || "").trim();

    if (!name) {
      message.error("Please enter role name");
      return;
    }

    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/create`,
        { name },
        { headers: { "X-Admin-Id": adminId } }
      );

      if (res.data && res.data.status === "1") {
        const newRole = res.data.data;
        this.setState(
          (prev) => ({
            roles: [...prev.roles, newRole],
            addRoleVisible: false,
            selectedRoleId: newRole.id,
          }),
          () => this.loadRolePermissions(newRole.id)
        );
        message.success("Role created");
      } else {
        message.error(res.data?.message || "Failed to create role");
      }
    } catch (err) {
      console.error(err);
      message.error("Error creating role");
    }
  };

  savePermissions = async () => {
    const { selectedRoleId, perms } = this.state;
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/updatePermissions`,
        {
          role_id: selectedRoleId,
          permissions_json: JSON.stringify(perms),
        },
        {
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        message.success("Permissions updated");
      } else {
        message.error(res.data?.message || "Failed to update permissions");
      }
    } catch (err) {
      console.error(err);
      message.error("Error updating permissions");
    }
  };

  render() {
    const {
      roles,
      selectedRoleId,
      permsLoading,
      perms,
      addRoleVisible,
      newRoleName,
    } = this.state;

    return (
      <Layout
        style={{ minHeight: "100vh", marginTop: 0 }}
        className="main-dashboard-container"
      >
        <Navbar />
        <Layout className="site-layout">
          <Sidebar2 />

          <Content className="home-section">
            <Card
              style={{ margin: 16 }}
              title={
                <Breadcrumb style={{ margin: 0 }}>
                  <Breadcrumb.Item>Admin</Breadcrumb.Item>
                  <Breadcrumb.Item>Roles & Permissions</Breadcrumb.Item>
                </Breadcrumb>
              }
            >
              <div className="row">
                <div className="col-md-3 mb-3">
                  <Card
                    size="small"
                    title="Roles"
                    extra={
                      <Button
                        size="small"
                        type="primary"
                        onClick={this.openAddRoleModal}
                      >
                        Add Role
                      </Button>
                    }
                  >
                    {roles.map((r) => (
                      <Button
                        key={r.id}
                        block
                        type={parseInt(r.id, 10) === selectedRoleId ? "primary" : "default"}
                        style={{ marginBottom: 8 }}
                        onClick={() => this.loadRolePermissions(parseInt(r.id, 10))}
                      >
                        {r.name}
                      </Button>
                    ))}
                  </Card>
                </div>

                <div className="col-md-9 mb-3">
                  <Card
                    size="small"
                    title="Permissions"
                    extra={
                      <Button type="primary" onClick={this.savePermissions}>
                        Save
                      </Button>
                    }
                  >
                    <Spin spinning={permsLoading}>
                      {this.renderPermissionsMatrix(perms)}
                    </Spin>
                  </Card>
                </div>
              </div>
            </Card>
          </Content>

          <BottomBar />
        </Layout>

        <Modal
          title="Add Role"
          visible={addRoleVisible}
          onOk={this.handleCreateRole}
          onCancel={this.closeAddRoleModal}
          okText="Create"
          cancelText="Cancel"
        >
          <div style={{ marginBottom: 12 }}>
            <label>Role Name</label>
            <Input
              value={newRoleName}
              onChange={(e) => this.setState({ newRoleName: e.target.value })}
            />
          </div>
        </Modal>
      </Layout>
    );
  }
}

export default RolesPermissions;