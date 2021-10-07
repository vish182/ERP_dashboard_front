import { Margin } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import { getRecords } from "../api";

import "../styles/home.css";

export const Records = () => {
  const [rows, setRows] = useState([]);

  const [offset, setOffset] = useState(0);

  const loadRecords = ({ pOffset }) => {
    getRecords({ offset: pOffset }).then((data) => {
      console.log("data: ", data);
      if (!data || data.error) {
        console.log(data.error);
      } else {
        console.log("on home : ", data);
        setRows(data);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRecords({ pOffset: offset });
  }, [offset]);

  const nextRecords = () => {
    setOffset(offset + 25);
  };

  const prevRecords = () => {
    if (offset < 25) return;
    setOffset(offset - 25);
  };

  return (
    <div>
      <div className="next-prev" style={{ margin: "10px" }}>
        <button className="prev-btn" onClick={prevRecords}>
          Previous
        </button>
        <div className="records-heading">
          <h2>Fetched Records ..</h2>
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
              <tr>
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
