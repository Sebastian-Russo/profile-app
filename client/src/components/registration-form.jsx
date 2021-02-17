import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import {Redirect} from 'react-router-dom';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import { isTrimmed, nonEmpty, required, matches, length } from '../validators';

const passwordLength = length({min: 10, max: 72});
const matchPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {

        if (this.props.submitSucceeded) {
            return <Redirect to='/user' />
        }

        return (
            <form
                className='login-form'
                onSubmit={this.props.handleSubmit(values => this.onSubmit(values))} 
                >

                <label htmlFor="firstName">First name</label>
                <Field component={Input} type="text" name="firstName" />
                
                <label htmlFor="lastName">Last name</label>
                <Field component={Input} type="text" name="lastName" />
                
                <label htmlFor="email">Email</label>
                <Field component={Input} type="text" name="email" />

                <label htmlFor="username">Username</label>
                <Field 
                    component={Input} 
                    type="text" 
                    name="username"
                    validate={[required, nonEmpty, isTrimmed]} 
                />
                <label htmlFor="password">Password</label>
                <Field 
                    component={Input}
                    type="password"
                    name="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    validate={[required, nonEmpty, matchPassword]}
                />
                <button className="button"
                    disabled={this.props.pristine || this.props.submitting}>
                        Register
                    </button>
            </form>
        )
    }
    
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);