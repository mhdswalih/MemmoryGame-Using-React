import { useEffect, useMemo, useState } from "react";

import '../levelscss/level1.css'
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
const gameIcon = ['🎉', '🌟', '🚀', '❤️', '🐱', '🍕', '🌈', '🎶', '☀️', '🌍', '🍀', '🎉'];

function Level1() {
  const [pieces, setPieces] = useState([]);
  const navigate = useNavigate()
  const isGameCompleted = useMemo(() => {
    return pieces.length > 0 && pieces.every((piece) => piece.solved);
  }, [pieces]);

  const startGame = () => {
    const duplicateGameIcons = [...gameIcon, ...gameIcon];
    const newGameIcons = [];

    while (newGameIcons.length < gameIcon.length * 2) {
      const randomIndex = Math.floor(Math.random() * duplicateGameIcons.length);
      newGameIcons.push({
        emoji: duplicateGameIcons[randomIndex],
        flipped: false,
        solved: false,
        position: newGameIcons.length,
      });
      duplicateGameIcons.splice(randomIndex, 1);
    }
    setPieces(newGameIcons);
  };

  useEffect(() => {
    startGame();
  }, []);

  const handleActive = (index) => {
    const flippedCards = pieces.filter((item) => item.flipped && !item.solved);
    if (flippedCards.length >= 2 || pieces[index].solved) return;

    const newPieces = pieces.map((piece, i) =>
      i === index ? { ...piece, flipped: !piece.flipped } : piece
    );
    setPieces(newPieces);
  };

  const gamelogicFlipped = () => {
    const flippedData = pieces.filter((item) => item.flipped && !item.solved);

    if (flippedData.length === 2) {
      setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          setPieces((prevPieces) =>
            prevPieces.map((item) =>
              item.position === flippedData[0].position || item.position === flippedData[1].position
                ? { ...item, solved: true }
                : item
            )
          );
        } else {
          setPieces((prevPieces) =>
            prevPieces.map((item) =>
              item.position === flippedData[0].position || item.position === flippedData[1].position
                ? { ...item, flipped: false }
                : item
            )
          );
        }
      }, 800);
    }
  };

  useEffect(() => {
    gamelogicFlipped();
  }, [pieces]);

  return (
    <>
      {/* <Navbar /> */}
      <main>
        <h1>Memory Game</h1>
        <div className="container">
          {pieces.map((item, index) => (
            <div
              className={`flip-card ${item.flipped ? 'active' : ''}`}
              key={index}
              onClick={() => handleActive(index)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front" />
                <div className="flip-card-back">{item.emoji}</div>
              </div>
            </div>
          ))}
        </div>
        {isGameCompleted && (
          <div className="game-completed">
            <h1>YOU WIN!</h1>
            <button className='retrybtn' onClick={()=>navigate('/level-2')}>Next-Level</button>
            <Confetti width={window.innerWidth} height={window.innerHeight} />
          </div>
        )}
      </main>
    </>
  );
}
export default Level1;