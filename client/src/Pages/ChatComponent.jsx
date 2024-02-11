import React, { useState } from 'react';
import axios from 'axios';

const ChatComponent = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    const apiUrl = 'http://127.0.0.1:5000';  // Modify this to your Flask API endpoint
    const requestBody = { message: input };

    try {
      const result = await axios.post(apiUrl, requestBody);
      setResponse(result.data.message);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  return (
    <div>
      <div>Chatbot Response: {response}</div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;
