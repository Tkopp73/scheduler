import React from "react";

import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
	getAppointmentsForDay,
	getInterviewersForDay,
	getInterview,
} from "helpers/selectors";

export default function Application(props) {
	const { state, setDay, bookInterview, deleteInterview } =
		useApplicationData();


  ///returns a list of interviewers for the day
	const interviewers = getInterviewersForDay(state, state.day);


  //returns a list of appointment components
	const appointments = getAppointmentsForDay(state, state.day).map(
		(appointment) => {
			return (
				<Appointment
					key={appointment.id}
					{...appointment}
					interview={getInterview(state, appointment.interview)}
					bookInterview={bookInterview}
					deleteInterview={deleteInterview}
					interviewers={interviewers}
				/>
			);
		}
	);

	return (
		<main className='layout'>
			<section className='sidebar'>
				<img
					className='sidebar--centered'
					src='images/logo.png'
					alt='Interview Scheduler'
				/>
				<hr className='sidebar__separator sidebar--centered' />
				<nav className='sidebar__menu'>
					<DayList
						days={state.days}
						value={state.day}
						onChange={setDay}
					/>
				</nav>
				<img
					className='sidebar__lhl sidebar--centered'
					src='images/lhl.png'
					alt='Lighthouse Labs'
				/>
			</section>
			<section className='schedule'>
				{appointments}
				<Appointment
					key='last'
					time='5pm'
				/>
			</section>
		</main>
	);
}
