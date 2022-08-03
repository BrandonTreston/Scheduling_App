import React, { useState } from 'react';
import axios from 'axios';
import { useFormInput } from '../Login';
import './index.scss';

function Register() {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const fname = useFormInput('');
  const lname = useFormInput('');
  const address = useFormInput('');
  const city = useFormInput('');
  const state = useFormInput('');
  const zip = useFormInput('');
  const email = useFormInput('');
  const phone = useFormInput('');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleSignup = () => {
    if (
      username.value !== '' &&
      password.value !== '' &&
      fname.value !== '' &&
      lname.value !== '' &&
      address.value !== '' &&
      city.value !== '' &&
      state.value !== '' &&
      zip.value !== '' &&
      email.value !== '' &&
      phone.value !== ''
    ) {
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
    } else {
      setError('All fields must be filled.');
    }
  };

  return (
    <div id="register">
      <div id="registerform">
        <h4>Register</h4>
        <br />
        <br />
        <div>
          First Name
          <br />
          <input required="true" type="text" {...fname} maxLength="30" />
        </div>
        <div>
          Last Name
          <br />
          <input
            required="true"
            type="text"
            {...lname}
            maxLength="30"
            autoComplete="new-password"
          />
        </div>
        <div>
          Address
          <br />
          <input
            required="true"
            type="text"
            {...address}
            maxLength="30"
            autoComplete="new-password"
          />
        </div>
        <div>
          City
          <br />
          <input
            required="true"
            type="text"
            {...city}
            maxLength="30"
            autoComplete="new-password"
          />
        </div>
        <div>
          State
          <br />
          <input
            required="true"
            type="text"
            {...state}
            maxLength="2"
            autoComplete="new-password"
          />
        </div>
        <div>
          Zip Code
          <br />
          <input
            required="true"
            type="number"
            maxLength="5"
            {...zip}
            autoComplete="new-password"
          />
        </div>
        <div>
          Email
          <br />
          <input
            required="true"
            type="email"
            {...email}
            autoComplete="new-password"
          />
        </div>
        <div>
          Phone Number
          <br />
          <input
            required="true"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            maxLength="10"
            type="tel"
            {...phone}
            autoComplete="new-password"
          />
        </div>
        <div>
          New Username
          <br />
          <input
            required="true"
            type="text"
            {...username}
            maxLength="30"
            autoComplete="new-password"
          />
        </div>
        <div style={{ marginTop: 10 }}>
          New Password
          <br />
          <input
            required="true"
            type="password"
            {...password}
            maxLength="30"
            autoComplete="new-password"
          />
        </div>
        {error && (
          <>
            <small style={{ color: 'red' }}>{error}</small>
            <br />
          </>
        )}
        <br />
        <div id='buttonContainer'>
        <button className='registerButton' onTouchEnd={handleSignup} onClick={handleSignup}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <button className='registerButton' onClick={() => window.location= '/#Bard'}>
        Back
        </button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Register;
