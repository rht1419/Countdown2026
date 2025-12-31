import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sticker from '../components/Sticker';

// Function to import all stickers (naive approach, better to import specifically or use glob in Vite)
// For now, let's hardcode the imports or use a dynamic require context if possible, but Vite uses import.meta.glob
// Let's just assume we renamed them or import them if we know names.
// Since filenames have timestamps, I'll need to know them.
// ALTERNATIVE: I can rename them while copying.
// Let's assume for this code I will rename them to camera.png, heart.png, star.png in a follow up step.
// I will write the code assuming they are renamed.

import cameraSticker from '../assets/stickers/camera.png';
import heartSticker from '../assets/stickers/heart.png';
import starSticker from '../assets/stickers/star.png';

const getMonthName = (id) => {
    const date = new Date(2025, id - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
};

const MonthPage = () => {
    const { monthId } = useParams();
    const navigate = useNavigate();
    const id = parseInt(monthId);
    const monthName = getMonthName(id);

    const prevMonth = id > 1 ? id - 1 : null;
    const nextMonth = id < 12 ? id + 1 : null;

    // Example stickers config - in a real app this would be saved state
    const [stickers] = useState([
        { id: 1, src: cameraSticker, x: '10%', y: '20%', rotation: -10 },
        { id: 2, src: heartSticker, x: '70%', y: '15%', rotation: 15 },
        { id: 3, src: starSticker, x: '80%', y: '70%', rotation: 5 },
    ]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-color)',
            padding: '2rem',
            backgroundImage: 'radial-gradient(#e0e0e0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    ← Back to Cover
                </Link>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {prevMonth && (
                        <button onClick={() => navigate(`/month/${prevMonth}`)} style={navButtonStyle}>
                            ← {getMonthName(prevMonth)}
                        </button>
                    )}
                    {nextMonth && (
                        <button onClick={() => navigate(`/month/${nextMonth}`)} style={navButtonStyle}>
                            {getMonthName(nextMonth)} →
                        </button>
                    )}
                </div>
            </div>

            <motion.div
                key={monthId}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'var(--card-bg)',
                    minHeight: '80vh',
                    boxShadow: 'var(--shadow-lg)',
                    borderRadius: '4px',
                    padding: '4rem',
                    position: 'relative',
                    maxWidth: '1000px',
                    margin: '0 auto',
                    transform: 'rotate(-1deg)'
                }}
            >
                <h1 style={{
                    textAlign: 'center',
                    fontSize: '4rem',
                    color: 'var(--accent-color)',
                    borderBottom: '2px solid var(--accent-color)',
                    display: 'inline-block',
                    position: 'absolute',
                    top: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'max-content'
                }}>
                    {monthName}
                </h1>

                <div style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <p style={{ fontStyle: 'italic' }}>Drag these stickers around!</p>
                </div>

                {/* Stickers Area */}
                {stickers.map((s) => (
                    <Sticker
                        key={s.id}
                        src={s.src}
                        x={s.x}
                        y={s.y}
                        rotation={s.rotation}
                    />
                ))}

                {/* Photo Placeholder Area */}
                <div style={{
                    marginTop: '2rem',
                    border: '2px dashed #ccc',
                    borderRadius: '12px',
                    height: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa'
                }}>
                    Add photos for {monthName} here (Drag & Drop coming soon)
                </div>

            </motion.div>
        </div>
    );
};

const navButtonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'var(--accent-color)',
    color: 'white',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    boxShadow: 'var(--shadow-sm)'
};

export default MonthPage;
