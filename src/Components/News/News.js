import React, { useEffect, useState } from "react";
import axios from "axios";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://api.marketaux.com/v1/news/all",
          {
            params: {
              symbols: "TSLA,AMZN,MSFT",
              filter_entities: true,
              language: "en",
              api_token: "tgmtUEnZ5bhoP66o2kuMzRVrHeZXGR4PpUo8Dcnx",
            },
          }
        );
        setNews(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h3 style={{textAlign:'center', marginTop: "50px"}}>Financial News Affecting Analysis</h3>
      <div className="news-container">
        {news.map((item) => (
          <div key={item.uuid} className="news-card">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
