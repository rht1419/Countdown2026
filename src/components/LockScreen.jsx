import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LockScreen = ({ onUnlock }) => {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === '0214') {
            onUnlock();
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
            setPin('');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: '#2d2d2d', // Dark background for contrast
            color: '#f8f5f2'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{
                    width: '350px',
                    height: '500px',
                    background: '#8b4513', // Leather brown cover
                    borderRadius: '4px 12px 12px 4px',
                    boxShadow: '10px 10px 30px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    padding: '2rem',
                    borderLeft: '12px solid #5a2d0c' // Spine
                }}
            >
                <h1 style={{
                    fontFamily: 'Playfair Display, serif',
                    textAlign: 'center',
                    color: '#d4af37', // Gold text
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    marginBottom: '2rem'
                }}>
                    My 2025<br />Scrapbook
                </h1>

                <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#e0c090' }}>
                        code to open this scrapbook is your phone password
                    </p>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        maxLength={5}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid #d4af37',
                            color: '#d4af37',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            width: '120px',
                            outline: 'none',
                            letterSpacing: '4px'
                        }}
                        placeholder="*****"
                    />
                </form>

                {error && (
                    <motion.div
                        initial={{ x: -10 }}
                        animate={{ x: [0, -10, 10, -10, 10, 0] }}
                        style={{ color: '#ff6b6b', marginTop: '1rem', fontSize: '0.8rem' }}
                    >
                        Incorrect PIN!
                    </motion.div>
                )}
            </motion.div>
            <p style={{ marginTop: '2rem', opacity: 0.5, fontStyle: 'italic' }}>Confidential Memories</p>
        </div>
    );
};

export default LockScreen;
