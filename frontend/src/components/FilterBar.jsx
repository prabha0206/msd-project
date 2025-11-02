// frontend/src/components/FilterBar.jsx
import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search courts..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
        <option value="">Sort</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>

      <select value={filters.sport} onChange={(e) => setFilters({ ...filters, sport: e.target.value })}>
        <option value="">All Sports</option>
        <option value="Tennis">Tennis</option>
        <option value="Badminton">Badminton</option>
        <option value="Basketball">Basketball</option>
        <option value="Football">Football</option>
      </select>
    </div>
  );
};

export default FilterBar;
