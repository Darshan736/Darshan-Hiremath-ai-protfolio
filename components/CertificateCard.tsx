
import React from 'react';
import { Certificate } from '../types';
import { BadgeIcon } from './Icons';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-transparent hover:border-[#ff4e42]/50 transition-all duration-300 flex flex-col h-full group">
      <div className="flex items-start justify-between">
         <div className="bg-[#ff4e42]/10 p-2 rounded-full text-[#ff4e42] group-hover:bg-[#ff4e42]/20 transition-colors">
            <BadgeIcon className="w-5 h-5" />
         </div>
         <span className="text-xs text-gray-500 font-mono border border-gray-700 px-2 py-1 rounded">{certificate.date}</span>
      </div>
      <h3 className="mt-3 text-lg font-bold text-gray-100 group-hover:text-[#ff4e42] transition-colors">{certificate.title}</h3>
      <p className="text-xs text-[#ff4e42] font-bold uppercase tracking-wide mt-1">{certificate.issuer}</p>
      <p className="mt-2 text-gray-400 text-sm flex-grow">{certificate.description}</p>
      {certificate.link && certificate.link !== '#' && (
          <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-white transition-colors">
            Verify &rarr;
          </a>
      )}
    </div>
  );
};

export default CertificateCard;