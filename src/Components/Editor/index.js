import React, { useState, useEffect } from 'react';
import './index.scss';

import Axios from 'axios';
import { useFormInput } from '../Login';

function Editor() {
  const [users, setUsers] = useState([]);

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
 
  if (users.length === 0) {
    return null;
  } //wait for API call to finish

  return (
    <div>
      <h4>Supervisor View</h4>
      <div className="editor">
        <div>
        <h5>Schedule New Event</h5>
          <form id="addEvent">
            <label htmlFor="employee">Employee: </label>
            <select {...employee}>
              <option>Select Employee</option>
              {users.map((user) => (
                <option value={user.name} key={user.name}>
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

       
      </div>
    </div>
  );
}

export default Editor;
