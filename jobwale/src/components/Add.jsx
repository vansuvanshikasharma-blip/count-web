import { useState } from "react";

function Add() {
    const [inputA,setInputA] = useState("");
    const [inputB,setInputB] = useState("");
    const [sum,setSum] = useState("")

    const addTwoNum = () => {
         setSum(Number(inputA) + Number(inputB))
         
    }

    return (
        <div>
          <h2>Add two user input num</h2>
          <div>
            <input type="text"  value={inputA} 
             onChange={(e)=> setInputA(e.target.value)}
            />
          </div>
          <div>
            <input type="text" value={inputB} 
            onChange={(e) => setInputB(e.target.value)}
            />
          </div>
          <button onClick={addTwoNum}>Add</button>
          <div>
            <input type="text" value={sum} readOnly />
          </div>

          
        </div>
    )
}

export default Add;