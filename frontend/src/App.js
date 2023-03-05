import './App.css';
import React from 'react';
import  {LoginAndOut}  from './components/Login/LoginAndOut';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import SideMenu from './components/SideBar/SideMenu';
import UserAccount from './components/UserAccount/UserAccount';
import { Contacts } from './components/Contact/Contacts';
import { Tours } from './components/Tour/Tours';
import TourDescription from './components/TourDescription/TourDescription';


// Stripe API
// Password : jahnviKangle@1234
// Email  : janhvikangle@gmail.com


function App() {
  return (
    <div className="App">
<SideMenu/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LoginAndOut />} />
  <Route path="/me" element={<UserAccount />} />
  <Route path="/contact" element={<Contacts />} />
  <Route path="/tour" element={<Tours />} />
  <Route path="/tours/:id" element={<TourDescription />} />
  
</Routes>

<ToastContainer />

    </div>
  );
}

export default App;
