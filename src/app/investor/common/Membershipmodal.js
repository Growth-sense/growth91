import React, { Component } from 'react'

export default class Membershipmodal extends Component {
  render() {
    return (
        <div>
            <div className='col-lg-6'>
                <button className='big-button prime-bg' data-bs-toggle="modal" data-bs-target="#exampleModal">Prime Model</button>     
            </div>
            {/* Start Upgrade membership modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class=" modal-header border border-0">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center">
                        <h3>Become A Premium Member</h3>
                        <img src="./web/premium-account.png" style={{width: "120px"}}></img>
                        <p>Be a Part of Growth91 family
                        </p>
                        <p>Be a premium member and enjoy the benefits of Growth91 plateform
                        </p>
                    </div>
                    <div class="modal-footer col align-self-center border border-0">
                        <button type="button" class="small-button-dark2 bg-secondary border-0" data-bs-dismiss="modal">Close</button>
                        <a href="#" class="small-button-dark2 ">Upgrade Membership</a>
                    </div>
                    </div>
                </div>
            </div>
            {/* End Upgrade membership modal */}
      </div>
    )
  }
}
