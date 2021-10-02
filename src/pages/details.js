import React, { useEffect, useState } from "react";
import grid_big from "../assets/home-grid-big.jpg";
import "../styles/about.css";

export const Details = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <DetailsImage
        heading={selectHeading(
          props.match.params.name,
          props.match.params.type
        )}
      />
      <DetailsMiddle
        service={props.match.params.name}
        type={props.match.params.type}
      />
    </div>
  );
};

const DetailsImage = (props) => {
  return (
    <div
      className="about-header"
      style={{ backgroundImage: `url(${grid_big})` }}
    >
      <p className="about-text-big"> {props.heading} </p>
    </div>
  );
};
// style={{transform: 'translateY(50%)'}}
const DetailsMiddle = (props) => {
  return (
    <div className="about-middle">
      <div className="about-middle-img">
        {console.log(
          `/${props.type}/${selectImage(props.service, props.type)}.jpg`
        )}
        <img
          src={`/${props.type}/${selectImage(props.service, props.type)}.jpg`}
        />
      </div>

      <div className="about-middle-text">
        <div>
          <p className="about-middle-text-big">
            {selectHeading(props.service, props.type)}
          </p>
          <p className="about-middle-text-small">{selectText(props.service)}</p>
        </div>
      </div>
    </div>
  );
};
