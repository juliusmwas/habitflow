import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import "./Navbar.css";
import { Link } from "react-router-dom";



function Navbar(){
    const [isOpen, setIsOpen] = useState(false);

    return(
            <div className="navbar">
                <div className="logo"><h1>HabitFlow</h1></div>
                    <div className={`links ${isOpen ? "active" : ""}`}>                
                            <ul className="nav-links">
                                <li><a href="">Dashboard</a></li>
                                <li><a href="#about">About Us</a></li>
                            </ul>
                            <div className="authBtn">
                                <Link to="/auth">
                                <button className="loginBtn">Login</button>
                                </Link>
                                <Link to="/auth">
                                <button className="signupBtn">Sign Up</button>
                                </Link>
                            </div>
                        
                    </div>

                <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <IoClose /> : <IoMenu />}
                </div>
            </div>    
    );
}

export default Navbar