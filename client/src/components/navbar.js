import React from "react";
import { useLocation, Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsPersonFill } from "react-icons/bs";
import { AiFillSchedule } from "react-icons/ai";
import { LiaMoneyCheckAltSolid } from "react-icons/lia";
import { HiOutlineSupport } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import { Routes } from "../utils";

function Navbar() {
  const navbarOptions = [
    {
      imgUrl: "/4Boxes.jpg",
      title: "Dashboard",
      logo: <RxDashboard size={20} />,
      pathName: Routes.HOME,
    },
    {
      imgUrl: "/patient.jpg",
      title: "Patients",
      logo: <BsPersonFill size={20} />,
      pathName: Routes.PATIENT,
    },
    {
      imgUrl: "/appiontment.jpg",
      title: "Appointments",
      logo: <AiFillSchedule size={20} />,
      pathName: Routes.APPOINTMENT,
    },
    {
      imgUrl: "/billing.jpg",
      title: "Billings",
      logo: <LiaMoneyCheckAltSolid size={20} />,
      pathName: Routes.BILLING,
    },
  ];

  const AppOptions = [
    {
      imgUrl: "/billing.jpg",
      title: "Support",
      logo: <HiOutlineSupport size={20} />,
      pathName: Routes.SUPPORT,
    },
    {
      imgUrl: "/billing.jpg",
      title: "Settings",
      logo: <FiSettings size={20} />,
      pathName: Routes.SETTINGS,
    },
  ];

  const location = useLocation();
  console.log(location);

  return (
    <div className="p-4 h-full flex flex-col items-center justify-between text-white">
      <div>
        <div className="text-4xl font-bold mt-2 mb-12">Logo</div>

        {navbarOptions.map((el) => (
          <Link to={el.pathName} key={el.title}>
            <div
              key={el.title}
              className={`w-80 p-4 mb-2 flex items-center ${
                location.pathname == el.pathName
                  ? "bg-slate-400 border border-white"
                  : ""
              } rounded-lg hover:bg-slate-400 hover:border hover:border-white`}
            >
              <div className="mr-4">{el.logo}</div>
              {el.title}
            </div>
          </Link>
        ))}
        <div className="mt-6 border border-neutral-400 border-opacity-50"></div>
      </div>
      <div className="">
        {AppOptions.map((el) => (
          <Link to={el.pathName} key={el.title}>
            <div
              key={el.title}
              className={`self-end w-80 p-4 mb-2 flex items-center rounded-lg ${
                location.pathname == el.pathName
                  ? "bg-slate-400 border border-white"
                  : ""
              } hover:bg-slate-400 hover:border hover:border-white`}
            >
              <div className="mr-4">{el.logo}</div>
              {el.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
