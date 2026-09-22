import { useEffect, useRef } from "react";

function UseRefCom() {
    const inputRef = useRef(null);
     
    useEffect(() =>{
        inputRef.current.focus();
    })

    return(
        <div>
            <input ref={inputRef} placeholder=" Enter a Nnumber "/>
        </div>
    )
}
export default UseRefCom;