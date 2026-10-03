import * as turf from "@turf/turf";
import stations from "../data/stations.json";

function getNearestStation(park) {
  if (!park) return null;

  const parkPoint = turf.point([park.lng, park.lat]); // lng first
  const nearest = turf.nearestPoint(parkPoint, stations);

  return {
    name: nearest.properties.name ?? "Unnamed station",
    distanceKm: nearest.properties.distanceToPoint,
  };
}

export default getNearestStation;
