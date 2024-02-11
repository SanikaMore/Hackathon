// Roadmap.js
import React from 'react';

const Roadmap = () => {
  const roadmapItems = [
    {
      text: 'Learn the basics of HTML syntax and structure.',
      link: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
    },
    {
      text: 'Explore HTML tags and their uses (headings, paragraphs, lists, etc.).',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
    },
    {
      text: 'Understand the importance of semantic HTML for accessibility.',
      link: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
    },
    {
      text: 'Learn about HTML forms and their elements.',
      link: 'https://developer.mozilla.org/en-US/docs/Learn/Forms',
    },
    {
      text: 'Explore HTML multimedia elements (images, audio, video).',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Multimedia_and_embedding',
    },
    {
      text: 'Understand HTML5 features and APIs.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5',
    },
    {
      text: 'Get hands-on experience by working on small HTML projects.',
      link: 'https://github.com/topics/html',
    },
    {
      text: 'Contribute to open source projects that involve HTML/CSS.',
      link: 'https://github.com/explore?utf8=%E2%9C%93&q=html+css&type=',
    },
    {
      text: 'Explore modern front-end frameworks and libraries (e.g., React, Vue).',
      link: 'https://github.com/trending/html',
    },
    {
      text: 'Stay updated on HTML and web development best practices.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
    },
  ];

  return (
    <div>
      <h1>HTML Exploration Roadmap</h1>
      <p>
        Whether you are a beginner or an experienced developer, here's a roadmap to help you explore HTML in open source:
      </p>
      <ul>
        {roadmapItems.map(({ text, link }, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              {text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Roadmap;
