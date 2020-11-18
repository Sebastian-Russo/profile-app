import React from 'react';
import { Field, reduxForm } from 'redux-form';

let UserForm = props => {
  const { handleSubmit } = props;
  return ( 
    <form onSubmit={handleSubmit}>

      <Field 
        name="inputName"
        component="input"
        type="text"
      />

      <button type="submit">Submit</button>
    </form>
   );
}

UserForm = reduxForm({
  form: 'user'
})(UserForm)

export default UserForm;
