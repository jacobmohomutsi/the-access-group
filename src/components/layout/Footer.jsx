import React from 'react';
import { Globe, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">

        {/* Contact info row (Website, Email, Phone) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 pb-4 border-b border-white/10 text-sm text-white/90">

          <a
            href="mailto:info@theaccessgroup.co.za"
            className="flex items-center gap-3 hover:text-[#C2A66B] transition-colors"
          >
            <Mail size={18} strokeWidth={2} />
            <span>info@theaccessgroup.co.za</span>
          </a>

          <a
            href="tel:+27140012018"
            className="flex items-center gap-3 hover:text-[#C2A66B] transition-colors"
          >
            <Phone size={18} strokeWidth={2} />
            <span>+27 14 001 2018</span>
          </a>
        </div>

        {/* Bottom row (Copyright & Attribution) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} The Access Group. All rights reserved.
          </div>
          <div className="uppercase tracking-wider text-[10px] text-white/40 font-bold">
            Built by <span className="text-white/60">Munjle Solutions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
