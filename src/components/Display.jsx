
import React from 'react'

const Display = ({after , before, display, useSign}) => {

    let currentSign ='';
    let newDisplay = display.slice(1,display.length);

    if(newDisplay.includes('-')){
        currentSign = '-';
    } 
    if(newDisplay.includes('*')){
        currentSign = '*';
    }

    if(newDisplay.includes('+')){
        currentSign = '+';
    } 
    if(newDisplay.includes('/')){
        currentSign = '/'; 
    }
    
    return ( 
        <div className="display">
            {!useSign? null : <div className="display_up">{before + currentSign}</div>}
            {!useSign? <div className="display_down" style={{lineHeight : '70px' }}>{display}</div> : <div className="display_down" >
                {after}
            </div>}  
         </div>
     );
}
 
export default Display; 