import React from 'react';
import { motion } from 'framer-motion';

const CollageItem = ({ src, alt, width = '100%', height = '100%', rotation = 0, onClick }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            drag
            dragMomentum={false}
            onClick={onClick}
            style={{
                position: 'relative',
                width: width,
                height: height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `rotate(${rotation}deg)`,
                cursor: 'pointer',
                padding: '10px'
            }}
        >
            {/* Washi Tape Effect */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(-2deg)',
                width: '100px',
                height: '30px',
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(2px)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                zIndex: 5,
                opacity: 0.8
            }}></div>
            <div style={{
                background: '#fff',
                padding: '5px',
                boxShadow: '1px 2px 5px rgba(0,0,0,0.2)',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain', // STRICT containment
                        display: 'block'
                    }}
                />
            </div>
        </motion.div>
    );
};

export default CollageItem;
