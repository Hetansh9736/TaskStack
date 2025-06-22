import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-[#1e293b] text-[#94a3b8] text-sm py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Taskstack. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-400">Home</Link>
          <Link to="/createpost" className="hover:text-blue-400">Create</Link>
          <Link to="/login" className="hover:text-blue-400">Login</Link>
          <Link to="/register" className="hover:text-blue-400">Register</Link>
        </div>
      </div>
    </footer>
  );
}
