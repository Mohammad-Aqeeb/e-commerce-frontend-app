import { useState } from "react";
import './Signup.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
function Signup({setUser}){
    const [formData, setFormData] = useState({userName : "", email : "", password : ""});
    const navigate = useNavigate();
    function changeHandler(event){

        setFormData((prev)=>{
            return({
                ...prev,
                [event.target.name] : event.target.value
            })
        })
    }

    async function submitHandler(event){
        event.preventDefault();

        try{
            const response = await axios.post("http://localhost:4000/api/v1/createUser", formData);
            setUser(response.data.data);
            toast.success(response.data.message)
            navigate("/login");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="signupContainer">
            <form className="signupForm" onSubmit={submitHandler}>

                <h2>Sign UP</h2>

                <input type="text" placeholder="Name" name="userName" onChange={changeHandler} value={formData.userName} className="userNameBox" required></input>

                <input type="email" placeholder="Email" name="email" onChange={changeHandler} value={formData.email} className="emailBox" required></input>

                <input type="text" placeholder="Password" name="password" onChange={changeHandler} value={formData.password} className="passwordBox" required></input>

                <button type="submit" className="signupButton">SIGNUP</button>

                <div className="signupBox">Already Have an account
                     
                     <Link to={'/login'}> Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup;