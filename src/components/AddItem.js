import { useState } from "react";
import { addItem } from "../services/firebase";

export default function AddItem({ setLoading }) {
  const [newItem, setNewItem] = useState("");

  const handleChange = (event) => {
    setNewItem(event.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (newItem === "") return;
    addItem(newItem);
    setNewItem("");
    setLoading(true);
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input
        type="text"
        name="newItem"
        placeholder="New Item"
        autoComplete="off"
        value={newItem}
        onChange={handleChange}
      />
      <button type="submit" name="button">
        +
      </button>
    </form>
  );
}
