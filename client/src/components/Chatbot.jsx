import React, { useState } from 'react';
import styled from 'styled-components'; // Don't forget to import styled
import '../style/Chatbot.css'; // Make sure to use the correct file extension (.css)

const ChatBoxWrapper = styled.div`
  display: ${props => props.isChatOpen ? 'block' : 'none'};
  background: #efefef;
  position: fixed;
  margin-top:150px;
  right: 30px; c
  bottom: 50px;  
  width: 350px;
  max-width: 100vw;
  max-height: 500vh;
  border-radius: 5px;  
  box-shadow: 0px 5px 35px 9px #ccc;
`;


const intents = {
  greeting: {
    patterns: ["Hi", "Hey", "How are you", "Hello", "Good day"],
    responses: ["Hey :-)", "Hello, thanks for visiting", "Hi there, what can I do for you?", "Hi there, how can I help?"]
  },
  goodbye: {
    patterns: ["Bye", "See you later", "Goodbye"],
    responses: ["See you later, thanks for visiting", "Have a nice day", "Bye! Come back again soon."]
  },
  thanks: {
    patterns: ["Thanks", "Thank you", "That's helpful", "Thank's a lot!"],
    responses: ["Happy to help!", "Any time!", "My pleasure"]
  },
  openSourceExplanation: {
    patterns: ["What is open source?", "Explain open source", "Define open source"],
    responses: ["Open source refers to a type of software where the source code is freely available to the public. It allows anyone to view, modify, and distribute the code.", "Open source software is developed collaboratively by a community, and its code is accessible for anyone to use and contribute to."]
  },
  popularTechStacks: {
    patterns: ["What are popular tech stacks?", "Suggest tech stacks for projects", "Top tech stacks"],
    responses: ["Some popular tech stacks include MERN (MongoDB, Express.js, React, Node.js), MEAN (MongoDB, Express.js, Angular, Node.js), Django (Python, Django), and Flask (Python, Flask). It depends on your project requirements and preferences."]
  },
  favoriteProgrammingLanguage: {
    patterns: ["What's your favorite programming language?", "Best programming language", "Recommend a programming language"],
    responses: ["I don't have personal preferences, but popular programming languages include JavaScript, Python, Java, and C#. The best language depends on your project goals and requirements."]
  },
  versionControlSystems: {
    patterns: ["Tell me about version control systems", "Which version control system to use?", "Git or SVN"],
    responses: ["Version control systems like Git and SVN help manage changes in code, track versions, and enable collaboration among developers. Git is widely used for its distributed nature and flexibility."]
  },
  webFrameworks: {
    patterns: ["Recommend web frameworks", "Best web framework", "Frontend and backend frameworks"],
    responses: ["For frontend, popular frameworks include React, Angular, and Vue.js. Backend frameworks like Express.js, Django, and Flask are commonly used. Choose based on your project requirements and familiarity."]
  },
  cloudServices: {
    patterns: ["What are popular cloud services?", "Cloud platforms for hosting", "AWS vs. Azure"],
    responses: ["AWS, Azure, and Google Cloud are popular cloud services. Choose based on your specific needs. AWS is known for its extensive services, while Azure is integrated well with Microsoft technologies."]
  },
  favoriteIDE: {
    patterns: ["What's your favorite Integrated Development Environment (IDE)?", "Best IDE for coding", "IDE recommendations"],
    responses: ["Popular IDEs include Visual Studio Code, IntelliJ IDEA, and Atom. The best one depends on your coding preferences and the programming languages you work with."]
  },
  mobileAppDevelopment: {
    patterns: ["How to start with mobile app development?", "Best tools for mobile app development", "iOS vs. Android development"],
    responses: ["For mobile app development, consider using frameworks like React Native, Flutter, or native development with Swift for iOS and Kotlin for Android. Choose based on your project requirements and target audience."]
  },
  emergingTechnologies: {
    patterns: ["What are the emerging technologies?", "Latest trends in technology", "Upcoming technologies"],
    responses: ["Emerging technologies include Artificial Intelligence (AI), Machine Learning (ML), Blockchain, and Internet of Things (IoT). Stay updated on the latest trends to incorporate them into your projects."]
  },
  codingBestPractices: {
    patterns: ["Share coding best practices", "Coding standards", "How to write clean code"],
    responses: ["Follow practices like DRY (Don't Repeat Yourself), SOLID principles, and write self-documenting code. Use meaningful variable and function names, and adhere to the coding style of your team or community."]
  },
  contributionToOpenSource: {
    patterns: ["How to contribute to open source?", "Getting started with open source projects", "Open source collaboration"],
    responses: ["To contribute, start by finding projects on platforms like GitHub, understand their guidelines, and submit pull requests. Engage with the community and contribute meaningfully to improve the project."]
  },
  continuousIntegration: {
    patterns: ["Explain continuous integration", "CI/CD pipelines", "Best practices in continuous integration"],
    responses: ["Continuous Integration (CI) automates the process of code integration, testing, and deployment. Tools like Jenkins, Travis CI, and GitHub Actions help maintain code quality and streamline development workflows."]
  },
  cybersecurity: {
    patterns: ["How to ensure cybersecurity in projects?", "Best practices for secure coding", "Cybersecurity tips"],
    responses: ["Ensure secure coding practices, conduct regular security audits, use encryption, and stay updated on security vulnerabilities. Implementing firewalls and keeping software and libraries up to date is crucial."]
  },
  databaseOptions: {
    patterns: ["Which database to choose for projects?", "SQL vs. NoSQL", "Database recommendations"],
    responses: ["For relational databases, consider MySQL or PostgreSQL. MongoDB is a popular NoSQL option. Choose based on your data structure and scalability needs."]
  },
  devOpsPractices: {
    patterns: ["Explain DevOps", "DevOps tools and practices", "How to implement DevOps"],
    responses: ["DevOps integrates development and operations to enhance collaboration and productivity. Tools like Docker, Kubernetes, and Ansible automate processes, ensuring a seamless development-to-deployment pipeline."]
  },
  techCommunityInvolvement: {
    patterns: ["How to get involved in the tech community?", "Tech community events", "Networking in tech"],
    responses: ["Attend tech meetups, conferences, and contribute to forums like Stack Overflow. Engage with the community on social media platforms, and join open source projects to collaborate with like-minded individuals."]
  },
  remoteCollaborationTools: {
    patterns: ["Best tools for remote collaboration", "Remote team collaboration", "Virtual collaboration tools"],
    responses: ["Tools like Slack, Microsoft Teams, and Zoom facilitate remote collaboration. Use project management tools like Jira or Trello to keep tasks organized. Effective communication is key for remote teams."]
  },
  codingInterviewTips: {
    patterns: ["Tips for coding interviews", "Preparing for technical interviews", "Coding interview strategies"],
    responses: ["Practice coding problems on platforms like LeetCode and HackerRank. Understand data structures and algorithms, and practice problem-solving. Mock interviews with peers can also be beneficial."]
  },
  techDocumentation: {
    patterns: ["Importance of technical documentation", "How to write effective documentation", "Documentation tools"],
    responses: ["Documentation is crucial for understanding code. Use tools like Swagger for APIs and platforms like Read the Docs for general documentation. Write clear, concise, and updated documentation for your projects."]
  },
  learningNewTech: {
    patterns: ["How to learn a new technology?", "Learning new programming languages", "Staying updated with technology"],
    responses: ["Start with official documentation, online courses, and tutorials. Practice through projects and engage in the community. Follow blogs, podcasts, and newsletters to stay updated on the latest advancements."]
  },
  codingProductivityTips: {
    patterns: ["Tips for improving coding productivity", "Coding efficiency hacks", "Time management for developers"],
    responses: ["Use keyboard shortcuts, break tasks into smaller chunks, and take regular breaks to avoid burnout. Experiment with different time management techniques to find what works best for you."]
  },
  techJobSearch: {
    patterns: ["Job search in the tech industry", "Tech job application tips", "Interview preparation for tech jobs"],
    responses: ["Build a strong portfolio, tailor your resume to showcase relevant skills, and practice common interview questions. Leverage networking opportunities and platforms like LinkedIn for job searches."]
  },
  balancingWorkLife: {
    patterns: ["Balancing work and personal life in tech", "Avoiding burnout in tech", "Maintaining work-life balance"],
    responses: ["Set realistic goals, prioritize tasks, and establish boundaries. Take breaks, engage in hobbies, and practice self-care. Maintaining a healthy work-life balance is essential for long-term success."]
  },
  // Add more intents as needed
};




const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const msg = inputText.trim();

    if (msg !== '') {
      generateMessage(msg, 'user');
      processInput(msg);
      setInputText('');
    }
  };

    const processInput = (msg) => {
    let response = '';

    for (const intent in intents) {
      for (let i = 0; i < intents[intent].patterns.length; i++) {
        const pattern = new RegExp(intents[intent].patterns[i], 'i');
        if (pattern.test(msg)) {
          response = intents[intent].responses[Math.floor(Math.random() * intents[intent].responses.length)];
          break;
        }
      }
      if (response !== '') {
        break;
      }
    }

    if (response === '') {
      response = "I'm sorry, I don't understand.";
    }

    generateMessage(response, 'self');
  };
  const generateMessage = (msg, type) => {
    setMessages((prevMessages) => [...prevMessages, { text: msg, type }]);
  };

  const toggleChat = () => {
    console.log('Toggling chat');
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div id="body">
      <div id="body">
        <div
          id="chat-circle"
          className={`btn btn-raised ${isChatOpen ? 'chat-open' : ''}`}
          onClick={toggleChat}
        >
          <i className='text'>Ask a mentor</i>
        </div>
        <ChatBoxWrapper isChatOpen={isChatOpen}>
          <div className="chat-logs">
            {messages.map((message, index) => (
              <div key={index} className={`chat-msg ${message.type}`}>
                <div className="cm-msg-text">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <form onSubmit={handleChatSubmit}>
              <input
                type="text"
                id="chat-input"
                placeholder="Send a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" className="chat-submit" id="chat-submit">
                <b className="material-icons">send</b>
              </button>
            </form>
          </div>
        </ChatBoxWrapper>
      </div>
      </div>
  );
};

export default Chatbot;
