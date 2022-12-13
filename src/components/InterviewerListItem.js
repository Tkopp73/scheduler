import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  let interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected
  });

  const conditionalName = () => {
    if (props.selected) {
      return props.name
    }
  };

  return (
    <li 
    className={interviewerClass}
    onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {conditionalName()}
    </li>
  );
};


export default InterviewerListItem;