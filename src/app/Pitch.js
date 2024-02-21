
import React, { Component } from 'react';

class Pitch extends Component {

  componentDidMount() {
    // console.log('props', this.props.url);
  }

  render() {
    return (
      <div style={{
        marginTop:20
      }}>
        <div class='embed-responsive' 
          style={{ 
            width:860,
            minHeight:'100vh',
            height:1000,
            margin:'0 auto'
          }}
        >
          <embed 
            src={this.props.url} 
            type="application/pdf" 
            width="100%" 
            height="100%"
          />
        </div>
      </div>
    );
  }
}

export default Pitch;