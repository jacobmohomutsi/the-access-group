import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary">
      <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-white/50 sm:px-6 lg:px-8 md:text-left">
        © {new Date().getFullYear()} The Access Group. All rights reserved.
      </div>
    </footer>
  );
}
