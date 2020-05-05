import React, {useState} from 'react';
import './index.scss';

import Axios from 'axios';
import { useFormInput } from '../Login';
import { getUser } from '../../Utils/Common';

function Editor() {
  const employee = useFormInput('');
  const start = useFormInput('');
  const end = useFormInput('');
  const user = getUser();
  const [admin, setAdmin] = useState(false);

  Axios.post('http://brandontreston.com:3001/users/isAdmin', {
    user: user.name
  }).then(response => {
    if (response.data.admin[0].isAdmin === 1){
      setAdmin(true);
    }
  });

  const submit = () => {
    Axios.post('http://brandontreston.com:3001/users/submit', {
      employee: employee.value,
      start: start.value,
      end: end.value,
    });
  };

  if (admin) {
    return <div className="editor">
        <h4>Supervisor View</h4>
        <span>Schedule New Event</span>
        <br />
        <form>
        <label htmlFor="employee">Employee: </label>
        <input type="text" {...employee} id="employee" />
        <br />
        <label htmlFor="dateselector">Start Date and Time: </label>
        <input type="datetime-local" {...start} id="startdateselector" />
        <br />
        <label htmlFor="dateselector">End Date and Time: </label>
        <input type="datetime-local" {...end} id="enddateselector" />
        <br />
        <button onClick={submit} id="submit">Submit</button>
        <input type="reset" id="reset" />
        </form>
      </div>
  }
  else{return <br/>}
}

export default Editor;
