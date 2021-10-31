import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@material-ui/core";
import { getSolvedRecords, getHistoryCompanyList } from "../api";
import Checkbox from "../components/checkbox";
import { Divider } from "@material-ui/core";

import "../styles/home.css";

export const History = () => {
  const [rows, setRows] = useState([]);

  const [offset, setOffset] = useState(0);

  const [filters, setFilters] = useState({
    jobCode: "",
    customer: "",
    company: "",
    queryConditions: "",
    checkedCompanyList: [],
  });

  const [messageOpen, setMessageOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [updateList, setUpdateList] = useState([]);

  const { jobCode, customer, company, queryConditions, checkedCompanyList } =
    filters;

  const [companyList, setCompanyList] = useState([]);

  const [customerDropValue, setCustomerDropValue] = useState("all");

  const [date, setDate] = useState({ start: "", end: "" });

  const loadCompanies = () => {
    let conditions = "";

    if (date.start !== "" && date.end !== "") {
      conditions += `AND ExecutedOn < '${date.end}' AND ExecutedOn > '${date.start}' `;
    }

    getHistoryCompanyList({ condition: conditions }).then((data) => {
      //console.log("company list data: ", data);
      setCompanyList(data);
    });
  };

  const loadRecords = ({ pOffset, conditions }) => {
    //console.log("args: ", pOffset, conditions);
    //console.log(`called load records at ${Date.now()}`);
    getSolvedRecords({ offset: pOffset, conditions: conditions }).then(
      (data) => {
        //console.log("data: ", data);
        if (!data || data.error) {
          //console.log(data);
        } else {
          //console.log("on home : ", data);
          setRows(data);
          loadCompanies();
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

  const handleCheckbox = (companyList) => {
    setFilters({ ...filters, checkedCompanyList: companyList });
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
      if (checkedCompanyList.length === 0) {
        conditions += ` AND Company IN ('${company}')`;
      } else {
        let companyListString = ` AND Company IN ('${company}',`;
        checkedCompanyList.forEach((c) => {
          companyListString += `'${c}',`;
        });
        companyListString += `''`;
        companyListString += `)`;
        conditions += companyListString;
      }
    } else {
      if (checkedCompanyList.length !== 0) {
        let companyListString = ` AND Company IN (`;
        checkedCompanyList.forEach((c) => {
          companyListString += `'${c}',`;
        });
        companyListString += `''`;
        companyListString += `)`;
        conditions += companyListString;
      }
    }

    if (date.start !== "" && date.end !== "") {
      conditions += ` AND ExecutedOn < '${date.end}' AND ExecutedOn > '${date.start}'`;
    }
    setFilters({ ...filters, queryConditions: conditions });

    console.log("conditions: ", conditions);

    loadRecords({ pOffset: offset, conditions: conditions });
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
      width: 800,
      bgcolor: "background.paper",
      border: "2px solid #000",
      // boxShadow: 24,
      p: 4,
    };

    const parseUpdates = ({ str }) => {
      let updates = [];

      if (!str || str.length === 0) return;

      let head = 0;
      let i = 0;
      for (i = 0; i < str.length; i++) {
        if (str[i] === "|") {
          updates.push(str.slice(head, i));
          head = i + 1;
        }
      }
      updates.push(str.slice(head, i));

      setUpdateList(updates);
    };

    const handleOpen = () => {
      //console.log("message text: ", text);
      setMessage(text);

      parseUpdates({ str: text });
      setMessageOpen(true);
    };
    const handleClose = () => {
      setMessageOpen(false);
      setUpdateList([]);
    };

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

            <div style={{ overflow: "scroll", height: "300px" }}>
              {updateList.map((item, i) => (
                <p>{item}</p>
              ))}
            </div>
          </Box>
        </Modal>
      </td>
    );
  };

  const handleCustomerDrop = (e) => {
    setCustomerDropValue(e.target.value);
  };

  const customerDrop = () => {
    let custList = [];
    return (
      <div>
        <select className="btn mr-2" onChange={handleCustomerDrop}>
          <option value="all">All</option>
          {companyList.map((comp, i) => {
            if (!custList.includes(comp.Customer)) {
              custList.push(comp.Customer);
              return (
                <option value={comp.Customer} key={i}>
                  {comp.Customer}
                </option>
              );
            } else {
              return <></>;
            }
          })}
        </select>
      </div>
    );
  };

  const dateForm = ({ pDateType }) => {
    return (
      <div>
        <div className="form-group ml-2">
          <label for="archivedate" className="mr-2">
            {String(pDateType).toLocaleUpperCase()}
          </label>
          <input
            type="date"
            id="archivedate"
            name="archivedate"
            onChange={handleDate(pDateType)}
          />
        </div>
      </div>
    );
  };

  const handleDate = (dateType) => {
    return (e) => {
      setDate({ ...date, [dateType]: e.target.value });
    };
  };

  return (
    <div>
      <div className="d-flex flex-row ml-2">
        {filterForm()}
        <div className="ml-2">
          <div style={{ textAlign: "center" }}>
            <h4>Date From and To</h4>
          </div>
          <div className="d-flex flex-row justify-content-center">
            <div className="mr-5 bg-light">
              {/* {JSON.stringify(date)} */}
              {dateForm({ pDateType: "start" })}
            </div>
            <div className="mr-5 bg-light">
              {/* {JSON.stringify(date)} */}
              {dateForm({ pDateType: "end" })}
            </div>
          </div>
        </div>
      </div>
      <div div className="home-parent">
        <div className="checkbox-parent mt-5">
          <label style={{ fontSize: "1.5em" }}>Customers</label>
          <Divider />
          <div className="d-flex flex-row align-items-end justify-content-center">
            <label>Customer</label>
            {customerDrop()}
          </div>
          <Checkbox
            items={companyList}
            handleFilters={(filters) => handleCheckbox(filters)}
            pCustomer={customerDropValue}
          />
        </div>
        <div className="record-main">
          <div className="next-prev" style={{ margin: "10px" }}>
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
      </div>
    </div>
  );
};
