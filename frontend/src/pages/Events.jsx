// frontend/src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { API_BASE_URL } from '../config/api';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/events`);
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
