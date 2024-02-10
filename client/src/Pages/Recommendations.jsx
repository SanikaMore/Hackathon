// Recommendations.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (userId === undefined) {
          console.error('User ID is undefined.');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:5000/api/recommendations/${userId}`);
        console.log('API Response:', response.data);
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div>
      <h2>Recommendations for User {userId}</h2>
      <ul>
        {Object.entries(recommendations).map(([tech, score]) => (
          <li key={tech}>{tech}: {score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
