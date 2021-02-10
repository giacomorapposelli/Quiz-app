import styled, { createGlobalStyle } from 'styled-components';
import movies from './images/movies.jpg';
import music from './images/music.jpg';
import history from './images/history.jpg';
import geography from './images/geography.jpg';
import videogames from './images/videogames.jpg';
import trivia from './images/trivia.jpg';
import mithology from './images/mithology.jpg';

type GlobalProps = {
    category: string;
};

export const GlobalStyle = createGlobalStyle<GlobalProps>`
  html {
    height: 100%;
  }
  body {
    background-image: url(${({ category }) =>
        category === '11'
            ? movies
            : category === '12'
            ? music
            : category === '15'
            ? videogames
            : category === '23'
            ? history
            : category === '20'
            ? mithology
            : category === '17'
            ? geography
            : trivia}), url(${trivia});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Raleway', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .reset {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .tracker {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .score {
        color: #fff;
        font-size: 1.5rem;
        margin: 10px 0;
    }

    label {
        font-size: 1.2rem;
        margin: 10px;
        color: #fff;
    }

    h1,
    .game-over {
        background-image: linear-gradient(180deg, #fff, #ffcc91);
        font-weight: 400;
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transparent;
        filter: drop-shadow(2px 2px #d38558);
        font-size: 60px;
        text-align: center;
        margin: 20px;
    }

    .game-over {
        font-size: 40px;
        filter: drop-shadow(2px 2px red);
        background-image: linear-gradient(180deg, #fff, red);
    }

    button:focus {
        outline: none;
    }

    .start,
    .next,
    .quit {
        cursor: pointer;
        background: linear-gradient(180deg, #ffffff, #ffcc91);
        border: 2px solid #d38558;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        height: 40px;
        margin: 10px 0;
        padding: 0 40px;
    }

    .start:hover {
        background: linear-gradient(180deg, #ffd19c, #de943e);
    }

    select,
    input {
        background: linear-gradient(90deg, #3f9ce8, #6eafb4);
        cursor: pointer;
        height: 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    }

    input {
        width: 70px;
    }

    .start {
        max-width: 200px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .loading  {
        color: #fff;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .spinner {
        height: 70px;
    }

    @media only screen and (max-width: 720px) {
        .score {
            font-size: 1rem;
        }

        h1 {
            font-size: 40px;
        }
    }
`;
