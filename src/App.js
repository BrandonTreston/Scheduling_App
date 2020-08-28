import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios
      .get(`http://brandontreston.com:3001/verifyToken?token=${token}`)
      .then((response) => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
      })
      .catch((error) => {
        removeUserSession();
        setAuthLoading(false);
      });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>;
  }

  return (
    <div id="container">
        <h1 id='mainTitle'>BARD</h1>
        <h4 id='subtitle'>Timesheet and Scheuduling Application</h4>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            <Link to ='/GitHub'>View on Gitub</Link>
            <span id='backButton'><Link to='/'>Back</Link></span>
    </div>
  );
}

export default App;
