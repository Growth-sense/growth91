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

        {/* Master Data – Investors */}
        <h6>Master Data – Investors</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("investors", "view")}
            onChange={(e) =>
              this.togglePerm("investors", "view", e.target.checked)
            }
          >
            View
          </Checkbox>
          <Checkbox
            checked={check("investors", "export")}
            onChange={(e) =>
              this.togglePerm("investors", "export", e.target.checked)
            }
          >
            Export
          </Checkbox>
          <Checkbox
            checked={check("investors", "approve")}
            onChange={(e) =>
              this.togglePerm("investors", "approve", e.target.checked)
            }
          >
            KYC Approve
          </Checkbox>
        </div>

        {/* Master Data – Founders */}
        <h6>Master Data – Founders</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("founders", "view")}
            onChange={(e) =>
              this.togglePerm("founders", "view", e.target.checked)
            }
          >
            View
          </Checkbox>
          <Checkbox
            checked={check("founders", "edit")}
            onChange={(e) =>
              this.togglePerm("founders", "edit", e.target.checked)
            }
          >
            Edit
          </Checkbox>
          <Checkbox
            checked={check("founders", "approve")}
            onChange={(e) =>
              this.togglePerm("founders", "approve", e.target.checked)
            }
          >
            Approve / KYC
          </Checkbox>
        </div>

        {/* Master Data – Investments */}
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
            Export
          </Checkbox>
        </div>

        {/* Groups */}
        <h6>Groups</h6>
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
            checked={check("groups", "manage")}
            onChange={(e) =>
              this.togglePerm("groups", "manage", e.target.checked)
            }
          >
            Manage / Remove
          </Checkbox>
        </div>

        {/* Unicorns */}
        <h6>Unicorns</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("unicorns", "view_published")}
            onChange={(e) =>
              this.togglePerm("unicorns", "view_published", e.target.checked)
            }
          >
            View Published
          </Checkbox>
          <Checkbox
            checked={check("unicorns", "view_all")}
            onChange={(e) =>
              this.togglePerm("unicorns", "view_all", e.target.checked)
            }
          >
            View All
          </Checkbox>
          <Checkbox
            checked={check("unicorns", "view_payments")}
            onChange={(e) =>
              this.togglePerm("unicorns", "view_payments", e.target.checked)
            }
          >
            View Payments
          </Checkbox>
        </div>

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
        </div>

        {/* Deal Setup */}
        <h6>Deal Setup</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("deals", "view_open")}
            onChange={(e) =>
              this.togglePerm("deals", "view_open", e.target.checked)
            }
          >
            View Open Deals
          </Checkbox>
          <Checkbox
            checked={check("deals", "view_completed")}
            onChange={(e) =>
              this.togglePerm("deals", "view_completed", e.target.checked)
            }
          >
            View Completed Deals
          </Checkbox>
          <Checkbox
            checked={check("deals", "create")}
            onChange={(e) =>
              this.togglePerm("deals", "create", e.target.checked)
            }
          >
            Create / Edit Deals
          </Checkbox>
          <Checkbox
            checked={check("deals", "export")}
            onChange={(e) =>
              this.togglePerm("deals", "export", e.target.checked)
            }
          >
            Export
          </Checkbox>
        </div>

        {/* Referral */}
        <h6>Referral</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("referrals", "view_retail")}
            onChange={(e) =>
              this.togglePerm("referrals", "view_retail", e.target.checked)
            }
          >
            View Retail Referral
          </Checkbox>
          <Checkbox
            checked={check("referrals", "view_institutional")}
            onChange={(e) =>
              this.togglePerm(
                "referrals",
                "view_institutional",
                e.target.checked
              )
            }
          >
            View Institutional Referral
          </Checkbox>
        </div>

        {/* Payments */}
        <h6>Payments</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("payments", "view_online")}
            onChange={(e) =>
              this.togglePerm("payments", "view_online", e.target.checked)
            }
          >
            Online Payments
          </Checkbox>
          <Checkbox
            checked={check("payments", "view_offline")}
            onChange={(e) =>
              this.togglePerm("payments", "view_offline", e.target.checked)
            }
          >
            Offline Payments
          </Checkbox>
          <Checkbox
            checked={check("payments", "view_pending_offline")}
            onChange={(e) =>
              this.togglePerm(
                "payments",
                "view_pending_offline",
                e.target.checked
              )
            }
          >
            Pending Offline
          </Checkbox>
          <Checkbox
            checked={check("payments", "view_document")}
            onChange={(e) =>
              this.togglePerm("payments", "view_document", e.target.checked)
            }
          >
            Document Payments
          </Checkbox>
        </div>

        {/* Documents */}
        <h6>Documents</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("founder_documents", "view")}
            onChange={(e) =>
              this.togglePerm("founder_documents", "view", e.target.checked)
            }
          >
            Founder Documents
          </Checkbox>
          <Checkbox
            checked={check("documents", "view")}
            onChange={(e) =>
              this.togglePerm("documents", "view", e.target.checked)
            }
          >
            Admin Documents
          </Checkbox>
          <Checkbox
            checked={check("documents", "download_docs")}
            onChange={(e) =>
              this.togglePerm("documents", "download_docs", e.target.checked)
            }
          >
            Download Docs
          </Checkbox>
        </div>

        {/* Reports */}
        <h6>Reports</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("reports", "view")}
            onChange={(e) =>
              this.togglePerm("reports", "view", e.target.checked)
            }
          >
            View Reports
          </Checkbox>
          <Checkbox
            checked={check("reports", "export")}
            onChange={(e) =>
              this.togglePerm("reports", "export", e.target.checked)
            }
          >
            Export Reports
          </Checkbox>
        </div>

        {/* Settings */}
        <h6>Settings</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("settings", "settings_access")}
            onChange={(e) =>
              this.togglePerm("settings", "settings_access", e.target.checked)
            }
          >
            Settings Access
          </Checkbox>
        </div>

        {/* Analytics */}
        <h6>Analytics</h6>
        <div className="mb-2">
          <Checkbox
            checked={check("analytics", "view_dropoff")}
            onChange={(e) =>
              this.togglePerm("analytics", "view_dropoff", e.target.checked)
            }
          >
            View Dropoff
          </Checkbox>
          <Checkbox
            checked={check("analytics", "view_guest")}
            onChange={(e) =>
              this.togglePerm("analytics", "view_guest", e.target.checked)
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