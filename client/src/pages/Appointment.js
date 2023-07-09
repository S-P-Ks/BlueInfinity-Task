import React, { useEffect, useState } from "react";
import { getAllAppointments } from "../actions";
import AppoitmentCard from "../components/AppoitmentCard";
import MyModal from "../components/ShowModal";

function Appointment() {
  const [appoitments, setappoitments] = useState([]);

  const fetchAppointments = async () => {
    await getAllAppointments(
      ({ data }) => {
        setappoitments([...data]);
      },
      (err) => console.log(err),
      () => {}
    );
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-wrap w-full flex-row">
      {/* {showModal && addBillingModalUI} */}
      {appoitments.map((el) => (
        <AppoitmentCard
          key={el._id}
          // onClick={() => {
          //   setshowModal(true);
          // }}
          id={el.id}
          title={el.title}
          startDate={el.startDate}
          patientId={el.patient}
        />
      ))}
    </div>
  );
}

export default Appointment;
