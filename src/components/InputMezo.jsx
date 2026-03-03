
export default function InputMezo({label,type,value,placeholder, setValue, className, style }){

    return (
        <>
            <label >{label}</label>
            <input 
            style={style}
            type={type}
            value={value}
            placeholder={placeholder} 
            onChange={(e)=> setValue(e.target.value)}
            />
        </>
    )
}