import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const InformationList = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  $(window).scroll(function () {
    if ($(this).scrollTop() > 30) {
      $('body').addClass('newClass');
    } else {
      $('body').removeClass('newClass');
    }
  });


  return (
    <div>
      <div classname="newabout">
        <NewWebHeader newabout={"newabout"} />
      </div>


      <section class="about-page-section blog-section pb-0 header-heights-control howitswork" style={{ paddingBottom: "0px !important" }}>

        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
              <div class="heading-title how-works  m-sm-0">
                <p>
                  <span></span>{" "}
                </p>
                <h2>How It Will Works</h2>

              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div class="MoneyPro-history hiw-li" id="hiw">
                  <div class="container ">
                    <div class="heading-title ps-4">
                    </div>
                    <div class="row d-flex align-content-around flex-wrap">
                      <div>

                      </div>
                      <div class="col-lg-12">
                        <div className="infocard-grid">
                          <div class="item">
                            <div class="media"><div class="content">
                              <h3> 1. Create a Profile</h3>
                              <p>Create a profile on Growth91 portal by signing up "Investor Signup Link" in less than a minute.</p>
                            </div>
                            </div>
                          </div>
                          <div class="item">
                            <div class="media">
                              <div class="content ">
                                <h3 >
                                  02. Accept Risks, Platform T&amp;C</h3>
                                <p>Acknowledge the Investment Risks and review the platform’s terms and conditions.</p>
                              </div>
                            </div>
                          </div>
                          <div class="item ">
                            <div class="media">
                              <div class="content">
                                <h3>03. Invest</h3>
                                <p >Before investment, you need to complete the e-KYC process, Sign the Consent Agreement &amp; verify the bank details. For specific deals, you will select the amount, payment method &amp; agree to deal-specific Terms and Conditions.</p>
                              </div>
                            </div>
                          </div>
                          <div class="item ">
                            <div class="media"><div >

                              <div class="content">
                                <h3 > 04. Select the deal of your choice</h3>
                                <p >Understand the deal details, risk involved and thorough review of legal documents presented by startup.</p>
                              </div>
                            </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="col-lg-12">
                        <div className="listed-btns">
                          <Link to="/FutureUnicornForm">List into information list</Link>
                          {/* <Link to="/MemberShip">List into investor’s list</Link> */}
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>


        </div>
      </section>


      <NewWebFooter />

    </div >
  )
}
