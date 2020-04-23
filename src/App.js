import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import './App.scss'

export default class App extends React.Component {

  calendarComponentRef = React.createRef()

  render() {
   let sampleEvents = [{   
  'id': '1',
  'resourceId': '27', 
  'start': '2020-04-19T07:00:00',
  'stop': '2020-04-19T16:00:00',
  'title': 'test'
}];
    return (
      <div className='demo-app'>
        <div className='demo-app-top'>
        </div>
        <div className='demo-app-calendar'>
          <FullCalendar
            schedulerLicenseKey= 'GPL-My-Project-Is-Open-Source'
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek'
            }}
            plugins={[ dayGridPlugin, resourceTimelinePlugin, ]}
            ref={ this.calendarComponentRef }
            events={sampleEvents}
            height={800}
            resourceLabelText="Employee"
            Resources={["tim", "joe", "pete"]}
            />
        </div>
      </div>
    )
  }


}
