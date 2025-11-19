import React from "react";
import { Modal, Button } from "antd";
import { useHistory } from "react-router-dom";
import Bridge from "../constants/Bridge";

const GuestAccessModal = ({ visible, onClose }) => {
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

 const handleContinueAsGuest = () => {
  const twoDaysMs = 15000; // change to 2 * 24 * 60 * 60 * 1000 when done testing
  const expiry = Date.now() + twoDaysMs;

  localStorage.setItem("unicorn_guest_until", String(expiry));

  // analytics: guest_started / continue as guest
  try {
    const guestID = getOrCreateGuestId();
    const eventData = {
      page: window.location.pathname,
      path: window.location.pathname + window.location.search,
      source: "GuestAccessModal",
      action: "continue_as_guest",
    };

    Bridge.Unicorn.GuestAnalytics.addEvent({
      guestID,
      unicornDealID: null,
      eventType: "guest_started",
      eventData,
    });
  } catch (e) {
    // fail silently
    console.error("guest analytics error", e);
  }

  onClose();
};

 const handleLogin = () => {
  try {
    const guestID = getOrCreateGuestId();
    const eventData = {
      page: window.location.pathname,
      path: window.location.pathname + window.location.search,
      source: "GuestAccessModal",
      action: "click_login",
    };

    Bridge.Unicorn.GuestAnalytics.addEvent({
      guestID,
      unicornDealID: null,
      eventType: "guest_click_login_from_guest_modal",
      eventData,
    });
  } catch (e) {
    console.error("guest analytics error", e);
  }

  onClose();
  history.push("/Login");
};

  return (
    <Modal visible={visible} footer={null} onCancel={onClose} centered maskClosable={false} closable={false}>
      <h3>Continue as Guest</h3>
      <p>
        you are viewing Future Unicorns as a guest. Login or Signup to express
        interest,save changes and access features.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 16,
        }}
      >
        <Button onClick={handleContinueAsGuest}>Continue as Guest</Button>
        <Button type="primary" onClick={handleLogin}>
          Login / Sign up
        </Button>
      </div>
    </Modal>
  );
};

export default GuestAccessModal;