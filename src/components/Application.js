import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import getAppointmentsForDay from "helpers/selectors";



export default function Application(props) {
  const [state, setState]=useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    const baseUrl = "http://localhost:8001"
    
    Promise.all([
      axios.get(`${baseUrl}/api/days`),
      axios.get(`${baseUrl}/api/appointments`)
    ])
    .then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}))
    })
  }, [])

  let functionState = {days: (state.days), appointments: state.appointments}
  const dailyAppointments = getAppointmentsForDay(functionState, state.day);

  const mappedAppointments = dailyAppointments.map((appointment) => {
    if (appointment.interview) {
      return < Appointment 
      key={appointment.id}
      {...appointment}
      />
      
    } else {
      return < Appointment key={appointment.id} time={appointment.time}/>
    }
  })


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          value={state.day}
          onChange={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
}
