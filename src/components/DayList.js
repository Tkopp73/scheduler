import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {

  const day = props.days.map((days) => {
    return <DayListItem 
    key={days.id}
    name={days.name}
    spots={days.spots}
    selected ={props.value === days.name}
    setDay={props.onChange}
    ></DayListItem>
  })

return (
  <ul>
    {day}
  </ul>
);

};

export default DayList;