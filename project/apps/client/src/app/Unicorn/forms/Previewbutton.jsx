import React from 'react'
import { Link } from 'react-router-dom'
import Bridge from '../../constants/Bridge';
import { message } from 'antd';

export const Previewbutton = (props) => {
    console.log(props.unicorn);
    
  return (
    <Link
    to={{
      pathname: "/Preview",
      state: props.unicorn,
    }}
    className="submit-future"
    onClick={async (e) => {
      console.log(props.validatePreview());
      if(props.validatePreview()){
        const result = await Bridge.Unicorn.editunicorndraft(props.unicorn);
      }
      else{
        e.preventDefault();
        message.error("Please tell us more about your Unicorn for preview.")
      }
      
    }}
  >Preview</Link>
  )
}
