export function InputBox({label,placeholder,onchange,type}){
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input type={type} onChange={onchange} placeholder={placeholder} className="w-full px-2 py-1 border-2"></input>
    </div>
}