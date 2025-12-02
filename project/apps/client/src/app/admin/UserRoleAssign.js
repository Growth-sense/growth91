import React, { Component } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  List,
  Spin,
  Checkbox,
  message,
  Button,
  Modal,
  Input,
  Select,
} from "antd";
import Navbar from "./common/Navbar";
import Sidebar2 from "./common/Sidebar2";
import BottomBar from "./common/BottomBar";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

class UserRoleAssign extends Component {
  state = {
    users: [],
    roles: [],
    selectedUserId: null,
    userRoles: [],
    loadingUsers: false,
    loadingRoles: false,
    saving: false,

    addModalVisible: false,
    newUsername: "",
    newPassword: "",
    newRoleId: null,
    creatingAdmin: false,
  };

  componentDidMount() {
    this.loadUsersAndRoles();
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

  loadUsersAndRoles = async () => {
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    this.setState({ loadingUsers: true, loadingRoles: true });

    try {
      const [usersRes, rolesRes] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_BASE_URL}api/admin/Roles/listUsers`,
          { headers: { "X-Admin-Id": adminId } }
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}api/admin/Roles/listRoles`,
          { headers: { "X-Admin-Id": adminId } }
        ),
      ]);

      const usersRaw =
        usersRes.data && usersRes.data.status === "1"
          ? usersRes.data.data || []
          : [];
      const rolesRaw =
        rolesRes.data && rolesRes.data.status === "1"
          ? rolesRes.data.data || []
          : [];

      // Hide any super_admin users from this UI completely
      const users = usersRaw.filter((u) => Number(u.is_super_admin) !== 1);

      // Hide super_admin role from this UI completely
      const roles = rolesRaw.filter((r) => r.name !== "super_admin");

      this.setState(
        {
          users,
          roles,
          loadingUsers: false,
          loadingRoles: false,
        },
        () => {
          if (users.length > 0) {
            this.selectUser(users[0].id);
          } else {
            this.setState({ selectedUserId: null, userRoles: [] });
          }
        }
      );
    } catch (err) {
      console.error(err);
      this.setState({ loadingUsers: false, loadingRoles: false });
      message.error("Error loading users/roles");
    }
  };

  selectUser = async (userId) => {
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    this.setState({ selectedUserId: userId, userRoles: [], saving: false });

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/getUserRoles`,
        {
          params: { admin_id: userId },
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        // Normalize role IDs to numbers (super_admin role is already filtered out of roles list)
        let userRoles = (res.data.data || []).map((id) => Number(id));

        this.setState({ userRoles });
      } else {
        message.error(res.data?.message || "Failed to load user roles");
      }
    } catch (err) {
      console.error(err);
      message.error("Error loading user roles");
    }
  };

  // Single-select role: only one can be active at a time (for existing users)
  toggleUserRole = (roleId, checked) => {
    const numericId = Number(roleId);
    this.setState((prev) => {
      let userRoles;
      if (checked) {
        // Single-select: only this role remains selected
        userRoles = [numericId];
      } else {
        // Uncheck removes this role
        userRoles = prev.userRoles.filter((id) => id !== numericId);
      }
      return { userRoles };
    });
  };

  // Internal function that actually calls the backend to save roles
  performSaveUserRoles = async () => {
    const { selectedUserId, userRoles } = this.state;
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }
    if (!selectedUserId) {
      message.error("Select a user");
      return;
    }

    this.setState({ saving: true });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/updateUserRoles`,
        {
          admin_id: selectedUserId,
          role_ids: userRoles,
        },
        {
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        message.success("User roles updated");
        // Reload users & roles to reflect any super_admin flag changes
        this.loadUsersAndRoles();
      } else {
        message.error(res.data?.message || "Failed to update user roles");
      }
    } catch (err) {
      console.error(err);
      message.error("Error updating user roles");
    } finally {
      this.setState({ saving: false });
    }
  };

  saveUserRoles = () => {
    const { users, roles, selectedUserId, userRoles } = this.state;

    if (!selectedUserId) {
      message.error("Select a user");
      return;
    }

    if (!userRoles || userRoles.length === 0) {
      message.error("Please select at least one role for this user.");
      return;
    }

    // We no longer manage Super Admin status from this screen.
    // Just save the selected non-super_admin roles.
    this.performSaveUserRoles();
  };

  // --- Add Admin modal handlers (button in Admins card on left) ---

  openAddAdminModal = () => {
    this.setState({
      addModalVisible: true,
      newUsername: "",
      newPassword: "",
      newRoleId: null,
    });
  };

  closeAddAdminModal = () => {
    this.setState({
      addModalVisible: false,
      newUsername: "",
      newPassword: "",
      newRoleId: null,
    });
  };

  handleCreateAdmin = async () => {
    const { newUsername, newPassword, newRoleId } = this.state;
    const adminId = this.getCurrentAdminId();
    if (!adminId) {
      message.error("Admin ID not found");
      return;
    }

    if (!newUsername.trim() || !newPassword) {
      message.error("Username and password are required.");
      return;
    }

    if (!newRoleId) {
      message.error("Please select a role for the new admin.");
      return;
    }

    this.setState({ creatingAdmin: true });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/createAdminUser`,
        {
          username: newUsername.trim(),
          password: newPassword,
          role_id: newRoleId,
        },
        {
          headers: { "X-Admin-Id": adminId },
        }
      );

      if (res.data && res.data.status === "1") {
        // Backend created admin + role successfully.
        // Now reload users & roles from backend so left list and right roles are fresh.
        this.setState(
          {
            creatingAdmin: false,
            addModalVisible: false,
            newUsername: "",
            newPassword: "",
            newRoleId: null,
          },
          () => {
            message.success("Admin user created");
            this.loadUsersAndRoles();
          }
        );
      } else {
        this.setState({ creatingAdmin: false });
        message.error(res.data?.message || "Failed to create admin user");
      }
    } catch (err) {
      console.error(err);
      this.setState({ creatingAdmin: false });
      message.error("Error creating admin user");
    }
  };

  render() {
    const {
      users,
      roles,
      selectedUserId,
      userRoles,
      loadingUsers,
      loadingRoles,
      saving,
      addModalVisible,
      newUsername,
      newPassword,
      newRoleId,
      creatingAdmin,
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
                  <Breadcrumb.Item>Access Management</Breadcrumb.Item>
                  <Breadcrumb.Item>User Roles</Breadcrumb.Item>
                </Breadcrumb>
              }
            >
              <div className="row">
                {/* Left: Admins list + Add Admin button */}
                <div className="col-md-4 mb-3">
                  <Card
                    size="small"
                    title="Admins"
                    extra={
                      <Button size="small" onClick={this.openAddAdminModal}>
                        Add Admin
                      </Button>
                    }
                  >
                    <Spin spinning={loadingUsers}>
                      <List
                        dataSource={users}
                        renderItem={(u) => (
                          <List.Item
                            onClick={() => this.selectUser(u.id)}
                            style={{
                              cursor: "pointer",
                              background:
                                selectedUserId === u.id
                                  ? "#e6f7ff"
                                  : "transparent",
                            }}
                          >
                            <List.Item.Meta
                              title={u.username || `Admin #${u.id}`}
                              description={
                                Number(u.is_super_admin) === 1
                                  ? "Super Admin"
                                  :  u.role_name || "Admin"
                              }
                            />
                          </List.Item>
                        )}
                      />
                    </Spin>
                  </Card>
                </div>

                {/* Right: roles for selected user */}
                <div className="col-md-8 mb-3">
                  <Card
                    size="small"
                    title="Roles for selected user"
                    extra={
                      <Button
                        type="primary"
                        onClick={this.saveUserRoles}
                        loading={saving}
                      >
                        Save
                      </Button>
                    }
                  >
                    <Spin spinning={loadingRoles}>
                      {roles.map((r) => (
                        <div key={r.id} style={{ marginBottom: 8 }}>
                          <Checkbox
                            checked={userRoles.includes(Number(r.id))}
                            onChange={(e) =>
                              this.toggleUserRole(r.id, e.target.checked)
                            }
                          >
                            {r.display_name} {r.name}
                          </Checkbox>
                        </div>
                      ))}
                    </Spin>
                  </Card>
                </div>
              </div>
            </Card>
          </Content>

          <BottomBar />
        </Layout>

        {/* Add Admin Modal (with role dropdown) */}
        <Modal
          title="Add Admin User"
          visible={addModalVisible}
          onOk={this.handleCreateAdmin}
          onCancel={this.closeAddAdminModal}
          confirmLoading={creatingAdmin}
          okText="Create"
        >
          <div style={{ marginBottom: 12 }}>
            <label>Username</label>
            <Input
              value={newUsername}
              onChange={(e) =>
                this.setState({ newUsername: e.target.value })
              }
              placeholder="Enter username"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Password</label>
            <Input.Password
              value={newPassword}
              onChange={(e) =>
                this.setState({ newPassword: e.target.value })
              }
              placeholder="Enter password"
            />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Role</label>
            <Select
              value={newRoleId}
              onChange={(value) => this.setState({ newRoleId: value })}
              placeholder="Select role"
              style={{ width: "100%" }}
            >
              {roles
                .filter((r) => r.name !== "super_admin")
                .map((r) => (
                  <Option key={r.id} value={Number(r.id)}>
                    {r.display_name} {r.name}
                  </Option>
                ))}
            </Select>
          </div>
        </Modal>
      </Layout>
    );
  }
}

export default UserRoleAssign;