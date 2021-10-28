import { API } from "../config";

export const getRecords = ({ offset }) => {
  //console.log(user.name, user.email, user.password, user.phone);

  return fetch(`${API}/records/${offset}`, {
    method: "GET",
  })
    .then((response) => {
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log("error: ", err);
    });
};

export const getFilteredRecords = ({ offset, conditions }) => {
  //console.log(user.name, user.email, user.password, user.phone);
  // console.log(`${API}/filteredrecords/${offset}`);
  // console.log(conditions);

  console.log("conditions in filtered records : ", conditions);
  return fetch(`${API}/filteredrecords/${offset}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conditions: conditions }),
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getSolvedRecords = ({ offset, conditions }) => {
  //console.log(user.name, user.email, user.password, user.phone);
  // console.log(`${API}/filteredrecords/${offset}`);
  // console.log(conditions);

  console.log("conditions in filtered records : ", conditions);
  return fetch(`${API}/solvedrecords/${offset}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conditions: conditions }),
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateJobStatus = ({ jobKey, updateMessage, jobStatus }) => {
  //console.log(user.name, user.email, user.password, user.phone);
  // console.log(`${API}/filteredrecords/${offset}`);
  // console.log(conditions);
  console.log("update job status log: ", jobKey, updateMessage, jobStatus);
  return fetch(`${API}/update_job_status`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jobKey: jobKey,
      updateMessage: updateMessage,
      jobStatus: jobStatus,
    }),
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const archiveJobs = ({ date }) => {
  //console.log(user.name, user.email, user.password, user.phone);
  // console.log(`${API}/filteredrecords/${offset}`);
  // console.log(conditions);
  console.log("archive date: ", date);
  return fetch(`${API}/archive_jobs`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: date,
    }),
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFilteredArchiveRecords = ({ offset, conditions }) => {
  //console.log(user.name, user.email, user.password, user.phone);
  // console.log(`${API}/filteredrecords/${offset}`);
  // console.log(conditions);
  //console.log("srtingify: ", offset, JSON.stringify(conditions));
  console.log("filtered archive conditions: ", conditions);
  return fetch(`${API}/filtered_archived_records/${offset}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conditions: conditions }),
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      //console.log(response);
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
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCompanyList = ({ condition }) => {
  //console.log(user.name, user.email, user.password, user.phone);

  return fetch(`${API}/company_list`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ condition: condition }),
  })
    .then((response) => {
      //console.log(JSON.stringify(response.json()));
      //console.log(response);
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
      //console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
