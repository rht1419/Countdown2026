
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Lightbox = ({ src, alt, onClose }) => {
    if (!src) return null;

    const isVideo = src.endsWith('.mp4');

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'zoom-out'
                }}
            >
                <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative', maxWidth: '95vw', maxHeight: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isVideo ? (
                        <motion.video
                            src={src}
                            controls
                            autoPlay
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                                borderRadius: '4px',
                                outline: 'none'
                            }}
                        />
                    ) : (
                        <motion.img
                            src={src}
                            alt={alt}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                                border: '5px solid #fff',
                                borderRadius: '4px'
                            }}
                        />
                    )}
                </div>

                {/* Close Button Hint */}
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    color: '#fff',
                    fontFamily: 'sans-serif',
                    fontSize: '2rem',
                    cursor: 'pointer',
                    opacity: 0.8,
                    zIndex: 2001
                }} onClick={onClose}>
                    &times;
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Lightbox;
