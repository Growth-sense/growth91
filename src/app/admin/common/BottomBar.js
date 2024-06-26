import React, { Component } from "react";
import { Layout } from "antd";

const { Footer } = Layout;

class BottomBar extends Component {
  render() {
    return (
      <Footer
        style={{
          textAlign: "center",
          marginLeft: "64px",
        }}
      >
        @2024 All rights are reserved. Managed by Growth Metaverse.
      </Footer>
    );
  }
}

export default BottomBar;
