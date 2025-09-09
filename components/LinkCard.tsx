import React from 'react';
import { Link } from '../types';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete }) => {
  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch (error) {
      return '';
    }
  };
  
  const hostname = getHostname(link.url);
  const faviconUrl = hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=32` : 'https://picsum.photos/32';

  return (
    <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-slate-700 hover:border-cyan-500">
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={faviconUrl} alt="favicon" className="w-8 h-8 rounded-full bg-slate-700" />
            <span className="inline-block bg-cyan-900/50 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {link.category}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => onEdit(link)} className="text-slate-400 hover:text-yellow-400 transition-colors p-1 rounded-full hover:bg-slate-700">
              <EditIcon />
            </button>
            <button onClick={() => onDelete(link.id)} className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-slate-700">
              <TrashIcon />
            </button>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-1">{link.title}</h3>
        <p className="text-sm text-slate-400 break-all">{hostname}</p>
      </div>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-slate-700/50 hover:bg-slate-700 px-5 py-3 text-sm font-medium text-cyan-400 transition-colors flex items-center justify-center gap-2"
      >
        Visit Link <ExternalLinkIcon />
      </a>
    </div>
  );
};

export default LinkCard;
