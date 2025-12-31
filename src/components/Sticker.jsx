import React from 'react';
import { motion } from 'framer-motion';

const Sticker = ({ src, alt, x, y, rotation = 0, scale = 1 }) => {
    return (
        <motion.div
            drag
            dragMomentum={false}
            initial={{ scale: 0 }}
            animate={{ scale: scale, rotate: rotation }}
            whileHover={{ scale: scale * 1.1, cursor: 'grab' }}
            whileDrag={{ scale: scale * 1.2, cursor: 'grabbing' }}
            style={{
                position: 'absolute',
                top: y,
                left: x,
                zIndex: 10,
                filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))',
            }}
        >
            <div style={{
                background: 'white',
                padding: '5px',
                borderRadius: '4px',
                display: 'inline-block'
            }}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        display: 'block',
                        maxWidth: '150px',
                        height: 'auto',
                        pointerEvents: 'none' // Prevent default image drag
                    }}
                />
            </div>
        </motion.div>
    );
};

export default Sticker;
