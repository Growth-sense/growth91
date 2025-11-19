import React from "react";
import { Modal, Button } from "antd";
import { useHistory } from "react-router-dom";
import Bridge from "../constants/Bridge";

const LoginRequiredModal = ({ visible, onClose }) => {
  const history = useHistory();

  const getOrCreateGuestId = () => {
  let guestId = localStorage.getItem("unicorn_guest_id");
  if (!guestId) {
    guestId =
      "g91_guest_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substr(2, 9);
    localStorage.setItem("unicorn_guest_id", guestId);
  }
  return guestId;
};

  const handleLogin = () => {
  try {
    const guestID = getOrCreateGuestId();
    const eventData = {
      page: window.location.pathname,
      path: window.location.pathname + window.location.search,
      source: "LoginRequiredModal",
      action: "click_login",
    };

    Bridge.Unicorn.GuestAnalytics.addEvent({
      guestID,
      unicornDealID: null,
      eventType: "guest_click_login_from_login_required",
      eventData,
    });
  } catch (e) {
    console.error("guest analytics error", e);
  }

  onClose();
  history.push("/Login");
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
      <p>
        You’re viewing as a guest. To perform this action please sign in or create
        an account. It’s quick — takes less than a minute.
      </p>

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