import { useEffect, useRef, useState } from "react";
import jwt_decode from "jwt-decode";
import { message } from "antd";
import Bridge from "../../constants/Bridge";
import ReactGA from "react-ga4";
import { TRACKING_ID } from "../../constants/data";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

const GoogleAuth = ({ type = "investor" }) => {
  const googleButton = useRef(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    const src = "https://accounts.google.com/gsi/client";
    const id =
      "1050220367040-pld0tpa1m5bnkni0i19audapqvfavoph.apps.googleusercontent.com";

    loadScript(src)
      .then(() => {
        /*global google*/
        // console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(googleButton.current, {
          type: "standard",
          shape: "rectangular",
          text: "signin_with",
          logo_alignment: "center",
          theme: "outline",
          size: "large",
          width: "300",
        });
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, []);

  function handleCredentialResponse(response) {
    // console.log('response',jwt_decode(response.credential));
    let res = jwt_decode(response.credential);
    if (res.email_verified == true) {
      let email = res.email;
      setEmail(email);
      login(email);
    } else {
      message.warning(
        "Please try again with correct email or you have registered with."
      );
      return;
    }
  }
  // login
  const login = (email) => {
    ReactGA.event({
      category: 'Login',
      action: 'Google login Clicked',
    });
    if (!email) {
      message.warning("Invalid email");
      return;
    }
    let params = {
      email: email,
    };

    if (type == "founder") {
      Bridge.loginUsingGoogle(params).then((result) => {
        if (result.status == 1) {
          if (result.data[0].user_type == "founder") {
            localStorage.setItem("founder_id", result.data[0].investor_id);
            localStorage.setItem(
              "founder_name",
              result.data[0].first_name + " " + result.data[0].last_name
            );
            localStorage.setItem(
              "founder_is_investor",
              result.data[0].is_investor
            );
            localStorage.setItem("founder_email", result.data[0].email);
            localStorage.setItem(
              "user_status",
              result.data[0].user_block_status
            );
            window.location.assign("/founder-dashboard");
            message.success("You have logged in successfully.");
          } else if (result.data[1].user_type == "founder") {
            localStorage.setItem("founder_id", result.data[1].investor_id);
            localStorage.setItem(
              "founder_name",
              result.data[1].first_name + " " + result.data[1].last_name
            );
            localStorage.setItem(
              "founder_is_investor",
              result.data[1].is_investor
            );
            localStorage.setItem("founder_email", result.data[1].email);
            localStorage.setItem(
              "user_status",
              result.data[1].user_block_status
            );
            window.location.assign("/founder-dashboard");
            message.success("You have logged in successfully.");
            ReactGA.event({
              category: 'Login',
              action: 'Google login Successful',
            });
          } else {
            message.error("Invalid User");
          }
        } else if (result.status == 0) {
          message.error("Invalid User");
        }
      });
    } else {
      Bridge.loginUsingGoogleForFounder(params).then((result) => {
        if (result.status == 1) {
          switch (result.data[0].user_type) {
            case "investor":
              localStorage.setItem("investor_id", result.data[0].investor_id);
              localStorage.setItem(
                "Parent_investor_id",
                result.data[0].investor_id
              );
              localStorage.setItem("investor_email", result.data[0].email);
          localStorage.setItem("Parent_investor_email", result.data[0].email);

              localStorage.setItem(
                "investor_kycstatus",
                result.data[0].kycstatus
              );
              localStorage.setItem(
                "Parent_investor_kycstatus",
                result.data[0].kycstatus
              );
              localStorage.setItem(
                "Parent_investor_name",
                result.data[0].first_name +
                " " +
                result.data[0].last_name
              );
              localStorage.setItem(
                "investor_name",
                result.data[0].first_name + " " + result.data[0].last_name
              );
              localStorage.setItem(
                "user_status",
                result.data[0].user_block_status
              );
              window.location.assign("/Deals");
              break;

            case "founder":
              localStorage.setItem("founder_id", result.data[0].investor_id);
              localStorage.setItem(
                "founder_name",
                result.data[0].first_name + " " + result.data[0].last_name
              );
              localStorage.setItem(
                "founder_is_investor",
                result.data[0].is_investor
              );
              localStorage.setItem("founder_email", result.data[0].email);
              localStorage.setItem(
                "user_status",
                result.data[0].user_block_status
              );
              window.location.assign("/founder-dashboard");
              message.success("You have logged in successfully.");
              ReactGA.event({
                category: 'Login',
                action: 'Google login Successful',
              });
              break;
            default:
              message.error("Invalid User");
          }
        } else if (result.status == 2) {
          message.warning(result.message);
          return;
        } else if (result.error === "RATE_LIMIT_EXCEEDED" || result.status === 429) {
          return;
        } else {
          message.warning(
            "Your email is incorrect or this account doesn't exist. Please try agian or signup for Growth91."
          );
          return;
        }
      });
    }
  };

  return <div ref={googleButton}></div>;
};

// export default function googleLogout() {
//     window.google?.accounts.id.disableAutoSelect();
//   }

export default GoogleAuth;
