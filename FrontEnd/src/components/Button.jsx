export function Button({label,onClick}){
    return <div>
        <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium p-2 rounded-lg">{label}</button>
    </div>
}