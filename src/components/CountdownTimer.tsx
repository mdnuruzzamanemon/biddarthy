'use client'

import { useEffect, useState, memo } from 'react'

const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const offerEnd = new Date(endDate).getTime();
      const difference = offerEnd - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Offer Expired');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <p className="text-red-400 text-lg font-semibold mb-2">
      Offer ends in: <span className="text-white">{timeLeft}</span>
    </p>
  );
};

// ✅ Add a Display Name for Better Debugging
const MemoizedCountdownTimer = memo(CountdownTimer);
MemoizedCountdownTimer.displayName = 'CountdownTimer';

export default MemoizedCountdownTimer;
