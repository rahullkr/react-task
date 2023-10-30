import React, { useEffect, useRef, useState } from "react";

function CharacterCounter() {
  const inputrefs = [useRef(null), useRef(null), useRef(null)];
  const currentIndex = useRef(0);
  

  const handleChange = () => {
    currentIndex.current = (currentIndex.current + 1) % inputrefs.length; 
    inputrefs[currentIndex.current].current.focus(); 
  };
  return (
    <>
      <input type="text" ref={inputrefs[0]} placeholder="for part 1"></input>
      <input type="text" ref={inputrefs[1]} placeholder="for part 2"></input>
      <input type="text" ref={inputrefs[2]} placeholder="for part 3"></input>
      <button onClick={handleChange}>next</button>
    </>
  );
}

export default CharacterCounter;
