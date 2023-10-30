import React, { useState } from "react";

const Counter = () => {
  let [count, setCount] = useState(0);
  let timer; 
  const increase = () => {
    setCount(count+1);
    timer = setTimeout(increase, 1000);
  };

  const decrease = () => {
    // setCount((count = count - 1));
    clearTimeout(timer)
  };
  const start = () => {
    increase(); 
  }
  const stop = () => {
    decrease(); 
  }
  return (
    <>
      <p>count: {count}</p>
      <button  onMouseDown ={start} onMouseUp={stop} onClick={() => increase()}>Increase</button>
      <button  onClick={() => decrease()}>Decrease</button>  
    </>
  );
};

export default Counter;
