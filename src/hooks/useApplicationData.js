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

	const bookInterview = (id, interview, transition) => {
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

		axios
			.put(`http://localhost:8001/api/appointments/${id}`, { interview })
			.then(() => transition("SHOW"))
			.catch((err) => transition("sERROR", true));
	};

	const deleteInterview = (id, transition, interview = null) => {
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

		axios
			.delete(`http://localhost:8001/api/appointments/${id}`)
			.then(() => transition("EMPTY"))
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
