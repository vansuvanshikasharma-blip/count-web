
import { useRef,useState} from "react"

function StopWatch() {
    const [count,setCount] = useState(0);
    const intervalRef = useRef(0)

    const handleStart = () =>{
         intervalRef.current = setInterval(() =>{
           setCount((rev) => rev+1)

        },1000)
    }
    const handleStop = () =>{
        clearInterval(intervalRef.current)
    }

    return(
        <div>
            <h2> StopWatch</h2>
            <h2>Count: {count}</h2>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    )
}
export default StopWatch;