import React, { useState, useEffect } from "react";
import { Layout, Table, message, Tag, Modal, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Bridge from "./constants/Bridge";
import Header from "./common/Header";
import MobileSidebar from "./investor/common/Sidebar"; 
import DesktopSidebar from "./investor/common/Sidebar2"; 
import FounderSidebar from "./Founder/common/Sidebar";

const { Content } = Layout;

const MyBuyerInterests = () => {
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState([]);
  const [kycModalVisible, setKycModalVisible] = useState(false);

  const isInvestor = localStorage.getItem("investor_id") ? true : false;
  const isFounder = localStorage.getItem("founder_id") ? true : false;

  useEffect(() => {
    window.scrollTo(0, 0);
    checkKycStatus();
    fetchMyInterests();
  }, []);

  const checkKycStatus = () => {
    const kycStatus = isInvestor 
      ? localStorage.getItem("investor_kycstatus") 
      : isFounder 
        ? localStorage.getItem("founder_kycstatus") 
        : "";

    if (kycStatus !== "admin_approved" && kycStatus !== "system_approved") {
      setKycModalVisible(true);
    }
  };

  const fetchMyInterests = () => {
    const investorId = localStorage.getItem("investor_id") || localStorage.getItem("founder_id");
    if (!investorId) {
      message.error("Please login to view your interests.");
      return;
    }

    setLoading(true);
    Bridge.getMyBuyerInterests({ investorId })
      .then((res) => {
        if (res.status == 1) {
          setInterests(res.data || []);
        } else {
          message.error(res.message || "Failed to load interests.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        message.error("Error loading interests.");
        setLoading(false);
      });
  };

  const columns = [
    { 
      title: "Opportunity Name", 
      dataIndex: "opportunityName", 
      key: "opportunityName",
      render: (text, record) => {
        if (record.opStatus !== 'Publish') {
          return (
            <div style={{ color: '#aaa' }}>
              {text} <br/>
              <span style={{ fontSize: '12px', color: '#ff4d4f' }}>(Disabled by Admin)</span>
            </div>
          );
        }
        return text;
      }
    },
    { 
      title: "Interest Expressed", 
      key: "interest", 
      render: (_, record) => (
        <span>
          {record.interestType === 'securities' ? `${record.interestValue} Securities` : `₹${record.interestValue}`}
        </span>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status", 
      key: "status",
      render: (status) => <Tag color="blue">{status}</Tag>
    },
    { 
      title: "Submitted On", 
      dataIndex: "submittedOn", 
      key: "submittedOn",
      render: (val) => val ? moment(val).format("DD MMM, YYYY") : "N/A"
    }
  ];

  return (
    <>
      <div className="newabout">
        <Header newabout={"newabout"} />
      </div>

      <div className="row" style={{ margin: 0 }}>
        <div
          className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          {isInvestor ? <MobileSidebar /> : isFounder ? <FounderSidebar /> : <MobileSidebar />}
        </div>
        <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none">
          {isInvestor ? <DesktopSidebar /> : isFounder ? <FounderSidebar /> : <DesktopSidebar />}
        </div>

        <div className="col col-lg-10 pb-4">
          <Content className="p-4" style={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
            <div className="mb-4 mt-5 pt-4">
              <h2 className="m-0" style={{ color: "#100050", fontWeight: "700" }}>My Interests</h2>
            </div>

            <div className="bg-white p-4 rounded shadow-sm">
              <Table 
                columns={columns} 
                dataSource={interests} 
                rowKey="id" 
                loading={loading}
                scroll={{ x: 800 }}
                pagination={{ pageSize: 15 }}
                rowClassName={(record) => record.opStatus !== 'Publish' ? 'disabled-row' : ''}
              />
            </div>
          </Content>
        </div>
      </div>

      <style jsx="true">{`
        .disabled-row {
          background-color: #f9f9f9;
          opacity: 0.7;
        }
      `}</style>

      <Modal
        title={null}
        visible={kycModalVisible}
        closable={false}
        footer={null}
        centered
        className="kyc-prompt-modal"
      >
        <div className="text-center p-4">
          <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '20px' }} />
          <h4 style={{ fontWeight: 'bold', color: '#100050', marginBottom: '15px' }}>KYC Incomplete</h4>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '30px' }}>
            Your KYC is currently pending or incomplete. Please complete your KYC.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button size="large" onClick={() => setKycModalVisible(false)}>
              Remind Me Later
            </Button>
            <Button 
              type="primary" 
              size="large" 
              onClick={() => {
                setKycModalVisible(false);
                window.location.href = isFounder ? "/founder-kyc-instructions" : "/kyc-instructions";
              }}
            >
              Complete KYC Now
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyBuyerInterests;
