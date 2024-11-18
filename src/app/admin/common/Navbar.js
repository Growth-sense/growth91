import React, { Component } from 'react';
import { Menu, Layout, Modal, Dropdown,Space } from 'antd';
import { UserOutlined,ReloadOutlined,DownOutlined } from '@ant-design/icons';

const { Header } = Layout;


class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      
    }
  }
  
  componentDidMount() {
  
    const getSessionData = (key) => {
      const dataString = localStorage.getItem(key);
      
      if (!dataString) return null;
    
      const data = JSON.parse(dataString);
      const now = new Date().getTime();
    
      if (now > data.expiry) {
        // Data has expired
        localStorage.removeItem(key);
        return null;
      }
    
      return data.value;
    };
    const storedValue = getSessionData('admin_login');
    
    if (storedValue == null) {
      window.location.assign('/admin');
    }
  }

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  logout = () => {
    
    localStorage.clear();
    window.location.href = '/admin';
  }

  render() {

    const menu = (
      <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
        {/* <Menu.Item key="two" icon={<UserOutlined />}>
          <a href="/admin-profile" style={{ fontSize:14 }}>
            Profile
          </a>
        </Menu.Item> */}
        <Menu.Item key="three" icon={<ReloadOutlined />}
        style={{ width:160 }}>
          <a href='#' style={{ fontSize:14 }} onClick={() => this.setState({ modalVisible:true })}>
            Logout
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <Header
        className="site-layout-background ZI-1000"
        style={{ padding: 0 }}
      >
        <nav class="navbar navbar-light bg-light">
          
          <div class="container-fluid">
            <a class="navbar-brand" >            <img src='/web/glogo.png' style={{width: "120px", marginLeft: "32px" }}></img>
</a>
            <form>
              <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}
                style={{ color:'#000' }}>
                  <Space>
                    Admin
                    <DownOutlined width={14}
                    style={{ fontSize:14,position:'relative',top:-3 }} />
                  </Space>
                </a>
              </Dropdown>
            </form>
          </div>
        </nav>

        <Modal
          title="Confirm"
          visible={this.state.modalVisible}
          onOk={this.logout}
          onCancel={this.handleCancel}
          okText="Yes"
          cancelText="No"
          style={{ maxWidth: 480 }}
        >
          <h6>Are you sure you want to sign out?</h6>
        </Modal>

      </Header>

    )
  }
}

export default Navbar;