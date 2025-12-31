import React from "react";
import { Result, Button } from "antd";

const NoPermission = () => {
  return (
    <Result
      status="403"
      title="No access"
      subTitle="You don't have permission to view this page."
    />
  );
};

export default NoPermission;