import React, {Component} from 'react';
// import { sign } from 'jsonwebtoken';
import PropTypes from 'prop-types';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state)

    this.props.userSignupRequest(this.state);
  }

  render() { 
    return ( 
      <form onSubmit={this.onSubmit}>
        <h2>Sign up and make friends!</h2>

        <div className="form-group">
          <label htmlFor="username" className="control-label">Username</label>
          <input 
            onChange={this.onChange}
            value={this.state.username}
            type="text"
            name="username"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="control-label">Email</label>
          <input 
            onChange={this.onChange}
            value={this.state.email}
            type="text"
            name="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="control-label">Password</label>
          <input 
            onChange={this.onChange}
            value={this.state.password}
            type="password"
            name="password"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <button className="btn btn-secondary btn-lrg">
            Sign Up
          </button>
        </div>

      </form>
     );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired 
}
 
export default SignupForm;