import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function ShowModal({ onClose, title, onSubmit, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="bg-white w-[600px] flex flex-col p-2 rounded-lg">
        <button className="text-black text-xl place-self-end" onClick={onClose}>
          <AiOutlineClose />
        </button>
        <div className="flex justify-center items-center">
          <div className="bg-white rounded text-xl font-bold mb-2">{title}</div>
        </div>
        <div>{children}</div>

        <div
          className="w-full p-2 bg-green-500 rounded-lg flex justify-center items-center text-white mt-2"
          onClick={onSubmit}
        >
          Submit
        </div>
      </div>
    </div>
  );
}

export default ShowModal;
