import { Button, Input, Spin, Table } from "antd";
import React, {useEffect, useState} from "react";
import Header from "../common/Header";
import Sidebar from "./common/Sidebar.js";
import { NewWebFooter } from "../common/NewWebFooter.jsx";
import Bridge from "../constants/Bridge.js";

export default function UnicornEnquiryFutureUnicorn() {

const [data, setData] = useState({loading: true});
useEffect(() => {
    let founderId = localStorage.getItem("founder_id");
    if(!founderId){
        window.location.href = "/NotFound"
    }
    else{
        getInterestData(founderId);
    }
  
}, []);
const getInterestData = (founderId) => {
  Bridge.Unicorn.unicorn_interested_list({udFounderID: founderId}).then((result) => {
    if(result.status == 1){
        let listData = result.data.map((item) => {
            return{
                name: item.first_name + " " + item.last_name,
                email: item.email,
                message: item.interestMessage,
                interestDate: item.interestDate,
                interestType: item.interestInvestinStartup == 1 ? "I am interested to invest in your startup" :
                                    item.interestKnowMore == 1 ? "I want to know more about your startup" : "I want to explore collaboration",
            }
        });
        setData({
            loading: false,
            interestList: listData,
        });
    }
    else{
        setData({loading: false, interestList: []});
    }
  });
};

const columns = [
    {
      title: "Investor Name",
      dataIndex: "name",
      key: "name",
      width: 280,
    },
    {
      title: "Investor Email",
      dataIndex: "email",
      key: "email",
      width: 280,
    },
    {
      title: "Type of interest",
      dataIndex: "interestType",
      key: "interestType",
      width: 280,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      width: 280,
    },
    {
      title: "Interest Date",
      dataIndex: "interestDate",
      key: "interestDate",
      width: 280,
    }
  ];

  return (
    <>
      <Spin spinning={false}>
        <div
          style={{
            background: "rgba(0, 0, 0, 0.036)",
            paddingBottom: "0",
            margin: "1px",
            height: "100%",
          }}
        >
          <Header />
          <section></section>

          <div className="row">
            {/* <div className="collapse navbar-collapse" id="navbarSupportedContent"
            style={{ width:'fit-content' }}> */}
            <div
              className="hiw-nav col-md-2 col-12 py-3 px-0 sidebar2 collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {/* <section></section> */}
              <Sidebar />
            </div>
            <div className="hiw-nav col-md-2 col-12 py-3 px-0 d-lg-block d-none ">
              {/* <section></section> */}
              <Sidebar />
            </div>
            <div className='col-md-9 col-12 my-5' style={{ marginTop:50 }}>
            <div className="container">
              {/* How do i invest? */}
              <section
                id="hdii"
                className="m-lg-0  m-3"
                style={{ marginTop: 25, minHeight: "75vh" }}
              >
                <div className="mt-5">
                  {data.loading ? (
                    <div className="text-center mt-5">
                      <h4>Loading data...</h4>
                      <Spin size="large" />
                    </div>
                  ) : data.interestList.length > 0 ? (
                    <>
                     
                     <h2 className='text-center mb-5'> Unicorn Enquiries</h2>
                      <Table
                        className="table-2"
                        dataSource={data.interestList}
                        columns={columns}
                        loading={data.loading}
                        bordered
                        scroll={{ x: "max-content" }}
                      />
                      
                    </>
                  ) : (
                    <>
                      <div className="text-center mt-5">
                        <h4>
                          No Interests shown on the unicorn yet.
                          <br></br>
                        </h4>
                        <img src="No_data_rafiki.png" width={200} />
                      </div>
                    </>
                  )}
                </div>
              </section>
            </div>
            </div>
          </div>
        </div>
      </Spin>

      <NewWebFooter />
    </>
  );
}
