import React, { useState } from "react";
import NewWebHeader from "./common/NewWebHeader";
import { NewWebFooter } from "./common/NewWebFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bridge from "./constants/Bridge";
import { useEffect } from "react";
export const Contact = () => {
  const notify = (e) => {
    toast.info("Thank You for Getting in Touch!");
    setEmail("");
    setName("");
    setMsg("");
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const formsubmit = async (e) => {
    e.preventDefault();
   formsub()
  };
const formsub=async()=>{
  const res = await Bridge.contact_us_form({
    contactName: name,
    contactEmail: email,
    contactMessage: msg,
  });
  console.log(res);
  if (res.data.status == "1") {
    notify();
  }
}
useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <>
      <NewWebHeader newabout={"newabout"} />

      <section class="contact_us">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="contact_inner">
                <div class="row">
                  <div class="col-xxl-10 col-xl-10 col-lg-9 col-md-9 col-sm-12 col-12">
                    <div class="contact_form_inner">
                      <div class="contact_field">
                        <h3>Contact Us</h3>
                        <p>
                          Feel Free to contact us any time. We will get back to
                          you as soon as we can!.
                        </p>
                        <form onSubmit={formsubmit}>
                          <input
                            type="text"
                            class="form-control form-group"
                            required
                            placeholder="Name"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                          <input
                            type="email"
                            class="form-control form-group"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <textarea
                            class="form-control form-group"
                            placeholder="Message"
                            required
                            value={msg}
                            onChange={(e) => {
                              setMsg(e.target.value);
                            }}
                          ></textarea>
                          <input class="contact_form_submit " type="submit" />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-2 col-xxl-2 col-lg-3 col-md-3">
                    <div class="right_conatct_social_icon d-flex align-items-end">
                      <div class="socil_item_inner d-flex">
                        <li>
                          <a
                            href="https://www.facebook.com/MyGrowth91?mibextid=ZbWKwL"
                            target="_blank"
                          >
                            <i class="fab fa-facebook-square"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/growth.91/"
                            target="_blank"
                          >
                            <i class="fab fa-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            target="_blank"
                            href="https://twitter.com/Ivygrowth"
                          >
                            <i class="fab fa-twitter"></i>
                          </a>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-headset"></i>
                    <a href="tel:+917588544442">
                      {" "}
                      <span>+91 75885 44442</span>
                    </a>
                  </div>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-envelope-open-text"></i>
                    <a href="mailto:contact@growth91.com">
                      <span>contact@growth91.com</span>
                    </a>
                  </div>
                  <div class="d-flex info_single align-items-center">
                    <i class="fas fa-map-marked-alt"></i>
                    <span>
                      87, Toshniwal Layout Akola 444001 Maharashtra - address
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="map_sec">
        <div class="container">
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="map_inner">
                <h4>Find Us on Google Map</h4>
                <p></p>
                <div class="map_bind">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.2730278256986!2d77.01350587612328!3d20.699134799016743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd72e0153248bb1%3A0xf9c3a56f6f450d26!2s87%2C%20Toshniwal%20Layout%2C%20Dwarka%20Nagri%2C%20Akola%2C%20Maharashtra%20444001!5e0!3m2!1sen!2sin!4v1716882397739!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    frameborder="0"
                    style={{ border: "0" }}
                    allowfullscreen=""
                    aria-hidden="false"
                    tabindex="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      <NewWebFooter />
    </>
  );
};
