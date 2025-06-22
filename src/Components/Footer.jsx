import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-[#1e293b] text-[#94a3b8] text-sm py-6 px-4 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Taskstack. All rights reserved.</p>
       
      </div>
    </footer>
  );
}
