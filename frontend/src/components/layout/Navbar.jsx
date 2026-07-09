/**
 * Top navigation bar with app branding, search placeholder,
 * and user avatar area. Fixed at the top of the viewport.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1600px] mx-auto px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">HCP Module</h1>
            <p className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">AI-First CRM</p>
          </div>
        </div>

        {/* Center — Search (placeholder) */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-80">
          <svg className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="text-sm text-gray-400">Search interactions…</span>
        </div>

        {/* Right — User */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.42 18 12V9a6 6 0 10-12 0v3c0 1.42-.21 2.79-.595 3.595L4 17h5m6 0a3 3 0 01-6 0m6 0H9" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
            A
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
