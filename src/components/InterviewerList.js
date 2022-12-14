import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";

const InterviewerList = (props) => {
	const interviewers = props.interviewers.map((interviewer) => {
		return (
			<InterviewerListItem
				key={interviewer.id}
				name={interviewer.name}
				avatar={interviewer.avatar}
				selected={props.value === interviewer}
				setInterviewer={() => props.setInterviewer(interviewer)}
			/>
		);
	});

	return (
		<section className='interviewers'>
			<h4 className='interviewers__header text--light'>Interviewer</h4>
			<ul className='interviewers__list'>{interviewers}</ul>
		</section>
	);
};

InterviewerList.propTypes = {
	interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
