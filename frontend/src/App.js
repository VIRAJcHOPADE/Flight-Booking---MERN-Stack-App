import './App.css';
import React from 'react';
import  {LoginAndOut}  from './components/Login/LoginAndOut';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Route , Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">

<Routes>
  <Route path="/login" element={<LoginAndOut />} />
</Routes>

     <ToastContainer />

    </div>
  );
}

export default App;
