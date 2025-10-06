import { useState } from 'react';
import Portfolio from './components/Portfolio';
import SnakeGameCpp from './components/SnakeGameCpp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'portfolio' | 'snake-game'>('portfolio');

  const navigateToSnakeGame = () => {
    setCurrentPage('snake-game');
    window.scrollTo(0, 0);
  };

  const navigateToPortfolio = () => {
    setCurrentPage('portfolio');
    window.scrollTo(0, 0);
  };

  return (
    <>
      {currentPage === 'portfolio' && (
        <Portfolio onNavigateToSnakeGame={navigateToSnakeGame} />
      )}
      {currentPage === 'snake-game' && (
        <SnakeGameCpp onBack={navigateToPortfolio} />
      )}
    </>
  );
}