import React, { useState } from "react";

const AdvanceList = () => {
  const [items, setItems] = useState([
    { id: 1, name: "item1", discription: "part1" },
    { id: 2, name: "item2", discription: "part2" },
  ]);

  const [newItem, setNewItem] = useState({ name: "", discription: "" });
  const addItem = () => {
    if (newItem.name.trim() !== "" && newItem.discription.trim() !== "") {
      setItems([...items, { id: Date.now(), ...newItem }]);
      setNewItem({ name: "", discription: "" });
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <h1>list items</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.discription}</p>
            <button onClick={() => removeItem(item.id)}>remove</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>add new item</h2>
        <input
          type="text"
          placeholder="name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        ></input>
        <input
          type="text"
          placeholder="name"
          value={newItem.discription}
          onChange={(e) =>
            setNewItem({ ...newItem, discription: e.target.value })
          }
        ></input>
        <button onClick={addItem}>add item</button>
      </div>
    </>
  );
};

export default AdvanceList;
