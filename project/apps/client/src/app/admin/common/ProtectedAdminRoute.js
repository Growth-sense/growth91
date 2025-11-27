import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Spin } from "antd";
import axios from "axios";

// Simple in-memory cache so we only hit myPermissions once per reload
let cachedPerms = null;
let permsPromise = null;

async function fetchPermissions() {
  if (cachedPerms) return cachedPerms;
  if (permsPromise) return permsPromise;

  permsPromise = (async () => {
    const adminLoginRaw = localStorage.getItem("admin_login");
    let adminId = null;

    if (adminLoginRaw) {
      try {
        const adminLogin = JSON.parse(adminLoginRaw);
        adminId = adminLogin.value;
      } catch (e) {
        adminId = null;
      }
    }

    if (!adminId) {
      console.error("Admin ID not found in local storage");
      cachedPerms = {};
      return cachedPerms;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}api/admin/Roles/myPermissions`,
        {
          headers: {
            "X-Admin-Id": adminId,
          },
        }
      );

      if (res.data && res.data.status === "1") {
        cachedPerms = res.data.data || {};
      } else {
        cachedPerms = {};
      }
    } catch (e) {
      console.error("Error loading permissions in ProtectedAdminRoute", e);
      cachedPerms = {};
    }

    return cachedPerms;
  })();

  return permsPromise;
}

class ProtectedAdminRouteInner extends Component {
  state = {
    loading: true,
    allowed: false,
  };

  async componentDidMount() {
    const { requiredModule, requiredAction } = this.props;

    // SUPER ADMIN SHORTCUT – if super_admin == 1, always allow
    let isSuperAdmin = false;
    try {
      const raw = localStorage.getItem("super_admin");
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        isSuperAdmin =
          parsed === 1 || parsed === "1" || parsed === true || parsed === "true";
      }
    } catch (e) {
      isSuperAdmin = false;
    }

    if (isSuperAdmin) {
      this.setState({ loading: false, allowed: true });
      return;
    }

    const perms = await fetchPermissions();

    let allowed = true;
    if (requiredModule && requiredAction) {
      allowed =
        perms[requiredModule] && perms[requiredModule][requiredAction] === true;
    }

    this.setState({ loading: false, allowed });
  }

  render() {
    const { loading, allowed } = this.state;
    const { Component, routeProps } = this.props;

    if (loading) {
      // Small center spinner while we resolve permissions
      return (
        <div style={{ padding: 24, textAlign: "center" }}>
          <Spin />
        </div>
      );
    }

    // Always render the page component, but pass noPermission flag
    return <Component {...routeProps} noPermission={!allowed} />;
  }
}

// usage wrapper with react-router Route
const ProtectedAdminRoute = ({
  component: WrappedComponent,
  requiredModule,
  requiredAction,
  ...rest
}) => (
  <Route
    {...rest}
    render={(routeProps) => (
      <ProtectedAdminRouteInner
        Component={WrappedComponent}
        routeProps={routeProps}
        requiredModule={requiredModule}
        requiredAction={requiredAction}
      />
    )}
  />
);

export default ProtectedAdminRoute;