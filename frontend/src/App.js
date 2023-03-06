import './App.css';
import React from 'react';
import  {LoginAndOut}  from './components/Login/LoginAndOut';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route , Routes} from 'react-router-dom'
import {Home} from './components/Home/Home';
import SideMenu from './components/SideBar/SideMenu';
import UserAccount from './components/UserAccount/UserAccount';
import { Contacts } from './components/Contact/Contacts';
import { Tours } from './components/Tour/Tours';
import TourDescription from './components/TourDescription/TourDescription';
import Success from './components/Success/Success';
import Cancel from './components/Cancel/Cancel';
import FlightPage from './components/FlightPage/FlightPage';
import UserOptions from './components/UserOptions/UserOptions';
import { Footer } from "./components/Home/footer/Footer";
import FlightHandle from './components/AdminDashBoard/FlightHandle/FlightHandle';
import  TourHandle  from './components/AdminDashBoard/TourHandle/TourHandle';
import  {UserHandle}  from './components/AdminDashBoard/UserHandle/UserHandle';
import EventHandle from './components/AdminDashBoard/Extras/EventHandle';
import HotelHandle from './components/AdminDashBoard/Extras/HotelHandle';

// Stripe API
// Password : jahnviKangle@1234
// Email  : janhvikangle@gmail.com


function App() {
  return (
    <div className="App">
<SideMenu/>
<UserOptions />
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<LoginAndOut />} />
  <Route path="/me" element={<UserAccount />} />
  <Route path="/contact" element={<Contacts />} />
  <Route path="/tour" element={<Tours />} />
  <Route path="/tours/:id" element={<TourDescription />} />
  <Route path="/flight" element={<FlightPage />} />
  <Route path="/success" element={<Success />} />
  <Route path="/cancel" element={<Cancel />} />
  <Route path="/dashboard/flights" element={<FlightHandle />} />
  <Route path="/dashboard/tours" element={<TourHandle />} />
  <Route path="/dashboard/users" element={<UserHandle />} />
  <Route path="/dashboard/events" element={<EventHandle />} />
  <Route path="/dashboard/hotels" element={<HotelHandle />} />
  

  
</Routes>
<Footer />


<ToastContainer  style={{zIndex:99999999999999}}/>

    </div>
  );
}

export default App;
