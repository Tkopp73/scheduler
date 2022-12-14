import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

const Form = (props) => {
	const [student, setStudent] = useState(props.student || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
	const [error, setError] = useState("");


  //clears the input feild and interviewers selected if applicable
	const reset = () => {
		setStudent("");
		setInterviewer(null);
	};


  //returns to the previous view
	const cancel = () => {
		reset();
		props.onCancel();
		setError("");
	};

  
  //validates the student name and interviewer is not empty
	const validate = () => {
		if (student === "") {
			setError("Student name cannot be blank");
			return;
		}
		if (!interviewer) {
			setError("Please select an interviewer");
			return;
		}
		props.onSave(student, interviewer.id);
		setError("");
	};

	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form
					autoComplete='off'
					onSubmit={(event) => {
						event.preventDefault();
					}}
				>
					<input
						className='appointment__create-input text--semi-bold'
						name='name'
						type='text'
						placeholder='Enter Student Name'
						value={student}
						onChange={(event) => setStudent(event.target.value)}
						data-testid='student-name-input'
					/>
					<section className='appointment__validation'>{error}</section>
				</form>
				<InterviewerList
					value={interviewer}
					interviewers={props.interviewers}
					setInterviewer={setInterviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button
						danger
						onClick={cancel}
					>
						Cancel
					</Button>
					<Button
						confirm
						onClick={validate}
					>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
};

export default Form;
