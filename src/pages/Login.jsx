import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Login({setUser}){
  const [formData, setFormData] = useState({email : "", password : ""});
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
            const response = await axios.post("http://localhost:4000/api/v1/loginUser", formData);
            setUser(response.data.data);
            toast.success(response.data.message);
            navigate("/");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="loginContainer">
            <form className="loginForm" onSubmit={submitHandler}>
                <h2>Log In</h2>

                <input type="email" placeholder="Email" name="email" onChange={changeHandler} value={formData.email} className="emailBox"></input>

                <input type="text" placeholder="Password" name="password" onChange={changeHandler} value={formData.password} className="passwordBox"></input>

                <button type="submit">LOGIN</button>

                <div className="loginBox">Don't Have an account 
                    <Link to={"/signup"}>signup</Link>
                </div>

            </form>
        </div>
    )
}

export default Login;