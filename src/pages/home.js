import React, { useEffect, useState } from "react";

import { getRecords } from "../api";

import "../styles/home.css";

export const Home = () => {
  const [rows, setRows] = useState([]);

  const loadRecords = () => {
    getRecords().then((data) => {
      console.log("data: ", data);
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("on home : ", data);
        setRows(data);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRecords();
  }, []);

  return (
    <div>
      <p>Fetched Records ..</p>
      <div>
        <table className="record-table">
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
      </div>
    </div>
  );
};
