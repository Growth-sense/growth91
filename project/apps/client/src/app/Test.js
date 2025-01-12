import React from "react";



const Test =()=> {

  const pay=()=>{
    let order_id='order-01';
    let user_id=59;
    let url=`${process.env.REACT_APP_BASE_URL}cashfree/register/checkout.php?user_id=${user_id}&order_id=${order_id}`;
    window.location.assign(url);
  }
 
  return(
    <div>
      <button onClick={pay}>Pay button</button>
    </div>
  );
}
export default Test;