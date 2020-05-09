import React, { useState } from 'react';
import axios from 'axios';
import {useFormInput} from '../Login';

function Register() {
  const [loading, setLoading] = useState(false);
  const username = useFormInput(null);
  const password = useFormInput(null);
  const fname = useFormInput(null);
  const lname = useFormInput(null);
  const address = useFormInput(null);
  const city = useFormInput(null);
  const state = useFormInput(null);
  const zip = useFormInput(null);
  const email = useFormInput(null);
  const phone = useFormInput(null);
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleSignup = () => {
    if(username.value !== null &&
      password.value !== null &&
      fname.value !== null &&
      lname.value !== null &&
      address.value !== null &&
      city.value !== null &&
      state.value !== null &&
      zip.value !== null &&
      email.value !== null &&
      phone.value !== null      
      ){
    setError(null);
    setLoading(true);
    axios
      .post('http://brandontreston.com:3001/users/register', {
        username: username.value,
        password: password.value,
        fname: fname.value,
        lname: lname.value,
        address: address.value,
        city: city.value,
        state: state.value,
        zip: zip.value,
        email: email.value,
        phone: phone.value,
      })
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError('Something went wrong. Please try again later.');
      });
  }
  else{setError('All fields must be filled.')}
};

  return (
    <div>
      Register
      <br />
      <br />
      <div>
        First Name
        <br />
        <input required type="text" {...fname} maxLength="30" autoComplete="new-password" />
      </div>
      <div>
        Last Name
        <br />
        <input required type="text" {...lname} maxLength="30" autoComplete="new-password" />
      </div>
      <div>
        Address
        <br />
        <input required type="text" {...address} maxLength="30" autoComplete="new-password" />
      </div>
      <div>
        City
        <br />
        <input required type="text" {...city} maxLength="30" autoComplete="new-password" />
      </div>
      <div>
        State
        <br />
        <input required type="text" {...state} maxLength="2" autoComplete="new-password" />
      </div>
      <div>
        Zip Code
        <br />
        <input required type="number" maxLength="5" {...zip} autoComplete="new-password" />
      </div>
      <div>
        Email
        <br />
        <input required type="email" {...email} autoComplete="new-password" />
      </div>
      <div>
        Phone Number
        <br />
        <input required pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" maxLength="10" type="tel" {...phone} autoComplete="new-password" />
      </div>
      <div>
        New Username
        <br />
        <input required type="text" {...username} maxLength="30" autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        New Password
        <br />
        <input required type="password" {...password} maxLength="30" autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: 'red' }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <button onTouchEnd={handleSignup} onClick={handleSignup}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
      <br />
    </div>
  );
}

export default Register;
