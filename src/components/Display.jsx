import React from 'react'

const Display = ({display, useSign}) => {

    let currentSign ='+';

    if(display.includes('+')){
        currentSign = '+';
    }else if(display.includes('-')){
        currentSign = '-';
    }else if(display.includes('*')){
        currentSign = '*';
    }else if(display.includes('/')){
        currentSign = '/';
    }

    return ( 
        <div className="display">
            {!useSign? null : <div className="display_up">{display.slice(0,display.indexOf(currentSign)+1)}</div>}
            {!useSign? <div className="display_down" style={{lineHeight : '70px' }}>{display}</div> : <div className="display_down" >{display.slice(display.indexOf(currentSign)+1, display.length)}</div>}
        </div>
     );
}
 
export default Display;