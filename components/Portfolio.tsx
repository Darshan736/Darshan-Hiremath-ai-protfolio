import React, { useState } from 'react';
import { Project } from '../types';
import ProjectCard from './ProjectCard';
import { GithubIcon, LinkedinIcon, MailIcon, RobotIcon, CpuIcon, RocketIcon } from './Icons';

const projects: Project[] = [
  {
    title: 'Autonomous AI Agents',
    description: 'Developed a series of AI agents using n8n and language models to automate research, data collection, and content summarization tasks.',
    tags: ['AI', 'n8n', 'LLMs', 'Automation'],
  },
  {
    title: 'Robotics Integration Study',
    description: 'Ongoing research and simulation project focusing on integrating modern AI models with robotic arms for dynamic task execution and learning.',
    tags: ['Robotics', 'AI Integration', 'Simulation'],
  },
  {
    title: 'Workflow Automation Suite',
    description: 'Built a collection of n8n workflows to automate repetitive personal and academic tasks, saving hours of manual work weekly.',
    tags: ['Automation', 'n8n', 'Productivity'],
  },
];

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#ff4e42] uppercase tracking-wider">About Me</h2>
            <p className="mt-4 text-gray-300 leading-relaxed">
              I am a first-year Electronics and Communication Engineering (ECE) student with a deep passion for Artificial Intelligence, Automation, and Robotics. I am fascinated by the potential of AI to simplify complex problems and automate repetitive tasks to improve efficiency and quality of life.
            </p>
             <p className="mt-4 text-gray-300 leading-relaxed">
              My hands-on experience includes building AI agents and creating powerful automation workflows with n8n. I am currently expanding my knowledge in robotics and how to seamlessly integrate it with AI, aiming to build intelligent systems for the future.
            </p>
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-200">Core Interests</h3>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-md">
                  <CpuIcon className="w-5 h-5 text-[#ff4e42]" /> <span>Artificial Intelligence</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-md">
                   <RocketIcon className="w-5 h-5 text-[#ff4e42]" /> <span>Automation</span>
                </div>
                 <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-md">
                  <RobotIcon className="w-5 h-5 text-[#ff4e42]" /> <span>Robotics</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#ff4e42] uppercase tracking-wider">Projects</h2>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#ff4e42] uppercase tracking-wider">Get In Touch</h2>
             <p className="mt-4 text-gray-300 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
            </p>
            <div className="mt-6 flex flex-col space-y-4">
               <a href="https://github.com/darshanhiremath12-rgb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-base sm:text-lg text-gray-300 hover:text-[#ff4e42] transition-colors">
                <GithubIcon className="w-6 h-6 flex-shrink-0" />
                <span className="break-all">github.com/darshanhiremath12-rgb</span>
              </a>
              <a href="https://www.linkedin.com/in/darshan-hiremath-251887381" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-base sm:text-lg text-gray-300 hover:text-[#ff4e42] transition-colors">
                <LinkedinIcon className="w-6 h-6 flex-shrink-0" />
                <span className="break-all">linkedin.com/in/darshan-hiremath-251887381</span>
              </a>
              <a href="mailto:darshanhiremath848@gmail.com" className="flex items-center gap-4 text-base sm:text-lg text-gray-300 hover:text-[#ff4e42] transition-colors">
                <MailIcon className="w-6 h-6 flex-shrink-0" />
                <span className="break-all">darshanhiremath848@gmail.com</span>
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full glass-pane rounded-lg flex flex-col p-2">
      <div className="flex-shrink-0 p-2">
         <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-widest">DARSHAN</h1>
         <p className="text-sm sm:text-md text-gray-400">ECE Student // AI & Robotics Enthusiast</p>
      </div>
      <div className="flex-shrink-0 border-b border-[#ff4e42]/20 px-2">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('about')}
            className={`py-2 px-1 border-b-2 font-bold uppercase tracking-wider transition-colors ${activeTab === 'about' ? 'text-[#ff4e42] border-[#ff4e42]' : 'text-gray-400 border-transparent hover:text-white'}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-1 border-b-2 font-bold uppercase tracking-wider transition-colors ${activeTab === 'projects' ? 'text-[#ff4e42] border-[#ff4e42]' : 'text-gray-400 border-transparent hover:text-white'}`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-2 px-1 border-b-2 font-bold uppercase tracking-wider transition-colors ${activeTab === 'contact' ? 'text-[#ff4e42] border-[#ff4e42]' : 'text-gray-400 border-transparent hover:text-white'}`}
          >
            Contact
          </button>
        </nav>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Portfolio;