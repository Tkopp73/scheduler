import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
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

	const updateSpots = (state, newAppointements) => {
		const dayIndex = state.days.findIndex((day) => day.name === state.day);
		const currentDay = state.days[dayIndex];
		const listOfAppointmentIds = currentDay.appointments;

		const listOfFreeAppointments = listOfAppointmentIds.filter(
			(id) => !newAppointements[id].interview
		);

		const spots = listOfFreeAppointments.length;
		return [dayIndex, spots];
	};

	const bookInterview = (id, interview, transition) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => {
				const [today, spots] = updateSpots(state, appointments);
				const day = { ...state.days[today], spots: spots };
				const days = [...state.days];
				days.splice(today, 1, day);
				setState({ ...state, appointments, days });
				transition("SHOW");
			})
			.catch((err) => transition("sERROR", true));
	};

	const deleteInterview = (id, transition) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => {
				const [today, spots] = updateSpots(state, appointments);
				const day = { ...state.days[today], spots: spots };
				const days = [...state.days];
				days.splice(today, 1, day);
				setState({ ...state, appointments, days });
				transition("EMPTY");
			})
			.catch((err) => transition("dERROR"), true);
	};

	return {
		state,
		setDay,
		bookInterview,
		deleteInterview,
	};
};

export default useApplicationData;
