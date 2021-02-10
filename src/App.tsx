import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { GlobalStyle, Wrapper } from './GlobalStyle';
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
    const [counter, setCounter] = useState<number>(0);
    const [isActive, setIsActive] = useState(false);

    const startTrivia = async () => {
        setCounter(30);
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
        setIsActive(true);
    };

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
        setIsActive(false);
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
        setIsActive(false);
        setCounter(30);
        setIsActive(true);
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
        setIsActive(false);
        setCounter(0);
    };

    if (counter === 0 && isActive) {
        setIsActive(false);
        const answerObj = {
            question: questions[number].question,
            answer: '',
            correct: false,
            correctAnswer: questions[number].correct_answer
        };
        setUserAnswers((prev) => [...prev, answerObj]);
    }

    useEffect(() => {
        let intervalId: any;
        if (isActive && !loading) {
            intervalId = setInterval(() => {
                setCounter((counter) => counter - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter, loading]);

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
                    <div className='tracker'>
                        <p className='score'>
                            Time Left:{' '}
                            {counter === 1
                                ? `${counter} second`
                                : `${counter} seconds`}
                        </p>
                        <p className='score'>Score: {score}</p>
                    </div>
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
