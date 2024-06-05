import React, { useState, useEffect } from "react";

const AddMedicine = ({ onAdd, currentMedicine, onUpdate }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentMedicine) {
      setName(currentMedicine.name);
      setQuantity(currentMedicine.quantity);
      setPrice(currentMedicine.price);
      setIsEditing(true);
    } else {
      setName("");
      setQuantity("");
      setPrice("");
      setIsEditing(false);
    }
  }, [currentMedicine]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const medicine = {
      id: isEditing ? currentMedicine.id : Date.now(),
      name,
      quantity,
      price,
    };
    if (isEditing) {
      onUpdate(medicine);
    } else {
      onAdd(medicine);
    }
    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <button type="submit">{isEditing ? "Update" : "Add"} Medicine</button>
    </form>
  );
};

export default AddMedicine;
