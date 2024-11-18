import React from 'react'
import { Link } from 'react-router-dom'

export const Previewbutton = (props) => {
    console.log(props.unicorn);
    
  return (
    <Link
    to={{
      pathname: "/Preview",
      state: props.unicorn,
    }}
    className="submit-future"
  >Preview</Link>
  )
}
