import React from "react";

const MedicineList = ({ medicines, onDelete, onEdit }) => {
  return (
    <div>
      <h2>Medicine List</h2>
      <ul>
        {medicines.map((medicine) => (
          <li key={medicine.id}>
            {medicine.name} - Quantity: {medicine.quantity} - Price: $
            {medicine.price}
            <div>
              <button onClick={() => onEdit(medicine)} className="edit">
                Edit
              </button>
              <button onClick={() => onDelete(medicine.id)} className="delete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineList;
