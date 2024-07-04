import React, { Component } from 'react';
import moment  from 'moment';

class WebFooter extends Component {
  render() {
    return (
      <footer className="bg-white" style={{padding:'0 0 !important',margin:'1.5vh 0'}}>
      
        <div className=" text-center text-black">  
            <div className="container" >
                <div className="bottom-left">
                    <span>Copyright &copy; <a href="https://Growth91.com">Growth91<sup style={{fontSize:"0.6rem"}}>TM</sup></a> {moment().format('YYYY')}. All Rights Reserved</span>
                   
                </div>
            </div>
        </div>
    </footer>
    )
  }
}

export default WebFooter;
