import React from 'react';
import { CheckSquare, Search } from 'lucide-react';

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <CheckSquare className="w-10 h-10 text-blue-600 mr-3" />
        <h1 className="text-4xl font-bold text-gray-800">TaskMaster Pro</h1>
      </div>
      <p className="text-gray-600 mb-6">Organize your life, one task at a time</p>
      
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
      </div>
    </div>
  );
};

export default Header;