import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@material-ui/core";
import { archiveJobs, getFilteredArchiveRecords } from "../api";
//import { useAuth } from "../contexts/AuthContext";

import "../styles/home.css";

export const Archives = () => {
  const [rows, setRows] = useState([]);

  const [offset, setOffset] = useState(0);

  const [filters, setFilters] = useState({
    jobCode: "",
    customer: "",
    company: "",
    queryConditions: "",
  });

  const [messageOpen, setMessageOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [date, setDate] = useState("1999-01-01");

  const { jobCode, customer, company, queryConditions } = filters;

  // const { currentUserDoc, currentUser } = useAuth();

  const loadRecords = ({ pOffset, conditions }) => {
    //console.log("args: ", pOffset, conditions);
    //console.log(`called load records at ${Date.now()}`);
    getFilteredArchiveRecords({ offset: pOffset, conditions: conditions }).then(
      (data) => {
        //console.log("data: ", data);
        if (!data || data.error) {
          console.log(data);
        } else {
          //console.log("on home : ", data);
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

  const handleFilterSubmit = (e) => {
    e.preventDefault();

    let conditions = "";

    if (jobCode !== "") {
      conditions += ` AND JobCode = '${jobCode}'`;
    }

    if (customer !== "") {
      conditions += ` AND Customer = '${customer}'`;
    }

    if (company !== "") {
      conditions += ` AND Company = '${company}'`;
    }

    setFilters({ ...filters, queryConditions: conditions });

    console.log("conditions: ", conditions);

    loadRecords({ pOffset: offset, conditions: queryConditions });
  };

  const filterForm = () => {
    // onSubmit={clickSubmit}
    return (
      <form className="mb-3" onSubmit={handleFilterSubmit}>
        {/* {JSON.stringify(filters)} */}
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

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleArchiveDateSubmit = (e) => {
    e.preventDefault();
    archiveJobs({ date: date }).then((data) => {
      if (!data || data.error) {
        alert("error");
      } else {
        alert("success");
      }
    });
  };

  const dateForm = () => {
    return (
      <form className="mb-3 ml-3" onSubmit={handleArchiveDateSubmit}>
        <div>
          <div className="form-group ml-2">
            <label for="archivedate">Archive Date</label>
            <input
              type="date"
              id="archivedate"
              name="archivedate"
              onChange={handleDateChange}
            />
          </div>
        </div>
        <button className="btn btn-outline-primary ml-2">Archive</button>
      </form>
    );
  };

  const statusLabel = ({ status }) => {
    let color = "white";

    switch (status) {
      case "Pending":
        color = "red";
        break;

      case "WIP":
        color = "yellow";
        break;

      case "Solved":
        color = "green";
        break;

      default:
        break;
    }

    return <td style={{ backgroundColor: `${color}` }}>{status}</td>;
  };

  const messageModal = ({ text }) => {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      // boxShadow: 24,
      p: 4,
    };

    const handleOpen = () => {
      setMessage(text);
      setMessageOpen(true);
    };
    const handleClose = () => setMessageOpen(false);

    return (
      <td>
        <Button onClick={handleOpen}>View</Button>
        <Modal
          open={messageOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Engineer Message
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {message}
            </Typography>
          </Box>
        </Modal>
      </td>
    );
  };

  return (
    <div>
      <div className="d-flex flex-row justify-content-between">
        <div className="ml-5">{filterForm()}</div>
        <div className="mr-5 bg-light">
          {JSON.stringify(date)}
          {dateForm()}
        </div>
      </div>

      <div className="next-prev" style={{ margin: "10px" }}>
        {/* {JSON.stringify(currentUserDoc)} */}
        {/* <div style={{ width: "300px" }}>
          {console.log(JSON.stringify(currentUser))}
        </div> */}
        <button className="prev-btn" onClick={prevRecords}>
          Previous
        </button>
        <div className="records-heading">
          <h2>Archived Records</h2>
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
            <th>Customer</th>
            <th>Company</th>
            <th>Database</th>
            <th>DataInstance</th>
            <th>ExecutedOn</th>
            <th>TerminatedOn</th>
            <th>ExecutionType</th>
            <th>MailSent</th>
            <th>Engg Status</th>
            <th>Engg Message</th>
          </tr>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                <td>{row.TaskName}</td>
                <td>{row.JobCode}</td>
                <td>{row.User}</td>
                <td>{row.Customer}</td>
                <td>{row.Company}</td>
                <td>{row.Database}</td>
                <td>{row.DataInstance}</td>
                <td>{row.ExecutedOn}</td>
                <td>{row.TerminatedOn}</td>
                <td>{row.ExecutionType}</td>
                <td>{row.MailSent}</td>
                {statusLabel({ status: row.EnggStatus })}
                {messageModal({ text: row.EnggMessage })}
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
