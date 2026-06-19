"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-primary/90 backdrop-blur">
        <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex md:w-16 w-20 items-center justify-center">
              <Image src="/images/logo-white.png" alt="The Access Group" width={100} height={100} />
            </Link>
            <div className="hidden md:block">
              <p className="text-lg font-semibold leading-none">The Access <span className="text-white">Group</span></p>
              <p className="text-xs tracking-[0.24em] text-white/50">PRODUCTIZED SERVICES</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <Link href="/#about" className="hover:text-white">About</Link>
            <Link href="/#products" className="hover:text-white">Product</Link>
            <Link href="/summit" className="hover:text-white">Summit</Link>
            <Link href="/careers" className="hover:text-white">Careers</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/summit" className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 sm:inline-flex">
              IEAS Summit 2026
            </Link>
            <Link href="/#cta" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-primary hover:opacity-95">
              Get Started
            </Link>
            <button
              className="md:hidden text-white ml-1 p-1 hover:text-white/80"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Offcanvas Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        />
        <div className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-primary border-l border-white/10 p-6 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <span className="text-lg font-bold text-white">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium text-white/70">
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">About</Link>
            <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Product</Link>
            <Link href="/summit" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Summit</Link>
            <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white transition-colors">Careers</Link>
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-4 border-t border-white/10">
            <Link href="/summit" onClick={() => setIsMobileMenuOpen(false)} className="text-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white hover:bg-white/10">
              IEAS Summit 2026
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
