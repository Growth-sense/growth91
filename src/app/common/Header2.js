import React, { Component } from 'react';
import { Menu, Dropdown, Modal,message, Spin } from 'antd';
import { UserOutlined,ReloadOutlined,BankOutlined,PieChartOutlined } from '@ant-design/icons';
import Bridge from '../constants/Bridge';
import Apis from '../constants/Apis';
import axios from 'axios';
// import Sidebar from './common/Sidebar';
import Sidebar2 from '../Founder/common/Sidebar2';

class Header2 extends Component {

 
 
  render() {


    return (
      <div>
            <nav class="navbar navbar-expand-lg ">
              <div class="container-fluid text-center me-md-auto" >
                    <li class="nav-item " style={{marginLeft: "165px"}}>
                      <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"><i class='bx bx-menu'></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    <li class="nav-item">
                      <a class="nav-link" href="/deals">Deals</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/Founders">Founder</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/Investors">Investor</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/Learn">Learn</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Community</a>
                    </li>
                    
                  </ul>                 
                </div>
              </div>
            </nav>                

      </div>
    )
  }
}

export default Header2;
