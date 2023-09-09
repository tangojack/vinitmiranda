import React from 'react';
import { Link, Route } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-200">
      <ul className="flex items-center justify-between px-4 py-2">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
