import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-800">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
          Personal Link Portal
        </h1>
        <p className="text-center text-slate-400 mt-1">Your personal corner of the web.</p>
      </div>
    </header>
  );
};

export default Header;
