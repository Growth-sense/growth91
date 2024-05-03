import React from 'react'
import Deals from './Deals'

export const Newdeal = () => {
  let a=0
  setTimeout(() => {
    a=5
  }, 5000);
  return (
    <div>{a == 5?(<Deals/>):("")}</div>
  )
}
