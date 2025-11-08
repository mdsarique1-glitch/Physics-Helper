import React, { useState, useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Simulate a visitor count using localStorage
    let count = localStorage.getItem('visitorCount');
    let newCount: number;
    if (count) {
      newCount = parseInt(count, 10) + Math.floor(Math.random() * 5) + 1;
    } else {
      newCount = Math.floor(Math.random() * 1000) + 1500; // Start with a random base
    }
    localStorage.setItem('visitorCount', String(newCount));
    setVisitorCount(newCount);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md w-full sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 text-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Physics Helper
          </h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6 w-full">
        {children}
      </main>

      <footer className="w-full text-center p-4 text-gray-500 text-sm">
        <div className="flex justify-center items-center space-x-4">
          <p>
            Developed by Mohammed Sarique
          </p>
          {visitorCount !== null && (
            <div className="flex items-center">
              <span className="text-gray-300">|</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>{visitorCount.toLocaleString()} Visitors</span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
