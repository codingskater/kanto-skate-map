import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

// Teal pin icon matching the Figma marker style
const pinIcon = new L.DivIcon({
  className: "park-pin",
  html: `
    <svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 0C7.6 0 0 7.6 0 17c0 12 17 27 17 27s17-15 17-27C34 7.6 26.4 0 17 0z"
        fill="#00a896"
        stroke="#00676b"
        stroke-width="1.5"
      />
      <circle cx="17" cy="17" r="7" fill="#ffffff" />
    </svg>
  `,
  iconSize: [34, 44],
  iconAnchor: [17, 44],
  popupAnchor: [0, -40],
});

const selectedPinIcon = new L.DivIcon({
  className: "park-pin park-pin--selected",
  html: `
    <svg width="40" height="52" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 0C7.6 0 0 7.6 0 17c0 12 17 27 17 27s17-15 17-27C34 7.6 26.4 0 17 0z"
        fill="#00a896"
        stroke="#6b2fa0"
        stroke-width="2"
      />
      <circle cx="17" cy="17" r="7" fill="#ffffff" />
    </svg>
  `,
  iconSize: [40, 52],
  iconAnchor: [20, 52],
  popupAnchor: [0, -46],
});

const SELECTED_ZOOM = 17;

// Recenters the map when the selected park changes
function FlyToSelected({ park }) {
  const map = useMap();
  useEffect(() => {
    if (park) {
      map.flyTo([park.lat, park.lng], 
      Math.max(map.getZoom(), SELECTED_ZOOM),
      { duration: 0.8 });
    }
  }, [park, map]);
  return null;
}

/**
 * MapView
 *
 * Props:
 *  - parks: array of park objects ({ id, name, lat, lng, ... })
 *  - selectedParkId: id of the currently selected park
 *  - onSelectPark: (id) => void, called when a marker is clicked
 */
export default function MapView({ parks, selectedParkId, onSelectPark }) {
  const center = parks.length
    ? [parks[0].lat, parks[0].lng]
    : [35.6762, 139.6503]; // fallback: Tokyo

  const selectedPark = parks.find((park) => park.id === selectedParkId);

  return (
    <div className="map-view">
      <MapContainer center={center} zoom={11} className="map-view__container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {parks.map((park) => (
          <Marker
            key={park.id}
            position={[park.lat, park.lng]}
            icon={park.id === selectedParkId ? selectedPinIcon : pinIcon}
            eventHandlers={{
              click: () => onSelectPark(park.id),
            }}
          />
        ))}
        <FlyToSelected park={selectedPark} />
      </MapContainer>
    </div>
  );
}
