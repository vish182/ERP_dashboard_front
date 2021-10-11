import React, { useEffect, useState } from "react";
import { getTimeSeriesData } from "../api";
import Sales from "../components/dashboard/Sales";

export const Time = () => {
  const [start, setStart] = useState("2021");
  const [t1, setT1] = useState(0);
  const [t2, setT2] = useState(0);
  const [t3, setT3] = useState(0);
  const [t4, setT4] = useState(0);
  const [t5, setT5] = useState(0);
  const [t6, setT6] = useState(0);
  const [t7, setT7] = useState(0);
  const [t8, setT8] = useState(0);
  const [t9, setT9] = useState(0);

  // 0: "",
  // 1: "",
  // 2: "",
  // 3: "",
  // 4: "",
  // 5: "",
  // 6: "",
  // 7: "",
  // 8: "",
  // 9: ""

  const days = [];

  useEffect(() => {
    let i = 1;

    let date = "2021-08-0" + i.toString();
    let nextDate = "2021-08-0" + (i + 1).toString();

    getTimeSeriesData({ starttime: date, endtime: nextDate })
      .then((data) => {
        if (!data || data.error) {
          console.log(data);
        } else {
          console.log(data);
          // let temp = timeSeries;
          // temp[i] = data.count;
          setT1(data.count);
        }
      })
      .then(() => {
        i++;
        console.log("count2: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT2(data.count);
            }
          }
        );
      })
      .then(() => {
        i++;
        console.log("count3: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT3(data.count);
            }
          }
        );
      })
      .then(() => {
        i++;
        console.log("count4: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT4(data.count);
            }
          }
        );
      })
      .then(() => {
        i++;
        console.log("count4: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT5(data.count);
            }
          }
        );
      })
      .then(() => {
        i++;
        console.log("count4: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT6(data.count);
            }
          }
        );
      })
      .then(() => {
        i++;
        console.log("count4: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT7(data.count);
            }
          }
        );
      })
      .then(() => {
        i++;
        console.log("count4: ", i);
        date = "2021-08-0" + i.toString();
        nextDate = "2021-08-0" + (i + 1).toString();
        getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
          (data) => {
            if (!data || data.error) {
              console.log(data);
            } else {
              console.log(data);
              // let temp = timeSeries;
              // temp[i] = data.count;
              setT8(data.count);
            }
          }
        );
      });
    // .then(() => {
    //   i++;
    //   console.log("count4: ", i);
    //   date = "2021-08-0" + i.toString();
    //   nextDate = "2021-08-0" + (i + 1).toString();
    //   getTimeSeriesData({ starttime: date, endtime: nextDate }).then(
    //     (data) => {
    //       if (!data || data.error) {
    //         console.log(data);
    //       } else {
    //         console.log(data);
    //         // let temp = timeSeries;
    //         // temp[i] = data.count;
    //         setT9(data.count);
    //       }
    //     }
    //   );
    // });

    console.log("count: ", i);

    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   console.log(timeSeries);
  // }, [timeSeries]);

  return (
    <div>
      <div>{JSON.stringify(t1)}</div>
      <div>{JSON.stringify(t2)}</div>
      <div>{JSON.stringify(t3)}</div>
      <div>{JSON.stringify(t4)}</div>
      <div>{JSON.stringify(t5)}</div>
      <div>{JSON.stringify(t6)}</div>
      <div>{JSON.stringify(t7)}</div>
      <div>{JSON.stringify(t8)}</div>

      {/* {JSON.stringify(t9)} */}

      <Sales t1={t1} t2={t2} t3={t3} t4={t4} t5={t5} t6={t6} t7={t7} t8={t8} />
    </div>
  );
};
