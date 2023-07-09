import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { BsSearch } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { GrPrevious, GrNext } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import BillingUser from "../components/billingUser";
import { useReactToPrint } from "react-to-print";
import MyModal from "../components/ShowModal";
import { toast } from "react-hot-toast";
import {
  addPatient,
  getPatients as gP,
  addAppointment,
  getBilling,
} from "../actions";
import PatientsBox from "../components/PatientsBox";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Months } from "../utils";
import moment from "moment";

function Billing() {
  const [searchText, setSearchText] = useState("");
  const printDetails = useRef();
  const [isFoucused, setisFoucused] = useState(false);

  const uninitialized = useRef(false);

  const [addPatientModal, setaddPatientModal] = useState(false);
  const [addAppointmentModal, setaddAppointmentModal] = useState(false);

  //Modal useStates
  const [patientName, setpatientName] = useState("");
  const [patientAge, setpatientAge] = useState("");
  const [gender, setgender] = useState("");
  const [appointmentTitle, setappointmentTitle] = useState("");
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [page, setpage] = useState(0);
  const [limit, setlimit] = useState(10);
  const [isLastPage, setisLastPage] = useState(false);

  const [selectedDate, setselectedDate] = useState(new Date());

  const [patients, setpatients] = useState([]);

  const [selectedpatient, setselectedpatient] = useState();

  const closeAddPatientModal = () => setaddPatientModal(false);
  const closeAddAppointmentModal = () => setaddAppointmentModal(false);

  const [startDateOfAMonth, setstartDateOfAMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [lastDateOfAMonth, setlastDateOfAMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  );

  const handlePrint = useReactToPrint({
    content: () => printDetails.current,
    documentTitle: "Bill Reciept",
  });

  const getPatients = async (type) => {
    if (isLastPage) {
      return;
    }

    if (type === "Previous") {
      setpage(page - 1);
    } else if (type === "Next") {
      setpage(page + 1);
    }

    await gP(
      type === "Previous" ? page - 1 : page + 1,
      limit,
      (res) => {
        console.log(res);
        setpage(page + 1);

        if (res.data.length < limit) {
          setisLastPage(true);
        }

        setpatients([...res.data]);
      },
      (err) => {
        toast.error("Something went wrong!");
      },
      () => {
        setaddAppointmentModal(false);
      }
    );
  };

  useEffect(() => {
    if (uninitialized.current) return;

    if (patients.length == 0) {
      getPatients();
    }
  }, [addAppointmentModal]);

  const fetchBillings = async () => {
    await getBilling(
      startDateOfAMonth.toString(),
      lastDateOfAMonth.toString(),
      (res) => {
        console.log(res);
      },
      (err) => console.log(err),
      () => {}
    );
  };

  useEffect(() => {
    fetchBillings();
    // console.log(startDateOfAMonth);
  }, [selectedDate]);

  const submitAddPatient = async () => {
    if (
      patientName.length == 0 ||
      patientAge.length == 0 ||
      gender.length == 0
    ) {
      toast.error("Please add all the values !");
    }

    const body = {
      name: patientName,
      age: patientAge,
      gender: gender,
    };

    console.log(body);

    await addPatient(
      body,
      () => {
        toast.success("Patient added successfully!");
      },
      () => {
        toast.error("Something went wrong!");
      },
      () => {
        setaddPatientModal(false);
      }
    );
  };

  const submitAppointment = async () => {
    try {
      if (
        appointmentTitle.length == 0 ||
        selectedpatient == null ||
        startDate == null ||
        endDate == null ||
        startTime == null ||
        endTime == null
      ) {
        toast.error("Pls fill all the values!");
        return;
      }

      const body = {
        title: appointmentTitle,
        patient: selectedpatient,
        startDate: startDate,
        endDate: endDate,
      };

      await addAppointment(
        body,
        () => {
          toast.success("Appointment added successfully!");
          setaddAppointmentModal(false);
        },
        (err) => {
          console.log(err);
          toast.error("Something went wrong!");
        },
        () => {}
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const addPatienModalUI = (
    <MyModal
      onClose={closeAddPatientModal}
      title={"Add Patient"}
      onSubmit={submitAddPatient}
    >
      <div>
        <div className="flex flex-col mb-2 mr-2">
          <label htmlFor="name" className="ml-1">
            Add Name
          </label>
          <input
            className="rounded-lg p-2 mt-2 ml-1 border"
            type="name"
            name="name"
            value={patientName}
            onChange={(e) => {
              e.stopPropagation();
              setpatientName(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col mb-2 mr-2">
          <label htmlFor="name" className="ml-1">
            Add Age
          </label>
          <input
            className="rounded-lg p-2 mt-2 ml-1 border"
            type="name"
            name="name"
            value={patientAge}
            onChange={(e) => {
              e.stopPropagation();
              setpatientAge(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col mb-2 mr-2">
          <label htmlFor="name" className="ml-1">
            Add Gender
          </label>
          <input
            className="rounded-lg p-2 mt-2 ml-1 border"
            type="name"
            name="name"
            value={gender}
            onChange={(e) => {
              e.stopPropagation();
              setgender(e.target.value);
            }}
          />
        </div>
      </div>
    </MyModal>
  );

  // console.log(patientFillFocus.current.isFocus);

  const addAppointmentModalUI = (
    <MyModal
      onClose={closeAddAppointmentModal}
      title={"Add Appointment"}
      onSubmit={submitAppointment}
    >
      <div>
        <div className="flex flex-col mb-2 mr-2">
          <label htmlFor="name" className="ml-1">
            Add Appointment Title
          </label>
          <input
            className="rounded-lg p-2 mt-2 ml-1 border"
            type="name"
            name="name"
            value={appointmentTitle}
            onChange={(e) => {
              e.stopPropagation();
              setappointmentTitle(e.target.value);
            }}
          />
        </div>

        <div className="flex flex-col mb-2 mr-2 relative">
          <label htmlFor="name" className="ml-1">
            Add Patient
          </label>
          <div className="flex flex-wrap items-center">
            {patients.map((el) => (
              <PatientsBox
                key={el._id}
                patient={el}
                onClick={(id) => setselectedpatient(id)}
                isSelected={selectedpatient === el._id}
              />
            ))}
            {patients.length >= limit &&
              !isLastPage(
                <div
                  className="p-2 rounded-lg bg-blue-500 mr-2 my-2 cursor-pointer"
                  onClick={() => getPatients()}
                >
                  Show More
                </div>
              )}
          </div>
        </div>

        <div className="mb-2">
          <div>Start Date</div>
          <DatePicker onChange={(d) => setstartDate(d)} selected={startDate} />
        </div>
        <div className="mb-2">
          <div>Start Time</div>
          <TimePickerComponent
            placeholder="Select Time"
            value={startDate}
            format={"HH:mm"}
            step={60}
            onChange={(t) => setstartTime(t.value)}
          />
        </div>

        <div className="mb-2">
          <div>End Date</div>
          <DatePicker onChange={(d) => setendDate(d)} selected={endDate} />
        </div>
        <div className="mb-2">
          <div>End Time</div>
          <TimePickerComponent
            placeholder="Select Time"
            value={endDate}
            format={"HH:mm"}
            step={60}
            onChange={(t) => setendTime(t.value)}
          />
        </div>
      </div>
    </MyModal>
  );

  const changeMonth = (type) => {
    if (type == "next") {
      setstartDateOfAMonth(moment(startDateOfAMonth).add(1, "month")._d);
      setlastDateOfAMonth(moment(lastDateOfAMonth).add(1, "month")._d);
      setselectedDate(moment(lastDateOfAMonth).add(1, "month")._d);
      // console.log(startDateOfAMonth);
    } else {
      setstartDateOfAMonth(moment(startDateOfAMonth).subtract(1, "month")._d);
      setlastDateOfAMonth(moment(startDateOfAMonth).subtract(1, "month")._d);
      setselectedDate(moment(lastDateOfAMonth).subtract(1, "month")._d);
    }
  };

  return (
    <div>
      {addPatientModal && addPatienModalUI}
      {addAppointmentModal && addAppointmentModalUI}
      <div className="flex items-center mb-4">
        <div className="w-3/5 h-10 bg-white rounded-full flex justify-center items-center mr-4">
          <div className="p-2 ml-2">
            <BsSearch size={20} />
          </div>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full h-full outline-none rounded-r-full"
            placeholder="Search Patients"
          />
        </div>

        <div
          className="rounded-full bg-indigo-900 text-white mr-4 py-2 px-6"
          onClick={() => setaddAppointmentModal(true)}
        >
          Make an Appointment
        </div>

        <div
          className="rounded-full bg-indigo-900 p-2 text-white mr-4 py-2 px-6"
          onClick={() => setaddPatientModal(true)}
        >
          Add Patient
        </div>

        <div className="rounded-full bg-indigo-900 p-2 text-white">
          <IoNotificationsOutline size={20} />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="text-4xl font-bold">Billing Overview</div>
        <div className="flex justify-center items-center w-48 bg-blue-200 rounded-xl">
          <div
            className="p-2 bg-indigo-900 rounded-lg text-white"
            onClick={() => changeMonth("back")}
          >
            <GrPrevious />
          </div>
          <div className="mx-2">
            {Months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </div>
          <div
            className="p-2 bg-indigo-900 rounded-lg text-white"
            onClick={() => changeMonth("next")}
          >
            <GrNext />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12" style={{ height: "80vh" }}>
        <div className="col-span-4 overflow-y-scroll mr-2">
          {new Array(5).fill(0).map((el) => (
            <BillingUser key={Math.random()} />
          ))}
        </div>

        <div
          ref={printDetails}
          className="col-span-8 w-full h-full bg-white rounded-3xl p-4"
        >
          <div className="w-full h-full flex flex-col bg-white rounded-3xl shadow border border border border border-indigo-900 overflow-hidden">
            <div className="p-4 flex justify-between items-center">
              <div className="text-xl font-bold">Billing Details</div>
              <div
                onClick={handlePrint}
                className="rounded-full bg-indigo-900 text-white mr-4 py-2 px-6"
              >
                Print Bill
              </div>
            </div>
            <div className="w-full py-4 bg-zinc-100 flex justify-around">
              <div className="flex flex-col">
                <div className="opacity-50 text-black text-[16px] font-normal leading-normal">
                  Patient Name
                </div>
                <div className="text-black text-[16px] font-normal leading-normal">
                  Sourav Singh
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-50 text-black text-[16px] font-normal leading-normal">
                  Age/Gender
                </div>
                <div className="text-black text-[16px] font-normal leading-normal">
                  20/Male
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-50 text-black text-[16px] font-normal leading-normal">
                  Bill No
                </div>
                <div className="text-black text-[16px] font-normal leading-normal">
                  0123456
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-50 text-black text-[16px] font-normal leading-normal">
                  Date/Time
                </div>
                <div className="text-black text-[16px] font-normal leading-normal">
                  02/02/2023, 06:23 PM
                </div>
              </div>

              <div className="flex flex-col">
                <div className="opacity-50 text-black text-[16px] font-normal leading-normal">
                  Reciept No
                </div>
                <div className="text-black text-[16px] font-normal leading-normal">
                  0123141125514
                </div>
              </div>
            </div>

            <div className="flex justify-between border-b p-4">
              <div className="flex flex-row">
                <div className=" text-black text-[16px] font-bold leading-normal mr-4">
                  Sr.No
                </div>
                <div className=" text-black text-[16px] font-bold leading-normal">
                  Service Name
                </div>
              </div>

              <div className="flex flex-row">
                <div className=" text-black text-[16px] font-bold leading-normal mr-4">
                  Price
                </div>
                <div className=" text-black text-[16px] font-bold leading-normal mr-4">
                  Quantity
                </div>
                <div className=" text-black text-[16px] font-bold leading-normal">
                  Amount
                </div>
              </div>
            </div>

            <div className="h-full"></div>

            <div className="w-full self-end bg-zinc-100 rounded-bl-lg rounded-br-lg p-4">
              <div className="flex flex-col border-b">
                <div className="flex justify-between">
                  <div>Mobile Number</div>
                  <div>9327167743</div>
                </div>

                <div className="flex justify-between">
                  <div>Tax</div>
                  <div>200</div>
                </div>

                <div className="flex justify-between">
                  <div>Discount</div>
                  <div>50</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <div className="font-bold">Total</div>
                  <div>50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
