import React, { useState } from 'react';
import './App.scss';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

//import Schedule from DB

function App() {
  return (
    <div className="App">
      <FullCalendar
      defaultView="dayGridMonth"
      plugins={[ dayGridPlugin ]} 
      events= {[
        {title: 'event 1', date: '2020-04-16'}
      ]}
      />
    </div>
  );
}
export default App;
