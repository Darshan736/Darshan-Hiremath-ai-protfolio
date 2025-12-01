import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-transparent hover:border-[#ff4e42]/50 transition-all duration-300 flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-100">{project.title}</h3>
      <p className="mt-2 text-gray-400 flex-grow">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-[#ff4e42]/20 text-[#ff4e42] text-xs font-bold rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;