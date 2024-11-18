import React, { Component } from 'react';
import Header from '../common/Header';
import WebFooter from '../common/WebFooter';
import Sidebar from './common/Sidebar';
import FormStatus from '../common/FormStatus';  
import { 
  Layout, Breadcrumb, Table, 
  Card, Button, Modal, message,Select ,
  Spin,DatePicker,Dropdown,Menu,Checkbox,
Input } from 'antd';

class FounderFormStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

  render() {

    return (
      <div>
      <Header />
  
      <div className='row'>
        <div className='col-12' style={{}}>
            <br/>
            <br/>
            <Card 
                title="Assessment Survey" 
              style={{ margin: 16 }}>
                <Breadcrumb
                    style={{
                    margin: '0',
                    }}
                >
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Assessment Survey</Breadcrumb.Item>
                </Breadcrumb>
                <br/><br/>
                <FormStatus type='founder' />
            </Card>
            <br/><br/>
          </div>
          {/* <div className='col-2'></div> */}
        </div>
        <div className=''></div>
      </div>
    )
  }
}
export default FounderFormStatus;
