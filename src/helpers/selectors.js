const getAppointmentsForDay = (state, day) => {
	const foundDay = state.days.find((d) => d.name === day);

	if (state.days.length === 0 || foundDay === undefined) return [];

	return foundDay.appointments.map((id) => state.appointments[id]);
};

const getInterviewersForDay = (state, day) => {
	const foundDay = state.days.find((d) => d.name === day);

	if (state.days.length === 0 || foundDay === undefined) return [];

	return foundDay.interviewers.map((id) => state.interviewers[id]);
};

const getInterview = (state, interview) => {
	console.log("HERE", interview);
	return (
		interview && {
			...interview,
			interviewer: state.interviewers[interview.interviewer],
		}
	);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
