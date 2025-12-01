
import React, { useState } from 'react';
import { Project, Certificate } from '../types';
import ProjectCard from './ProjectCard';
import CertificateCard from './CertificateCard';
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

const certificates: Certificate[] = [
  {
    title: 'Prompt Engineering Guide',
    issuer: 'Google Cloud Skills Boost',
    date: 'Nov 1, 2025',
    description: 'Mastered the art of crafting effective prompts to guide Large Language Models (LLMs) and generate desired outputs.',
    link: 'https://www.skills.google/public_profiles/2b5e9a6d-f1fb-4ecb-abbd-8c786d9278d2/badges/19847273'
  },
  {
    title: 'Gen AI Agents',
    issuer: 'Google Cloud Skills Boost',
    date: 'Nov 1, 2025',
    description: 'Learned to build and deploy autonomous AI agents capable of reasoning and using tools to perform complex tasks.',
    link: 'https://www.skills.google/public_profiles/2b5e9a6d-f1fb-4ecb-abbd-8c786d9278d2/badges/19844741'
  },
  {
    title: 'Professional Machine Learning Engineer Study Guide',
    issuer: 'Google Cloud Skills Boost',
    date: 'Oct 19, 2025',
    description: 'Comprehensive preparation covering model architecture, data pipeline engineering, and infrastructure optimization for ML.',
    link: 'https://www.skills.google/public_profiles/2b5e9a6d-f1fb-4ecb-abbd-8c786d9278d2/badges/19302325'
  },
  {
    title: 'MLOps for Generative AI',
    issuer: 'Google Cloud Skills Boost',
    date: 'Oct 18, 2025',
    description: 'Explored operationalizing Generative AI models, including deployment, monitoring, and maintenance pipelines.',
    link: 'https://www.skills.google/public_profiles/2b5e9a6d-f1fb-4ecb-abbd-8c786d9278d2/badges/19277294'
  },
  {
    title: 'Introduction to Large Language Models',
    issuer: 'Google Cloud Skills Boost',
    date: 'Oct 18, 2025',
    description: 'Gained a foundational understanding of LLMs, their architecture, capabilities, and use cases in modern AI.',
    link: 'https://www.skills.google/public_profiles/2b5e9a6d-f1fb-4ecb-abbd-8c786d9278d2/badges/19277237'
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud Skills Boost',
    date: 'Oct 18, 2025',
    description: 'Acquired core knowledge of Generative AI principles, differentiating it from discriminative AI, and exploring real-world applications.',
    link: 'https://www.skills.google/public_profiles/2b5e9a6d-f1fb-4ecb-abbd-8c786d9278d2/badges/19275010'
  }
];

const Portfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('about');

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mb-6">About Me</h2>
            <div className="space-y-6 text-gray-200 text-base leading-loose font-light">
              <p>
                I am a first-year Electronics and Communication Engineering (ECE) student with a deep passion for Artificial Intelligence, Automation, and Robotics. I am fascinated by the potential of AI to simplify complex problems and automate repetitive tasks to improve efficiency and quality of life.
              </p>
               <p>
                My hands-on experience includes building AI agents and creating powerful automation workflows with n8n. I am currently expanding my knowledge in robotics and how to seamlessly integrate it with AI, aiming to build intelligent systems for the future.
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Core Interests</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700/50 px-4 py-2 rounded-md transition-colors hover:border-[#ff4e42]/50">
                  <CpuIcon className="w-5 h-5 text-[#ff4e42]" /> <span className="text-sm font-medium">Artificial Intelligence</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700/50 px-4 py-2 rounded-md transition-colors hover:border-[#ff4e42]/50">
                   <RocketIcon className="w-5 h-5 text-[#ff4e42]" /> <span className="text-sm font-medium">Automation</span>
                </div>
                 <div className="flex items-center gap-2 bg-gray-800/80 border border-gray-700/50 px-4 py-2 rounded-md transition-colors hover:border-[#ff4e42]/50">
                  <RobotIcon className="w-5 h-5 text-[#ff4e42]" /> <span className="text-sm font-medium">Robotics</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        );
      case 'certificates':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">Certificates & Badges</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <CertificateCard key={index} certificate={cert} />
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mb-6">Get In Touch</h2>
             <p className="text-gray-200 leading-loose mb-8 max-w-2xl">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
            </p>
            <div className="flex flex-col space-y-6">
               <a href="https://github.com/darshanhiremath12-rgb" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-base sm:text-lg text-gray-300 hover:text-white transition-colors p-4 bg-gray-800/40 rounded-lg border border-transparent hover:border-gray-600">
                <GithubIcon className="w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-[#ff4e42] transition-colors" />
                <span className="break-all font-mono">github.com/darshanhiremath12-rgb</span>
              </a>
              <a href="https://www.linkedin.com/in/darshan-hiremath-251887381" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-base sm:text-lg text-gray-300 hover:text-white transition-colors p-4 bg-gray-800/40 rounded-lg border border-transparent hover:border-gray-600">
                <LinkedinIcon className="w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-[#ff4e42] transition-colors" />
                <span className="break-all font-mono">linkedin.com/in/darshan-hiremath-251887381</span>
              </a>
              <a href="mailto:darshanhiremath848@gmail.com" className="group flex items-center gap-4 text-base sm:text-lg text-gray-300 hover:text-white transition-colors p-4 bg-gray-800/40 rounded-lg border border-transparent hover:border-gray-600">
                <MailIcon className="w-6 h-6 flex-shrink-0 text-gray-400 group-hover:text-[#ff4e42] transition-colors" />
                <span className="break-all font-mono">darshanhiremath848@gmail.com</span>
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full glass-pane rounded-xl flex flex-col p-2 overflow-hidden">
      <div className="flex-shrink-0 p-4 pb-2">
         <h1 className="font-display text-lg sm:text-2xl md:text-3xl font-black text-white uppercase tracking-wide sm:tracking-widest break-words leading-tight">DARSHAN.B.HIREMATH</h1>
         <p className="text-sm font-bold text-[#ff4e42] tracking-wider mt-1">ECE Student // AI & Robotics Enthusiast</p>
      </div>
      <div className="flex-shrink-0 border-b border-gray-800 px-4">
        <nav className="flex space-x-6 overflow-x-auto no-scrollbar">
          {['about', 'projects', 'certificates', 'contact'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-bold text-sm uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                  ? 'text-white border-[#ff4e42]' 
                  : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Portfolio;
