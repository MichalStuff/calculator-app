import React, { Component } from 'react';
import * as math from 'mathjs';
import './App.css';
import Display from './components/Display';
import KeyBoard from './components/KeyBoard';
import KeyboardEventHandler from 'react-keyboard-event-handler';

class App extends Component {
  state = { 
    display : '',
    sign : '',
    useSign : false,
    after : '',
    before : ''
   }

   handleSign = (digit) =>{
    let {display, after} = this.state;
    let digitPos = display.indexOf(' ');
    let replaceDigit = display[digitPos + 1];

    if(((display.slice(1,display.length).includes('-')) || display.includes('+') || display.includes('*') || display.includes('/')) && after.length !== 0){
      this.calculate();
      this.setState({
        useSign : false,
      })
    }else if(((display.slice(1,display.length).includes('-')) || display.includes('+') || display.includes('*') || display.includes('/')) && after.length === 0){
      display = display[0] + display.slice(1,display.length).replace(replaceDigit, digit)
      this.setState({
        display : display
      })
    }
    else if(display.length === 0){
      this.setState({
        useSign : false
      })
    }
    else{
      this.setState({
        display : display.concat(` ${digit} `),
        useSign : true
      })
    }
   }

   handleDisplay = (after, before) =>{
     let display = after;
     display.concat(before);
    this.setState({
      display : display
    })
   }

  handleButtons = (digit) =>{
    let after = this.state.after;
    let before =  this.state.before;
    let display = this.state.display;
      if(this.state.useSign){
        if(after.length < 9){
          switch(digit){
            case '0' :
              if(after.length !==0){
                this.setState({
                  after : after.concat(digit),
                  display : display.concat(digit),
                })
              }
            break;
            case '.' : 
              if(after.includes('.')){
                }else if(after.length === 0){
                  after = after.concat(0);
                  display = display.concat(0);
                  this.setState({
                    after : after.concat(digit),
                    display : display.concat(digit)
                  })
                }else{
                  this.setState({
                    after : after.concat(digit),
                    display : display.concat(digit),
                  })
                }
            break;
            default : 
            this.setState({
              after : after.concat(digit),
              display : display.concat(digit),
            })
              break;
          }
        }
      }else{
        if(before.length < 9){
          
          switch(digit){
            case '0' :
              if(before.length !==0){
                this.setState({
                  before : before.concat(digit),
                  display : display.concat(digit)
                })
              }
            break;
            case '.' : 
              if(before.includes('.')){
                }else if(before.length === 0){
                  before = before.concat(0);
                  display = display.concat(0);
                  this.setState({
                    before : before.concat(digit),
                    display : display.concat(digit)
                  })
                }else{
                  this.setState({
                    before : before.concat(digit),
                    display : display.concat(digit)
                  })
                }
            break;
            default : 
            this.setState({
              before : before.concat(digit),
              display : display.concat(digit)
            })
              break;
          }
        }
        }

  }

    calculate = () =>{
      let result = this.state.display;
      result = math.evaluate(result);
      if(result < 0){
        result = math.format(result,{lowerExp: -10, precision: 3});
      }else{
        result = math.format(result,{upperExp: 10, precision: 3});
      }
      
      console.log(result);
      result = result.toString();
      console.log(result);

      this.setState({
        display : result,
        after : '',
        before : result,
        useSign : false
    })
    }

   clear = () =>{
     this.setState({
       display : '',
       after : '',
       before : '',
       useSign : false
     })
   }

   delete = () =>{
    let display = this.state.display;
    let after = this.state.after;
    let before = this.state.before;

     if(after.length ===0){
      if(display[display.length-2] === '+' || display[display.length-2] === '-' || display[display.length-2] === '*' || display[display.length-2] === '/'){
        display = display.slice(0,-3);
        this.setState({
          useSign : false
        })
      }else{
        display = display.slice(0,-1);
        before = before.slice(0,-1);
      }
     }else{
      display = display.slice(0,-1);
      after = after.slice(0,-1);
     }
     this.setState({
       after : after,
       before : before,
       display : display
     })

   }
   changeSign = () =>{
    let {display, after, before} = this.state;

    const sign = '-';

    if(after.length === 0 && before[0] !== '-' && before.length !== 0){
      before = sign.concat(before);
      display = sign.concat(display);
    }else if(before[0] === '-' && after.length === 0){
      before = before.slice(1,before.length);
      display = display.slice(1,display.length);
    }else if(after[0] === '-'){
      display = display.slice(0,display.indexOf(after));
      after = after.slice(1,after.length);
      display = display.concat(after);
    }else if(after.length !== 0){
      display = display.slice(0,display.indexOf(after));
      after = sign.concat(after);
      display = display.concat(after);

    }
    this.setState({
      before : before,
      display : display,
      after : after
    })
   }

   pow = () =>{
     this.calculate();
     let display = parseFloat(this.state.display);
     display = display * display;
     display = display.toString();
     let before = display.toString();

     this.setState({
       display : display,
       before : before
     })
   }

   keyboardEvents = (event) =>{
    event.persist();
    console.log(event.key);
   }



  render() { 

    return ( 
      <div  className="calculator" onKeyPress={this.keyboardEvents}>
        <KeyboardEventHandler
        handleKeys={['all']} 
        onKeyEvent={(key, e) => {
          const numbers = ['0','1','2','3','4','5','6','7','8','9','.'];
          const signs = ['-','+','*','/'];
          if(numbers.includes(key)){
            this.handleButtons(key);
          }else if(signs.includes(key)){
            this.handleSign(key);
          }else if(key === '=' || key === 'enter'){
            this.calculate();
          }else if(key === 'backspace'){
            this.delete();
          }else if(key === 'del'){
            this.clear();
          }else if(key ==='`'){
            this.changeSign();
          }else{
            console.log(key);
          }
        }} 
        />
        <Display display={this.state.display} useSign = {this.state.useSign} before = {this.state.before} after ={this.state.after}/>
        <KeyBoard click={this.handleButtons} calculate={this.calculate} clear={this.clear} delete={this.delete} changeSign={this.changeSign} pow={this.pow} sign={this.handleSign}/>
      </div>
    );
  }
}
 
export default App;
