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
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 30) {
          $('body').addClass('newClass');
        } else {
          $('body').removeClass('newClass');
        }
      });
   
  
  return (
    <div>
    <div classname="newabout">
        <NewWebHeader newabout={"newabout"}/>
    </div>
        <section class="about-page-section blog-section pb-0 header-heights-control" style={{paddingBottom: "0px !important"}}>

    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center align-items-center" style={{pointerEvents: "none"}}>
                <div class="heading-title m-sm-0">
                <p>
                  <span></span>{" "}
                </p>
                    <h2>Please List Here</h2>
                </div>
            </div>
            <div className="col-lg-12">
                <div className="listed-btns">
                <Link to="/login">List into information list</Link>
                <Link to="/login">List into investor’s list</Link>
                </div>
            </div>

        </div>
      

    </div>

</section>


<NewWebFooter />

</div>
  )
}
