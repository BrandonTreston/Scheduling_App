import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import { useHistory, Link } from 'react-router-dom';
import './index.scss';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  let history = useHistory();

  // handle button click of login form
  const handleLogin = () => {
    if(username.value !== '' && password.value !==''){
      setError(null);
      setLoading(true);
      axios
        .post('http://brandontreston.com:3001/users/signin', {
          username: username.value,
          password: password.value,
        })
        .then((response) => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
          history.push('/schedule');
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401)
            setError(error.response.data.message);
          else setError('Something went wrong. Please try again later.');
        });}
        else{setError('All fileds must be filled.')}

  };

  return (
    <div id="login">
      <div id="loginform">
        <h3>Login</h3>
        <br />
        <div>
          <div>
            Username
            <br />
            <input type="text" {...username} />
          </div>
          <div style={{ marginTop: 10 }}>
            Password
            <br />
            <input type="password" {...password} />
          </div>
          {error && (
            <>
              <small style={{ color: 'red' }}>{error}</small>
              <br />
            </>
          )}
          <br />
          <button onTouchEnd={handleLogin} onClick={handleLogin}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <button>
            <Link to="/">Back</Link>
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
