import React from 'react';
import { Difficulty, Category } from '../API';

interface FormProps {
    startTrivia(): void;
    setDifficulty: Function;
    setCategory: Function;
    setTotalQuestions: Function;
}

const Form: React.FC<FormProps> = (props) => (
    <form onSubmit={props.startTrivia}>
        <label htmlFor='difficulty'>Difficulty: </label>
        <select
            name='difficulty'
            id='difficulty'
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                props.setDifficulty(event.target.value)
            }
        >
            <option value={Difficulty.EASY}>Easy</option>
            <option value={Difficulty.MEDIUM}>Medium</option>
            <option value={Difficulty.HARD}>Hard</option>
        </select>
        <label htmlFor='category'>Choose Category: </label>
        <select
            name='category'
            id='category'
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                props.setCategory(event.target.value)
            }
        >
            <option value={Category.GENERAL}>General</option>
            <option value={Category.HISTORY}>History</option>
            <option value={Category.GEOGRAPHY}>Geography</option>
            <option value={Category.MOVIES}>Movies</option>
            <option value={Category.MUSIC}>Music</option>
            <option value={Category.VIDEOGAMES}>Video Games</option>
            <option value={Category.SCIENCE}>Science & Nature</option>
            <option value={Category.MITHOLOGY}>Mithology</option>
        </select>
        <label htmlFor='questions'>Number Of Questions: </label>
        <input
            type='number'
            name='questions'
            id='questions'
            min='5'
            max='30'
            step='5'
            defaultValue='5'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                props.setTotalQuestions(event.target.value)
            }
        />
        <button className='start' onClick={props.startTrivia}>
            Start
        </button>
    </form>
);

export default Form;
