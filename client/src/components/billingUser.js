import React from "react";

function BillingUser() {
  return (
    <div className="w-[355px] h-[121px] relative mb-2 mx-2">
      <div className="w-[355px] h-[121px] left-0 top-0 absolute">
        <div className="w-[355px] h-[121px] left-0 top-0 absolute bg-blue-200 rounded-lg"></div>
        <div className="w-[113.81px] left-[127px] top-[14px] absolute text-black text-[18px] font-normal leading-relaxed">
          Sourav Singh
        </div>
        <div className="w-[161px] h-[27px] left-[127px] top-[73px] absolute">
          <div className="left-0 top-[2px] absolute text-neutral-600 text-[16px] font-normal leading-normal">
            Bill No
          </div>
          <div className="left-[70px] top-0 absolute text-black text-[18px] font-normal leading-relaxed">
            012345678
          </div>
        </div>
        <div className="left-[127px] top-[43px] absolute text-black text-[18px] font-normal leading-relaxed">
          32, Male
        </div>
      </div>
      <img
        className="w-[101px] h-[101px] left-[11px] top-[8px] absolute rounded-lg"
        src="https://picsum.photos/200"
      />
    </div>
  );
}

export default BillingUser;
