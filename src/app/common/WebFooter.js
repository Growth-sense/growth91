import React, { Component } from 'react';
import moment from 'moment';

class WebFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_type: '',
        }
    }
    componentDidMount() {
        if (localStorage.getItem('investor_id')) {
            this.setState({ user_type: 'investor' });
        } else if (localStorage.getItem('founder_id')) {
            this.setState({ user_type: 'founder' });
        } else {
            this.setState({ user_type: '' });
        }
    }
    render() {
        return (
            <footer className="footer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 ">
                            <div className="left">
                                <div className="col-md-12 d-flex flex-column align-items-between">
                                    <a href="/" className="brand  text-light ">
                                        <img src="./web/white-logo.png" style={{ marginBottom: '70px' }}
                                            className="mt-0 pt-0 ZI-1000" width="125" alt="img" />
                                    </a>
                                    <p
                                        style={{
                                            position: 'relative',
                                            top: -48,
                                            left: 9,
                                        }}
                                        className="mt-2 pb-0">Growth91<sup style={{ fontSize: '0.4rem', position: 'relative', top: -6 }}>TM</sup> Advisors Private Limited.</p>
                                </div>
                                <p
                                    style={{ marginLeft: 8, position: 'relative', top: -33 }}
                                    className="pb-0" >Making Startup Investments Accessible.</p>
                                <ul
                                    style={{
                                        position: 'relative', top: -25
                                    }}
                                >
                                    <li><a className=""
                                        href="https://www.linkedin.com/company/growth91/" target='_blank'><i className="fab fa-linkedin-in"></i></a></li>
                                    <li>
                                        <a
                                            href="https://www.facebook.com/MyGrowth91?mibextid=ZbWKwL"
                                            target="_blank"
                                        >
                                            <i class="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li className="top-end-social">
                                        <a
                                            href="https://www.instagram.com/growth.91/"
                                            target="_blank"
                                        >
                                            <i class="fab fa-instagram"></i>
                                        </a>
                                    </li>

                                </ul>
                            </div>

                        </div>

                        <div className="col-lg-2 col-sm-6">
                            <div className="footer-item">
                                <h3 >Useful Link</h3>
                                <ul>
                                    <li><a href="/deals"><i className="fal fa-angle-right"></i>Invest</a></li>
                                    <li><a href="/resources"><i className="fal fa-angle-right"></i>How it works</a></li>
                                    <li><a href="/Learn"><i className="fal fa-angle-right"></i>Learn</a></li>
                                    {this.state.user_type == 'investor' ? (
                                        <li><a href="/investor-dashboard"><i className="fal fa-angle-right"></i>Dashboard</a></li>
                                    ) : (this.state.user_type == 'founder') ? (
                                        <li><a href="/founder-dashboard"><i className="fal fa-angle-right"></i>Dashboard</a></li>
                                    ) : (
                                        <li><a href="/Login"><i className="fal fa-angle-right"></i>Log in</a></li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="footer-item">
                                <h3>Useful Link</h3>
                                <ul>
                                    <li><a href="/TermsConditions"><i className="fal fa-angle-right"></i>Terms and Conditions</a></li>
                                    <li><a href="/PrivacyPolicy"><i className="fal fa-angle-right"></i>Privacy Policy</a></li>
                                    <li><a href="mailto:contact@Growth91.com"><i className="fal fa-angle-right"></i>Questions or Feedback</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="footer-item contact_item">
                                <h3>Contact Info</h3>
                                <ul>
                                    <li>
                                        <a className="mt-2 pb-0" style={{ color: '#DFD8EC', pointerEvents: 'none' }}>
                                            <i className="fa fa-map-marker"></i>Ahmedabad | Akola | Bangalore | Mumbai
                                        </a>
                                        <a href="mailto:contact@Growth91.com">
                                            <i class="fa fa-envelope"></i>
                                            contact@Growth91.com
                                        </a>
                                        <a className="mt-2 pb-0" style={{ color: '#DFD8EC', pointerEvents: 'none' }}>
                                            <i class="fa fa-building" aria-hidden="true"></i>
                                            87, Toshniwal Layout, Akola 444004
                                        </a>
                                        <a className="mt-2 pb-0" style={{ color: '#DFD8EC', pointerEvents: 'none' }}>
                                            <i className="fa fa-phone fa-rotate-90"></i>
                                            +91 75885 44442
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="footer-bottom mt-5">
                    <div className="container">
                        <div className="bottom-left">
                            <span>Copyright &copy; <a href="#">Growth91<sup style={{ fontSize: '0.5rem', position: 'relative', top: -6 }}>TM</sup></a> {moment().format('YYYY')}. All Rights Reserved</span>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default WebFooter;