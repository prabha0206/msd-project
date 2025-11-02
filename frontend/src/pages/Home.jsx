// frontend/src/pages/Home.jsx
import React from 'react';
import SportCard from '../components/SportCard';

const sportsSample = [
  { name: 'Tennis', image: 'https://images.unsplash.com/photo-1509223197845-458d87318791', short: 'Clay & hard courts' },
  { name: 'Badminton', image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d', short: 'Indoor courts' },
  { name: 'Basketball', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b', short: 'Full-size courts' },
  { name: 'Football', image: 'https://images.unsplash.com/photo-1505672678657-cc7037095e2f', short: 'Grass & turf pitches' }
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-inner">
          <h1>Welcome to Sportify</h1>
          <p>Your one-stop destination for courts, coaching & events.</p>
        </div>
      </section>

      <section className="why-choose">
        <h2>Why Choose Us</h2>
        <div className="cards">
          <div className="card">Top Facilities</div>
          <div className="card">Experienced Coaches</div>
          <div className="card">Proven Excellence</div>
        </div>
      </section>

      <section className="sports-grid">
        <h2>Explore Sports</h2>
        <div className="grid">
          {sportsSample.map(s => <SportCard key={s.name} sport={s} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;
