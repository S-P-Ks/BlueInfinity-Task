import axios from "axios";

export const addPatient = async (body, onSuccess, onError, onFinally) => {
  return axios
    .post(`http://localhost:8080/patient/addPatient`, body)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

export const addAppointment = async (body, onSuccess, onError, onFinally) => {
  console.log("Getting here");
  return axios
    .post(`http://localhost:8080/appointment`, body)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

export const addBilling = async (body, onSuccess, onError, onFinally) => {
  console.log("Getting here");
  return axios
    .post(`http://localhost:8080/billing`, body)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

export const getBilling = async (
  startDate,
  endDate,
  onSuccess,
  onError,
  onFinally
) => {
  return axios
    .get(
      `http://localhost:8080/billing?startDate=${startDate}&endDate=${endDate}`
    )
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

export const getAllAppointments = async (onSuccess, onError, onFinally) => {
  return axios
    .get(`http://localhost:8080/appointment`)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};

export const getPatients = async (
  page,
  limit,
  onSuccess,
  onError,
  onFinally
) => {
  return axios
    .get(`http://localhost:8080/patient?page=${page}&limit=${limit}`)
    .then(onSuccess)
    .catch(onError)
    .finally(onFinally);
};
