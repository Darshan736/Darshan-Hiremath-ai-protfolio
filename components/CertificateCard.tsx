
import React from 'react';
import { Certificate } from '../types';
import { BadgeIcon } from './Icons';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <div className="bg-[#0f1420] p-5 rounded-lg border border-gray-800 hover:border-[#ff4e42]/40 transition-all duration-300 flex flex-col h-full group hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40">
      <div className="flex items-start justify-between mb-2">
         <div className="bg-gray-800 p-2 rounded-md text-gray-400 group-hover:text-[#ff4e42] transition-colors border border-gray-700">
            <BadgeIcon className="w-5 h-5" />
         </div>
         <span className="text-[10px] font-bold text-gray-500 font-mono bg-gray-900 px-2 py-1 rounded border border-gray-800">{certificate.date}</span>
      </div>
      <h3 className="mt-2 text-base font-bold text-white group-hover:text-[#ff4e42] transition-colors">{certificate.title}</h3>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{certificate.issuer}</p>
      <p className="mt-3 text-gray-400 text-sm leading-relaxed flex-grow font-light">{certificate.description}</p>
      {certificate.link && certificate.link !== '#' && (
          <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="mt-5 self-start inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-[#ff4e42] pb-0.5">
            Verify Credential &rarr;
          </a>
      )}
    </div>
  );
};

export default CertificateCard;
