import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const  DisplayGithubInfo = () => {
    const {owner,repo} = useParams();
    const [repoInfo, setRepoInfo] = useState(null);
    const [numberOfCommits, setNumberOfCommits] = useState(0);
  
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch repository information
                const repoInfoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
                const repoInfoData = repoInfoResponse.data;
                setRepoInfo(repoInfoData);

                // Fetch number of commits by the owner
                const commitsResponse = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
                    params: {
                        author: owner
                    }
                });
                const numberOfCommitsData = commitsResponse.data.length;
                setNumberOfCommits(numberOfCommitsData);
            } catch (error) {
                console.error('Error:', error.response.data.message);
            }
        }

        fetchData();
    }, [owner, repo]);

    return (
        <div>
            {repoInfo && (
                <div>
                    <h2>Repository Name: {repoInfo.name}</h2>
                    <p>Description: {repoInfo.description}</p>
                    <p>Language: {repoInfo.language}</p>
                    <p>Stars: {repoInfo.stargazers_count}</p>
                    <p>Forks: {repoInfo.forks_count}</p>
                    <p>Watchers: {repoInfo.watchers_count}</p>
                    <p>URL: <a href={repoInfo.html_url}>{repoInfo.html_url}</a></p>
                    <p>Number of Commits by Owner: {numberOfCommits}</p>
                </div>
            )}
        </div>
    );
}

