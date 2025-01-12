
import React, { Component } from 'react';
import WebHeader from '../common/WebHeader';
import WebFooter from '../common/WebFooter';
import { message, Spin } from 'antd';
import Bridge from '../constants/Bridge';
import $ from 'jquery';
import moment from 'moment';
import Urldata from './Urldata';

class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  
  render() {
    return (
        <div className="col-lg-12">
          <h3 className="text-center" style={{ marginBottom:'56px' }}>
             You have submitted form successfully.
          </h3>
        </div>
    );
  }
}

export default Success;
