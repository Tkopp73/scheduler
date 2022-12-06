import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {
	const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	const save = (name, interviewer) => {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props.bookInterview(props.id, interview, transition);
	};

	const discardAppt = () => {
		transition(DELETE);
		props.deleteInterview(props.id, transition);
	};

	return (
		<article className='appointment'>
			<Header time={props.time} />
			{mode === CONFIRM && (
				<Confirm
					message='Are you sure you want to delete this?'
					onCancel={back}
					onConfirm={discardAppt}
				/>
			)}
			{mode === DELETE && <Status message={DELETE} />}
			{mode === SAVING && <Status message={SAVING} />}
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer}
					onEdit={() => console.log("Clicked onEdit")}
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
		</article>
	);
};

export default Appointment;
