import React, { useState } from "react";
import MyModal from "./ShowModal";
import { toast } from "react-hot-toast";
import { addBilling } from "../actions";

function AppoitmentCard({ onClick, id, title, startDate, patientId }) {
  const [showModal, setShowModal] = useState(false);
  const [billingItems, setbillingItems] = useState([]);

  const [item, setitem] = useState("");
  const [quantity, setquantity] = useState(0);
  const [price, setprice] = useState(0);

  const [tax, settax] = useState(0);
  const [discount, setdiscount] = useState(0);

  const submitBilling = async () => {
    if (tax == 0 || discount == 0 || billingItems.length == 0) {
      toast.error("Something went wrong!");
    }

    const body = {
      tax: tax,
      discount: discount,
      items: billingItems,
      billNo: Math.random(),
      recieptNo: Math.random(),
      patient: patientId,
    };

    await addBilling(
      body,
      (res) => {
        console.log(res);
      },
      (err) => {
        toast.error("Something went wrong!");
      },
      () => {}
    );
  };

  const addBillingModalUI = (
    <MyModal
      onClose={() => setShowModal(false)}
      title={"Add Billing"}
      onSubmit={submitBilling}
    >
      <div>
        <div>
          <div className="flex flex-col mb-2 mr-2">
            <label htmlFor="name" className="ml-1">
              Tax
            </label>
            <input
              className="rounded-lg w-full p-2 mt-2 ml-1 border"
              type="name"
              name="name"
              value={tax}
              onChange={(e) => {
                settax(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-2 mr-2">
            <label htmlFor="name" className="ml-1">
              Discount
            </label>
            <input
              className="rounded-lg w-full p-2 mt-2 ml-1 border"
              type="name"
              name="name"
              value={discount}
              onChange={(e) => {
                setdiscount(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col mb-2 mr-2">
            <label htmlFor="name" className="ml-1">
              Item
            </label>
            <input
              className="rounded-lg w-full p-2 mt-2 ml-1 border"
              type="name"
              name="name"
              value={item}
              onChange={(e) => {
                setitem(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-2 mr-2">
            <label htmlFor="name" className="ml-1">
              Quantity
            </label>
            <input
              className="rounded-lg w-full p-2 mt-2 ml-1 border"
              type="name"
              name="name"
              value={quantity}
              onChange={(e) => {
                setquantity(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col mb-2 mr-2">
            <label htmlFor="name" className="ml-1">
              Price
            </label>
            <input
              className="rounded-lg w-full p-2 mt-2 ml-1 border"
              type="name"
              name="name"
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
          </div>
        </div>
        <div
          className="p-2 place-self-end rounded-lg bg-green-500 w-1/3 flex justify-center items-center text-white"
          onClick={() => {
            setbillingItems([
              ...billingItems,
              { item: item, price: price, quantity: quantity },
            ]);

            setitem("");
            setprice(0);
            setquantity(0);
          }}
        >
          Add Item
        </div>

        <div>
          {billingItems.map((el) => (
            <div key={el.item} className="p-2">
              <div>Item Name : {el.item}</div>
              <div>Quantity : {el.quantity}</div>
              <div>Amount : {el.price}</div>
            </div>
          ))}
        </div>

        <div>{billingItems.map((el, idx) => {})}</div>
      </div>
    </MyModal>
  );

  return (
    <div
      className={`p-2 rounded-lg mr-2 my-2 bg-blue-500`}
      onClick={() => setShowModal(true)}
    >
      {showModal ? addBillingModalUI : <div></div>}
      <div>{title}</div>

      <div>Start Date : {startDate}</div>
    </div>
  );
}

export default AppoitmentCard;
