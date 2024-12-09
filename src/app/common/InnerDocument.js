import React, { Component } from 'react';
import {
    Spin,
    Input,
    Table,
} from 'antd';
import axios from "axios";


class InnerDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            documentlist: [],
            cdocumentlist: [],
            loading: false,
        }
    }
    componentDidMount() {
        this.getDocumentList();
    }
    getDocumentList = () => {
        this.setState({ loading: true });

        const formData = new FormData();
        formData.append('investor_id',this.props.investor_id);

        axios.post(`${process.env.REACT_APP_BASE_URL}api/admin/Documents/listinvestordocs`, formData)
            .then(response => {
                const result = response.data;
                console.log(result);
                if (result.status === "1") {
                    this.setState({
                        documentlist: result.data,
                        cdocumentlist: result.data,
                        loading: false,
                    });
                } else {
                    console.error(result.message);
                    this.setState({
                        loading: false,
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching documents:', error);
                this.setState({
                    loading: false,
                });
            });
    };
    searchinput = (e) => {
        let text = e.target.value;
        this.setState({ loading: true });
        if (text) {
            let arr = [];
            for (let item of this.state.cdocumentlist) {
                if (
                    (item.admindocName && item.admindocName.toLowerCase().includes(text.toLowerCase())) ||
                    (item.admindocDescription && item.admindocDescription.toLowerCase().includes(text.toLowerCase())) ||
                    (item.admindocForDeal && item.admindocForDeal.toLowerCase().includes(text.toLowerCase())) ||
                    (item.admindocForInvestor && item.admindocForInvestor.toLowerCase().includes(text.toLowerCase())) ||
                    (item.admindocForFounder && item.admindocForFounder.toLowerCase().includes(text.toLowerCase())) ||
                    (item.admindocForAll && item.admindocForAll.toLowerCase().includes(text.toLowerCase())) ||
                    (item.admindocActive && item.admindocActive.toLowerCase().includes(text.toLowerCase()))
                ) {
                    arr = [...arr, item];
                }
            }
            this.setState({
                documentlist: arr,
                loading: false,
            });
        } else {
            this.setState({
                loading: false,
            });
        }
    };
    render() {
        const dataSource = this.state.documentlist.map((item, index) => {
            console.log(item);
            return {
                key: index,
                srno: index + 1,
                documentName: item.admindocName,
                description: item.admindocDescription,
                forDeal: item.admindocForDeal,
                forInvestor: item.admindocForInvestor,
                forFounder: item.admindocForFounder,
                forPublic: item.admindocForAll,
                active: item.admindocActive,
                admindocFile: item.admindocFile,
                admindocID: item.admindocID,
               
            };
        });

        const columns = [
            {
                title: "Bank No",
                dataIndex: "srno",
                key: "srno",
            },
            {
                title: "Document Name",
                dataIndex: "documentName",
                key: "documentName",
            },
            {
                title: "Description",
                dataIndex: "description",
                key: "description",
            }
        ];
        return (
          
                            <div className='mt-5'>
                                {this.state.loading ? (
                                    <div className="text-center mt-5">
                                        <h4>Loading data...</h4>
                                        <Spin size="large" />
                                    </div>
                                ) : (this.state.cdocumentlist?.length) > 0 ?
                                    <>
                                        <Input
                                            placeholder="Search"
                                            type={"text"}
                                            onChange={(e) => this.searchinput(e)}
                                            style={{ maxWidth: 300, marginBottom: 20, height: 40 }}
                                        />
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            float: 'right',
                                            paddingBottom: '10px'
                                        }}>
                                        </div>
                                        <Table className='table-2'
                                            dataSource={dataSource}
                                            columns={columns}
                                            loading={this.state.loading}
                                            bordered
                                                onRow={(r) => ({
                                                     onClick: () =>window.open(`${process.env.REACT_APP_BASE_URL}api/uploads/admindocs/${r.admindocID }/${r["admindocFile"]}`)
                                                // onClick: () =>{ window.open(`${process.env.REACT_APP_BASE_URL}api/uploads/admindocs/${r.srno }/${r["admindocFile"]}`
                                                //   )}
                                             })}
                                            // render:<a href={process.env.REACT_APP_BASE_URL+"/api/uploads/admindocs/"+r+1+r.admindocName} >{r.admindocName}</a>

                                        >
                                        </Table>
                                    </>
                                    : <>
                                        <div className='text-center mt-5'>
                                            <h4>Documents will be visible here.</h4>
                                            <img src='No_data_rafiki.png' width={200} />
                                        </div>
                                    </>
                                }
                            </div>
                      

        )
    }
}
export default InnerDocument;
