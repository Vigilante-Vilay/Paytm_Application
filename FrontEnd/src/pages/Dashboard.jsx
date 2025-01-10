import {AppBar} from "../components/AppBar"
import {Balance} from "../components/Balance"
import {Users} from "../components/Users"
import { useNavigate } from "react-router-dom";
export function Dashboard(){
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const balance = localStorage.getItem("balance");

    if(!token){
        navigate("/login");
    }
    return <div>
        <AppBar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}