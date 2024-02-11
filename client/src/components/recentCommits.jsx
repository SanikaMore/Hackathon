import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function GitHubCommits() {
  const [commits, setCommits] = useState([]);
  const {owner,repo} = useParams();
  const token = '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';

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
          headers: {
            Authorization: `token ${token}`
          }
        });
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, [owner, repo, token]);

  return (
    <div>
      <h2>Commits from {owner}/{repo}</h2>
      <ul>
        {commits.map(commit => (
          <li key={commit.sha}>
            <strong>{commit.commit.author.name}</strong>: {commit.commit.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubCommits;