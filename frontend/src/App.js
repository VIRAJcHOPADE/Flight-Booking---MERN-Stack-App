import './App.css';
import React from 'react';
import  {LoginAndOut}  from './components/Login/LoginAndOut';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import SideMenu from './components/SideBar/SideMenu';
import UserAccount from './components/UserAccount/UserAccount';
function App() {
  return (
    <div className="App">
{/* <SideBar/> */}
<SideMenu/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LoginAndOut />} />
  <Route path="/me" element={<UserAccount />} />
</Routes>

<ToastContainer />

    </div>
  );
}

export default App;
