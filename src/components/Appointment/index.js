import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";//retrieves the empty view
const SHOW = "SHOW";//retrieves the show view
const CREATE = "CREATE";//retrieves the create view
const SAVING = "SAVING";//retrieves the saving view
const DELETE = "DELETE";//retrieves the delete view
const CONFIRM = "CONFIRM";//retrieves the confirm view
const EDIT = "EDIT";//retrieves the edit view
const sERROR = "sERROR";//retrieves the saving error view
const dERROR = "dERROR";//retrieves the deleting error view

const Appointment = (props) => {
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);
    //saves the current student and interviewer into state
	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props.bookInterview(props.id, interview, transition);
	};
  //deletes the appointment
	const discardAppt = () => {
		transition(DELETE, true);
		props.deleteInterview(props.id, transition);
	};

	return (
		<article
			className='appointment'
			data-testid='appointment'
		>
			<Header time={props.time} />
			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you want to delete this?'
					onCancel={back}
					onConfirm={discardAppt}
				/>
			)}
			{mode === dERROR && (
				<Error
					message='Could not delete this interview'
					onClose={back}
				/>
			)}
			{mode === sERROR && (
				<Error
					message='Could not save this interview'
					onClose={back}
				/>
			)}
			{mode === DELETE && <Status message={DELETE} />}
			{mode === SAVING && <Status message={SAVING} />}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => transition(EDIT)}
					onDelete={() => transition(CONFIRM)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}
			{mode === EDIT && (
				<Form
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					interviewers={props.interviewers}
					onSave={save}
					onCancel={back}
				/>
			)}
		</article>
	);
};

export default Appointment;
