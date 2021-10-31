import React, { useEffect, useState } from "react";
import { Divider } from "@material-ui/core";
import { margin } from "@material-ui/system";

const Checkbox = ({ items, handleFilters, pCustomer }) => {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setChecked([]);
    handleFilters([]);
  }, [pCustomer]);

  //console.log("Checkbox state: ", checked);

  const handleToggle = (cid) => {
    return () => {
      const currentItemId = checked.indexOf(cid);
      const newCheckedItemId = [...checked];

      if (currentItemId === -1) {
        newCheckedItemId.push(cid);
      } else {
        newCheckedItemId.splice(currentItemId, 1);
      }

      setChecked(newCheckedItemId);
      console.log(newCheckedItemId);
      handleFilters(newCheckedItemId);
    };
  };

  return (
    <>
      <Divider />
      <li style={{ listStyle: "none", fontWeight: "600" }}>
        <label className="form-check-label mr-2">Companies</label>
        <label className="form-check-label mr-2">Alerts</label>
      </li>
      {items.map((item, i) => {
        if (pCustomer === "all" || item.Customer === pCustomer) {
          return (
            <li key={i} className="form-check">
              <label className="form-check-label mr-3">{item.Company}</label>
              <input
                onChange={handleToggle(item.Company)}
                type="checkbox"
                value={checked.indexOf(item.Company) === -1}
                checked={checked.indexOf(item.Company) !== -1}
                // className="form-check-input"
              />
              <label className="form-check-label ml-3">
                ({item.totalCount})
              </label>
            </li>
          );
        }
      })}
    </>
  );
};

export default Checkbox;
