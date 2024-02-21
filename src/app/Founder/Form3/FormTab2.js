
import React, { Component } from 'react';
import AssessmentForm from './AssessmentForm';
class FormTab2 extends Component {
  constructor(props){
    super(props);
    this.state={
      user_role:'',
    }
  }
  render() {
    return (
      <div>
        <section className="rfoundation-section" style={{marginTop:100}}>
          <div className="">
            <div className="">
              <div className="col-md-12">
                <AssessmentForm/>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default FormTab2;