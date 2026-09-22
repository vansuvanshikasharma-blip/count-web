import { useState } from "react";
function Expense(){
    const [addAmount,setAmount] = useState("");
    const[blance,setBlance] = useState(0);
    const[inputVal,setInputVal] = useState({
        product:"",
        amount:""
    })
    
    const [expenseData,setExpenseData] = useState([]);
    const addAmountFun = ()  =>{
        setBlance(addAmount)
        setAmount("")
    }
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setInputVal({
            ...inputVal,
            [name]:value
        })
    }
    const ExpenseManage = () =>{
         if(Number(blance) > Number(inputVal.amount)){
            setExpenseData([...expenseData,{product:inputVal.product,amount:inputVal.amount}])
            setBlance(Number(blance)-Number(inputVal.amount))
         }else{
            alert("Insufficient balance")
         }
    }
     return (
        <div>
            <div>
                <h2>Expense Tracker</h2>
                <h2>Blance:{blance}</h2>
                <input type="number" value={addAmount}
                 onChange={(e)=> setAmount(e.target.value)} />
                 <button onClick={addAmountFun}>Add Amount</button>
            
            </div> <hr/>

            <div>
                <h2>Expense User</h2>
                <input type="text" name="product" placeholder="Product Name"
                 value={inputVal.product} onChange={handleChange} />
                 <input type="number" name="amount" placeholder="Enter amount"
                 value={inputVal.amount} onChange={handleChange}/>
                 <button onClick={ExpenseManage}>BUY</button>
            </div>
            <div>
                {
                    expenseData.map((val,idx) =>{
                        return <div key={idx}>
                            <p><strong>Product Name</strong>{val.product}</p>
                            <p><strong>Amount</strong>{val.amount}</p>
                        </div>
                    })

                }
            </div>
        </div>
    )
}
export default Expense;