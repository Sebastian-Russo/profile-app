import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import {Redirect} from 'react-router-dom';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';

export class LoginForm extends React.Component {
    onSubmit(values) {
        console.log(values)
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error; 

        if(this.props.submitSucceeded) {
          console.log('submit succeeded!')
          return <Redirect to='/user' />
        }

        if (this.props.error){
            console.log('this.props error', this.props)
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            )
        }

        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
                {error}
                <label htmlFor="username">Username</label>
                <Field
                    name="username"
                    id="username"
                    type="text"
                    component={Input}
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="password">Password</label>
                <Field 
                    name="password"
                    id="password"
                    type="password"
                    component={Input}
                    validate={[required, nonEmpty]}
                />
                <button disabled={this.props.pristine || this.props.submitting}
                    className="btn btn-secondary btn-lrg m-2">
                    Login
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'LoginForm',
    onSubmitFail: (errors, dispatch) => { 
      dispatch(focus('LoginForm', Object.keys(errors)[0]))
    }
})(LoginForm)