import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Register(props) {
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
  let history = useHistory();

  // handle button click of login form
  const handleSignup = () => {
    setError(null);
    setLoading(true);
    axios
      .post('http://localhost:5000/users/register', {
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
        history.push('/login');
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError('Something went wrong. Please try again later.');
      });
  };

  return (
    <div>
      Register
      <br />
      <br />
      <div>
        First Name
        <br />
        <input type="text" {...fname} autoComplete="new-password" />
      </div>
      <div>
        Last Name
        <br />
        <input type="text" {...lname} autoComplete="new-password" />
      </div>
      <div>
        Address
        <br />
        <input type="text" {...address} autoComplete="new-password" />
      </div>
      <div>
        City
        <br />
        <input type="text" {...city} autoComplete="new-password" />
      </div>
      <div>
        State
        <br />
        <input type="text" {...state} autoComplete="new-password" />
      </div>
      <div>
        Zip Code
        <br />
        <input type="text" {...zip} autoComplete="new-password" />
      </div>
      <div>
        Email
        <br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div>
        Phone Number
        <br />
        <input type="text" {...phone} autoComplete="new-password" />
      </div>
      <div>
        New Username
        <br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        New Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
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

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Register;
