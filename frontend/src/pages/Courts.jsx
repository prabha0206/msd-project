// frontend/src/pages/Courts.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilterBar from '../components/FilterBar';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Courts = () => {
  const [courts, setCourts] = useState([]);
  const [filters, setFilters] = useState({ search: '', sortBy: '', sport: '' });
  const query = useQuery();

  useEffect(() => {
    const sportQuery = query.get('sport');
    if (sportQuery) setFilters(f => ({ ...f, sport: sportQuery }));
  }, [query]);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const params = {};
        if (filters.sport) params.sport = filters.sport;
        if (filters.search) params.search = filters.search;
        if (filters.sortBy) params.sortBy = filters.sortBy;
        const res = await axios.get((process.env.REACT_APP_API_URL || '') + '/api/courts', { params });
        setCourts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourts();
  }, [filters]);

  return (
    <div className="courts-page">
      <h2>Courts</h2>
      <FilterBar filters={filters} setFilters={setFilters} />

      <div className="courts-grid">
        {courts.map(c => (
          <div className="court-card" key={c._id}>
            <img src={c.images && c.images[0]} alt={c.name} />
            <div className="court-body">
              <h3>{c.name}</h3>
              <p>{c.sport} • ₹{c.pricePerHour}/hr</p>
              <p>Facilities: {c.facilities && c.facilities.join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courts;
