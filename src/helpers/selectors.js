
//retrieves the appointments for the days
const getAppointmentsForDay = (state, day) => {
	const foundDay = state.days.find((d) => d.name === day);

	if (state.days.length === 0 || !foundDay) return [];

	return foundDay.appointments.map((id) => state.appointments[id]);
};
// retrieves the interviewers for the days
const getInterviewersForDay = (state, day) => {
	const foundDay = state.days.find((d) => d.name === day);

	if (state.days.length === 0 || !foundDay) return [];

	return foundDay.interviewers.map((id) => state.interviewers[id]);
};
// Retrieves sets the interview into state
const getInterview = (state, interview) => {
	return (
		interview && {
			...interview,
			interviewer: state.interviewers[interview.interviewer],
		}
	);
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
