
import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Page from './Page';
import Sticker from './Sticker';
import PhotoFrame from './PhotoFrame';
import CollageItem from './CollageItem';
import Lightbox from './Lightbox';
import SideVideoPlayer from './SideVideoPlayer';
import { memories } from '../data/memories';

import cameraSticker from '../assets/stickers/camera.png';
import heartSticker from '../assets/stickers/heart.png';
import starSticker from '../assets/stickers/star.png';
import rnaNew from '../assets/rna_new.jpg';

const Book = ({ onGoHome }) => {
    const bookRef = useRef();
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [leftMonthIndex, setLeftMonthIndex] = useState(-1);
    const [rightMonthIndex, setRightMonthIndex] = useState(-1);
    const [pageMap, setPageMap] = useState([]);

    const stickersList = [heartSticker, cameraSticker, starSticker];
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNames = {
        'Jan': 'January', 'Feb': 'February', 'March': 'March', 'April': 'April',
        'May': 'May', 'June': 'June', 'July': 'July', 'Aug': 'August',
        'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
    };

    // R&A Image Data
    const rNaImage = {
        src: rnaNew,
        alt: 'R&A in Christ',
        type: 'image'
    };

    const processedMemories = months.map(m => {
        const raw = memories[m] || [];
        // STRICT: Only actual videos from the month in the sidebar. NO R&A image here.
        const videos = raw.filter(i => i.type === 'video');

        const items = raw.map(item => ({
            ...item,
            isVideo: item.type === 'video'
        }));

        return {
            month: m,
            fullMonth: monthNames[m],
            items: items,
            videos: videos
        };
    });

    const chunkArray = (arr, size) => {
        const results = [];
        const copy = [...arr];
        while (copy.length) {
            results.push(copy.splice(0, size));
        }
        return results;
    };

    const handleMediaClick = (src) => {
        setSelectedMedia(src);
    };

    const generatePages = () => {
        const pages = [];
        const map = [];
        let pIndex = 0;

        // Cover
        map[pIndex] = -1;
        pages.push(
            <Page key="cover" number={pIndex + 1} onClick={() => bookRef.current.pageFlip().flipNext()} style={{ background: '#fff', cursor: 'pointer' }}>
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '15px double #f3f3f3' }}>
                    <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', textAlign: 'center', margin: 0 }}>2025</h1>
                    <p style={{ marginTop: '1rem', fontFamily: 'Caveat', fontSize: '1.5rem', color: '#888' }}>Our Story</p>
                </div>
            </Page>
        );
        pIndex++;

        // Intro
        map[pIndex] = -1;
        pages.push(
            <Page key="intro" number={pIndex + 1} onClick={() => bookRef.current.pageFlip().flipPrev()} style={{ background: '#fff', cursor: 'pointer' }}>
                <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ fontFamily: 'Caveat', fontSize: '2.5rem', color: '#444' }}>To my favorite person...</h2>
                </div>
            </Page>
        );
        pIndex++;

        // Start Content
        // Months
        processedMemories.forEach((monthData, mIndex) => {
            if (pIndex % 2 === 0) {
                map[pIndex] = -1;
                pages.push(<Page key={`spacer-${pIndex}`} number={pIndex + 1} style={{ background: '#fff' }}><div /></Page>);
                pIndex++;
            }

            const items = [...monthData.items];
            const chunks = chunkArray(items, 2);

            chunks.forEach((chunk, cIndex) => {
                map[pIndex] = mIndex;
                pages.push(
                    <Page key={`${monthData.month}-${cIndex}`} number={pIndex + 1} style={{ background: '#fff' }}>
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px', paddingTop: '40px', position: 'relative' }}>
                            {/* Month Title ALWAYS at Top, high Z-Index */}
                            {cIndex === 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '0',
                                    right: '0',
                                    textAlign: 'center',
                                    zIndex: 20
                                }}>
                                    <div style={{
                                        background: '#222',
                                        color: '#fff',
                                        padding: '2px 10px',
                                        display: 'inline-block',
                                        transform: 'rotate(-2deg)',
                                        boxShadow: '1px 2px 0px rgba(0,0,0,0.2)'
                                    }}>
                                        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', margin: 0, letterSpacing: '1px' }}>
                                            {monthData.fullMonth.toUpperCase()}
                                        </h2>
                                    </div>
                                </div>
                            )}

                            {chunk.map((item, i) => (
                                <div key={i} style={{ flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                                    {Math.random() > 0.5 ? (
                                        <CollageItem src={item.src} width="100%" height="100%" rotation={Math.random() * 2 - 1} onClick={() => handleMediaClick(item.src)} />
                                    ) : (
                                        <PhotoFrame src={item.src} width="100%" height="100%" rotation={Math.random() * 2 - 1} type={item.isVideo ? 'video' : 'image'} onClick={() => handleMediaClick(item.src)} />
                                    )}
                                </div>
                            ))}
                            {Math.random() > 0.7 && <Sticker src={stickersList[(mIndex + cIndex) % 3]} x="85%" y="90%" rotation={10} scale={0.4} style={{ opacity: 0.8 }} />}
                        </div>
                    </Page>
                );
                pIndex++;
            });
        });

        // R&A Page (Strict Single Page with Rotation)
        // Ensure Left Start
        if (pIndex % 2 === 0) {
            map[pIndex] = -1;
            pages.push(<Page key="spacer-rna-odd" number={pIndex + 1} style={{ background: '#fff' }}><div /></Page>);
            pIndex++;
        }

        map[pIndex] = -1;
        pages.push(
            <Page key="rna-full" number={pIndex + 1} style={{ background: '#fff' }}>
                <div style={{ height: '100%', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                    {/* Rotated 90 degrees to fit horizontal image in vertical page */}
                    <PhotoFrame src={rNaImage.src} width="140%" height="90%" rotation={90} onClick={() => handleMediaClick(rNaImage.src)} />
                    <h2 style={{
                        fontFamily: 'Caveat',
                        fontSize: '1.8rem',
                        textAlign: 'center',
                        color: '#d32f2f',
                        position: 'absolute',
                        bottom: '40px',
                        width: '100%',
                        zIndex: 10,
                        textShadow: '0 2px 4px rgba(255,255,255,0.9)'
                    }}>
                        We have had a Great Year Together Alina ❤️
                    </h2>
                </div>
            </Page>
        );
        pIndex++;

        // Blank Right Page to isolate
        map[pIndex] = -1;
        pages.push(<Page key="rna-right-spacer" number={pIndex + 1} style={{ background: '#fff' }}><div /></Page>);
        pIndex++;

        // Things to Remember (After R&A)
        const things = memories['Things to remember'] || [];
        const thingsChunks2 = chunkArray(things, 2);

        thingsChunks2.forEach((chunk, i) => {
            if (pIndex % 2 === 0 && i === 0) { // Isolation for start
                map[pIndex] = -1;
                pages.push(<Page key={`spacer-things-pre-${i}`} number={pIndex + 1} style={{ background: '#fff' }}><div /></Page>);
                pIndex++;
            }

            map[pIndex] = 'things'; // map to 'things' or just reuse last month? 
            // If we map to 'things', sidebar fails if we don't handle it.
            // Let's just map to -1 (no specific video) OR last month?
            // User put R&A in video section also.
            pages.push(
                <Page key={`things-${i}`} number={pIndex + 1} style={{ background: '#fff' }}>
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', paddingTop: '40px' }}>
                        {i === 0 && (
                            <h2 style={{ fontFamily: 'Caveat', textAlign: 'center', position: 'absolute', top: '10px', width: '100%', left: 0, zIndex: 10 }}>Things to Remember</h2>
                        )}
                        {chunk.map((item, idx) => (
                            <div key={idx} style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CollageItem src={item.src} width="100%" height="100%" onClick={() => handleMediaClick(item.src)} />
                            </div>
                        ))}
                    </div>
                </Page>
            );
            pIndex++;
        });

        // Back cover
        if (pIndex % 2 === 0) { map[pIndex] = -1; pages.push(<Page key="spacer-back" number={pIndex + 1} style={{ background: '#fff' }}><div style={{ opacity: 0.2, textAlign: 'center', paddingTop: '50%' }}>*</div></Page>); pIndex++; }
        map[pIndex] = -1;
        pages.push(<Page key="back" number={pIndex + 1} style={{ background: '#eee', border: 'none' }}><div /></Page>);

        return { pages, map };
    };

    const { pages, map } = generatePages();

    useEffect(() => {
        setPageMap(map);
    }, []);

    const onFlip = (e) => {
        setPageNumber(e.data);
    };

    useEffect(() => {
        let leftIndex = -1;
        let rightIndex = -1;
        if (pageNumber === 0) {
            rightIndex = map[0];
        } else {
            if (pageNumber % 2 !== 0) {
                leftIndex = map[pageNumber];
                rightIndex = map[pageNumber + 1];
            } else {
                leftIndex = map[pageNumber - 1];
                rightIndex = map[pageNumber];
            }
        }
        setLeftMonthIndex(leftIndex);
        setRightMonthIndex(rightIndex);
    }, [pageNumber, map]);

    const getVideos = (mIndex) => {
        if (mIndex >= 0 && mIndex < months.length) return processedMemories[mIndex].videos;
        // Fallback: If 'things' or unknown, maybe show random mix or empty?
        // User wants R&A to be in video section also. We added R&A to EVERY month.
        // If mIndex is -1 (cover/spacer), sidebar empty?
        // Let's show Month 0 videos for logic if undefined? No, keep empty.
        return [];
    };

    return (
        <div style={{
            display: 'flex',
            height: '100vh',
            background: '#e0e0e0', // Greyish backing
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Lightbox src={selectedMedia} onClose={() => setSelectedMedia(null)} />

            {/* Left Sidebar */}
            <div style={{ width: '200px', height: '100%', background: '#f5f5f5', borderRight: '1px solid #ddd', zIndex: 5, display: 'flex', flexDirection: 'column' }}>
                <SideVideoPlayer items={getVideos(leftMonthIndex)} />
            </div>

            {/* Center Book Area */}
            <div style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

                {/* Home Button */}
                <div
                    onClick={onGoHome}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 100,
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.9)',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        fontFamily: 'Caveat',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        color: '#333',
                        border: '1px solid #ddd'
                    }}
                >
                    🏠 Home
                </div>

                {/* Left Arrow */}
                <div
                    onClick={() => bookRef.current.pageFlip().flipPrev()}
                    style={{
                        position: 'absolute',
                        left: '20px',
                        zIndex: 50,
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        userSelect: 'none'
                    }}
                >
                    ‹
                </div>

                <div style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    <HTMLFlipBook
                        width={400} // Smaller size (~7 inch relative)
                        height={600}
                        size="fixed"
                        minWidth={300}
                        maxWidth={500}
                        minHeight={400}
                        maxHeight={800}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        usePortrait={false} // Force 2-page spread
                        mobileScrollSupport={true}
                        className="scrapbook-book"
                        flippingTime={800}
                        ref={bookRef}
                        onFlip={onFlip}
                    >
                        {pages}
                    </HTMLFlipBook>
                </div>

                {/* Right Arrow */}
                <div
                    onClick={() => bookRef.current.pageFlip().flipNext()}
                    style={{
                        position: 'absolute',
                        right: '20px',
                        zIndex: 50,
                        cursor: 'pointer',
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: '50%',
                        width: '50px',
                        height: '50px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        userSelect: 'none'
                    }}
                >
                    ›
                </div>

            </div>

            {/* Right Sidebar */}
            <div style={{ width: '200px', height: '100%', background: '#f5f5f5', borderLeft: '1px solid #ddd', zIndex: 5, display: 'flex', flexDirection: 'column' }}>
                <SideVideoPlayer items={getVideos(rightMonthIndex)} />
            </div>
        </div>
    );
};

export default Book;
