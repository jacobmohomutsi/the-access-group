"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-10-15T08:00:00+02:00"); // SAST

const calcTimeLeft = () => {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setTimeLeft(calcTimeLeft());
        const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    const units = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="flex items-center justify-center gap-3 sm:gap-6">
            {units.map((u) => (
                <div key={u.label} className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-2xl bg-primary/45 backdrop-blur border border-white/10 flex items-center justify-center shadow-lg">
                        <span className="font-black tracking-tight text-md sm:text-lg text-secondary">
                            {String(u.value).padStart(2, "0")}
                        </span>
                    </div>
                    <span className="text-xs text-white/70 mt-2 uppercase tracking-wider">
                        {u.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CountdownTimer;
