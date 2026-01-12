import React from 'react';

const ClosurePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* Stars background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-1/3 w-1 h-1 bg-blue-200 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-60 left-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-60 right-1/4 w-0.5 h-0.5 bg-blue-100 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.3s'}}></div>
        <div className="absolute top-1/3 left-10 w-1 h-1 bg-white rounded-full opacity-20 animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-1/2 right-20 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse" style={{animationDelay: '1.2s'}}></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <img 
          src={`${process.env.PUBLIC_URL}/catbusLogo.png`}
          alt="Catbus Logo"
          className="h-40 w-auto opacity-70 grayscale"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-200 mb-6 tracking-wide">
          Catbus is Closed
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed">
          EVIL alliance shipping is now done by <span className="text-amber-400 font-semibold">Evola</span>
        </p>

        {/* Links */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="https://www.evolaeve.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/30 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
            </svg>
            Evola Website
          </a>
          
          <a 
            href="https://discord.gg/SS2GFCPkt2"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Evola Discord
          </a>
        </div>

        {/* Footer message */}
        <p className="text-slate-500 mt-12 text-sm">
          Thank you for flying with Catbus o7
        </p>
      </div>
    </div>
  );
};

export default ClosurePage;
