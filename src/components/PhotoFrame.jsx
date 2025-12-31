import React from 'react';
import { motion } from 'framer-motion';

const PhotoFrame = ({ src, alt, caption, rotation = 0, width = '100%', height = '100%', type, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            style={{
                background: '#fff',
                padding: '10px 10px 35px 10px',
                boxShadow: '2px 4px 8px rgba(0,0,0,0.15)',
                transform: `rotate(${rotation}deg)`,
                width: width,
                height: height,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer'
            }}
        >
            <div style={{ flex: 1, position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                {type === 'video' || (src && src.endsWith('.mp4')) ? (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                        <video
                            src={src}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }} // Strict Fit
                            muted
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '30px',
                            color: '#fff',
                            opacity: 0.9
                        }}>▶</div>
                    </div>
                ) : src ? (
                    <img
                        src={src}
                        alt={alt || "Memory"}
                        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} // Strict Fit
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: '#eee' }}></div>
                )}
            </div>

            {caption && (
                <div style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: 0,
                    width: '100%',
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1rem',
                    color: '#333',
                    textAlign: 'center',
                    lineHeight: '1.2'
                }}>
                    {caption}
                </div>
            )}
        </motion.div>
    );
};

export default PhotoFrame;
