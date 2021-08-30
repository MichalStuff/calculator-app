import React from 'react'

const KeyBoard = (props) => {

    return ( 
        <div className="key_board">            
            <button onClick={props.pow} className="calculate_buttons">&#215;&sup2;</button>
            <button onClick={props.changeSign} className="calculate_buttons">&#177;</button>
            <button className="calculate_buttons" onClick={props.clear}>C</button>
            <button className="calculate_buttons" onClick={props.delete}>
                <i className="fas fa-backspace"></i>
            </button>
            <button onClick={()=>{props.click('7')}}>7</button>
            <button onClick={()=>{props.click('8')}}>8</button>
            <button onClick={()=>{props.click('9')}}>9</button>
            <button onClick={()=>{props.sign('/')}} className="calculate_buttons">&#247;</button>
            <button onClick={()=>{props.click('4')}}>4</button>
            <button onClick={()=>{props.click('5')}}>5</button>
            <button onClick={()=>{props.click('6')}}>6</button>
            <button onClick={()=>{props.sign('*')}} className="calculate_buttons">&#215;</button>
            <button onClick={()=>{props.click('1')}}>1</button>
            <button onClick={()=>{props.click('2')}}>2</button>
            <button onClick={()=>{props.click('3')}}>3</button>
            <button onClick={()=>{props.sign('+')}} className="calculate_buttons">&#43;</button>
            <button onClick={()=>{props.click('.')}}>.</button>
            <button onClick={()=>{props.click('0')}}>0</button>
            <button onClick={props.calculate}>=</button>
            <button onClick={()=>{props.sign('-')}}className="calculate_buttons">-</button>
        </div>
     );
}
 
export default KeyBoard;