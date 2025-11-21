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
        Date.now()
    localStorage.setItem("unicorn_guest_id", guestId);
  }
  return guestId;
};

 const handleContinueAsGuest = () => {
  const twoDaysMs = 2 * 24 * 60 * 60 * 1000; // change to 2 * 24 * 60 * 60 * 1000 when done testing
  const expiry = Date.now() + twoDaysMs;

  localStorage.setItem("unicorn_guest_until", String(expiry));

  // analytics: guest_started / continue as guest
  try {
    const guestID = getOrCreateGuestId();

    Bridge.Unicorn.GuestAnalytics.addEvent({
      guestID,
      unicornDealID: null,
      eventType: "guest_started",
    });
  } catch (e) {
    // fail silently
    console.error("guest analytics error", e);
  }

  onClose();
};

 const handleLogin = () => {
  onClose();
  history.push("/Login");
};

  return (
    <Modal visible={visible} footer={null} onCancel={onClose} centered maskClosable={false} closable={false}>
      <h3>Browse as guest</h3>
      <p>
        sign in to express interest or save profiles.
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