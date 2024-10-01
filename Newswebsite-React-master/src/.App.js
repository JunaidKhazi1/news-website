import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NewsAPI endpoint and API key
  const API_KEY = "your_newsapi_key_here";
  const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching news: {error.message}</h2>;
  }

  return (
    <div className="app">
      <h1>Top Headlines</h1>
      <div className="news-container">
        {articles.map((article, index) => (
          <div key={index} className="news-item">
            <h2>{article.title}</h2>
            <img src={article.urlToImage} alt={article.title} className="news-image"/>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
