import React from 'react'
import "./mailList.css";
const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save Time, and Save Money!</h1>
      <span className="mailDesc">Sign up and we will send the best deal to You</span>
      <div className="mailInputContainer">
        <input type="text" placeholder='Enter E-mail '></input>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
