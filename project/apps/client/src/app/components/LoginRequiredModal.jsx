import React from "react";
import { Modal, Button } from "antd";
import { useHistory } from "react-router-dom";
import Bridge from "../constants/Bridge";

const LoginRequiredModal = ({ visible, onClose }) => {
  const history = useHistory();

  const attempts =
    Number(localStorage.getItem("unicorn_guest_gated_attempts") || "0");
  const showBenefits = attempts > 2;

  const handleLogin = () => {
    try {
      const guestID = localStorage.getItem("unicorn_guest_id");
      if (guestID) {
        Bridge.Unicorn.GuestAnalytics.addEvent({
          guestID,
          unicornDealID: null,
          eventType: "signup_started",
        });
      }
    } catch (e) {
      console.error("guest analytics error", e);
    }

    onClose();
    history.push("/Signup");
  };

  return (
    <Modal
      visible={visible}
      footer={null}
      centered
      maskClosable={false}
      closable={false}
      onCancel={onClose}
    >
      <h3>Please sign in to continue</h3>
      {!showBenefits ? (
        <p>
          You’re viewing as a guest. To perform this action please sign in or create
          an account. It’s quick — takes less than a minute.
        </p>
      ) : (
        <div
          style={{
            marginTop: 8,
            padding: "10px 12px",
            borderRadius: 8,
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ marginBottom: 8, fontWeight: 800, fontSize: 18 }}>
            You’re viewing as a <span style={{ fontSize: 20 }}>G</span>uest. Sign in or create a free account to:
          </p>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 13,
              color: "#555",
              lineHeight: 1.5,
              listStyleType: "disc",
              listStylePosition: "outside",
            }}
          >
            <li
              style={{
                listStyleType: "disc",
                color: "#000",
              }}
            >
              <span style={{ color: "#23ad23", fontStyle: "italic", fontWeight: 900 }}>
                Unlock full profiles & pitch decks
              </span>
            </li>
            <li
              style={{
                listStyleType: "disc",
                color: "#000",
              }}
            >
              <span style={{ color: "#23ad23", fontStyle: "italic", fontWeight: 900 }}>
                Express interest in startups
              </span>
            </li>
            <li
              style={{
                listStyleType: "disc",
                color: "#000",
              }}
            >
              <span style={{ color: "#23ad23", fontStyle: "italic", fontWeight: 900 }}>
                Build your startup profile&nbsp;for&nbsp;free
              </span>
            </li>
          </ul>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 16,
        }}
      >
        <Button onClick={onClose}>
          Continue as Guest
        </Button>
        <Button type="primary" onClick={handleLogin}>
          Sign in / Sign up
        </Button>
      </div>
    </Modal>
  );
};

export default LoginRequiredModal;