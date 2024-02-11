import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ForkUser = () =>{
   const { owner, repo } = useParams();
//const [owner,repo] = ['krishnan472003','to-do-list']
  const handleClick = async() => {
    try {
      const response = await axios.post(`https://api.github.com/repos/${owner}/${repo}/forks`, null, {
        headers: {
          Authorization: `token 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`, // Replace YOUR_GITHUB_ACCESS_TOKEN with your actual token
        },
      });
      console.log('Repository forked successfully:', response.data.html_url);
      // Optionally, you can perform additional actions after forking the repository
    } catch (error) {
      console.error('Error forking repository:', error.response.data.message);
    }
  }
    return (
      <Button  color="primary" style={{ backgroundColor: '#2196f3', color: 'white',height:"3rem"}} onClick={handleClick}>
        Fork Repository
      </Button>
    );
}

