import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import SignupForm from './registration-form';
import { userSignupRequest } from '../actions/signup-action';
import LoginForm from './login-form';

class SignupPage extends Component {
  render() { 
    const { userSignupRequest } = this.props; 
    return ( 
      <div className="row">
        <div className="col-md-4 col-md-offset">
          <SignupForm userSignupRequest={userSignupRequest} />
          <LoginForm />
        </div>
      </div>
     );
  }
}

SignupForm.proptypes = { 
  userSignupRequest: PropTypes.func.isRequired 
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    userSignupRequest
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(SignupPage);