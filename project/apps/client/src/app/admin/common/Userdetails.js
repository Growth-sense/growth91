import React, { Component } from 'react';
import {Modal} from 'antd';
import moment from 'moment';

class Userdetails extends Component {

  constructor(props){
    super(props);
    this.state={
      modal_status:false,
    }
  }
    
    componentDidMount(){
        // console.log('props data',this.props.data);
    }
    showdetailsmodal=()=>{
      this.setState({modal_status:true});
    }
    handleOk=()=>{
      this.setState({modal_status:false});
    }
    handleCancel=()=>{
      this.setState({modal_status:false});
    }

    render() {
      return (
        <>
          <a href="#" onClick={()=>this.showdetailsmodal()} style={{textTransform:'capitalize'}}>
            {(this.props.data.first_name ? this.props.data.first_name :'---') +' '+
            (this.props.data.last_name ? this.props.data.last_name : '')}
          </a>
          <Modal 
            title="User Details" 
            visible={this.state.modal_status} 
            onOk={false} 
            onCancel={this.handleCancel}
            width={650}
          >
            <div>
                <table className='admin-table-details' style={{width:'100%'}}>
                  <tr>
                    <td>Investor Id</td>
                    <td>{this.props.data.investor_id ? this.props.data.investor_id : '---'}</td>
                  </tr>
                  <tr>
                    <td>First name</td>
                    <td>{this.props.data.first_name ? this.props.data.first_name : '---'}</td>
                  </tr>
                  <tr>
                    <td>Last name</td>
                    <td>{this.props.data.last_name ? this.props.data.last_name : '---'}</td>
                  </tr>
                  <tr>
                    <td>Nationality</td>
                    <td>{this.props.data.nationality ? this.props.data.nationality : '---'}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.props.data.email ? this.props.data.email : '---'}</td>
                  </tr>
                  <tr>
                    <td>Date of birth</td>
                    <td>{this.props.data.date_of_birth ? this.props.data.date_of_birth : '---'}</td>
                  </tr>
                  <tr>
                    <td>Father name</td>
                    <td>{this.props.data.fathers_name ? this.props.data.fathers_name : '---'}</td>
                  </tr>
                  <tr>
                    <td>Legal name</td>
                    <td>{this.props.data.legal_name ? this.props.data.legal_name : '---'}</td>
                  </tr>
                  <tr>
                    <td>Kyc Status</td>
                    <td>{this.props.data.kycstatus ? this.props.data.kycstatus : '---'}</td>
                  </tr>
                  <tr>
                    <td>Registered Date</td>
                    <td>{this.props.data.created_at ? moment(this.props.data.created_at).format('DD MMM YYYY'):''}</td>
                  </tr>
                  <tr>
                    <td>Membership Type</td>
                    <td style={{textTransform:'capitalize'}}>{this.props.data.membership_type ? this.props.data.membership_type:'---'}</td>
                  </tr>
                  <tr>
                    <td>Membership Start Date</td>
                    <td>{this.props.data.membership_start_date ? moment(this.props.data.membership_start_date).format('DD MMM YYYY'):'---'}</td>
                  </tr>
                  <tr>
                    <td>Membership End Date</td>
                    <td>{this.props.data.membership_end_date ? moment(this.props.data.membership_end_date).format('DD MMM YYYY'):'---'}</td>
                  </tr>
                  <tr>
                    <td>Membership Fees</td>
                    <td>{this.props.data.membership_fees ? this.props.data.membership_fees:'---'}</td>
                  </tr>
                  <tr>
                    <td>Membership Duration</td>
                    <td>{this.props.data.membership_duration ? this.props.data.membership_duration+' Year':'---'}</td>
                  </tr>
                   <tr>
                    <td>Membership Payment Status</td>
                    <td>{this.props.data.membership_payment_status ? this.props.data.membership_payment_status:'---'}</td>
                  </tr>
                </table>
            </div>
          </Modal>
        </>
      );
    }

}

export default Userdetails;

