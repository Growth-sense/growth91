import React from 'react'
import { Link } from 'react-router-dom'
import Bridge from '../../constants/Bridge';

export const Previewbutton = (props) => {
    console.log(props.unicorn);
    
  return (
    <Link
    to={{
      pathname: "/Preview",
      state: props.unicorn,
    }}
    className="submit-future"
    onClick={async () => {
      const result = await Bridge.Unicorn.editunicorndraft(props.unicorn);
    }}
  >Preview</Link>
  )
}
