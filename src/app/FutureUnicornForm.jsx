import React, { useEffect } from 'react'
import { NewWebFooter } from './common/NewWebFooter'
import Slider from 'react-slick'
import NewWebHeader from "./common/NewWebHeader.jsx";
import $ from "jquery";
import { Link } from 'react-router-dom';

export const FutureUnicornForm = () => {
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
    function SimpleNextArrow(props) {
        const { onClick } = props;
        return (
            <>
                <div className="nextArrow" onClick={onClick}>
                    <span class="next-arrows slick-arrow">
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                </div>
            </>
        );
    }

    function SimplePrevArrow(props) {
        const { onClick } = props;
        return (
            <>
                <div className="prevArrow" onClick={onClick}>
                    <span class="prev-arrows slick-arrow">
                        {" "}
                        <i class="fa fa-angle-left" aria-hidden="true"></i>{" "}
                    </span>
                </div>
            </>
        );
    }
    const sliderSettings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,

        prevArrow: <SimplePrevArrow />,
        nextArrow: <SimpleNextArrow />,


        responsive: [{
            breakpoint: 1200,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 993,
            settings: {
                autoplay: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 600,
            settings: {
                autoplay: false,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 400,
            settings: {
                arrows: false,
                speed: 100,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: false,
            }
        }]
    }
    return (
        <div>
            <div classname="newabout">
                <NewWebHeader newabout={"newabout"} />
            </div>
            <div className="future-unicorn-stepper">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center" style={{ pointerEvents: "none" }}>
                            <div class="heading-title m-sm-0">
                                <p>
                                    <span></span>{" "}
                                </p>
                                <h2>Future Unicorn Form</h2>
                            </div>
                        </div>
                        <div className="col-md-12 main-tabing-unicorn">
                            <div class="tab_container">
                                <input id="tab1" type="radio" name="tabs" className='input-uni' checked />
                                <label for="tab1" className='label-start'><span>Startup Submission Form </span></label>

                                <input id="tab2" type="radio" name="tabs" className='input-uni'  />
                                <label for="tab2" className='label-start'><span> Startup Directory </span></label>

                                <input id="tab3" type="radio" name="tabs" className='input-uni'  />
                                <label for="tab3" className='label-start'><span> Investor Dashboard within the Future Unicorns Page</span></label>

                                <input id="tab4" type="radio" name="tabs" className='input-uni'  />
                                <label for="tab4" className='label-start'><i class="fa fa-folder-open-o"></i><span> Security and Compliance</span></label>

                                {/* <input id="tab5" type="radio" name="tabs" />
                                <label for="tab5"><i class="fa fa-envelope-o"></i><span>Contact</span></label> */}

                                <section id="content1" class="tab-content">
                                    <h3>Startup Submission Form: </h3>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Legal name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Status</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                     
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Employee</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor=""> Documentation Upload</label>
                                            <input type="file" className='form-control' />


                                        </div>
                                        <div className="col-6 col-md-12 col-lg-12 col-xl-12 col-12 col-sm-12 col-xxl-12 mb-4">
                                            <label htmlFor="">Address</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-12 col-lg-12 col-xl-12 col-12 col-sm-12 col-xxl-12 mb-4">
                                            <label htmlFor="" className="bold-text-form">Founder details :</label>
                                            <ul className="input-of-team">
                                                <li>    
                                                      <label htmlFor="">Upload Image</label>
                                                    <input type="file"  className='form-control' /></li>
                                                <li>
                                                    <label htmlFor="">Name</label>

                                                    <input type="text" className='form-control' />
                                                </li>
                                                <li>
                                                    <label htmlFor="">Description</label>

                                                    <input type="text" className='form-control' />
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div> */}
                                        <div className="col-12 col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                            <a href="" className='submit-future'>submit</a>
                                        </div>
                                    </div>
                                </section>

                                <section id="content2" class="tab-content">
                                    <h3>Startup Directory </h3>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Industry Report</label>
                                            <input type="file" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Funding Amount</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Startup Name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Startup Document</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Opinion Report</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Industry Insight</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-12 col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                            <a href="" className='submit-future'>submit</a>
                                        </div>
                                    </div>
                                </section>

                                <section id="content3" class="tab-content">
                                    <h3>
                                        Investor Dashboard within the Future Unicorns Page </h3>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">Name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-12 col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                            <a href="" className='submit-future'>submit</a>
                                        </div>
                                    </div>
                                </section>

                                <section id="content4" class="tab-content">
                                    <h3>Security and Compliance </h3>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-6 col-md-6 col-lg-6 col-xl-6 col-12 col-sm-12 col-xxl-6 mb-4">
                                            <label htmlFor="">name</label>
                                            <input type="text" className='form-control' />
                                        </div>
                                        <div className="col-12 col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                                            <a href="" className='submit-future'>submit</a>
                                        </div>
                                    </div>
                                </section>

                                {/* <section id="content5" class="tab-content">
                                    <h3>Headline 5</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                                </section> */}
                            </div>

                        </div>
                    </div>





                </div>

            </div>



            <NewWebFooter />


        </div>

    )
}
