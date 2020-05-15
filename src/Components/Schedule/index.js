import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import Axios from 'axios';
import './index.scss';

import { getUser } from '../../Utils/Common';
import { useFormInput } from '../Login';

import Dashboard from '../Dashboard';
import Editor from '../Editor';

function Schedule() {
  const [events, setEvents] = useState([]);
  const employee = useFormInput('');
  const [admin, setAdmin] = useState(false);
  const [users, setUsers] = useState([]);
  const [visible, setVisibility] = useState(false);
  const [selectedEvent, selectEvent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const user = getUser();
      await Axios.post('http://brandontreston.com:3001/users/schedule', {
        user: user.name,
      }).then((response) => setEvents(response.data.data));
    };
    fetchData();
  }, []);

  const getSchedule = () => {
    if (employee.value !== '') {
      Axios.post('http://brandontreston.com:3001/users/getUserSchedule', {
        employee: employee.value,
      }).then((response) => {
        setEvents(response.data.data);
      });
    } else {
      alert('Select an employee.');
    }
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      const user = getUser();
      await Axios.post('http://brandontreston.com:3001/users/isAdmin', {
        user: user.name,
      }).then((response) => {
        if (response.data.admin[0].isAdmin === 1) {
          setAdmin(true);
        }
      });
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(
        'http://brandontreston.com:3001/users/listEmployees'
      );
      setUsers(result.data);
    };
    fetchData();
  }, []);

  const deleteEvent = () => {
    Axios.post('http://brandontreston.com:3001/users/deleteEvent', {
      id: selectedEvent,
    }).then((response) => {
      alert(response.data.message);
      setVisibility(false);
      window.location.reload();
    });
  };

  if (admin) {
    return (
      <div id="calendarContainer">
        <div id="sidebar">
          <Dashboard />
          <Editor />
            <h5>View Employee Schedule</h5>
            <select {...employee}>
              <option>Select Employee</option>
              {users.map((user) => (
                <option value={user.name} key={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            <br />
            <button onClick={getSchedule}>Submit</button>
        </div>
        <div id="calendar">
          <FullCalendar
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek, timeGridDay',
            }}
            eventClick={function (info) {
              if (admin === true) {
                let eventObj = info.event;
                setVisibility(true);
                selectEvent(eventObj.id);
              }
            }}
            allDaySlot={false}
            defaultView="timeGridWeek"
            plugins={[timeGridPlugin]}
            events={events}
            height={800}
          />
          <div id="deleteEvent" className={visible ? 'visible' : 'notVisible'}>
            <span>Delete this event?</span>
            <br />
            <form>
              <button onClick={() => deleteEvent()}>Delete</button>
              <button onClick={() => setVisibility(false)}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div id="appContainer">
          <div>
            <Dashboard />
          </div>
          <div>
            <FullCalendar
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridWeek, timeGridDay',
              }}
              allDaySlot={false}
              defaultView="timeGridWeek"
              plugins={[timeGridPlugin]}
              events={events}
              height={750}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
