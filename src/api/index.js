import { API } from "../config";

export const getRecords = ({ offset }) => {
  //console.log(user.name, user.email, user.password, user.phone);

  return fetch(`${API}/records/${offset}`, {
    method: "GET",
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getExecutionTypes = () => {
  //console.log(user.name, user.email, user.password, user.phone);

  return fetch(`${API}/execution_type`, {
    method: "GET",
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTimeSeriesData = ({ starttime, endtime }) => {
  return fetch(`${API}/timeseries/${starttime}/${endtime}`, {
    method: "GET",
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
