import axios from "axios";
import React, { useState } from "react";
import "./contact.scss";
import { toast } from "react-toastify";
export const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendQuery = async () => {
    const data = {
      service_id: "service_mie5gh2",
      template_id: "template_gzm7cqd",
      user_id: "vnb3zaM-_8_46Mx5m",
      template_params: {
        name: name,
        email: email,
        message: message,
        "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd...",
      },
    };

    const config = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    };

    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      data,
      config
    );
    toast.success("Email sent successfully !!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="main-contact content">
      <div className="contact-form">
        <h1>Contact Form</h1>
        <div className="contact-info">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="name">Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="name">Message</label>
            <textarea
              rows="6"
              type="text"
              placeholder="Enter your Query"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
        </div>
        <button onClick={sendQuery}>Submit</button>
      </div>
    </div>
  );
};
