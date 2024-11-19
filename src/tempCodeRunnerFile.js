  const completeAppointment = (id) => {
    setAppointments(prevAppointments => {
      const updatedAppointments = prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: "Completed" } : appointment
      );
      return updatedAppointments;
    });
  };