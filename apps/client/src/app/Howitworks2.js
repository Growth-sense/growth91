import React, { Component } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class Howitworks2 extends Component {
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
                        
                        {/* What are the risks */}
                        <section id='watr'>
                            <div className=' my-3 py-3'>
                                <h1>Declaration of Risk</h1>
                                <p>By accessing/using the Growth91 platform through the website [https://www.Growth91invest.com] (“Website”), you bear the fitness to undertake the risks in investments through the Website including but not limited to the following:</p>
                            </div>
                            <div className=' my-3 py-3'>
                                <ol type='a'>
                                    <li style={{fontSize : '1.5rem', marginTop: 20,}}>Loss of Capital</li>
                                    <big>Investments in startups/early-stage ventures (“Companies”) bear an inherent risk of not assuring full-fledged profits or returns from the investments, since these companies may not have a business model or established concept which can be used as a reference for 100% success. It is for this reason that it is generally recommended to create a diversified portfolio of investments, which will have the potential to deliver gains and absorb capital losses in the aggregate.</big>

                                    <li style={{fontSize : '1.5rem',marginTop: 20,}}>Lack of Liquidity</li>
                                    <big>Liquidity refers to equity shares that can be sold with ease. However, equity investments in the Companies are highly illiquid as the shares of such Companies are unlisted/private and cannot be sold easily on an exchange or similar secondary trading platform.</big>

                                    <li style={{fontSize : '1.5rem',marginTop: 20,}}>Rarity of Dividends</li>
                                    <big>The Companies may most likely be unable to pay any dividend throughout the life cycle of an investment. Therefore, in order for you to earn a return out of any of your investments, you will have to go through a further sale or such other similar process for which a time frame cannot be ascertained.</big>

                                    <li style={{fontSize : '1.5rem',marginTop: 20,}}>Dilution</li>
                                    <big>The Companies may raise additional capital in the future and therefore, your shareholding may be diluted, as a result of such issue of new shares.</big>

                                    <li style={{fontSize : '1.5rem',marginTop: 20,}}>Performance</li>
                                    <big>The Company’s forward-looking statements, containing opinions and beliefs, are based on a number of estimates and assumptions that are subject to significant business, economic, regulatory, and competitive uncertainties. Though these statements can be used for understanding the objectives and goals of the Companies, such statements should not be considered as undertakings from the Companies and should be considered as merely being speculative and having subjective nature.</big>

                                    <li style={{fontSize : '1.5rem',marginTop: 20,}}>Tax</li>
                                    <big>You may be liable to pay taxes on any dividends or gains you receive from your investments in the Company and payment of such taxes is entirely your responsibility. Therefore, you should consult your tax advisor for more information on these matters.</big>

                                    <br style={{ marginTop: 20,}}/>
                                    <br style={{ marginTop: 20,}}/>

                                    <big><b>For the avoidance of doubt, in light of your acknowledgment of the above risk factors, you agree and acknowledge that you shall hold Growth91 harmless and shall not raise any claim in respect of any of the above.</b></big>


                                </ol>
                                
                            </div>
                            
                        </section>

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

                        {/* What are Growth91's fees? */}
                        <section id='watr'>

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
export default Howitworks2;
