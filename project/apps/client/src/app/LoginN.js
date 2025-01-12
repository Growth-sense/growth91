import { useEffect, useRef } from "react";
import jwt_decode from "jwt-decode";

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

const GoogleAuth = () => {
  const googleButton = useRef(null);

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    const id =
      "1050220367040-pld0tpa1m5bnkni0i19audapqvfavoph.apps.googleusercontent.com";

    loadScript(src)
      .then(() => {
        /*global google*/
        console.log(google);
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
          width: "100%",
          height: "70",
        });
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, []);

  function handleCredentialResponse(response) {
    console.log(jwt_decode(response.credential));
  }

  return <div ref={googleButton}></div>;
};

// export default function googleLogout() {
//     window.google?.accounts.id.disableAutoSelect();
//   }

export default GoogleAuth;
