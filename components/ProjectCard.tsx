
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-[#0f1420] p-6 rounded-lg border border-gray-800 hover:border-[#ff4e42]/40 transition-all duration-300 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40">
      <h3 className="text-lg font-bold text-white tracking-wide">{project.title}</h3>
      <p className="mt-3 text-gray-400 text-sm leading-relaxed flex-grow">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span key={index} className="px-2.5 py-1 bg-gray-800 text-gray-300 text-[10px] uppercase font-bold tracking-wider rounded-sm border border-gray-700">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
