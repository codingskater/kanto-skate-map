import { useState } from "react";
import Sidebar from "./Sidebar";
import MapView from "./MapView";
import parksData from "./parks.json";
import "./colors.css";
import "./App.css";

export default function App() {
  const [parks] = useState(parksData);
  const [selectedParkId, setSelectedParkId] = useState(null);

  return (
    <div className="app-shell">
      <Sidebar
        parks={parks}
        selectedParkId={selectedParkId}
        onSelectPark={setSelectedParkId}
      />
      <MapView
        parks={parks}
        selectedParkId={selectedParkId}
        onSelectPark={setSelectedParkId}
      />
    </div>
  );
}
