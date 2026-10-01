# Kanto Skatepark Map

React + Vite + Leaflet app that plots skateparks across the Kanto region on an interactive map.

## Requirements

- Node.js 18 or newer
- npm
- Internet access in the browser for OpenStreetMap tiles and Leaflet marker images

## Getting started

Run these commands from the project root:

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Available commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build in dist/
npm run preview   # Serve the production build locally
npm run lint      # Run Oxlint
```

To check the production build locally:

```bash
npm run build
npm run preview
```

Open the preview URL Vite prints, usually http://localhost:4173.

If `npm run lint` reports that an Oxlint native binding is missing, reinstall the
dependencies so npm can restore optional platform packages:

```bash
rm -rf node_modules package-lock.json
npm install
npm run lint
```

## Project structure

- `src/parks.json` — the park dataset used by the app. Each entry follows this shape:
  ```
  {
    id, name, nameJa, lat, lng, address, surfaceType,
    features: [...], rampSizes, indoorOutdoor, airConditioning,
    pricing: { type, notes }, lessonsAvailable, website,
    sourceNotes, verified
  }
  ```
  `verified: false` means the entry was drafted from secondary sources and needs a manual check against the park's official page before you trust it.
- `src/MapView.jsx` — the Leaflet map + markers.
- `src/App.jsx` — layout: sidebar list + map, wired together by `selectedParkId`.

The map uses OpenStreetMap tiles, so map tiles and the default Leaflet marker images
will not load without a network connection. The map attribution must remain visible.

## Next steps

- Verify/fill in the `null` fields (ramp sizes, some pricing/hours) against official sources.
- Add more parks (Kanagawa, Saitama, Chiba, Ibaraki, Tochigi, Gunma)
- Add filter/search UI (indoor vs outdoor, free vs paid, nearest park to station, etc.)
- View pages for each park
- Consider an AI Agent to make recommendations

# Other notes
- This application is part of a larger idea to consolidate all skatepark information in Japan and also build up the community of skateboarders.
