"use client";

import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';

export default function SuccessCalculator() {
  const [tenderAmount, setTenderAmount] = useState(100000); // Default to R100,000

  // Calculations
  const baseFee = 15000;
  const successFee = tenderAmount * 0.10; // 10%
  const netProfit = tenderAmount - baseFee - successFee;
  const roi = Math.round((netProfit / baseFee) * 100);

  // Helper to format currency with space separated thousands (e.g., R100 000)
  const formatCurrency = (val) => {
    const formatted = val.toLocaleString('en-US').replace(/,/g, ' ');
    return `R${formatted}`;
  };

  return (
    <section id="calculator" className="bg-primary text-white py-20 lg:py-24 border-t border-b border-white/5 relative overflow-hidden">
      {/* Subtle decorative background grid */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Calculator Container (Lighter overlay on primary background) */}
        <div className="w-full max-w-4xl mx-auto bg-white/[0.03] border border-secondary/20 rounded-[2rem] p-8 sm:p-12 shadow-2xl">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary flex-shrink-0">
              <Calculator size={28} />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                Success Fee Calculator
              </h3>
              <p className="text-sm text-white/60 mt-2">
                See the ROI of partnering with us on Box 5
              </p>
            </div>
          </div>

          {/* Slider Input Block */}
          <div className="mt-10">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/50">
                Tender / Funding Amount
              </span>
              <span className="text-2xl sm:text-3xl font-black text-secondary tracking-tight">
                {formatCurrency(tenderAmount)}
              </span>
            </div>

            {/* Range Slider */}
            <div className="relative mt-2">
              <input
                type="range"
                min={100000}
                max={10000000}
                step={50000}
                value={tenderAmount}
                onChange={(e) => setTenderAmount(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-secondary focus:outline-none"
                style={{
                  background: `linear-gradient(to right, #C2A66B 0%, #C2A66B ${((tenderAmount - 100000) / (10000000 - 100000)) * 100}%, rgba(255, 255, 255, 0.1) ${((tenderAmount - 100000) / (10000000 - 100000)) * 100}%, rgba(255, 255, 255, 0.1) 100%)`
                }}
              />
              <div className="flex justify-between items-center mt-3 text-[10px] sm:text-xs font-bold text-white/40 uppercase tracking-widest">
                <span>R100k</span>
                <span>R10m</span>
              </div>
            </div>
          </div>

          {/* Fee Output Metrics Grid */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {/* Card 1: Base Fee */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 block">
                Base Fee
              </span>
              <span className="text-2xl font-black text-white tracking-tight">
                {formatCurrency(baseFee)}
              </span>
            </div>

            {/* Card 2: Success Fee */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-2 block">
                Success Fee (10%)
              </span>
              <span className="text-2xl font-black text-white tracking-tight">
                {formatCurrency(successFee)}
              </span>
            </div>

            {/* Card 3: Net Profit */}
            <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-6 text-center shadow-lg shadow-secondary/5">
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 block">
                Your Net Profit
              </span>
              <span className="text-2xl font-black text-secondary tracking-tight">
                {formatCurrency(netProfit)}
              </span>
            </div>
          </div>

          {/* Bottom ROI Indicator Footer */}
          <div className="mt-8 flex items-center gap-2.5 text-xs sm:text-sm text-white/60 font-semibold">
            <TrendingUp size={18} className="text-secondary" />
            <span>
              ROI: <strong className="text-secondary">{roi}%</strong> return on your base investment
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
