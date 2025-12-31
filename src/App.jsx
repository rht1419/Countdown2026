import React, { useState } from 'react';
import LockScreen from './components/LockScreen';
import Book from './components/Book';
import NewYearCountdown from './components/NewYearCountdown';
import './styles/global.css';

function App() {
  const [hasEntered, setHasEntered] = useState(false); // Controls transition from Countdown to LockScreen
  const [isUnlocked, setIsUnlocked] = useState(false); // Controls transition from LockScreen to Book

  // Flow: NewYearCountdown -> LockScreen -> Book
  return (
    <div className="app-container">
      {!hasEntered ? (
        <NewYearCountdown onEnterBook={() => setHasEntered(true)} />
      ) : !isUnlocked ? (
        <LockScreen onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <Book onGoHome={() => {
          setHasEntered(false);
          setIsUnlocked(false);
        }} />
      )}
    </div>
  );
}

export default App;
