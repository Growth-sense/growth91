import React, { Component } from 'react';
import { 
  Layout, Breadcrumb, Card,Select,Button,message,
Input } from 'antd';
import Sidebar2 from './common/Sidebar2';
import Navbar from './common/Navbar';
import BottomBar from './common/BottomBar';
import Bridge from '../constants/Bridge';

import FormStatus from '../common/FormStatus';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const { Content } = Layout;

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";



class AdminFormStatus extends Component {

    constructor(props){
      super(props);
      this.state={
        list:[],
      }
    }
    componentDidMount(){
      this.getstatuslist();
    }

    // get post list
    getstatuslist = () => {
      this.setState({ loading: true });
      Bridge.getformstatuslist().then((result) => {
        if (result.status == 1) {
          this.setState({
            list: result.data,
            loading: false,
          });
        } else {
          message.error(result.message);
          this.setState({
            loading: false,
          });
        }
      });
    }

    exportToCSV = () => {
      let arr = [];
      for (let item of this.state.list) {
        let obj = {
          "Name": item.name,
          "Role": item.role,
          "Email": item.email,
          "Information Request Date": item.created_at,
          "Information Submitted Date": item.survey_submit_date,
        };
        arr = [...arr, obj];
      }
      let fileName='Assesment Information Result';
      const ws = XLSX.utils.json_to_sheet(arr);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
      message.success("Assesment Information data is exported successfully.");
    };
    


    
    render() {
    
    return (
      <>
      <Layout
        style={{ minHeight:'100vh',marginTop:0 }}
         className='main-dashboard-container'
      >
        <Sidebar2 />
        <Layout className="site-layout">
            <Navbar />
            <Content style={{ margin: 16 }}>
              <Card title="Assessment Information Result" 
              extra={
                <Button type="primary" onClick={this.exportToCSV}>
                  Export Data
                </Button>
              }
              style={{ margin: 16 }}>
                <Breadcrumb
                  style={{
                    margin: '0',
                  }}
                >
                  <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item>Assessment Information Result</Breadcrumb.Item>
                </Breadcrumb>
                <br/><br/>
                <FormStatus type='admin' />
              </Card>
            </Content>
          
          <BottomBar />
        </Layout>

      </Layout>

      </>
    );
  }
}

export default AdminFormStatus;