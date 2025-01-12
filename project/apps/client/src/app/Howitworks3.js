import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class Howitworks3 extends Component {
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
                        
                       

                        {/* What is T-SAFE? */}
                        <section id='watr'>
                        <div className=' my-3 py-3'>
                                <h1>G-SAFE: A complete guide</h1>
                                <p>The companies that raise on Growth91 set the terms for their agreement with investors.</p>
                            </div>
                            <div className=' my-3 py-3'>
                                <h5>What is G-SAFE?</h5>
                                <p>Growth91’s simple agreement for future equity</p>
                                <big>A G-SAFE is an investment contract between investors and startups looking to raise capital. Individuals make investments for the chance to earn a return—in the form of equity in the company or a cash payout. <br/> <br/>The G-SAFE, created by us, is an adapted version of the SAFE, a financial instrument created by Y Combinator and widely used by angels & VCs investing in startups across the globe. It is designed specifically to work for investment campaigns accepting hundreds or even thousands of investors, and it's used by several industry stalwarts in various forms.</big>
                            </div>
                            <div className=' my-3 py-3'>
                                <h5>How does it work?</h5>
                                <big>Investors using the G-SAFE get a financial stake in the company but are not immediately holders of equity. It takes the legal form of Compulsorily Convertible Debentures (‘CCDs’) at the time of issue. These CCDs are converted into equity on the happening of ‘activation events’ like acquisition or IPO.</big>
                                <p className='text-danger'><i className="bi bi-exclamation-square"></i> Risk Note: Activation events are not guaranteed. Investors should see them only as possibilities.</p>
                            </div>
                            <div className=' my-3 py-3'>
                                <h5>How much can I earn?</h5>
                                <big>Your return depends on your investment amount, the company’s exit valuation (how much the company is worth at that time), and the terms of the G-SAFE. Investors invest money at an extremely early stage and hence their stake is affected by future events only.</big>
                                <p className='text-danger'><i className="bi bi-exclamation-square"></i> Risk Note: If an activation event does not happen, you may never get a return on your investment.</p>
                            </div>
                            <div className=' my-3 py-3'>
                                <h5>Terms of the G-SAFE</h5>
                                <p>Overview</p>
                                <big>This agreement issues compulsorily convertible debentures which convert into securities issued in future financing, i.e. equity shares or compulsorily convertible preference shares, on trigger events such as 100% secondary sale of CCDs, buyback or IPO.
                                    <br/><br/><b>Instrument</b> - Compulsorily Convertible Debentures (CCDs).
                                    <br/><br/><b>Conversion Events</b>  - 100% secondary sale, Buyback, Acquisition, IPO.

                                    <br/><b>Cap Table -</b> 
                                    <ul>
                                    <br/><li><b>Before Next Funding Round: </b> 
                                    No line on the cap table</li>
                                    <li><b>Post Next Funding Round: </b> 
                                    No line on the cap table</li>
                                    </ul>

                                    <br/><b>Voting Rights -</b> 
                                    <ul>
                                    <br/><li><b>Before Next Funding Round:  </b> 
                                    No voting rights</li>
                                    <li><b>Post Next Funding Round: </b> 
                                    No voting rights</li>
                                    </ul>       
                                    
                                    <br/><b>Conversion Table -</b> 
                                    <ul>
                                    <br/><li>With Discount Cap</li>
                                    <li>With Valuation Floor and/or Cap</li>
                                    <li>With Discount Cap + Valuation Cap</li>
                                    <li>Fixed Valuation</li>
                                    </ul>

                                    <br/><b>   Financial Instruments we offer -</b> 
                                    <ul>
                                    <br/><li><b>CCD - </b> 
                                    Compulsorily Convertible Debentures are hybrid securities which have the same financial rights as equity shares but no voting rights. CCDs do not come on the cap table.</li>
                                    <li><b>CCPS - </b> 
                                    Compulsorily Convertible Preference Shares are hybrid securities which have the same financial rights as equity shares but restricted voting rights. CCPS come on the cap table.</li>
                                    <li><b>NCD - </b> 
                                    Non Convertible Debentures are secured debt securities which provide a fixed rate of interest periodically with the investment repayment at the end of the tenure. NCDs do not come on the cap table.</li>
                                    <li><b>CSOP - </b> 
                                    Community Stock Option Pool are options which have the same financial rights as equity shares but no voting rights. CSOPs do not come on the cap table and are the fastest to execute.</li>
                                    </ul>
                                </big>
                            </div>

                            <div className=' my-3 py-3'>
                                <h5>Why G-SAFE?</h5>
                                <p>It’s simple, faster and cheaper at the same time.</p>
                                <big>
                                    <ol>
                                    <li><b>Efficient: </b> 
                                    G-SAFE is a one-document security without numerous terms to negotiate, saving money in legal fees and reducing the time spent negotiating the terms of the investment. Startups usually only have to negotiate one item: the valuation cap or the discount cap.</li>
                                    <li><b>Benefits of Equity without any hassles: </b> 
                                    G-SAFE is designed specifically as a financial instrument without the hassles of attending general meetings or signing unnecessary documents. It comes with detailed information rights and easier exits while increasing in value just like equity shares.</li>
                                    <li><b>Safety First: </b> 
                                    A G-SAFE holder gets preferential rights over traditional shareholders in terms of repayment. If the startup gets liquidated, a G-SAFE holder is paid before any shareholder.</li>
                                    <li><b>Cheaper: </b> 
                                    The legal costs are bare minimum.</li>
                                    </ol>   
                                </big>
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
export default Howitworks3;
