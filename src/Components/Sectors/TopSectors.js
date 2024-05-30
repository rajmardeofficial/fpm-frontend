import React from "react";
import SectorPerformanceChart from "./SectorPerformanceChart";
import "./TopSectors.css";

function TopSectors() {
  return (
    <div className="topsectors">
      <h4>Top Performing Sectors</h4>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <SectorPerformanceChart />
        <div style={{ marginLeft: "50px" }}>
          <h5>Top Performing Sectors Table</h5>

          <table className="table table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">Ranking</th>
                <th scope="col">Sector</th>
                <th scope="col">Performance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Technology</td>
                <td>2400</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Finance</td>
                <td>2210</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Healthcare</td>
                <td>2290</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Energy</td>
                <td>2000</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Consumer</td>
                <td>2181</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TopSectors;
