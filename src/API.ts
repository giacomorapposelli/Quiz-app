import { shuffleArray } from './utils';

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export type QuestionState = Question & {
    answers: string[];
};

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export enum Category {
    GENERAL = 9,
    MOVIES = 11,
    MUSIC = 12,
    VIDEOGAMES = 15,
    MITHOLOGY = 20,
    GEOGRAPHY = 22,
    HISTORY = 23
}

export const fetchQuizQuestions = async (
    amount: number,
    difficulty: string,
    category: string
) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${category}`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
        ...question,
        answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer
        ])
    }));
};
