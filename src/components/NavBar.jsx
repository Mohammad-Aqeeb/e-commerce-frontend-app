import "./NavBar.css"
import { Link } from "react-router-dom";
import image from "../assets/imageUser.jpg";
import logo from "../assets/logo.png";
import {BsCartFill} from "react-icons/bs";

function NavBar({user}){

    return (
        <div className="navbarContainer">
            <div className="logoBox">
                <Link to={"/"}>
                    <img src={logo} alt="Logo" className="logo"></img>
                </Link>
            </div>

            <div className="sections">
                <Link>Home</Link>
                <Link>About</Link>
                <Link>Contact</Link>
            </div>

            {
                user ? 
                <div className="userBox">
                    <div className="userImage">
                    {
                        user.image ? 
                        <img src={user.image} alt="user" className="userimg"></img>
                        : 
                        <img src={image}  alt="user" className="userimg"></img>
                    }
                    </div>

                    <Link to={"/cart"} className="cartBox">
                        <BsCartFill className="cart"/>
                    </Link>
                </div>
                :
                <div className="userSection">
                    <Link to={"/signup"}>Signup</Link>
                    <Link to={"/login"}>Login</Link>
                </div>
            }

        </div>
    )
}

export default NavBar;