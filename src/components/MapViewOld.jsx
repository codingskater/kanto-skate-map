import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet's default marker icons reference image paths that don't resolve
// correctly when bundled by Vite. This re-points them at the CDN copies.
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Roughly centers the Kanto region (Tokyo Bay area)
const KANTO_CENTER = [35.68, 139.75];
const DEFAULT_ZOOM = 10;
const FOCUS_ZOOM = 15;

const FLY_DURATION_SECONDS = 0.8;

// Must live inside <MapContainer> — useMap() reads the map instance from
// context, which only exists below that provider.
//
// This component owns both the "fly to the marker" AND "open its popup"
// steps, and sequences them deliberately: opening the popup before the fly
// animation finishes makes Leaflet calculate the popup's position against
// the map's pre-animation state, which leaves it mispositioned (often
// clipped near the top edge) once the animation catches up.
function FlyToSelectedPark({ parks, selectedParkId, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedParkId) return;

    const park = parks.find((p) => p.id === selectedParkId);
    const marker = markerRefs.current[selectedParkId];
    if (!park || !marker) return;

    map.flyTo([park.lat, park.lng], FOCUS_ZOOM, {
      duration: FLY_DURATION_SECONDS,
    });

    // 'moveend' fires once the flyTo animation actually finishes. Using it
    // (rather than opening immediately) means autoPan runs against the
    // map's final position, not a stale one.
    const handleMoveEnd = () => marker.openPopup();
    map.once("moveend", handleMoveEnd);

    // Safety net: if the map was already centered on this marker, flyTo
    // may not move it at all, so 'moveend' would never fire.
    const fallback = setTimeout(
      () => marker.openPopup(),
      FLY_DURATION_SECONDS * 1000 + 100
    );

    return () => {
      map.off("moveend", handleMoveEnd);
      clearTimeout(fallback);
    };
  }, [selectedParkId, parks, map, markerRefs]);

  return null; // this component only causes a side effect, renders nothing
}

function ParkPopup({ park }) {
  return (
    <div className="park-popup">
      <strong>{park.name}</strong>
      <br />
      {park.address}

      <dl>
        <dt>Indoor/Outdoor</dt>
        <dd>{park.indoorOutdoor ?? "unknown"}</dd>

        <dt>Surface</dt>
        <dd>{park.surfaceType ?? "unknown"}</dd>

        <dt>Air conditioning</dt>
        <dd>
          {park.airConditioning === true
            ? "yes"
            : park.airConditioning === false
            ? "no"
            : "unknown"}
        </dd>

        <dt>Pricing</dt>
        <dd>
          {park.pricing?.type ?? "unknown"}
          {park.pricing?.notes ? ` — ${park.pricing.notes}` : ""}
        </dd>

        <dt>Lessons</dt>
        <dd>{park.lessonsAvailable ? "available" : "not listed"}</dd>

        {park.features?.length > 0 && (
          <>
            <dt>Features</dt>
            <dd>{park.features.join(", ")}</dd>
          </>
        )}

        {park.rampSizes && (
          <>
            <dt>Ramp sizes</dt>
            <dd>{park.rampSizes}</dd>
          </>
        )}
      </dl>

      {park.website && (
        <a href={park.website} target="_blank" rel="noreferrer">
          Website
        </a>
      )}

      {park.verified === false && (
        <p className="unverified-note">
          ⚠ Details unverified — double check against the official source.
        </p>
      )}
    </div>
  );
}

function MapView({ parks, selectedParkId, onSelectPark }) {
  // Track marker instances by park id so FlyToSelectedPark can call
  // .openPopup() on the right marker once its fly animation finishes.
  const markerRefs = useRef({});

  return (
    <MapContainer
      center={KANTO_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parks.map((park) => (
        <Marker
          key={park.id}
          position={[park.lat, park.lng]}
          ref={(instance) => {
            if (instance) markerRefs.current[park.id] = instance;
          }}
          eventHandlers={{
            click: () => onSelectPark?.(park.id),
          }}
        >
          <Popup autoPanPadding={[30, 30]}>
            <ParkPopup park={park} />
          </Popup>
        </Marker>
      ))}
      <FlyToSelectedPark
        parks={parks}
        selectedParkId={selectedParkId}
        markerRefs={markerRefs}
      />
    </MapContainer>
  );
}

export default MapView;
