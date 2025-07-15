import React from "react";
import { Tooltip } from "antd";

const InfoTooltip = ({ title }) => (
  <Tooltip title={title}>
    <div style={{
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#1890ff',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      cursor: 'pointer'
    }}>
      i
    </div>
  </Tooltip>
);

export default InfoTooltip;