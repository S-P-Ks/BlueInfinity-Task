import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Patient from "./pages/Patient";
import Appointment from "./pages/Appointment";
import Billing from "./pages/Billing";
import { Routes as R } from "./utils";
import Setting from "./pages/Setting";
import Support from "./pages/Support";
import { Toaster } from "react-hot-toast";

function App() {
  const uninitialized = useRef(false);

  useEffect(() => {
    if (uninitialized.current) return;
  }, []);

  return (
    <div className="App w-screen h-screen bg-indigo-900 shadow ">
      <Toaster />
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Navbar />
        </div>
        <div className="col-span-9 p-6 w-full h-screen bg-slate-100 rounded-2xl shadow border border border border">
          <Routes>
            <Route exact path={R.Home} element={<Home />} />
            <Route exact path={R.PATIENT} element={<Patient />} />
            <Route exact path={R.APPOINTMENT} element={<Appointment />} />
            <Route exact path={R.BILLING} element={<Billing />} />
            <Route exact path={R.SETTINGS} element={<Setting />} />
            <Route exact path={R.SUPPORT} element={<Support />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
