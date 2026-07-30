import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080808; }

  .timer-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    flex-direction: column; background: #080808; font-family: 'Space Grotesk', sans-serif;
  }
  .timer-logo { font-size: 20px; font-weight: 700; color: #F2F2F0; margin-bottom: 40px; letter-spacing: -0.5px; }
  .timer-logo span { color: #FF5500; }
  .timer-ring {
    width: 260px; height: 260px; border-radius: 50%; border: 3px solid #F2F2F0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.4s ease;
  }
  .timer-number { font-size: 64px; font-weight: 700; color: #F2F2F0; font-variant-numeric: tabular-nums; transition: color 0.4s ease; }
  .timer-status { margin-top: 28px; font-size: 14px; color: #6B6B6B; letter-spacing: 0.5px; }
  .timer-error { color: #A0A0A0; font-size: 14px; max-width: 320px; text-align: center; }
`;

export default function Timer() {
  const { id } = useParams();
  const [remaining, setRemaining] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(null);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const { data, error: fetchError } = await supabase
        .from('session_timers')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !data) {
        if (!cancelled) setError('Timer not found. Check the link and try again.');
        return;
      }

      let startedAt = data.started_at;
      if (!startedAt) {
        const now = new Date().toISOString();
        await supabase.from('session_timers').update({ started_at: now }).eq('id', id);
        startedAt = now;
      }

      const total = data.duration_minutes * 60;
      if (cancelled) return;
      setTotalSeconds(total);

      const tick = () => {
        const elapsed = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);
        const left = Math.max(total - elapsed, 0);
        setRemaining(left);
        if (left <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };

      tick();
      intervalRef.current = setInterval(tick, 1000);
    };

    init();

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id]);

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const urgent = totalSeconds && remaining !== null && remaining / totalSeconds <= 0.15;
  const ringColor = remaining === 0 ? '#FF5500' : (urgent ? '#FF5500' : '#F2F2F0');

  let statusText = 'Loading…';
  if (error) statusText = '';
  else if (remaining === null) statusText = 'Loading…';
  else if (remaining === 0) statusText = 'Time is up';
  else statusText = 'Session in progress — synced live';

  return (
    <>
      <style>{css}</style>
      <div className="timer-page">
        <div className="timer-logo">Fuen<span>tiva</span></div>
        {error ? (
          <p className="timer-error">{error}</p>
        ) : (
          <>
            <div className="timer-ring" style={{ borderColor: ringColor }}>
              <span className="timer-number" style={{ color: ringColor }}>
                {remaining === null ? '--:--' : format(remaining)}
              </span>
            </div>
            <p className="timer-status">{statusText}</p>
          </>
        )}
      </div>
    </>
  );
}
