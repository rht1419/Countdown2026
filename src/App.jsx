import React, { useState } from 'react';
import LockScreen from './components/LockScreen';
import Book from './components/Book';
import NewYearCountdown from './components/NewYearCountdown';
import './styles/global.css';

function App() {
  const [hasEntered, setHasEntered] = useState(false); // Controls transition from Countdown to Book
  const [isUnlocked, setIsUnlocked] = useState(false); // Controls initial app access

  // Flow: LockScreen -> NewYearCountdown -> Book
  return (
    <div className="app-container">
      {!isUnlocked ? (
        <LockScreen onUnlock={() => setIsUnlocked(true)} />
      ) : hasEntered ? (
        <Book onGoHome={() => setHasEntered(false)} />
      ) : (
        <NewYearCountdown onEnterBook={() => setHasEntered(true)} />
      )}
    </div>
  );
}

export default App;
