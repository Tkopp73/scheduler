import React, {useState} from'react';
import InterviewerListItem from "components/InterviewerListItem";
import 'components/InterviewerList.scss';
import DayListItem from './DayListItem';


const InterviewerList = (props) => {

  const interviewers = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={props.interviewer === interviewer.id}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    ></InterviewerListItem>
  }
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  );
};


export default InterviewerList;