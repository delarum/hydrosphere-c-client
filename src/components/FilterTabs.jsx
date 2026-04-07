import React from "react";

function FilterTabs({ activeFilter, setActiveFilter }) {
  const filters = [
    { label: "All Projects", value: "all" },
    { label: "River Basins", value: "river-basin" },
    { label: "Lakes", value: "lake" },
    { label: "Climate", value: "climate" },
  ];

  return (
    <div className="filter-tabs">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={`filter-pill ${
            activeFilter === filter.value ? "active" : ""
          }`}
          onClick={() => setActiveFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;