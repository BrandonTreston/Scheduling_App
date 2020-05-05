import React, {useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

import Axios from 'axios';
import './index.scss';

import { getUser } from '../../Utils/Common';

import Dashboard from '../Dashboard';
import Editor from '../Editor';

function Schedule() {
  const user = getUser();
  const [events, setEvents] = useState([]);

  Axios.post('http://brandontreston.com:3001/users/schedule', { user: user.name }).then(
    (response) => {
      // setEvents(response.data.data)
      let data = response.data;
      console.log(data.data);
    }
  );

  // let sampleEvents = [
  //   {
  //     id: '2',
  //     start: '2020-04-19T08:00',
  //     end: '2020-04-19T10:00',
  //     title: 'employee5',
  //   }
  // ];

  return (
    <div>
      <div>
        <div>
          <Dashboard />
          <Editor />
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
            height={800}
          />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
