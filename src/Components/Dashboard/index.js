import React from 'react';

import { getUser, removeUserSession } from '../../Utils/Common';
import { useHistory } from 'react-router-dom';

function Dashboard(props) {
  let history = useHistory();
  const user = getUser();

  const handleLogout = () => {
    removeUserSession();
    history.push('/');
    window.location.reload();
  };

  return (
    <div>
      Welcome {user.name}!<br />
      <br />
      <button onTouchEnd={handleLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
