import React, { forwardRef } from 'react';

const Page = forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref} style={{
            padding: '20px',
            backgroundColor: '#fff',
            border: '1px solid #c2b5a5',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
            ...props.style
        }}>
            <div style={{
                height: '100%',
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")', // Dynamic paper texture (or local if prefer)
                position: 'relative'
            }}>
                {props.children}
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#888'
                }}>
                    {props.number}
                </div>
            </div>
        </div>
    );
});

export default Page;
