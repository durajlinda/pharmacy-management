import React, { useState, useEffect } from "react";
import AddMedicine from "./components/AddMedicine";
import MedicineList from "./components/MedicineList";
import "./App.css";

const App = () => {
  const [medicines, setMedicines] = useState([]);
  const [currentMedicine, setCurrentMedicine] = useState(null);
  const [notification, setNotification] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const storedMedicines = JSON.parse(localStorage.getItem("medicines"));
    if (storedMedicines) {
      setMedicines(storedMedicines);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("medicines", JSON.stringify(medicines));
  }, [medicines]);

  const handleAddMedicine = (medicine) => {
    setMedicines([...medicines, medicine]);
    setNotification("Medicine added successfully");
    setTimeout(() => setNotification(""), 2000); // Changed from 3000 to 2000 milliseconds
  };

  const handleUpdateMedicine = (updatedMedicine) => {
    const updatedMedicines = medicines.map((medicine) =>
      medicine.id === updatedMedicine.id ? updatedMedicine : medicine
    );
    setMedicines(updatedMedicines);
    setCurrentMedicine(null);
    setNotification("Medicine edited successfully");
    setTimeout(() => setNotification(""), 2000); // Changed from 3000 to 2000 milliseconds
  };

  const handleDeleteMedicine = (id) => {
    const updatedMedicines = medicines.filter((medicine) => medicine.id !== id);
    setMedicines(updatedMedicines);
    setShowConfirm(false);
    setNotification("Medicine deleted successfully");
    setTimeout(() => setNotification(""), 2000); // Changed from 3000 to 2000 milliseconds
  };

  const handleEditMedicine = (medicine) => {
    setCurrentMedicine(medicine);
  };

  const confirmDeleteMedicine = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="container">
      <h1>Pharmacy Management</h1>
      {notification && <div className="notification">{notification}</div>}
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this medicine?</p>
          <button
            onClick={() => handleDeleteMedicine(deleteId)}
            className="delete"
          >
            Yes
          </button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
      <AddMedicine
        onAdd={handleAddMedicine}
        currentMedicine={currentMedicine}
        onUpdate={handleUpdateMedicine}
      />
      <MedicineList
        medicines={medicines}
        onDelete={confirmDeleteMedicine}
        onEdit={handleEditMedicine}
      />
    </div>
  );
};

export default App;
