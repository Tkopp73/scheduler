import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
	getAppointmentsForDay,
	getInterviewersForDay,
	getInterview,
} from "helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		const baseUrl = "http://localhost:8001";

		Promise.all([
			axios.get(`${baseUrl}/api/days`),
			axios.get(`${baseUrl}/api/appointments`),
			axios.get(`${baseUrl}/api/interviewers`),
		]).then((all) => {
			setState((prev) => ({
				...prev,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const dailyInterviewers = getInterviewersForDay(state, state.day);

	const bookInterview = (id, interview) => {
		console.log("inside bookInterview", id, interview);
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		setState({
			...state,
			appointments,
		});
	};

	const schedule = dailyAppointments.map((appointment) => {
		console.log("inside map", getInterview(state, appointment.interview));
		const interviewersForDay = dailyInterviewers;
		return (
			<Appointment
				key={appointment.id}
				{...appointment}
				interview={getInterview(state, appointment.interview)}
				bookInterview={bookInterview}
				interviewers={interviewersForDay}
			/>
		);
	});

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
				{schedule}
				<Appointment
					key='last'
					time='5pm'
				/>
			</section>
		</main>
	);
}
