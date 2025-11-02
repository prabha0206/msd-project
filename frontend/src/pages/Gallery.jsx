// frontend/src/pages/Gallery.jsx
import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1521412644187-c49fa049e84d',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b',
  'https://images.unsplash.com/photo-1509223197845-458d87318791',
  'https://images.unsplash.com/photo-1505672678657-cc7037095e2f'
];

const Gallery = () => (
  <div className="gallery-page">
    <h2>Gallery</h2>
    <div className="gallery-grid">
      {images.map((src, i) => (
        <div className="gallery-item" key={i}><img src={src} alt={`gallery-${i}`} /></div>
      ))}
    </div>
  </div>
);

export default Gallery;
