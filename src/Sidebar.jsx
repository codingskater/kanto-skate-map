import { useState } from "react";
import "./Sidebar.css";

/**
 * Sidebar
 * Renders the app title, search bar, collapsible skatepark list,
 * and the (currently unstyled) detail panel for the selected park.
 *
 * Props:
 *  - parks: array of park objects ({ id, name, ... })
 *  - selectedParkId: id of the currently selected park
 *  - onSelectPark: (id) => void, called when a list row is clicked
 */
export default function Sidebar({ parks, selectedParkId, onSelectPark }) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredParks = parks.filter((park) =>
    park.name.toLowerCase().includes(query.toLowerCase())
  );

  const selectedPark = parks.find((park) => park.id === selectedParkId);

  return (
    <aside className="sidebar">
      <h1 className="sidebar__title">OllieUp!</h1>

      <div className="search-bar">
        <button
          type="button"
          className="search-bar__icon-btn"
          onClick={() => setIsListOpen((open) => !open)}
          aria-label="Toggle skatepark list"
        >
          <MenuIcon />
        </button>
        <input
          type="text"
          className="search-bar__input"
          placeholder="Find your nearest skatepark"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon />
      </div>

      <section className="park-list">
        <button
          type="button"
          className="park-list__header"
          onClick={() => setIsListOpen((open) => !open)}
          aria-expanded={isListOpen}
        >
          <span>Skateparks</span>
          <ChevronIcon open={isListOpen} />
        </button>

        {isListOpen && (
          <ul className="park-list__items">
            {filteredParks.map((park) => (
              <li key={park.id}>
                <button
                  type="button"
                  className={
                    "park-list__item" +
                    (park.id === selectedParkId ? " park-list__item--selected" : "")
                  }
                  onClick={() => onSelectPark(park.id)}
                >
                  {park.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Detail panel — intentionally unstyled for now */}
      {selectedPark && (
        <section className="detail-panel">
          <div className="detail-panel__header">{selectedPark.name}/{selectedPark.nameJa}</div>
          <div className="detail-panel__body">
            <ul>
              <li>{selectedPark.address}</li>
              <li>{selectedPark.surfaceType}</li>
              <li>{selectedPark.features}</li>
              <li>{selectedPark.rampSizes}</li>
              <li>{selectedPark.indoorOutdoor}</li>
              <li>{selectedPark.airConditioning}</li>
              <li>{selectedPark.pricing.type}</li>
              <li>{selectedPark.pricing.notes}</li>
              <li>{selectedPark.lessonsAvailable}</li>
              <li>{selectedPark.website}</li>
              <li>{selectedPark.sourceNotes}</li>
              <li>{selectedPark.verified}</li>
            </ul>
          </div>
        </section>
      )}
    </aside>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        transform: open ? "rotate(0deg)" : "rotate(-90deg)",
        transition: "transform 150ms ease",
      }}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
