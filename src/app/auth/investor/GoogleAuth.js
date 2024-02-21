
import { useEffect, useRef, useState } from 'react'
import jwt_decode from 'jwt-decode';
import {message} from 'antd';
import Bridge from '../../constants/Bridge';

  const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const GoogleAuth = () => {

  const googleButton = useRef(null);
  const [email, setEmail]=useState('');

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "1050220367040-pld0tpa1m5bnkni0i19audapqvfavoph.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
        /*global google*/
        // console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          {type:"standard",shape:"rectangular",text:"signin_with",logo_alignment:"center", theme: 'outline', size: 'large',width:'300' } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  }, [])

  function handleCredentialResponse(response) {
    // console.log('response',jwt_decode(response.credential));
    let res=jwt_decode(response.credential);
    if(res.email_verified==true){
      let email=res.email;
      setEmail(email);
      login(email);
    }else{
      message.warning('Please try again with correct email or you have registered with.');
      return;
    }
  }
  // login
  const login=(email)=>{
    if(!email){
      message.warning("Invalid email");
      return;
    }
    let params={
      email:email,
    };
    Bridge.loginUsingGoogle(params).then((result) => {
      if(result.status==1){
        localStorage.setItem("investor_id",result.data[0].investor_id);
        localStorage.setItem("investor_email",result.data[0].email);
        localStorage.setItem("investor_kycstatus",result.data[0].kycstatus);
        localStorage.setItem("investor_name",result.data[0].first_name+" "+result.data[0].last_name);
        window.location.assign("/investor-dashboard");
        message.success("You have logged in successfully.");
      } else {
        message.warning('Please try to login as registered user or sign up for Growth91');
      }
    });
  }


  return (
    <div ref={googleButton}></div>
  )
}

// export default function googleLogout() {
//     window.google?.accounts.id.disableAutoSelect();
//   }
 
export default GoogleAuth;