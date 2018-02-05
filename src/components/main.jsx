import * as React from "react"
import io from 'socket.io-client'

import style from "./../style.css"
import ColorSelection from "../services/colorSelection"

const TYPING_TIMER_LENGTH = 400

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io()
    this.state = {
      username: null,
      typing: false, 
      connected: true,
      lastTypingTime: null,
      showLogin: true,
      messages: []
    };
    
  }
  
  /* todo: implement react-way
  // Focus input when clicking anywhere on login page
  $loginPage.click(function () {
    $currentInput.focus();
  });
  
  // Focus input when clicking on the message input's border
  $inputMessage.click(function () {
    $inputMessage.focus();
  });
  */
  
  componentWillMount() {
    this.registerSockets()
    this.scrollToBottom();
  }

  componentDidUpdate(){
    this.scrollToBottom();
  }

  scrollToBottom(){
    if (this.messagesEnd)
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  cleanInput(value) {
    // todo: implement react-way
    // on setUsername: Prevents input from having injected markup
    // function cleanInput (input) {
    //   return $('<div/>').text(input).html();
    // }
    return value
  }
  
  addChatMessage(data, options) { // todo
    
    // Don't fade the message in if there is an 'X was typing'
    //var $typingMessages = getTypingMessages(data);
    //options = options || {}; // todo: options
    //if ($typingMessages.length !== 0) {
    //  options.fade = false;
    //  $typingMessages.remove();
    //}
    
    const messages = this.state.messages.concat([data])
    this.setState({messages})
    
    //addMessageElement($messageDiv, options);
  }
  
  log (message, options) {
    this.addChatMessage({
      username: null,
      body: message,
      isLog: true
    });
  }
  
  sendMessage(event: React.SyntheticEvent) {
    let message = event.target.value
    message = this.cleanInput(message)
    
    if (message && this.state.connected) {
      event.target.value = ''
      this.addChatMessage({
        username: this.state.username,
        body: message,
        isLog: false
      });
      this.socket.emit('new message', message);
    }
  }
  
  setUsername(event: React.SyntheticEvent) {
    const username = this.cleanInput(event.target.value.trim())
    this.setState({username})
    
    // If the username is valid
    if (!!username) {
      this.setState({showLogin : false})
      //$currentInput = $inputMessage.focus();
      
      // Tell the server your username
      this.socket.emit('add user', username);
    }
  }
  
  startTyping(e: React.SyntheticEvent) {
    
    // todo: implement missing places
    // Auto-focus the current input when a key is typed
    //if (!(event.ctrlKey || event.metaKey || event.altKey)) {
    //  $currentInput.focus();
    //}
    
    if (e.key === "Enter") {
      if (!!this.state.username) {
        this.sendMessage(e)
        this.socket.emit('stop typing')
        this.setState({typing : false})
      } else {
        this.setUsername(e)
      }
    }
  }
  
  updateTyping() {
    if (this.state.connected) {
      if (!this.statetyping) {
        this.setState({typing : true})
        this.socket.emit('typing')
      }
      
      this.setState({lastTypingTime : (new Date()).getTime()})
      
      setTimeout(function () {
        const typingTimer = (new Date()).getTime()
        const timeDiff = typingTimer - this.state.lastTypingTime
        if (timeDiff >= TYPING_TIMER_LENGTH && this.state.typing) {
          this.socket.emit('stop typing')
          this.setState({typing : false})
        }
      }.bind(this), TYPING_TIMER_LENGTH)
    }
  }
  
  render() { //todo: to several components
    return (
      <ul className="pages">
      {
        this.state.showLogin ? null : (
          <li className="chat page">
          <div className="chatArea">
          <ul className="messages">
          {
            this.state.messages.map(m => m.isLog ? (
              <li key={this.state.messages.indexOf(m)} className="log">{m.body}</li>
            ) : (
              <li className="message" key={this.state.messages.indexOf(m)}>
              <span className="username" style={{color: new ColorSelection().getUsernameColor(m.username)}}>{m.username}</span>
              <span className="messageBody">{m.body}</span>
              </li>))
            }

             <li ref={el => { this.messagesEnd = el; }}></li>
            </ul>
            
            </div>
            <input className="inputMessage" placeholder="Type here..." tabIndex="1"
            autoFocus={true}
            onKeyDown={_ => this.startTyping(_)}
            onChange={_ => this.updateTyping()} 
            />
            </li>)
          }
          
          {
            this.state.showLogin ? 
            (<li className="login page">
            <div className="form">
            <h3 className="title">What's your nickname?</h3>
            <input className="usernameInput" type="text" maxLength="14" tabIndex="0" 
            autoFocus={true}
            onKeyDown={_ => this.startTyping(_)}
            onChange={_ => this.updateTyping()}
            />
            </div>
            </li>) : null
          }
          </ul>
        )
      }
      
      registerSockets() {
        this.socket.on('login', function (data) {
          this.setState({connected: true})
          var message = "Welcome to YAPP!";
          this.log(message, {
            prepend: true
          });
          this.addParticipantsMessage(data);
        }.bind(this));
        
        this.socket.on('new message', function (data) {
          this.addChatMessage({
            username: data.username,
            body: data.message,
            isLog: false
          });
        }.bind(this));
        
        this.socket.on('user joined', function (data) {
          this.log(data.username + ' joined');
          this.addParticipantsMessage(data);
        }.bind(this));
        
        this.socket.on('user left', function (data) {
          this.log(data.username + ' left');
          this.addParticipantsMessage(data);
          // todo: implement missing places
          //this.removeChatTyping(data);
        }.bind(this));
        
        this.socket.on('typing', function (data) {
          // todo: implement missing places
          //this.addChatTyping(data);
        });
        
        this.socket.on('stop typing', function (data) {
          // todo: implement missing places
          //this.removeChatTyping(data);
        });
        
        this.socket.on('disconnect', function () {
          this.log('you have been disconnected');
        }.bind(this));
        
        this.socket.on('reconnect', function () {
          this.log('you have been reconnected');
          if (this.state.username) {
            this.socket.emit('add user', this.state.username);
          }
        }.bind(this));
        
        this.socket.on('reconnect_error', function () {
          this.log('attempt to reconnect has failed');
        }.bind(this));
      }
      
      addParticipantsMessage (data) {
        var message = '';
        if (data.numUsers === 1) {
          message += "there's 1 participant";
        } else {
          message += "there are " + data.numUsers + " participants";
        }
        this.log(message);
      }
    }