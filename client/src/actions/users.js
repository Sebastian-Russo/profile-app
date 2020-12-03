import {SubmissionError} from 'redux-form';
import { login } from './auth';
import { normalizeResponseErrors } from './utils';
import { API_BASE_URL } from '../config';

export const registerUser = user => dispatch => {
    console.log(user)
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => dispatch(login(user.username, user.password)))
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};
