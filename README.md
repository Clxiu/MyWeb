# Lingxiu's Personal Website
Welcome to my personal website, which is built with React, Bootstrap, and Three.js. 

## Features
- Fully interactive 3D room environment
- Weather-based animations: clear, rain, drizzle, wind, mist, cloud, snow and thunderstorm
- Real-time weather updates via OpenWeather API
- Intro Mario game on load screen
- Dark mode

## Tech Stack
- React
- Three.js
- Bootstrap
- CSS
- OpenWeatherMap API

## Project Structure
public/
├── assets/
├── models/    # 3D models
├── resources/     # text used

src/
├── components/
│   ├── home/
│   │    ├── about/
│   │    ├── assets/
│   │    ├── coverGame/
│   │    ├── header/
│   │    ├── homes/
│   │    ├── room/    # 3D scene and weather effects
│   │    └── Branding.jsx
│   └── pageContent/
│        └── HomePages.jsx
├── App.jsx
├── App.css
└── index.js
