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
    <div style={{'margin-bottom': 25}}>
      <h4>Welcome {user.name}!</h4>
      <button onTouchEnd={handleLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
