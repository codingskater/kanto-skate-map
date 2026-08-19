import { useState } from "react";
import MapView from "./components/MapView";
import parks from "./data/parks.json";
import "./App.css";

function App() {
  const [selectedParkId, setSelectedParkId] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Kanto Skatepark Map</h1>
        <p>{parks.length} parks logged so far</p>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <ul className="park-list">
            {parks.map((park) => (
              <li
                key={park.id}
                className={park.id === selectedParkId ? "active" : ""}
                onClick={() => setSelectedParkId(park.id)}
              >
                <strong>{park.name}</strong>
                <span className="meta">
                  {park.indoorOutdoor} · {park.pricing?.type}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="map-container">
          <MapView
            parks={parks}
            selectedParkId={selectedParkId}
            onSelectPark={setSelectedParkId}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
