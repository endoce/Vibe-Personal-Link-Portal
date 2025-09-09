import React, { useState, useEffect } from 'react';
import { Link } from '../types';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: Omit<Link, 'id'> & { id?: string }) => void;
  initialData: Link | null;
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setCategory(initialData.category);
    } else {
      setTitle('');
      setUrl('');
      setCategory('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !category) return;
    try {
      // Basic URL validation
      new URL(url);
    } catch (_) {
      alert("Please enter a valid URL.");
      return;
    }
    onSave({ id: initialData?.id, title, url, category });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-slate-800 rounded-lg shadow-xl p-8 w-full max-w-md m-4 border border-slate-700" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-center">{initialData ? 'Edit Link' : 'Add New Link'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-slate-400 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="url" className="block text-slate-400 text-sm font-bold mb-2">URL</label>
            <input
              type="url"
              id="url"
              placeholder="https://example.com"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="category" className="block text-slate-400 text-sm font-bold mb-2">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              required
            />
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
            >
              Save Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkModal;
