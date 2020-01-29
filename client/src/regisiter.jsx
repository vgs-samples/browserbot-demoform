import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

class Register extends Component {

    constructor(props){
        super(props);

        this.state={
            username:'',
            email:'',
            password:'',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleCaptchaResponseChange = this.handleCaptchaResponseChange.bind(this);

    }

    handleCaptchaResponseChange(response) {
      this.setState({
        recaptchaResponse: response,
      });
    }


    handleChange(field){
      return (e) => {
        this.setState({[field]: e.target.value});
      }
    }

    handleSubmit(e){
      e.preventDefault();


      const recaptchaValue = this.recaptcha.getValue();
      this.recaptcha.reset();
      axios.post('/api/submit', {
          recaptcha: recaptchaValue,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        })
      .then((response) => {
                if (!response.data.error) {
                    console.log('successful signup')
                }
                // Redirect
                this.props.history.push({pathname:'/dashboard', state: { detail: response.data }});
            })
        .catch(error => {
                console.log('signup error: ')
                console.log(error)
            })
      this.setState({
        username: '',
        email: '',
        password: ''
      })
    }

    render(){
        return (
            <div className="signup-form">
            <div align="center" className="logo">
              <img className="img-logo" src="//logo.clearbit.com/verygoodsecurity.com" alt="VGS"></img>
            </div>
            <div align="center" className="company">
              <p>Very Good Security</p>
            </div>
          <form onSubmit={this.handleSubmit} method="post">
              <h2>Register</h2>
              <p className="hint-text">Create your account. Please use fake personal data.</p>
              <div className="form-group">
                     <input type="text" className="form-control" name="username" onChange={this.handleChange('username')} placeholder="Username" required="required"/>
              </div>      	
              <div className="form-group">
                  <input type="email" className="form-control" name="email" onChange={this.handleChange('email')} placeholder="Email" required="required"/>
              </div>
              <div className="form-group">
                      <input type="password" className="form-control" name="password"  onChange={this.handleChange('password')} placeholder="Password" required="required"/>
              </div>       
              <div className="form-group">
                <label className="checkbox-inline"><input type="checkbox" id="agreement" required="required" /> I accept the <a href="#">Terms of Use</a> &amp; <a href="#">Privacy Policy</a></label>
              </div>
              <div className="form-group">  
              <ReCAPTCHA sitekey="6LeqNdEUAAAAANzugo7niVujnuspAuCGeXtXtHp2" onChange={this.handleCaptchaResponseChange} ref={(el) => {this.recaptcha = el;}} /> 
              </div>
              <div className="form-group">
                      <button id="register" type="submit" className="btn btn-lg btn-block">Register Now</button>
              </div>
          </form>
          </div>
        )
    }
}

export default Register;