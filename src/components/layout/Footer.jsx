import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const XIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Logo & Description */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="The Access Group"
                width={120}
                height={120}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/80 leading-relaxed pr-4">
              The Access Group is a youth-led strategic consultancy focused on business activation, digital transformation, and market access across Africa. We help entrepreneurs, creatives, organisations, and community-led enterprises transition from informal activity into structured, scalable, and globally connected operations.
            </p>
          </div>

          {/* Solutions */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5 sm:mb-6">Solutions</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="#summit" className="hover:text-white transition-colors">Summit</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-5 sm:mb-6">Legal</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><Link href="/documents/1. TAG_Terms_Conditions_Website_Disclaimer.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/documents/2. TAG_Cancellation_Refund_Policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cancellation & Refund Policy</Link></li>
              <li><Link href="/documents/3. TAG_POPIA_Privacy_Document.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">POPIA & Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Office */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-5 sm:mb-6">Contact</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li>Tel: +27 14 001 2018</li>
              <li>Email: info@theaccessgroup.co.za</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="lg:col-span-1 flex gap-4 lg:justify-end">
            <Link href="https://www.facebook.com/theaccessgroup.co.za" aria-label="Facebook">
              <FaFacebookF className="w-5 h-5 text-white hover:text-[#C2A66B]" />
            </Link>

            <Link href="https://www.instagram.com/the_access_group_sa/" aria-label="Instagram">
              <FaInstagram className="w-5 h-5 text-white hover:text-[#C2A66B]" />
            </Link>

            <Link href="https://www.linkedin.com/company/the-access-group-sa/?originalSubdomain=za" aria-label="LinkedIn">
              <FaLinkedinIn className="w-5 h-5 text-white hover:text-[#C2A66B]" />
            </Link>
          </div>

        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} The Access Group. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
