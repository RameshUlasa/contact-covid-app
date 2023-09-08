import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customMarker = L.icon({
  iconUrl: "https://img.icons8.com/office/2x/marker.png",
  iconSize: [29, 25],
  iconAnchor: [15, 30],
});

const Map = ({ updateWorldData }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [worldData, setWorldData] = useState(null);

  useEffect(() => {
    // Fetch worldwide data
    axios.get("https://disease.sh/v3/covid-19/all").then((response) => {
      setWorldData(response.data);
      updateWorldData(response.data);
    });

    // Fetch country-specific data
    axios.get("https://disease.sh/v3/covid-19/countries").then((response) => {
      setCountriesData(response.data);
    });
  }, []);
  console.log(countriesData);
  return (
    <div className="covid-map">
      <MapContainer
        bounds={[
          [-60, -180],
          [85, 180],
        ]}
        zoom={2}
        center={[20, 40]}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        />

        {countriesData.map((country) => (
          <Marker
            icon={customMarker}
            key={country.country}
            position={[country.countryInfo.lat, country.countryInfo.long]}
          >
            <Popup>
              <div className="popup">
                <h2>{country.country}</h2>
                {/* <img
                  className="country"
                  src={country.countryInfo.flag}
                  alt={country.country}
                /> */}
                <p>Total Cases: {country.cases}</p>
                <p>Active Cases: {country.active}</p>
                <p>Recovered: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {/* {worldData && (
        <div className="world-data">
          <h2>Worldwide COVID-19 Data</h2>
          <p>Total Cases: {worldData.cases}</p>
          <p>Active Cases: {worldData.active}</p>
          <p>Recovered: {worldData.recovered}</p>
          <p>Deaths: {worldData.deaths}</p>
        </div>
      )} */}
    </div>
  );
};

export default Map;
