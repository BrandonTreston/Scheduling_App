import React, { useState, useEffect } from 'react';
import './index.scss';

import Axios from 'axios';
import { useFormInput } from '../Login';
import { getUser } from '../../Utils/Common';

function Editor() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        'http://brandontreston.com:3001/users/listEmployees'
      );
      setUsers(result.data);
    };
    fetchData();
  }, []);
  
  const employee = useFormInput('');
  const start = useFormInput('');
  const end = useFormInput('');
  const title = useFormInput('');
  const user = getUser();
  const [admin, setAdmin] = useState(false);

  Axios.post('http://brandontreston.com:3001/users/isAdmin', {
    user: user.name,
  }).then((response) => {
    if (response.data.admin[0].isAdmin === 1) {
      setAdmin(true);
    }
  });

  const submit = () => {
    if (
      employee.value !== '' &&
      start.value !== '' &&
      end.value !== '' &&
      title.value !== ''
    ) {
      Axios.post('http://brandontreston.com:3001/users/submit', {
        employee: employee.value,
        start: start.value,
        end: end.value,
        title: title.value,
      }).then((response) => {
        alert(response.data.message);
      });
    } else {
      alert('All fields must be filled in.');
    }
  };

  if (admin) {
    return (
      <div className="editor">
        <h4>Supervisor View</h4>
        <span>Schedule New Event</span>
        <br />
        <form>
          <label htmlFor="employee">Employee: </label>
          <select {...employee}>
            {users.map(user => (
              <option   value={user.name} key = {user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="dateselector">Start Date and Time: </label>
          <input type="datetime-local" {...start} id="startdateselector" />
          <br />
          <label htmlFor="dateselector">End Date and Time: </label>
          <input type="datetime-local" {...end} id="enddateselector" />
          <br />
          <label htmlFor="title">Description: </label>
          <input type="text" {...title} id="title" />
          <br />
          <button onClick={submit} id="submit">
            Submit
          </button>
          <input type="reset" id="reset" />
        </form>
      </div>
    );
  } else {
    return <br />;
  }
}

export default Editor;
