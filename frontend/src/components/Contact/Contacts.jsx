import React from 'react'
import './contact.scss'


export const Contacts = () => {
  return (
    <div>
         <div class="formBox">
            <h2>Contact Us</h2>
            <p>You will hear from us at the earliest!</p>
            <form action="#">
                <div class="nameInp">
                    <i class="fa fa-user icon"></i>
                    <input type="text" placeholder="Full Name" name="name" id="name"/>

                </div>
                <div class="mailInp">
                    <i class="fa fa-envelope"></i>
                    <input type="email" name="mail" id="mail" placeholder="Email"/>
                </div>
                <div class="phoneInp">
                    <i class="fa-solid fa-phone"></i>
                    <input type="number" name="phone" id="phone" placeholder="Phone" min="100000" max="9999999999"/>
                </div>
                <div class="queryInp">
                    <textarea name="query" id="query" cols="30" rows="5"
                        placeholder="Any comment or your query"></textarea>
                </div>
                <div class="submitBtn">
                    <button id="btn" onclick="notif()">Send</button>
                </div>
            </form>
            <p class="extra">You can also contact us at 181-1711-322</p>
        </div>
    </div>
  )
}
