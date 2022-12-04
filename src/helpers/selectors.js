

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
      for ( let apptObj of appointmentObj) {
        appointment.forEach((appt)=> {
          if (appt === apptObj.id) {
            appointmentsForDay.push(apptObj);
          }
      })
      }
    }
  }

return appointmentsForDay;
}



const getInterviewersForDay = (state, day) => {
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
      for ( let apptObj of appointmentObj) {
        appointment.forEach((appt)=> {
          if (appt === apptObj.id) {
            appointmentsForDay.push(apptObj);
          }
      })
      }
    }
  }

  return appointmentsForDay;

}


const getInterview = (state, interview) => {

  if(interview) {
    return {'student': interview.student, "interviewer": state.interviewers[interview.interviewer]}
  } else {
    return interview;
  }

}




export { getAppointmentsForDay, getInterview, getInterviewersForDay, };