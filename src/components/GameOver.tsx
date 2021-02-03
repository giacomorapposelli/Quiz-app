import React from 'react';

type GameOverProps = {
    score: number;
    totalQuestions: number | string;
    resetGame(): void;
};

const GameOver: React.FC<GameOverProps> = (props) => (
    <div className='reset'>
        <h2 className='game-over'>GAME OVER</h2>
        <p className='score'>
            Correct Answers: {props.score} / {props.totalQuestions}
        </p>
        <button onClick={props.resetGame} className='start'>
            Play Again?
        </button>
    </div>
);

export default GameOver;
