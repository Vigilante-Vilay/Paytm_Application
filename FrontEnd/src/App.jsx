import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/SendMoney";
function App() {
    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element = {<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/send" element={<SendMoney />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

function Landing(){
    const navigate = useNavigate();
    return <div className="flex flex-col h-screen items-center justify-center bg-blue-200">
            <h1 className="text-4xl font-bold mb-8 underline">Transaction App</h1>
            <div className="flex">
                <button className="p-3 m-3 text-2xl text-white rounded-lg bg-gray-500 hover:bg-gray-600" onClick={()=>{
                    navigate("/signup");
                }}>SignUp</button>
                <button className="p-3 m-3 text-2xl rounded-lg text-white bg-gray-500 hover:bg-gray-600" onClick={()=>{
                    navigate("/signin")
                }}>Login</button>
            </div>
    </div>
}

export default App;