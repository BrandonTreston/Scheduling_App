import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import Axios from 'axios';
import './index.scss';

import { getUser, removeUserSession } from '../../Utils/Common';

import { useHistory } from 'react-router-dom';

function Dashboard(props) {
  let history = useHistory();
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    history.push('/login');
  };

  return (
    <div>
      Welcome {user.name}!<br />
      <br />
      <button onTouchEnd={handleLogout} onClick={handleLogout} >Logout</button>
    </div>
  );
}

export default class Schedule extends React.Component {
  render() {
    Axios({
      method: 'GET',
      url: 'http://localhost:5000/',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      console.log(res.data.message);
    });

    let sampleEvents = [
      {
        id: '1',
        start: '2020-04-19T07:00:00',
        end: '2020-04-19T10:00:00',
        title: 'employee1',
      },
      {
        id: '5',
        start: '2020-04-19T07:00:00',
        end: '2020-04-19T10:00:00',
        title: 'employee2',
      },
      {
        id: '3',
        start: '2020-04-19T07:00:00',
        end: '2020-04-19T10:00:00',
        title: 'employee3',
      },
      {
        id: '4',
        start: '2020-04-19T07:00:00',
        end: '2020-04-19T10:00:00',
        title: 'employee4',
      },
      {
        id: '2',
        start: '2020-04-19T08:00:00',
        end: '2020-04-19T10:00:00',
        title: 'employee5',
      },
    ];

    return (
      <div className="demo-app">
        <div className="demo-app-top"></div>
        <div className="demo-app-calendar">
          <Dashboard />
          <FullCalendar
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek, timeGridDay',
            }}
            allDaySlot={false}
            defaultView="timeGridWeek"
            plugins={[timeGridPlugin]}
            events={sampleEvents}
            height={800}
            resourceLabelText="Employee"
            Resources={['tim', 'joe', 'pete']}
          />
        </div>
      </div>
    );
  }
}
