import React from 'react';

function Navbar({ onScrollToAbout }) {
  return (
    <nav>
      <ul className="md:flex md:justify-between">
        <li className="text-center hover:text-center font-bold hover:text-yellow-300 text-2xl text-yellow-400">King David Blog</li>
        <div className="flex justify-end gap-4">
          {
            [{ id: 1, name: 'About' }].map(item => (
              <li key={item.id} className="hover:text-center font-bold hover:text-yellow-300 hover:rounded-lg">
                <a onClick={onScrollToAbout} style={{ cursor: 'pointer' }}>
                  {item.name}
                </a>
              </li>
            ))
          }
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
