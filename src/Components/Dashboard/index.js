import React from 'react';

import { getUser, removeUserSession } from '../../Utils/Common';
import { useHistory } from 'react-router-dom';

function Dashboard(props) {
  let history = useHistory();
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    history.push('/Bard');
    window.location.reload();
  };

  return (
    <div id='dashboard'>
      <h4 style={{'margin-top': 0}}>Welcome {user.name}!</h4>
      <button onTouchEnd={handleLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
