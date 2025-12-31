import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SideVideoPlayer = ({ items = [] }) => {
    if (!items || items.length === 0) return null;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none',  // IE 10+
        }}>
            <style>
                {`
                    ::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>

            <AnimatePresence>
                {items.map((item, index) => (
                    <MediaItem key={index} item={item} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const MediaItem = ({ item }) => {
    // item can be { src: string, type: 'video' | 'image' } or just { src }
    // We'll detect type from src extension if type not present
    const isVideo = item.type === 'video' || (item.src && item.src.endsWith('.mp4'));

    // For Video
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (isVideo && videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
            onClick={isVideo ? toggleMute : undefined}
            style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: isVideo ? 'pointer' : 'default',
                position: 'relative',
                background: '#000',
                aspectRatio: '9/16', // Vertical videos mostly? Or auto.
                flexShrink: 0
            }}
        >
            {isVideo ? (
                <>
                    <video
                        ref={videoRef}
                        src={item.src}
                        muted={isMuted}
                        loop
                        autoPlay
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                    {isMuted && (
                        <div style={{
                            position: 'absolute',
                            bottom: '10px',
                            right: '10px',
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            padding: '5px',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px'
                        }}>
                            🔇
                        </div>
                    )}
                </>
            ) : (
                <img
                    src={item.src}
                    alt="Sidebar memory"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                    }}
                />
            )}
        </motion.div>
    );
};

export default SideVideoPlayer;
