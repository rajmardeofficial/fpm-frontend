import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Recommendation.css';
import TopSectors from '../Sectors/TopSectors';

function Recommendation() {
  const [topStocks, setTopStocks] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:9000/api/performerstocks')
      .then(response => {
        // Assuming the API returns the data in the format provided
        const data = response.data;
        // Extract the top 4 stocks
        const topFourStocks = data.slice(0, 4);
        setTopStocks(topFourStocks);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="recommendation">
      <div className="user-greeting">
        <h4>Hey Raj Marde</h4>
        <p>Here is your Command Center</p>
      </div>

      <div className="recsec" style={{ display: 'flex' }}>
        <div className="recommendation-section">
          <h4 className="recommendation-title">Recommendations</h4>

          <div className="recommendation-cards">
            <div className="recommendation-subcard">
              <h5 style={{ color: "#ffffff" }} className="card-title">Recommendation</h5>
              <p style={{ color: "#ffffff" }} className="card-subtitle">Get High Octane stock calls</p>
            </div>

            <ul>
              {topStocks.map((stock, index) => (
                <li key={index} className="recc-card-list">{stock.symbol}</li>
              ))}
            </ul>
          </div>
        </div>

        <TopSectors />
      </div>
    </div>
  );
}

export default Recommendation;
