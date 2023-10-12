import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"
import {Link} from 'react-router-dom'
import { useContext } from "react";
const Navbar = () => {
  
  const { user} = useContext(AuthContext);
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to="/" style={{color:"white", textDecoration:"none"}}>
            <span className="logo">Monkey Booking App</span>
            </Link>
            {user ? user.username : (<div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>)}
        </div>
      
    </div>
  )
}

export default Navbar
