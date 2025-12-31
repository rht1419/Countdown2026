import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import mainPageVideo from '../assets/main_page_video.mp4';

const NewYearCountdown = ({ onEnterBook }) => {
    // Initialize state properly
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
    const [celebrating, setCelebrating] = useState(false);

    // Use useRef to track the interval ID so we can clear it on unmount
    const fireworksIntervalRef = useRef(null);

    // Target Date: Jan 1, 2026 03:30:00 IST
    const [targetDate] = useState(() => new Date('2026-01-01T03:30:00+05:30').getTime());

    function calculateTimeLeft() {
        try {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                    total: difference
                };
            }
        } catch (e) {
            console.error("Timer calculation error:", e);
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    // Timer Logic Effect (Run independently)
    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            const left = calculateTimeLeft();
            setTimeLeft(left);

            if (left.total <= 0) {
                setCelebrating(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []); // Run once on mount

    // Celebration Logic Effect (Responds to state change)
    useEffect(() => {
        if (celebrating) {
            startFireworks();
        }
        return () => stopFireworks();
    }, [celebrating]);

    const startFireworks = () => {
        try {
            // Prevent multiple intervals
            if (fireworksIntervalRef.current) return;

            // Infinite Fireworks for User
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100000 };
            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            fireworksIntervalRef.current = setInterval(function () {
                const particleCount = 50;

                // multiple confetti sources
                if (typeof confetti === 'function') {
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
                }
            }, 250);
        } catch (e) {
            console.error("Fireworks error:", e);
        }
    };

    const stopFireworks = () => {
        if (fireworksIntervalRef.current) {
            clearInterval(fireworksIntervalRef.current);
            fireworksIntervalRef.current = null;
        }
        if (typeof confetti === 'function') {
            confetti.reset(); // Clear canvas
        }
    };

    // Balloons Component
    const Balloons = () => (
        <div className="balloons-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100000 }}>
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: '120vh', x: Math.random() * 100 + 'vw' }}
                    animate={{ y: '-20vh' }}
                    transition={{
                        duration: Math.random() * 5 + 10,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 5
                    }}
                    style={{
                        position: 'absolute',
                        fontSize: '3rem',
                    }}
                >
                    {['🎈', '🎉', '✨', '🎊'][i % 4]}
                </motion.div>
            ))}
        </div>
    );

    return (
        <div style={{
            position: 'fixed', // FORCED full screen overlay
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', // Replaced by video
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            zIndex: 9999
        }}>
            {/* Background Video (Always Visible) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: -1
                }}
            >
                <source src={mainPageVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.5)',
                zIndex: 0
            }}></div>

            {celebrating && <Balloons />}

            <div style={{ zIndex: 10, textAlign: 'center', padding: '0 20px', width: '100%' }}>
                <h1 style={{
                    fontFamily: 'Playfair Display',
                    fontSize: celebrating ? '3rem' : '4rem',
                    marginBottom: '1.5rem',
                    color: celebrating ? '#FFD700' : '#fff', // Gold when celebrating
                    textShadow: celebrating ? '0 0 20px rgba(255, 215, 0, 0.8)' : '0 0 20px rgba(255,255,255,0.5)',
                    transition: 'all 0.5s ease',
                    zIndex: 100001,
                    whiteSpace: 'pre-line'
                }}>
                    {celebrating ? "HAPPY NEW YEAR 2026!\nHii Alina ❤️" : "COUNTDOWN TO 2026"}
                </h1>

                {!celebrating && (
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
                        <TimeUnit value={timeLeft.days} label="Days" />
                        <TimeUnit value={timeLeft.hours} label="Hours" />
                        <TimeUnit value={timeLeft.minutes} label="Minutes" />
                        <TimeUnit value={timeLeft.seconds} label="Seconds" />
                    </div>
                )}

                {celebrating && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{
                            fontSize: '1.2rem',
                            fontFamily: 'Caveat',
                            marginBottom: '2rem',
                            color: '#ffeccd',
                            maxWidth: '800px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.6',
                            background: 'rgba(0,0,0,0.4)',
                            padding: '20px',
                            borderRadius: '15px',
                            border: '1px solid rgba(255,215,0,0.3)',
                            backdropFilter: 'blur(5px)'
                        }}
                    >
                        <p style={{ marginBottom: '1rem' }}>How lucky am i, to exist at the same time as you.</p>
                        <p style={{ marginBottom: '1rem' }}>Let us travel through this Year together, I am always there for you.</p>
                        <p style={{ marginBottom: '1rem' }}>Admiring you and Smiling because of you has made the time go faster, I want 2026 and rest of my life the same...</p>
                        <p>My goal is to make u the happiest I can and treat u the way u have alwayswanted to be treated and loved, because u deserve the whole world.
                        </p>
                        <p> - Rohit R
                        </p>
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onEnterBook}
                    style={{
                        padding: '15px 40px',
                        fontSize: '1.5rem',
                        fontFamily: 'Caveat',
                        background: 'rgba(255,255,255,0.2)',
                        border: '2px solid rgba(255,255,255,0.4)',
                        borderRadius: '50px',
                        color: '#fff',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}
                >
                    Open Scrapbook 📖
                </motion.button>
            </div>
        </div>
    );
};

const TimeUnit = ({ value, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            fontFamily: 'Orbitron, sans-serif',
            background: 'rgba(255,255,255,0.1)',
            padding: '10px 20px',
            borderRadius: '10px',
            minWidth: '80px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(255,255,255,0.2)'
        }}>
            {String(value).padStart(2, '0')}
        </div>
        <span style={{ fontSize: '1rem', marginTop: '0.5rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '2px' }}>{label}</span>
    </div>
);

export default NewYearCountdown;
