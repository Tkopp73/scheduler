import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {

  const day = props.days.map((days) => {
    return <DayListItem 
    key={days.id}
    name={days.name}
    spots={days.spots}
    selected ={props.day === days.name}
    setDay={props.setDay}
    ></DayListItem>
  })

return (
  <ul>
    {day}
  </ul>
);

};

export default DayList;