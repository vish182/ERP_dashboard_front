import { Margin } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import { getRecords, getFilteredRecords } from "../api";

import "../styles/home.css";

export const Records = () => {
  const [rows, setRows] = useState([]);

  const [offset, setOffset] = useState(0);

  const [filters, setFilters] = useState({
    jobCode: "",
    customer: "",
    company: "",
    queryConditions: "",
  });

  const { jobCode, customer, company, queryConditions } = filters;

  // const loadRecords = ({ pOffset }) => {
  //   console.log(`called load records at ${Date.now()}`);
  //   getRecords({ offset: pOffset }).then((data) => {
  //     console.log("data: ", data);
  //     if (!data || data.error) {
  //       console.log(data.error);
  //     } else {
  //       console.log("on home : ", data);
  //       setRows(data);
  //     }
  //   });
  // };

  const loadRecords = ({ pOffset, conditions }) => {
    console.log("args: ", pOffset, conditions);
    console.log(`called load records at ${Date.now()}`);
    getFilteredRecords({ offset: pOffset, conditions: conditions }).then(
      (data) => {
        console.log("data: ", data);
        if (!data || data.error) {
          console.log(data);
        } else {
          console.log("on home : ", data);
          setRows(data);
        }
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRecords({ pOffset: offset, conditions: queryConditions });
  }, [offset]);

  useEffect(() => {
    const interval = setInterval(
      () => loadRecords({ pOffset: offset, conditions: queryConditions }),
      30000
    );
    return () => {
      clearInterval(interval);
    };
  }, [queryConditions]);

  const nextRecords = () => {
    setOffset(offset + 25);
  };

  const prevRecords = () => {
    if (offset < 25) return;
    setOffset(offset - 25);
  };

  const handleChange = (fieldName) => {
    // higher order function
    return (event) => {
      let value;
      value = event.target.value;

      setFilters({ ...filters, [fieldName]: value });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let conditions = "";
    let flag = false;

    if (jobCode != "") {
      conditions += ` AND JobCode = '${jobCode}'`;
    }

    if (customer != "") {
      conditions += ` AND Customer = '${customer}'`;
    }

    if (company != "") {
      conditions += ` AND Company = '${company}'`;
    }

    setFilters({ ...filters, queryConditions: conditions });

    console.log("conditions: ", conditions);

    loadRecords({ pOffset: offset, conditions: queryConditions });
  };

  const filterForm = () => {
    // onSubmit={clickSubmit}
    return (
      <form className="mb-3" onSubmit={handleSubmit}>
        {JSON.stringify(filters)}
        <div className="form-row">
          <div className="form-group ml-2">
            <label className="text-muted">Job Code</label>
            <input
              type="text"
              onChange={handleChange("jobCode")}
              className="form-control"
              // value={jobCode}
            />
          </div>

          <div className="form-group ml-2">
            <label className="text-muted">Customer</label>
            <input
              type="text"
              onChange={handleChange("customer")}
              className="form-control"
              // value={customer}
            />
          </div>

          <div className="form-group ml-2">
            <label className="text-muted">Company</label>
            <input
              type="text"
              onChange={handleChange("company")}
              className="form-control"
              // value={company}
            />
          </div>
        </div>
        <button className="btn btn-outline-primary ml-2">Submit</button>
      </form>
    );
  };

  return (
    <div>
      {filterForm()}
      <div className="next-prev" style={{ margin: "10px" }}>
        <button className="prev-btn" onClick={prevRecords}>
          Previous
        </button>
        <div className="records-heading">
          <h2>Records</h2>
        </div>
        <button className="next-btn" onClick={nextRecords}>
          Next
        </button>
      </div>

      <div>
        <table className="record-table">
          <tr className="table-heading">
            <th>TaskName</th>
            <th>JobCode</th>
            <th>User</th>
            <th>Company</th>
            <th>Database</th>
            <th>DataInstance</th>
            <th>ExecutedOn</th>
            <th>TerminatedOn</th>
            <th>ExecutionType</th>
            <th>MailSent</th>
          </tr>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                <td>{row.TaskName}</td>
                <td>{row.JobCode}</td>
                <td>{row.User}</td>
                <td>{row.Company}</td>
                <td>{row.Database}</td>
                <td>{row.DataInstance}</td>
                <td>{row.ExecutedOn}</td>
                <td>{row.TerminatedOn}</td>
                <td>{row.ExecutionType}</td>
                <td>{row.MailSent}</td>
              </tr>
            );
          })}
        </table>
        <div className="next-prev">
          <button className="prev-btn" onClick={prevRecords}>
            Previous
          </button>
          <button className="next-btn" onClick={nextRecords}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
