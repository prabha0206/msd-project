// frontend/src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get((process.env.REACT_APP_API_URL || '') + '/api/events');
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <h2>Events</h2>
      <div className="events-grid">
        {events.map(e => <EventCard key={e._id} event={e} />)}
      </div>
    </div>
  );
};

export default Events;
