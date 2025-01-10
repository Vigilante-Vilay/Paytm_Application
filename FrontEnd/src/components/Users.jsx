import {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Users(){
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");

    useEffect(()=>{
        const token = localStorage.getItem("token");
        axios.get("http://localhost:3000/user/bulk?filter="+filter,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        .then(response=>{
            setUsers(response.data.Users)
        })
    },[filter])

    return <div>
        <div className="font-bold text-lg mt-6">
            Users
        </div>
        <div className="my-2">
            <input onChange={((e)=>{
                setFilter(e.target.value)
            })} type="text" placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user) => {
                return <User key={user._id} user={user} />
            })}
        </div>
    </div>
}

function User({ user }) {

    const navigate = useNavigate();
    const initial = user.firstName.charAt(0);

    return (
        <div className="flex justify-between items-center border-b border-slate-200 py-2">
            <div className="flex items-center">
                {/* Circle with the initial */}
                <div className="w-12 h-12 flex items-center justify-center bg-gray-300 text-black rounded-full font-bold mr-3">
                    {initial}
                </div>
                {/* Username */}
                <div className="text-gray-700">{user.firstName} {user.lastName}</div>
            </div>
            {/* Send Money Button */}
            <button onClick={()=>{
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }}  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-gray-600 transition">
                Send Money
            </button>
        </div>
    );
}