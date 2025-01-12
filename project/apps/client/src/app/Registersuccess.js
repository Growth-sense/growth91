import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

const Registersuccess = () => {

  const search = useLocation().search;
  const order_id = new URLSearchParams(search).get('order_id');
  const amount = new URLSearchParams(search).get('amount');
  const referenceId = new URLSearchParams(search).get('referenceId');

    return (
      <div class="container register-payment-page">
        <div class="row">
          <div class="col-md-6 mx-auto mt-5">
              <div class="payment">
                <div class="payment_header">
                    <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
                </div>
                <div class="content">
                    <h1>Payment Success !</h1>
                    <p>Your registration is completed successfully.<br/> Your profile will approve soon.</p>
                    <a href="/Login">Try to login</a>
                </div>
                
              </div>
          </div>
        </div>
    </div>
    )
}

export default Registersuccess;