// LOGIN & SIGN UP VALIDATORS 

export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';

// validator creators 

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};
export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';

// second argument provided by Redux Form, allValues. This is an object which contains the values entered into each form field. If the two fields don't match, then we return an error message. You can see this in use in the passwordConfirm field: Here we say that the passwordConfirm field should match the password field.
