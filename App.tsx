import React, { useState, useMemo } from 'react';
import { Link } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import LinkCard from './components/LinkCard';
import LinkModal from './components/LinkModal';
import { PlusIcon } from './components/icons/PlusIcon';

const App: React.FC = () => {
  const [links, setLinks] = useLocalStorage<Link[]>('links', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLink(null);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleSaveLink = (linkData: Omit<Link, 'id'> & { id?: string }) => {
    if (linkData.id) {
      // Update existing link
      setLinks(links.map(l => (l.id === linkData.id ? { ...l, ...linkData } : l)));
    } else {
      // Add new link
      const newLink: Link = { ...linkData, id: Date.now().toString() };
      setLinks([...links, newLink]);
    }
    handleCloseModal();
  };

  const filteredLinks = useMemo(() => {
    return links.filter(link => 
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.url.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [links, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search links..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/3 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <button
            onClick={handleOpenModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
          >
            <PlusIcon />
            Add New Link
          </button>
        </div>

        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLinks.map(link => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={handleEditLink}
                onDelete={handleDeleteLink}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-slate-400 mb-2">No links found.</h2>
            <p className="text-slate-500">
              {searchTerm ? "Try a different search term or " : ""}
              <button onClick={handleOpenModal} className="text-cyan-400 hover:underline">add your first link</button>!
            </p>
          </div>
        )}
      </main>
      <LinkModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveLink}
        initialData={editingLink}
      />
    </div>
  );
};

export default App;
