import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import Axios from 'axios';
import './index.scss';

import { getUser } from '../../Utils/Common';

import Dashboard from '../Dashboard'
import Editor from '../Editor';

export default class Schedule extends React.Component {
  render() {
    const user = getUser();
    let events;
    
    Axios.post('http://localhost:5000/users/schedule', {user : user.name})
    .then(response => {
      console.log(response.data.data);
    })

    // let sampleEvents = [
    //   {
    //     id: '2',
    //     start: '2020-04-19T08:00',
    //     end: '2020-04-19T10:00',
    //     title: 'employee5',
    //   }
    // ];

    return (
      <div className="demo-app">
        <div className="demo-app-top"></div>
        <div className="demo-app-calendar">
          <div>
          <Dashboard/>
          <Editor/>
          </div>
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
            height={800}
            resourceLabelText="Employee"
            Resources={['tim', 'joe', 'pete']}
          />
        </div>
      </div>
    );
  }
}
