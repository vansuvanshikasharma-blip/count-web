import { useState,useEffect } from "react";

function Tabtitle() {
 const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Digital Clock</h1>

      <h2 style={{ fontSize: "50px" }}>
        {time.toLocaleTimeString()}
      </h2>
    </div>
  );
}

export default Tabtitle;