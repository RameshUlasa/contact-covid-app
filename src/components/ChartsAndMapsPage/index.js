import React, { useState } from "react";
import Map from "../Map";
import LineGraph from "../LineGraph";

import NavBar from "../NavBar";

import "./index.css";

const ChartsAndMaps = () => {
  const [parentWorldData, setParentWorldData] = useState(null);

  // Define a function to set the world data in the parent component
  const updateWorldData = (data) => {
    setParentWorldData(data);
  };
  return (
    <div className="contact-pg-main-container">
      <NavBar />
      <div className="contacts-container">
        <div className="c-m-container">
          <h2 className="pg-main-head covid-head">COVID-19 Tracker</h2>
          <div className="c-m-content-container">
            <h3 className="chart-title">Worldwide Corona Cases</h3>
            <LineGraph />
          </div>
          <div className="world-data-container">
            {parentWorldData && (
              <div className="world-data">
                <h2 className="pg-main-head covid-head">
                  Worldwide COVID-19 Stacks
                </h2>
                <div className="stacks">
                  <div className="stack">
                    <p className="stack-name">Total Cases</p>
                    <p className="stack-value">{parentWorldData.cases}</p>
                  </div>
                  <div className="stack">
                    <p className="stack-name">Active Cases</p>
                    <p className="stack-value v-2">{parentWorldData.active}</p>
                  </div>
                  <div className="stack">
                    <p className="stack-name">Recovered</p>
                    <p className="stack-value v-3">
                      {parentWorldData.recovered}
                    </p>
                  </div>
                  <div className="stack">
                    <p className="stack-name">Deaths</p>
                    <p className="stack-value v-4">{parentWorldData.deaths}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="deaths-rec-act-container">
            <Map updateWorldData={updateWorldData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChartsAndMaps;
