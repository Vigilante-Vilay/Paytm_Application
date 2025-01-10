import {Heading} from "../components/Heading"
import {SubHeading} from "../components/SubHeading"
import {InputBox} from "../components/InputBox";
import {Button} from "../components/Button"
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounder-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onchange={(e)=>{
                    setFirstName(e.target.value)
                }}placeholder="Vilay" label={"First Name"}/>
                <InputBox onchange={(e)=>{
                    setLastName(e.target.value)
                }}placeholder="Aggarwal" label={"Last Name"}/>
                <InputBox onchange={(e)=>{
                    setUsername(e.target.value)
                }}placeholder="vilay37@gmail.com" label={"Email"}/>
                <InputBox onchange={(e)=>{
                    setPassword(e.target.value)
                }}placeholder="123456" label={"Password"}/>
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response = await axios.post("http://localhost:3000/user/signup",{
                            username,
                            firstName,
                            lastName,
                            password
                        })
                        localStorage.setItem("token",response.data.token);
                        localStorage.setItem("balance",response.data.balance);
                        navigate("/dashboard");
                    }}label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/Signin"} />
            </div>
        </div>
    </div>
}