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
  .timer-duration { font-size: 15px; color: #A0A0A0; margin-bottom: 28px; }
  .timer-start-btn {
    margin-top: 32px; background: #FF5500; color: #fff; font-family: 'Space Grotesk', sans-serif;
    font-size: 15px; font-weight: 600; padding: 14px 36px; border: none; cursor: pointer;
    transition: background 0.2s;
  }
  .timer-start-btn:hover { background: #FF7733; }
`;

export default function Timer() {
  const { id } = useParams();
  const [remaining, setRemaining] = useState(null);
  const [totalSeconds, setTotalSeconds] = useState(null);
  const [started, setStarted] = useState(false);
  const [durationMinutes, setDurationMinutes] = useState(null);
  const [error, setError] = useState(null);
  const [starting, setStarting] = useState(false);
  const intervalRef = useRef(null);

  const beginCountdown = (startedAt, total) => {
    setTotalSeconds(total);
    setStarted(true);
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

  useEffect(() => {
    let cancelled = false;
    let hasStarted = false;

    const load = async () => {
      const { data, error: fetchError } = await supabase
        .from('session_timers')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError || !data) {
        if (!cancelled) setError('Timer not found. Check the link and try again.');
        return;
      }
      if (cancelled) return;

      setDurationMinutes(data.duration_minutes);

      if (data.started_at) {
        hasStarted = true;
        beginCountdown(data.started_at, data.duration_minutes * 60);
      }
    };

    load();

    // Poll every 2s while waiting, in case the other participant starts it first
    const waitPoll = setInterval(async () => {
      if (hasStarted) {
        clearInterval(waitPoll);
        return;
      }
      const { data } = await supabase.from('session_timers').select('started_at, duration_minutes').eq('id', id).single();
      if (data && data.started_at && !cancelled) {
        hasStarted = true;
        clearInterval(waitPoll);
        beginCountdown(data.started_at, data.duration_minutes * 60);
      }
    }, 2000);

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(waitPoll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStart = async () => {
    setStarting(true);
    const now = new Date().toISOString();
    const { data, error: updateError } = await supabase
      .from('session_timers')
      .update({ started_at: now })
      .eq('id', id)
      .is('started_at', null)
      .select()
      .single();

    if (updateError || !data) {
      // Someone else may have just started it — fetch the real value and join it
      const { data: refreshed } = await supabase.from('session_timers').select('*').eq('id', id).single();
      if (refreshed && refreshed.started_at) {
        beginCountdown(refreshed.started_at, refreshed.duration_minutes * 60);
      }
    } else {
      beginCountdown(data.started_at, data.duration_minutes * 60);
    }
    setStarting(false);
  };

  const format = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const urgent = totalSeconds && remaining !== null && remaining / totalSeconds <= 0.15;
  const ringColor = remaining === 0 ? '#FF5500' : (urgent ? '#FF5500' : '#F2F2F0');

  return (
    <>
      <style>{css}</style>
      <div className="timer-page">
        <div className="timer-logo">Fuen<span>tiva</span></div>
        {error ? (
          <p className="timer-error">{error}</p>
        ) : !started ? (
          <>
            <div className="timer-duration">
              {durationMinutes ? `${durationMinutes}-minute session` : 'Loading…'}
            </div>
            <button className="timer-start-btn" onClick={handleStart} disabled={starting || !durationMinutes}>
              {starting ? 'Starting…' : 'Start session'}
            </button>
            <p className="timer-status">Waiting to start — click when your call begins.</p>
          </>
        ) : (
          <>
            <div className="timer-ring" style={{ borderColor: ringColor }}>
              <span className="timer-number" style={{ color: ringColor }}>
                {remaining === null ? '--:--' : format(remaining)}
              </span>
            </div>
            <p className="timer-status">{remaining === 0 ? 'Time is up' : 'Session in progress — synced live'}</p>
          </>
        )}
      </div>
    </>
  );
}
