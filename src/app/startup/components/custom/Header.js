import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
        <div className="line-seperator">
            <div 
                style={{
                    position: 'absolute',
                    top: -10,
                    background: '#fff',
                    paddingRight: 16,
                }}
            >
                <span
                    style={{
                        background: '#fff',
                        width: 'max-content',
                        height: 20,
                        zIndex: 4,
                        position: 'absolute',
                        paddingRight: 10,
                    }}
                >
                    {this.props.title}
                </span>
            </div>
            <hr/>
        </div>
    )
  }
}
