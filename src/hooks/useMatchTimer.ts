import { useState, useEffect } from 'react';
import { getStartTime, getMatchDuration } from '../services/matchService';

export function useMatchTimer(matchId: string | undefined) {
  const [startTimeIso, setStartTimeIso] = useState<string | undefined>(undefined);
  const [durationInMinutes, setDurationInMinutes] = useState(30);
  const [timeLeft, setTimeLeft] = useState('00:00');
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchDuration = async () => {
      if (!matchId) return;
      const duration = await getMatchDuration(matchId);
      if (isMounted && duration) {
        setDurationInMinutes(duration);
      }
    };

    fetchDuration();

    return () => {
      isMounted = false;
    };
  }, [matchId]);

  useEffect(() => {
    if (startTimeIso) return;

    let isMounted = true;

    const fetchStartTime = async () => {
      if (!matchId) return;
      const startTime = await getStartTime(matchId);
      if (isMounted && startTime) {
        setStartTimeIso(startTime);
      }
    };

    fetchStartTime();
    const interval = setInterval(fetchStartTime, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [matchId, startTimeIso]);

  useEffect(() => {
    // Wait until we actually have the start time from Supabase
    if (!startTimeIso) return;

    // 1. Calculate the exact moment the match should end
    const startTimeMs = new Date(startTimeIso).getTime();
    const durationMs = durationInMinutes * 60 * 1000;
    const endTimeMs = startTimeMs + durationMs;

    // 2. Set an interval to recalculate the distance every 1 second
    const interval = setInterval(() => {
      const now = Date.now();
      const distance = endTimeMs - now;

      // 3. Stop the clock if time runs out
      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft('00:00');
        setIsTimeUp(true);
        return;
      }

      // 4. Convert the remaining milliseconds into Minutes and Seconds
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // 5. Add a leading zero so "9:5" becomes "09:05"
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      setTimeLeft(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);

    // Cleanup the interval if the user leaves the page
    return () => clearInterval(interval);
    
  }, [startTimeIso, durationInMinutes]);

  return { timeLeft, isTimeUp, durationInMinutes };
}