
import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';
import Bridge from './constants/Bridge';
import Apis from './constants/Apis';

class Payment extends Component {

    // componentDidMount() {
    //     let src=''
    //     this.loadScript();
    // }

    // loadScript = (src) => {
    //     return new Promise((resolve) => {
    //         const script = document.createElement('script');
    //         script.src = src;

    //         script.onload = () => {
    //             resolve(true);
    //         }

    //         script.onerror = () =>{
    //             resolve(false);
    //         }

    //         document.body.appendChild(script);
    //     })
    // }

    // success = (data) => {
    //     if (data.order && data.order.status == "PAID") {
    //         console.log("data",data);
    //         // Bridge.getcheckstatus().then((result) => {
    //         //     console.log("result",result);
    //             // if (result.order_status == "PAID") {
    //             //     alert("Order PAID");
    //             // }
    //         // });
    //     }
    //     //   $.ajax({
    //     //     url: "checkstatus.php?order_id=" + data.order.orderId,
    //     //     success: function(result) {                                                                                                                                                                        
              
    //     //     },
    //     //   });
    //     // } else {
    //     //     order is still active
    //     //     alert("Order is ACTIVE")
    //     // }
    // }
    // failure = (data) => {
    //     alert(data.order.errorText)
    // }

    // pay = async () => {
        
    //     setTimeout( async () => {
    //         let orderToken='';
    //         let dropConfig={};
    //         let res = await this.loadScript('https://sdk.cashfree.com/js/core/1.0.26/bundle.sandbox.js');
    //         if(!res) {
    //             alert('You are offline');
    //             return;
    //         } else {
    //             console.log('res',res);
    //             // return;
    //             const cashfree = new Cashfree();
               
    //             const paymentDom = document.getElementById("payment-form");

    //             Bridge.getcashfreetoken().then((result) => {
    //                 console.log('result',result.order_token);
    //                 orderToken = result.order_token;
    //                 dropConfig = {
    //                     "components": [
    //                         "order-details",
    //                         "card",
    //                         "netbanking",
    //                         "app",
    //                         "upi"
    //                     ],
    //                     "orderToken": orderToken,
    //                     "onSuccess": this.success,
    //                     "onFailure": this.failure,
    //                     "style": {
    //                         "backgroundColor": "#ffffff",
    //                         "color": "#11385b",
    //                         "fontFamily": "Lato",
    //                         "fontSize": "14px",
    //                         "errorColor": "#ff0000",
    //                         "theme": "light", 
    //                     }
    //                 }
    //                 cashfree.initialiseDropin(paymentDom, dropConfig);
    //             });
    //         }
    //     },1000);
    // }

    render() {
        return (
        <div>
            <Header />
            <section>
                {/* <button onClick={() => this.pay()}>Pay</button> */}
                <a href={Apis.payurl+'?order_id=order-01&amount=10'}>Pay with Cashfree</a>
            </section>
            <div id="payment-form"></div>
            <Footer />
        </div>
        )
    }
}

export default Payment;


