import React from 'react';
import { AnswerObject } from '../App';
import { Wrapper, ButtonWrapper } from './QuestionCardStyled';

type Props = {
    question: string;
    answers: string[];
    callback(e: React.MouseEvent<HTMLButtonElement>): void;
    userAnswer: AnswerObject | undefined;
    questionNr: number;
    totalQuestions: number;
};

const QuestionCard: React.FC<Props> = (props) => (
    <Wrapper>
        <p className='number'>
            Question: {props.questionNr} / {props.totalQuestions}
        </p>
        <p
            dangerouslySetInnerHTML={{ __html: props.question }}
            className='question'
        />
        <div>
            {props.answers.map((answer, ind) => (
                <ButtonWrapper
                    key={ind}
                    correct={props.userAnswer?.correctAnswer === answer}
                    userClicked={props.userAnswer?.answer === answer}
                >
                    <button
                        disabled={!!props.userAnswer}
                        onClick={props.callback}
                        value={answer}
                    >
                        <span
                            dangerouslySetInnerHTML={{
                                __html: answer
                            }}
                        />
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
);

export default QuestionCard;
