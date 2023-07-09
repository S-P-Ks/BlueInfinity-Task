import React from "react";

function PatientsBox({ onClick, patient, isSelected }) {
  return (
    <div
      className={`p-2 rounded-lg ${
        !isSelected ? "bg-green-500" : "bg-green-800"
      } mr-2 my-2`}
      onClick={() => onClick(patient._id)}
    >
      {patient.name}
    </div>
  );
}

export default PatientsBox;
