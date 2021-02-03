import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { GlobalStyle, Wrapper } from './AppStyled';
import { QuestionState } from './API';
import Form from './components/Form';
import GameOver from './components/GameOver';
import Loading from './components/Loading';

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
};

const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [questions, setQuestions] = useState<QuestionState[]>([]);
    const [number, setNumber] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [score, setScore] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<string>('easy');
    const [category, setCategory] = useState<string>('9');
    const [totalQuestions, setTotalQuestions] = useState<string>('5');

    const startTrivia = async () => {
        setLoading(true);
        setGameStarted(true);

        const newQuestions = await fetchQuizQuestions(
            +totalQuestions,
            difficulty,
            category
        );
        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
        if (gameStarted) {
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;
            if (correct) setScore((prev) => prev + 1);
            const answerObj = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };
            setUserAnswers((prev) => [...prev, answerObj]);
        }
    };

    const nextQuestion = (): void => {
        const nextQuestion = number + 1;
        if (nextQuestion === +totalQuestions) {
            setUserAnswers([]);
        } else {
            setNumber(nextQuestion);
        }
    };

    const resetGame = (): void => {
        setGameStarted(false);
        setNumber(0);
        setUserAnswers([]);
        setCategory('');
    };

    return (
        <>
            <GlobalStyle category={category} />
            <Wrapper>
                <h1>TRIVIAL GAME</h1>
                {!gameStarted ? (
                    <Form
                        startTrivia={startTrivia}
                        setDifficulty={setDifficulty}
                        setCategory={setCategory}
                        setTotalQuestions={setTotalQuestions}
                    />
                ) : null}
                {userAnswers.length === +totalQuestions ? (
                    <GameOver
                        resetGame={resetGame}
                        score={score}
                        totalQuestions={totalQuestions}
                    />
                ) : null}
                {loading && <Loading />}
                {!loading &&
                    gameStarted &&
                    userAnswers.length !== +totalQuestions && (
                        <QuestionCard
                            questionNr={number + 1}
                            totalQuestions={+totalQuestions}
                            question={questions[number].question}
                            answers={questions[number].answers}
                            userAnswer={
                                userAnswers ? userAnswers[number] : undefined
                            }
                            callback={checkAnswer}
                        />
                    )}
                {gameStarted &&
                !loading &&
                userAnswers.length !== +totalQuestions ? (
                    <>
                        <p className='score'>Score: {score}</p>
                        <button onClick={resetGame} className='quit'>
                            Quit Game
                        </button>
                    </>
                ) : null}
                {gameStarted &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== +totalQuestions - 1 ? (
                    <button className='next' onClick={nextQuestion}>
                        Next Question
                    </button>
                ) : null}
            </Wrapper>
        </>
    );
};

export default App;
