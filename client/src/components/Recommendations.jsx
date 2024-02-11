// Recommendations.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation;


const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState({});
  const [githubRepos, setGithubRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTagColor = (easeOfProject) => {
    switch (easeOfProject) {
      case 1:
      case 2:
        return 'green';
      case 3:
      case 4:
        return 'yellow';
      case 5:
        return 'red';
      default:
        return 'gray'; // default color for unknown values
    }
  };
  
  const getTagLabel = (easeOfProject) => {
    switch (easeOfProject) {
      case 1:
      case 2:
        return 'Beginner';
      case 3:
      case 4:
        return 'Medium';
      case 5:
        return 'Advanced';
      default:
        return 'Unknown';
    }
  };


  useEffect(() => {
    axios.get('http://localhost:5000/post/getGithub')
      .then(response => {
        setGithubRepos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (userId === undefined) {
          console.error('User ID is undefined.');
          return;
        }

        const response = await axios.get(`http://127.0.0.1:5000/api/recommendations/${userId}`);
        console.log('API Response:', response.data);

        // Sorting the recommendations by score in descending order
        const sortedRecommendations = Object.entries(response.data).sort((a, b) => b[1] - a[1]);

        // Taking only the top 5 recommendations
        const top5Recommendations = sortedRecommendations.slice(0, 5);

        // Creating an object from the top 5 recommendations
        const top5RecommendationsObj = Object.fromEntries(top5Recommendations);

        setRecommendations(top5RecommendationsObj);
        filterReposByRecommendations(top5RecommendationsObj);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  const filterReposByRecommendations = (recommendations) => {
    const recommendedTechs = Object.keys(recommendations);
    console.log(recommendedTechs)

    // Filter repositories based on recommended techs
    const filteredRepos = githubRepos.filter(repo =>
      repo.languageUsed.some(language => recommendedTechs.includes(language))
    );
    console.log(filteredRepos)
    setFilteredRepos(filteredRepos);
  };

  return (
    <div>
      <h2>Top 5 Recommendations for You</h2>
      <ul>
        {Object.entries(recommendations).map(([tech, score]) => (
          <li key={tech}>{tech}: {score}</li>
        ))}
      </ul>

      {/* Display filtered repository cards */}
      <div className="github-repo-cards">


        {filteredRepos.map(repo => (
          <div className="github-repo-card" key={repo._id}>
            <div>
              <h3>{repo.owner}</h3>
              <img className="coin_img" src='/coin.png' alt="Coin Image" />
              
              <p>{repo.repo_name}</p>
              <p>Ease of Project: {repo.easeOfProject}</p>
              <div className="tag" style={{ backgroundColor: getTagColor(repo.easeOfProject) }}>
                {getTagLabel(repo.easeOfProject)}
              </div>
              <div className="language-buttons">
                {repo.languageUsed.map((language, index) => (
                  <button className="language-button" key={index}>
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Prop validation using PropTypes
Recommendations.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Recommendations;
