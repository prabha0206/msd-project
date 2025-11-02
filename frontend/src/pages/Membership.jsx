// frontend/src/pages/Membership.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const Membership = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/memberships`);
        setPlans(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div className="membership-page">
      <h2>Membership Plans</h2>
      <div className="plans-grid">
        {plans.map(p => (
          <div className="plan-card" key={p._id}>
            <h3>{p.planName}</h3>
            <p>₹{p.price} — {p.durationMonths} month(s)</p>
            <ul>
              {p.benefits && p.benefits.map((b,i) => <li key={i}>{b}</li>)}
            </ul>
            <button className="btn">Become a Member Today</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membership;
