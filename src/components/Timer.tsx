import React, { useEffect, useState } from 'react';
import { Clock, Heart } from 'lucide-react';

interface TimerProps {
  startDate: string;
}

export default function Timer({ startDate }: TimerProps) {
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateTimer = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = now - start;

      const seconds = Math.floor((difference / 1000) % 60);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(difference / (1000 * 60 * 60 * 24) % 30);
      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30) % 12);
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));

      setDuration({ years, months, days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-1 rounded-2xl">
      <div className="bg-white p-6 rounded-xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-indigo-600" />
          <h3 className="text-xl font-semibold text-gray-900">Time Together</h3>
          <Heart className="w-6 h-6 text-pink-500" />
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <TimeUnit value={duration.years} label="Years" />
          <TimeUnit value={duration.months} label="Months" />
          <TimeUnit value={duration.days} label="Days" />
          <TimeUnit value={duration.hours} label="Hours" />
          <TimeUnit value={duration.minutes} label="Minutes" />
          <TimeUnit value={duration.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-50 w-16 h-16 rounded-lg flex items-center justify-center mb-1 shadow-sm">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
      <span className="text-xs text-gray-600 font-medium">{label}</span>
    </div>
  );
}