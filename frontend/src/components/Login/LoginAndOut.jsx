import React from 'react'
import './login.scss'

// const wrapper = document.querySelector(".wrapper"),
//           signupHeader = document.querySelector(".signup header"),
//           loginHeader = document.querySelector(".login header");

//         loginHeader.addEventListener("click", () => {
//           wrapper.classList.add("active");
//         });
//         signupHeader.addEventListener("click", () => {
//           wrapper.classList.remove("active");
//         });
    
export const LoginAndOut = () => {
  return (
    <div>
        <section class="wrapper">
      <div class="form signup" onClick={()=>{document.querySelector(".wrapper").classList.remove("active")}}>
        <header onClick={()=>{document.querySelector(".wrapper").classList.remove("active")}} >Signup</header>
        <form action="#">
          <input type="text" placeholder="Full name" required />
          <input type="text" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          <input type="submit" value="Signup" />
        </form>
      </div>

      <div class="form login" onClick={()=>{document.querySelector(".wrapper").classList.add("active")}}>
        <header onClick={()=>{document.querySelector(".wrapper").classList.add("active")}}>Login</header>
        <form action="#">
          <input type="text" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />
          
          <input type="submit" value="Login" />
        </form>
      </div>

      {/* <script>
        const wrapper = document.querySelector(".wrapper"),
          signupHeader = document.querySelector(".signup header"),
          loginHeader = document.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
          wrapper.classList.add("active");
        });
        signupHeader.addEventListener("click", () => {
          wrapper.classList.remove("active");
        });
      </script> */}
    </section>
    </div>
  )
}
