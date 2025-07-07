import { useEffect, useMemo, useState } from "react";
import Confetti from 'react-confetti';
import card1 from '../../images/card-1.jpeg';
import card2 from '../../images/card-2.jpeg';
import card3 from '../../images/card-3.jpeg';
import card4 from '../../images/card-4.jpeg';
import card5 from '../../images/card-5.jpeg';
import card6 from '../../images/card-6.jpeg';
import card7 from '../../images/card-7.jpeg';
import card8 from '../../images/card-8.jpeg';
import card9 from '../../images/card-9.jpeg';
import card10 from '../../images/card-10.jpeg';
import card11 from '../../images/card-11.jpeg';
import card12 from '../../images/card-12.jpeg';
import '../levelscss/level1.css';
// import '../levelscss/level2.css'

const gameImages = [
  { id: 1, src: card1 },
  { id: 2, src: card2 },
  { id: 3, src: card3 },
  { id: 4, src: card4 },
  { id: 5, src: card5 },
  { id: 6, src: card6 },
  { id: 7, src: card7 },
  { id: 8, src: card8 },
  { id: 9, src: card9 },
  { id: 10, src: card10 },
  { id: 11, src: card11 },
  { id: 12, src: card12 },
];

function Level2() {
  const [pieces, setPieces] = useState([]);
  const [isClickable, setIsClickable] = useState(true);

  const isGameCompleted = useMemo(() => {
    return pieces.length > 0 && pieces.every((piece) => piece.solved);
  }, [pieces]);

  const startGame = () => {
    const duplicateGameImages = [...gameImages, ...gameImages];
    const newGamePieces = [];

    while (newGamePieces.length < gameImages.length * 2) {
      const randomIndex = Math.floor(Math.random() * duplicateGameImages.length);
      newGamePieces.push({
        id: duplicateGameImages[randomIndex].id,
        src: duplicateGameImages[randomIndex].src,
        flipped: false,
        solved: false,
        position: newGamePieces.length,
      });
      duplicateGameImages.splice(randomIndex, 1);
    }
    setPieces(newGamePieces);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (index) => {
    if (!isClickable || pieces[index].flipped || pieces[index].solved) return;

    setIsClickable(false);
    
    const flippedCards = pieces.filter((item) => item.flipped && !item.solved);
    const newPieces = pieces.map((piece, i) =>
      i === index ? { ...piece, flipped: true } : piece
    );
    setPieces(newPieces);

    if (flippedCards.length === 1) {
      setTimeout(() => {
        const [firstCard] = flippedCards;
        const secondCard = newPieces[index];

       if (firstCard.id === secondCard.id) {
            setPieces(prevPieces =>
                prevPieces.map((item) =>
                item.position === firstCard.position || item.position === secondCard.position
                    ? { ...item, solved: true, flipped: true } 
                    : item
                )
            );
        } else {
          setPieces(prevPieces =>
            prevPieces.map((item) =>
              item.flipped && !item.solved ? { ...item, flipped: false } : item
            )
          );
        }
        setIsClickable(true);
      }, 800);
    } else {
      setIsClickable(true);
    }
  };

  return (
    <>
      <main>
        <h1>Memory Game</h1>
        <div className="container">
          {pieces.map((item, index) => (
            <div
              className={`flip-card ${item.flipped ? 'active' : ''} ${item.solved ? 'solved' : ''}`}
              key={index}
              onClick={() => handleActive(index)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front" />
                <div className="flip-card-back">
                  <img src={item.src} alt={`Card ${item.id}`} className="card-image" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {isGameCompleted && (
          <div className="game-completed">
            <h1>YOU WIN!</h1>
            <button className='retrybtn' onClick={startGame}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 4v6h6"/>
                <path d="M23 20v-6h-6"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
              </svg>
              Retry
            </button>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
        )}
      </main>
    </>
  );
}

export default Level2;