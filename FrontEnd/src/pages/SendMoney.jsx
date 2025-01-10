import { useSearchParams } from "react-router-dom" //Used to get parameters from the url
import axios from "axios";
import {useState} from "react";

export function SendMoney(){
    const [searchParams] = useSearchParams();
    const [amount,setAmount] = useState(0);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card foreground max-w-md p-4 space-y-8 w-06 bg-white shadow-lg rounded-lg ">
                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 className="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-2xl text-white">{name[0]}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Amount (in Rs)</label>
                            <input onChange={(e)=>{
                                setAmount(e.target.value);
                            }} type="number" className="peer flex h-10 w-full rounded-md border-2 bg-background px-3 py-2 text-sm" placeholder="Enter Amount" />
                        </div>
                        <button onClick={async()=>{
                            try{
                                const response = await axios.put("http://localhost:3000/account/transfer",{
                                    to:id,
                                    amount
                                },{
                                    headers:{
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                })
                                console.log("API Response:", response.data)
                                if(response.data.message == "Transaction Successful"){
                                    alert("Transaction successful");
                                    localStorage.setItem("balance", response.data.balance);
                                }
                            }catch{
                                alert("Transaction failed");
                            }
                        }} className="flex justify-center rounded-md text-sm font-medium ring-offset-background bg-green-400 h-10 px-4 py-2 hover:bg-gray-400 w-full">
                            Initiate Transfer
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
}