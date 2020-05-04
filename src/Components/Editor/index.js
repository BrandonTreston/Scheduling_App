import React, { useState } from 'react';
import './index.scss';

function Editor() {
  const [visivle, setVisible] = useState(0);

  return (
    <div className="editor">
      Schedule New Event
      <form>
        <label htmlFor="employee">Employee: </label>
        <input type="text" id="dateselector"></input>
        <br/>
        <label htmlFor="dateselector">Start Date and Time: </label>
        <input type="datetime-local" id="dateselector"></input>
        <br/>
        <label htmlFor="dateselector">End Date and Time: </label>
        <input type="datetime-local" id="dateselector"></input>
        <br/>
        <input type="submit" id='submit'></input>
        <input type="reset" id='reset'></input>
      </form>
    </div>
  );
}

export default Editor;
