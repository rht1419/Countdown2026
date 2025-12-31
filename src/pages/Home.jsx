import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const months = [
        { id: '1', name: 'January' },
        { id: '2', name: 'February' },
        { id: '3', name: 'March' },
        { id: '4', name: 'April' },
        { id: '5', name: 'May' },
        { id: '6', name: 'June' },
        { id: '7', name: 'July' },
        { id: '8', name: 'August' },
        { id: '9', name: 'September' },
        { id: '10', name: 'October' },
        { id: '11', name: 'November' },
        { id: '12', name: 'December' },
    ];

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--text-primary)' }}
            >
                My 2025 Scrapbook
            </motion.h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '2rem',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {months.map((month) => (
                    <Link to={`/month/${month.id}`} key={month.id}>
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            style={{
                                background: 'var(--card-bg)',
                                padding: '2rem',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-md)',
                                cursor: 'pointer',
                                border: '1px solid rgba(0,0,0,0.05)'
                            }}
                        >
                            <h3 style={{ margin: 0 }}>{month.name}</h3>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
