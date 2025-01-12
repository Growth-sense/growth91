import { message } from 'antd';
import React, { Component } from 'react'

export default class SearchInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchtext:'',
    }
  }

  componentDidMount() {
    if(this.props) {
      // console.log('searchtext',this.props);
      this.setState({ searchtext: this.props.searchtext });
    }
  }

  search= () => {
    if(this.state.searchtext.length == 0) {
      message.warning('Invalid search text');
      return;
    }

    window.location.assign('/search?data='+ this.state.searchtext);

  }

  render() {
    return (
      <form className="search-form">
        <input 
          type="text" 
          className="search-field" 
          placeholder="Search here..." 
          value={this.state.searchtext} 
          onChange={(e) => this.setState({ searchtext:e.target.value })}
        />
        <button 
          type="button" 
          className="search-submit"
          onClick={() => this.search()}
        >
            <i className="fa fa-search"></i>
        </button>
      </form>
    )
  }
}
