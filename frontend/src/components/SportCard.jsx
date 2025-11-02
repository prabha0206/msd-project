// frontend/src/components/SportCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SportCard = ({ sport }) => {
  return (
    <div className="sport-card">
      <img src={sport.image} alt={sport.name} />
      <div className="sport-card-body">
        <h3>{sport.name}</h3>
        <p>{sport.short}</p>
        <Link to={`/courts?sport=${encodeURIComponent(sport.name)}`} className="btn">Explore</Link>
      </div>
    </div>
  );
};

export default SportCard;
