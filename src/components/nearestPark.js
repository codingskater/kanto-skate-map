import * as turf from "@turf/turf";
import parks from "../data/parks.json";

function getNearestPark(station) {
  if (!station) return null;

  const stationPoint = turf.point([station.lng, station.lat]); // lng first
  const nearest = turf.nearestPoint(stationPoint, parks);

  return {
    name: nearest.properties.name ?? "Unnamed park",
    distanceKm: nearest.properties.distanceToPoint,
  };
}

export default getNearestPark;
