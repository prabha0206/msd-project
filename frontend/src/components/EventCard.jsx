// frontend/src/components/EventCard.jsx
import React from 'react';

const EventCard = ({ event }) => (
  <div className="event-card">
    <img src={event.image} alt={event.title} />
    <div className="event-body">
      <h3>{event.title}</h3>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <p>Seats left: {event.seatsLeft}</p>
    </div>
  </div>
);

export default EventCard;
