import React, { Component } from 'react'
import { Modal, Spin, message, Button, notification } from 'antd'
import Bridge from "../../constants/Bridge";
import moment from 'moment';

export default class Membership extends Component {
    constructor(props){
        super(props)
        this.state={
            modal_status:false,
            investor_id:0,
            type:'',
            start_date:'',
            end_date:'',
            amount: 0,
            discount: 0,
            discounted_amount: 0,
            loading:false,
            member_type:'',
            premium_button_show_status:false
        }
    }
    componentDidMount(){
        this.setState({
            investor_id:this.props.investor_id,
            type:this.props.type,
            start_date:this.props.start_date,
            end_date:this.props.end_date,
            premium_button_show_status:this.props.premium_button_show_status,
        })
        console.log('status',this.props);
        let start_date= moment(this.props.start_date).format('YYYY-MM-DD')
        let start_date_plus_2_days= moment(this.props.start_date).add(2, 'days').format('YYYY-MM-DD')
        let current_date=moment().format('YYYY-MM-DD');
        let member_type='';
        if(this.props.type=='regular'){
            // current_date >= start_date && 
            if(current_date <= start_date_plus_2_days){
                member_type='new';
            } else {
                member_type='old';
            }
            this.setState({
                member_type:member_type
            },()=>this.getsettings())
        } else {
            this.setState({
                member_type:'old'
            },()=>this.getsettings())
        }
    }
    getsettings = () => {
        Bridge.admin.settings.getsettings().then((result) => {
            if (result.status == 1) {
                let discount_per=0;
                if(this.state.member_type=='new'){
                    discount_per=result.data[0].discount;
                } else {
                    discount_per=result.data[0].discount_for_old_member;
                }
                let amount=
                Number(result.data[0].amount / 100) * Number(discount_per);
                amount = Number(result.data[0].amount) - Number(amount);
                console.log('amount',amount)
                this.setState({
                    amount: result.data[0].amount,
                    discount: result.data[0].discount,
                    discounted_amount: amount,
                });
            } 
        });
    }
    upgrade=()=>{
        if(this.state.discounted_amount=='0'){
            let params ={
                investor_id:this.state.investor_id,
            }
            this.setState({loading:true})
            Bridge.investor.update_membership_to_premium(params).then((result) => {
                if (result.status==1) {
                    let placement='topCenter';
                    notification.success({
                        message: `Success`,
                        description:
                        'Membership is upgraded successfully.',
                        placement,
                    });
                    this.setState({modal_status:false,loading:false});
                    this.props.closeModal();
                    setTimeout(()=>{
                        window.location.reload();
                    },5000);
                } else{
                    message.warn('Please try again!');
                    this.setState({loading:false})
                }
            });
        } else {
            let order_id = "order-01";
            let user_id = this.state.investor_id
            let amount = this.state.discounted_amount;
            let membership_fees = this.state.discounted_amount;
            let registered_amt = this.state.amount;
            let url = `${process.env.REACT_APP_BASE_URL}cashfree/investormembership/checkout.php?user_id=${user_id}&order_id=${order_id}&amount=${amount}&membership_fees=${membership_fees}&registered_amt=${registered_amt}`;
            window.location.assign(url);
            // console.log('url',url);
        }
    }
    open_modal=()=>{
        this.setState({modal_status:true});
    }
    render() {
        return (
            <div>
                {(this.state.type=='regular' || this.state.premium_button_show_status==true) && (
                    <Button 
                        type="primary" 
                        style={{marginTop:10,marginBottom:20}}
                        onClick={this.open_modal}
                    >
                       {this.state.type=='regular' ? 'Upgrade Now' : 'Renew Now'} 
                    </Button>
                )}
                <Modal
                    header={false}
                    visible={this.state.modal_status}
                    footer={false}
                    style={{maxWidth:'100%'}}
                    onCancel={()=>this.setState({modal_status:false})}
                    width={900}
                >
                    <div style={{padding:0}} className='pricing-section'>
                        <div className="row">
                            <div className="col-md-6">
                                <div 
                                    className="pracing-item disabled"
                                >
                                <div className="top-left">
                                    <p>Free</p>
                                </div>
                                <div className="top-area">
                                    <i
                                    className="bx bx-donate-heart"
                                    style={{ fontSize: "40px", color: "green" }}
                                    ></i>
                                    <p> Regular Membership</p>
                                </div>
                                <ul className="text-left " style={{ textAline: "left" }}>
                                    <li className="ps-md-5 ps-0">
                                    <span>
                                        <i className="fa fa-check text-success"></i>
                                    </span>
                                    Access to Company Documents
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                    <span>
                                        <i className="fa fa-check text-success"></i>
                                    </span>
                                    View Company Performance{" "}
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                    <span>
                                        <i className="fa fa-check text-success"></i>
                                    </span>
                                    Invest{" "}
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                    <span>
                                        <i
                                        className="fa fa-times text-danger"
                                        aria-hidden="true"
                                        ></i>
                                    </span>
                                    Preview of opportunities (24~48 hrs)
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                    <span>
                                        <i
                                        className="fa fa-times text-danger"
                                        aria-hidden="true"
                                        ></i>
                                    </span>
                                    Priority for invest
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                    <span>
                                        <i
                                        className="fa fa-times text-danger"
                                        aria-hidden="true"
                                        ></i>
                                    </span>
                                    Priority in Equity
                                    </li>
                                </ul>
                                <p
                                    className="text-success text-center mb-3"
                                    style={{ fontSize: "24px" }}
                                >
                                    {" "}
                                    Free
                                </p>
                                <center>
                                    <hr style={{maxWidth:160}} />
                                </center>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <Spin spinning={this.state.loading}>
                                <div className="pracing-item">
                                    <div className="top-left">
                                    <p>100% off</p>
                                    </div>
                                    <div className="top-area">
                                    <i
                                        className="bx bxs-dollar-circle"
                                        style={{ fontSize: "40px", color: "gold" }}
                                    ></i>
                                    <p>Premium Membership</p>
                                    </div>
                                    <ul>
                                    <li className="ps-md-5 ps-0">
                                        <span>
                                        <i className="fa fa-check text-success"></i>
                                        </span>
                                        Access to Company Documents
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                        <span>
                                        <i className="fa fa-check text-success"></i>
                                        </span>
                                        Invest{" "}
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                        <span>
                                        <i className="fa fa-check text-success"></i>
                                        </span>
                                        View Company Performance{" "}
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                        <span>
                                        <i
                                            className="fa fa-check text-success"
                                            aria-hidden="true"
                                        ></i>
                                        </span>
                                        Preview of opportunities (24~48 hrs)
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                        <span>
                                        <i
                                            className="fa fa-check text-success"
                                            aria-hidden="true"
                                        ></i>
                                        </span>
                                        Priority for invest
                                    </li>
                                    <li className="ps-md-5 ps-0">
                                        <span>
                                        <i
                                            className="fa fa-check text-success"
                                            aria-hidden="true"
                                        ></i>
                                        </span>
                                        Priority in Equity
                                    </li>
                                    </ul>
                                    <p
                                    className="text-success text-center mb-3"
                                    style={{ fontSize: "24px" }}
                                    >
                                    <del
                                        className="text-secondary"
                                        style={{ fontSize: "20px" }}
                                    >
                                        &#x20b9; {this.state.amount}
                                    </del>
                                    &nbsp; &#x20b9; {this.state.discounted_amount}{" "}
                                    </p>         
                                    <center>
                                        <hr style={{maxWidth:160}} />
                                    </center>                           
                                </div>
                                </Spin>
                            </div>
                            </div>  
                        <button
                            href="#"
                            className="buy-now mb-5"
                            onClick={this.upgrade}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                margin: '0 auto',
                                marginBottom: '0px !important',
                                padding: '4px 30px',
                                color: '#fff',
                                background: '#351c75',
                                border: '1px solid #351c75',
                                borderRadius: 7,
                            }}
                        >
                            Upgrade Now
                        </button>   
                    </div>
                </Modal>
            </div>
        )
    }
}
