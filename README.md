# Kanto Skatepark Map

React + Vite + Leaflet app that plots skateparks across the Kanto region on an interactive map.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Project structure

- `src/data/parks.json` — the park dataset. Each entry follows this shape:
  ```
  {
    id, name, nameJa, lat, lng, address, surfaceType,
    features: [...], rampSizes, indoorOutdoor, airConditioning,
    pricing: { type, notes }, lessonsAvailable, website,
    sourceNotes, verified
  }
  ```
  `verified: false` means the entry was drafted from secondary sources and needs a manual check against the park's official page before you trust it.
- `src/components/MapView.jsx` — the Leaflet map + markers.
- `src/App.jsx` — layout: sidebar list + map, wired together by `selectedParkId`.

## Next steps

- Verify/fill in the `null` fields (ramp sizes, some pricing/hours) against official sources.
- Add more parks (Kanagawa, Saitama, Chiba, Ibaraki, Tochigi, Gunma)
- Add filter/search UI (indoor vs outdoor, free vs paid, nearest park to station, etc.)
- View pages for each park
- Consider an AI Agent to make recommendations

# Other notes
- This application is part of a larger idea to consolidate all skatepark information in Japan and also build up the community of skateboarders.
