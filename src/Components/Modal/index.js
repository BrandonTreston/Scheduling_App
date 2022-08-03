import React, { useState } from 'react';
import {data} from '../../assets/data'

function Modal(props){
    const [visibility, setVisibility] = useState(false);
    return(
        <div className="Modal">
            Title: {data[0].title}
            <br/>
            Description: {data[0].desc}
            <br/>
            Tech : {data[0].tech}
        </div>
    )
}

export default Modal;