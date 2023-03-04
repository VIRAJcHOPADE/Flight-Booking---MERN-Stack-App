import React from 'react'
import "./nav.scss"


const Navbar = () => {
    return (
        <div className="nav">

             {/* <a  className="navlinks" href="/#miphones">Mi Phones</a> */}
            <div class="select navlinks">
                <select class="selects" name="" id="">
                    <option value="">From</option>
                     <option value="Mumbai">Mumbai</option>
                     <option value="Pune">Pune</option>
                     <option value="Delhi">Delhi</option>
                     <option value="Agra">Agra</option>
                 </select>
            </div>
               <div class="select navlinks">
                <select class="selects" name="" id="">
                    <option value="">To..</option>
                     <option value="Mumbai">Mumbai</option>
                     <option value="Pune">Pune</option>
                     <option value="Delhi">Delhi</option>
                     <option value="Agra">Agra</option>
                 </select>
            </div>            
           </div>
    )
}

export default Navbar