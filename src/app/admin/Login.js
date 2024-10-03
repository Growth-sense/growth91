import React, { Component } from 'react';
import { Input, Button, Spin, message } from 'antd';
import Bridge from '../constants/Bridge';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      password:'',
      loading:false,
      type:'password',
      show_data:'none',
    }
  }
  componentDidMount(){
    if(localStorage.getItem('admin_user')){
      window.location.assign('/admin-dashboard');
      this.setState({show_data:'none'});
      return;
    }else{
      this.setState({show_data:'block'});
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // admin login
  login = () => {
    if(!this.state.username) {
      message.warning('Username is required');
      return;
    } else if(!this.state.password) {
      message.warning('Password is required');
      return;
    }
    this.setState({loading:true});
    let params = {
      username: this.state.username,
      password: this.state.password,
    }
    Bridge.adminsignin(params).then((result) => {
      if (result.status == 1) {
        console.log(result);
        
        message.success(result.message);
        this.setState({loading:false});
        const data = {
          value: result.data[0].id,
          expiry: new Date().getTime() + 12 * 60 * 60 * 1000 // 12 hour in milliseconds
        };
        localStorage.setItem('admin_login', JSON.stringify(data))
        localStorage.setItem('super_admin', JSON.stringify( result.data[0].is_super_admin))
        localStorage.removeItem('admin_user');
        localStorage.removeItem('id');
        window.location.href = '/admin-dashboard';
      } else {
        message.error(result.message);
        this.setState({loading:false});
      }
    });
  }
  changetype=()=>{
    let type=this.state.type=='password'?'text':'password';
    this.setState({type});
  }

  render() {
    return (
      <div className='container' style={{display:this.state.show_data}}>
        <Spin spinning={this.state.loading}>
          <div className='row'>
            <div className='col-lg-5 m-auto'>
              <div className='admin-login-form'>
                <img src='/web/glogo.png'
                style={{
                  maxWidth: 120,
                  margin: '0 155px 18px auto',
                  display: 'flex',
                }}
                />
                <h1 className='text-center'>Sign in</h1>
                <div>
                  <label>Username</label>
                  <Input 
                    value={this.state.username}
                    onChange={this.handleChange}
                    name='username'
                    autoComplete='off'
                  />
                </div>
                <div style={{position:'relative'}}>
                  <label>Password</label>
                  <Input 
                    type={this.state.type}
                    value={this.state.password}
                    onChange={this.handleChange}
                    name='password'
                    autoComplete='off'
                  />
                  <span className='toggle-password-icon'
                  onClick={this.changetype}>
                    {this.state.type=='password'?(
                      <i className='bx bx-hide'></i>
                    ):(
                      <i className='bx bx-show'></i>
                    )}
                  </span>
                </div>
                <Button type='primary' block onClick={this.login}>Sign in</Button>
              </div>
            </div>
          </div>
        </Spin>
      </div>
      
    )
  }
}

export default Login;
