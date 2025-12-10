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
import NoPermission from "./common/NoPermission";
import featureFlags from "../../config/featureFlags";
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
    blocked: false,
  };

  componentDidMount() {
    let isSuperAdmin = false;
    try {
      const raw = localStorage.getItem("super_admin");
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        isSuperAdmin =
          parsed === 1 ||
          parsed === "1" ||
          parsed === true ||
          parsed === "true";
      }
    } catch (e) {
      isSuperAdmin = false;
    }

    const enableSidebarPerms =
      featureFlags.ENABLE_SIDEBAR_PERMISSIONS === true;

    if (!isSuperAdmin || !enableSidebarPerms) {
      this.setState({ blocked: true });
      return;
    }

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

  selectAllPermissions = () => {
    const all = {
      startups: {
        view: true,
        add: true,
        edit: true,
        delete: true,
        export: true,
        documents: true,
        analytics: true,
      },
      investors: {
        view: true,
        add: true,
        edit: true,
        block: true,
        export: true,
        approve: true,
        dashboard: true,
        g91_money: true,
      },
      founders: {
        view: true,
        add: true,
        edit: true,
        export: true,
        block: true,
        dashboard: true,
        unicorn_plan: true,
      },
      investments: {
        view: true,
        export: true,
        approve: true,
        transfer: true,
        edit: true,
        request_sign: true,
      },
      groups: {
        view: true,
        export: true,
        manage: true,
      },
      group_remove_requests: {
        view: true,
        export: true,
        approve: true,
      },
      unicorns_published: {
        view: true,
        export: true,
        preview: true,
        view_plan: true,
        view_form: true,
        view_additional_form: true,
        view_enquiries: true,
        export_enquiries: true,
        edit_publish: true,
        toggle_highlight: true,
      },
      unicorns_all: {
        view: true,
        export: true,
        export_single: true,
        download_product_deck: true,
        download_pitch_deck: true,
      },
      unicorns_payments: {
        view: true,
        export: true,
        add_offline_payment: true,
      },
      premium_members: {
        view: true,
        export: true,
      },
      deals: {
        view_open: true,
        create: true,
        export: true,
        update_status: true,
        view_pitches: true,
        edit: true,
        view_commitments: true,
        invite_investors: true,
        offline_payment: true,
        copy_url: true,
        add_commitment: true,
        export_commitments_founder: true,
        export_commitments_reconciliation: true,
      },
      deals_completed: {
        view: true,
        export: true,
        update_status: true,
        view_pitches: true,
        edit_deal: true,
        view_commitments: true,
        manage_payment_link: true,
        invite_investors: true,
        offline_payment: true,
        copy_url: true,
        add_commitment: true,
        edit_commitment: true,
        export_commitments: true,
      },
      retail_referral: {
        view: true,
        export: true,
      },
      institutional_referral: {
        view: true,
        create: true,
        update_status: true,
        delete: true,
        view_detail: true,
        export: true,
      },
      payments_online: {
        view: true,
        export: true,
      },
      payments_offline: {
        view: true,
        export: true,
      },
      payments_offline_pending: {
        view: true,
        export: true,
        approve: true,
      },
      payments_documents: {
        view: true,
        export: true,
      },
      founder_documents: {
        view: true,
        founder: true,
        assessment: true,
      },
      documents: {
        view: true,
        add: true,
        edit: true,
        delete: true,
        download: true,
      },
      settings: {
        view: true,
        deals: true,
        membership: true,
        taxation: true,
        cashfree: true,
        digio: true,
      },
      dropoff: {
        view: true,
        export: true,
      },
      guest_analytics: {
        view: true,
      },
    };

    this.setState({ perms: all });
  };

  unselectAllPermissions = () => {
    this.setState({ perms: {} });
  };

  renderPermissionsMatrix = (perms) => {
    const check = (m, a) => !!(perms[m] && perms[m][a]);

    return (
      <>
        {/* Master Data – Startups */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Master Data – Startups</h6>
          <Checkbox
            checked={
              check("startups", "view") &&
              check("startups", "add") &&
              check("startups", "edit") &&
              check("startups", "delete") &&
              check("startups", "export") &&
              check("startups", "documents") &&
              check("startups", "analytics")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "add",
                "edit",
                "delete",
                "export",
                "documents",
                "analytics",
              ];
              actions.forEach((action) =>
                this.togglePerm("startups", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>

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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Master Data – Investors</h6>
          <Checkbox
            checked={
              check("investors", "view") &&
              check("investors", "add") &&
              check("investors", "edit") &&
              check("investors", "block") &&
              check("investors", "export") &&
              check("investors", "approve") &&
              check("investors", "dashboard") &&
              check("investors", "g91_money")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "add",
                "edit",
                "block",
                "export",
                "approve",
                "dashboard",
                "g91_money",
              ];
              actions.forEach((action) =>
                this.togglePerm("investors", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Master Data – Founders</h6>
          <Checkbox
            checked={
              check("founders", "view") &&
              check("founders", "add") &&
              check("founders", "edit") &&
              check("founders", "export") &&
              check("founders", "block") &&
              check("founders", "dashboard") &&
              check("founders", "unicorn_plan")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "add",
                "edit",
                "export",
                "block",
                "dashboard",
                "unicorn_plan",
              ];
              actions.forEach((action) =>
                this.togglePerm("founders", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Master Data – Investments</h6>
          <Checkbox
            checked={
              check("investments", "view") &&
              check("investments", "export") &&
              check("investments", "approve") &&
              check("investments", "transfer") &&
              check("investments", "edit") &&
              check("investments", "request_sign")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "export",
                "approve",
                "transfer",
                "edit",
                "request_sign",
              ];
              actions.forEach((action) =>
                this.togglePerm("investments", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Group Investments Data - Group Investments</h6>
          <Checkbox
            checked={
              check("groups", "view") &&
              check("groups", "export") &&
              check("groups", "manage")
            }
            onChange={(e) => {
              const actions = ["view", "export", "manage"];
              actions.forEach((action) =>
                this.togglePerm("groups", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Group Investments Data - Group Remove Requests</h6>
          <Checkbox
            checked={
              check("group_remove_requests", "view") &&
              check("group_remove_requests", "export") &&
              check("group_remove_requests", "approve")
            }
            onChange={(e) => {
              const actions = ["view", "export", "approve"];
              actions.forEach((action) =>
                this.togglePerm("group_remove_requests", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Future Unicorn – View Published Unicorns</h6>
          <Checkbox
            checked={
              check("unicorns_published", "view") &&
              check("unicorns_published", "export") &&
              check("unicorns_published", "preview") &&
              check("unicorns_published", "view_plan") &&
              check("unicorns_published", "view_form") &&
              check("unicorns_published", "view_additional_form") &&
              check("unicorns_published", "view_enquiries") &&
              check("unicorns_published", "export_enquiries") &&
              check("unicorns_published", "edit_publish") &&
              check("unicorns_published", "toggle_highlight")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "export",
                "preview",
                "view_plan",
                "view_form",
                "view_additional_form",
                "view_enquiries",
                "export_enquiries",
                "edit_publish",
                "toggle_highlight",
              ];
              actions.forEach((action) =>
                this.togglePerm("unicorns_published", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Future Unicorn – View All Unicorns</h6>
          <Checkbox
            checked={
              check("unicorns_all", "view") &&
              check("unicorns_all", "export") &&
              check("unicorns_all", "export_single") &&
              check("unicorns_all", "download_product_deck") &&
              check("unicorns_all", "download_pitch_deck")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "export",
                "export_single",
                "download_product_deck",
                "download_pitch_deck",
              ];
              actions.forEach((action) =>
                this.togglePerm("unicorns_all", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6>Future Unicorn – Payments</h6>
          <Checkbox
            checked={
              check("unicorns_payments", "view") &&
              check("unicorns_payments", "export") &&
              check("unicorns_payments", "add_offline_payment")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "export",
                "add_offline_payment",
              ];
              actions.forEach((action) =>
                this.togglePerm("unicorns_payments", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h6>Premium Members</h6>
          <Checkbox
            checked={
              check("premium_members", "view") &&
              check("premium_members", "export")
            }
            onChange={(e) => {
              const actions = ["view", "export"];
              actions.forEach((action) =>
                this.togglePerm("premium_members", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Deal Setup - Open Deal</h6>
          <Checkbox
            checked={
              check("deals", "view_open") &&
              check("deals", "create") &&
              check("deals", "export") &&
              check("deals", "update_status") &&
              check("deals", "view_pitches") &&
              check("deals", "edit") &&
              check("deals", "view_commitments") &&
              check("deals", "invite_investors") &&
              check("deals", "offline_payment") &&
              check("deals", "copy_url") &&
              check("deals", "add_commitment") &&
              check("deals", "export_commitments_founder") &&
              check("deals", "export_commitments_reconciliation")
            }
            onChange={(e) => {
              const actions = [
                "view_open",
                "create",
                "export",
                "update_status",
                "view_pitches",
                "edit",
                "view_commitments",
                "invite_investors",
                "offline_payment",
                "copy_url",
                "add_commitment",
                "export_commitments_founder",
                "export_commitments_reconciliation",
              ];
              actions.forEach((action) =>
                this.togglePerm("deals", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Deal Setup - Completed Deal</h6>
          <Checkbox
            checked={
              check("deals_completed", "view") &&
              check("deals_completed", "export") &&
              check("deals_completed", "update_status") &&
              check("deals_completed", "view_pitches") &&
              check("deals_completed", "edit_deal") &&
              check("deals_completed", "view_commitments") &&
              check("deals_completed", "manage_payment_link") &&
              check("deals_completed", "invite_investors") &&
              check("deals_completed", "offline_payment") &&
              check("deals_completed", "copy_url") &&
              check("deals_completed", "add_commitment") &&
              check("deals_completed", "edit_commitment") &&
              check("deals_completed", "export_commitments")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "export",
                "update_status",
                "view_pitches",
                "edit_deal",
                "view_commitments",
                "manage_payment_link",
                "invite_investors",
                "offline_payment",
                "copy_url",
                "add_commitment",
                "edit_commitment",
                "export_commitments",
              ];
              actions.forEach((action) =>
                this.togglePerm("deals_completed", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Referral - Retail Referral</h6>
          <Checkbox
            checked={
              check("retail_referral", "view") &&
              check("retail_referral", "export")
            }
            onChange={(e) => {
              const actions = ["view", "export"];
              actions.forEach((action) =>
                this.togglePerm("retail_referral", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Referral - Institutional Referral</h6>
          <Checkbox
            checked={
              check("institutional_referral", "view") &&
              check("institutional_referral", "create") &&
              check("institutional_referral", "update_status") &&
              check("institutional_referral", "delete") &&
              check("institutional_referral", "view_detail") &&
              check("institutional_referral", "export")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "create",
                "update_status",
                "delete",
                "view_detail",
                "export",
              ];
              actions.forEach((action) =>
                this.togglePerm("institutional_referral", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Payments – Online Payments</h6>
          <Checkbox
            checked={
              check("payments_online", "view") &&
              check("payments_online", "export")
            }
            onChange={(e) => {
              const actions = ["view", "export"];
              actions.forEach((a) =>
                this.togglePerm("payments_online", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Payments – Offline Payments</h6>
          <Checkbox
            checked={
              check("payments_offline", "view") &&
              check("payments_offline", "export")
            }
            onChange={(e) => {
              const actions = ["view", "export"];
              actions.forEach((a) =>
                this.togglePerm("payments_offline", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Payments – Pending Offline Payments</h6>
          <Checkbox
            checked={
              check("payments_offline_pending", "view") &&
              check("payments_offline_pending", "export") &&
              check("payments_offline_pending", "approve")
            }
            onChange={(e) => {
              const actions = ["view", "export", "approve"];
              actions.forEach((a) =>
                this.togglePerm("payments_offline_pending", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Payments – Document Payments</h6>
          <Checkbox
            checked={
              check("payments_documents", "view") &&
              check("payments_documents", "export")
            }
            onChange={(e) => {
              const actions = ["view", "export"];
              actions.forEach((a) =>
                this.togglePerm("payments_documents", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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

        {/*Founder Documents */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Founder Documents</h6>
          <Checkbox
            checked={
              check("founder_documents", "view") &&
              check("founder_documents", "founder") &&
              check("founder_documents", "assessment")
            }
            onChange={(e) => {
              const actions = ["view", "founder", "assessment"];
              actions.forEach((a) =>
                this.togglePerm("founder_documents", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Documents</h6>
          <Checkbox
            checked={
              check("documents", "view") &&
              check("documents", "add") &&
              check("documents", "edit") &&
              check("documents", "delete") &&
              check("documents", "download")
            }
            onChange={(e) => {
              const actions = ["view", "add", "edit", "delete", "download"];
              actions.forEach((a) =>
                this.togglePerm("documents", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Settings</h6>
          <Checkbox
            checked={
              check("settings", "view") &&
              check("settings", "deals") &&
              check("settings", "membership") &&
              check("settings", "taxation") &&
              check("settings", "cashfree") &&
              check("settings", "digio")
            }
            onChange={(e) => {
              const actions = [
                "view",
                "deals",
                "membership",
                "taxation",
                "cashfree",
                "digio",
              ];
              actions.forEach((action) =>
                this.togglePerm("settings", action, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Analytics - Dropoff</h6>
          <Checkbox
            checked={
              check("dropoff", "view") &&
              check("dropoff", "export")
            }
            onChange={(e) => {
              const actions = ["view", "export"];
              actions.forEach((a) =>
                this.togglePerm("dropoff", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h6>Analytics - Guest</h6>
          <Checkbox
            checked={check("guest_analytics", "view")}
            onChange={(e) => {
              const actions = ["view"];
              actions.forEach((a) =>
                this.togglePerm("guest_analytics", a, e.target.checked)
              );
            }}
          >
            Select All
          </Checkbox>
        </div>
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
      blocked,
    } = this.state;

    return (
      <Layout
        style={{ minHeight: "100vh", marginTop: 0 }}
        className="main-dashboard-container"
      >
        <Navbar />
        <Layout className="site-layout">
          <Sidebar2 />

          {blocked ? (
            <NoPermission />
          ) : (
            <>
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
                          type={
                            parseInt(r.id, 10) === selectedRoleId
                              ? "primary"
                              : "default"
                          }
                          style={{ marginBottom: 8 }}
                          onClick={() =>
                            this.loadRolePermissions(parseInt(r.id, 10))
                          }
                        >
                          {r.name}
                        </Button>
                      ))}
                    </Card>
                  </div>

                  <div className="col-md-9 mb-3">
                    <Card
                      size="small"
                      title={
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span>Permissions</span>
                          <Checkbox
                            onChange={(e) => {
                              if (e.target.checked) {
                                this.selectAllPermissions();
                              } else {
                                this.unselectAllPermissions();
                              }
                            }}
                          >
                            Select All
                          </Checkbox>
                        </div>
                      }
                      extra={
                        <Button
                          size="small"
                          type="primary"
                          onClick={this.savePermissions}
                        >
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
            </>
          )}

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