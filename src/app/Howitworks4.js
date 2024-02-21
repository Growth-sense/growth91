import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class Howitworks4 extends Component {
  render() {
    return (
      <div>
      <Header />

      
  
      <div className='row '>
      

          <div className='col-3 hiw-nav py-5 px-3'>
          <section></section>
          

              <h2 className='text-center'>How It Works</h2>
                <ol>
                    <a href='/How-it-works'><li className='hiw-li'>How do i invest?</li></a>
                    <a href='/How-it-works2'><li className='hiw-li'>What are the risks?</li></a>
                    <a href='/How-it-works3'><li className='hiw-li'>What is G-SAFE?</li></a>
                    <a href='/How-it-works4'><li className='hiw-li'>What are Growth91's fees?</li></a>                   
                    
                </ol>
          </div>

          <div className='col-8'>

                {/* How do i invest? */}
                <section id='hdii'>
                    <div className='row m-3  p-3'>
                        
                        

                        {/* What are Growth91's fees? */}
                        <section id='watr'>
                            <h1>Pricing</h1>
                            <div className='m-5 p-5 for-box text-center '>
                                <h2>For Investors</h2>
                                <div className='row'>
                                   <div className='col ' style={{height: '60vh', borderRadius: '1rem',}}>
                                       <div className='bg-white d-flex flex-column justify-content-center ' style={{height: '25vh', borderRadius: '1rem',}}>
                                            <h2 className='hiw-bt'>2%</h2>
                                            <p>of Amount Invested</p>
                                       </div>
                                       <div className='bg-white d-flex flex-column justify-content-center mt-5' style={{height: '25vh', borderRadius: '1rem',}}>
                                            <h2 className='hiw-bt'>2%</h2>
                                            <p>of Sales Consideration</p>
                                       </div>
                                   </div>
                                   <div className='col  ' style={{height: '60vh', borderRadius: '1rem',}}>
                                        <div className='bg-white d-flex flex-row ' style={{height: '10vh', borderRadius: '1rem',  }}>
                                            <div className='' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start  mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>Completely online</p>
                                       </div>
                                       <div className='bg-white d-flex flex-row  ' style={{height: '10vh', borderRadius: '1rem',  marginTop:'2.4rem'}}>
                                            <div className=' ' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>No membership fee</p>
                                       </div>
                                       <div className='bg-white d-flex flex-row  ' style={{height: '10vh', borderRadius: '1rem',  marginTop:'2.4rem'}}>
                                            <div className='' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>No maintenance fee</p>
                                       </div>
                                       <div className='bg-white d-flex flex-row  ' style={{height: '10vh', borderRadius: '1rem',  marginTop:'2.4rem'}}>
                                            <div className=' ' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>Track your investment</p>
                                       </div>
                                   </div>
                                </div>

                            </div>
                            <div className='m-5 p-5 for-box text-center '>
                                <h2>For Startups</h2>
                                <div className='row'>
                                   <div className='col ' style={{height: '60vh', borderRadius: '1rem',}}>
                                       <div className='bg-white d-flex flex-column justify-content-center ' style={{height: '25vh', borderRadius: '1rem',}}>
                                            <h2 className='hiw-bt'>₹25000</h2>
                                            <p>Campaign Listing Fee</p>
                                       </div>
                                       <div className='bg-white d-flex flex-column justify-content-center mt-5' style={{height: '25vh', borderRadius: '1rem',}}>
                                            <h2 className='hiw-bt'>Add-ons</h2>
                                            <p>Due Diligence Report, Private Placement</p>
                                       </div>
                                   </div>
                                   <div className='col  ' style={{height: '60vh', borderRadius: '1rem',}}>
                                        <div className='bg-white d-flex flex-row ' style={{height: '10vh', borderRadius: '1rem',  }}>
                                            <div className='' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>Full payment processing</p>
                                       </div>
                                       <div className='bg-white d-flex flex-row  ' style={{height: '10vh', borderRadius: '1rem',  marginTop:'2.4rem'}}>
                                            <div className=' ' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>No membership fee</p>
                                       </div>
                                       <div className='bg-white d-flex flex-row  ' style={{height: '10vh', borderRadius: '1rem',  marginTop:'2.4rem'}}>
                                            <div className='' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>Dedicated account management</p>
                                       </div>
                                       <div className='bg-white d-flex flex-row  ' style={{height: '10vh', borderRadius: '1rem',  marginTop:'2.4rem'}}>
                                            <div className=' ' >
                                                <img src='assets/images/home/founders/1.png' className='img-fluid rounded-start mx-4' alt="..." style={{width: '5rem'}} />
                                            </div>
                                            <p className='my-auto '>Campaign account management</p>
                                       </div>
                                   </div>
                                </div>

                            </div>
                            
                        </section>

                    </div>
                </section>
          </div>
          
      </div>
  
      <Footer />
  
  </div>
    )
  }
}
export default Howitworks4;
