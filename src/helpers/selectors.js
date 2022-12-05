const getAppointmentsForDay = (state, day) => {
	let appointments = [];
	let appointmentsForDay = [];

	if (state.appointments) {
		let appointmentObj = Object.values(state.appointments);

		for (let theDay of state.days) {
			if (day === theDay.name) {
				appointments.push(theDay.appointments);
			}
		}

		for (let appointment of appointments) {
			for (let apptObj of appointmentObj) {
				appointment.forEach((appt) => {
					if (appt === apptObj.id) {
						appointmentsForDay.push(apptObj);
					}
				});
			}
		}
	}

	return appointmentsForDay;
};

const getInterviewersForDay = (state, day) => {
	const interviewersForDay = [];
	if (state.days[0]) {
		let appointments = [];
		let appointmentsForDay = [];

		if (state.appointments) {
			let appointmentObj = Object.values(state.appointments);

			for (let theDay of state.days) {
				if (day === theDay.name) {
					appointments.push(theDay.appointments);
				}
			}

			for (let appointment of appointments) {
				for (let apptObj of appointmentObj) {
					appointment.forEach((appt) => {
						if (appt === apptObj.id) {
							appointmentsForDay.push(apptObj);
						}
					});
				}
			}
		}

		let mappedappointments = appointmentsForDay.map((appointment) => {
			if (appointment.interview) {
				return appointment.interview.interviewer;
			}
		});

		let interviewerObj = Object.values(state.interviewers);

		for (let interviewer of interviewerObj) {
			if (mappedappointments.includes(interviewer.id)) {
				interviewersForDay.push(interviewer);
			}
		}
	}
	return interviewersForDay;
};

const getInterview = (state, interview) => {
	if (interview) {
		return {
			student: interview.student,
			interviewer: state.interviewers[interview.interviewer],
		};
	} else {
		return interview;
	}
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
