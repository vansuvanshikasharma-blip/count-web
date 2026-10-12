/*import { useState } from "react";
//function Square(){
     const[Root,setRoot] = useState("");
     const[inputVal,setInputVal] = useState({
        Root:"",
        Square:""
       
    })
   
return(
    <div>
        <div>
            <h2>Let's Square</h2>
             <input type="number" placeholder=""
                 onChange={(e)=> setAmount(e.target.value)} />
          //  <h2>Root:{Root}</h2>
        </div>
    </div>
)
}
export default Square;