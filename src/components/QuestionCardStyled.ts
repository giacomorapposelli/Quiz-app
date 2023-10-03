import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 500px;
    background: rgba(0, 0, 0, 0.4);

    border-radius: 10px;
    border: 2px solid #f58733;
    padding: 20px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    text-align: center;
    box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);

    p {
        font-size: 1rem;
    }

    .number,
    .question {
        color: #fff;
    }
`;

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease;
    :hover {
        opacity: 0.7;
    }
    button {
        cursor: pointer;
        user-select: none;
        font-size: 0.8rem;
        width: 100%;
        height: 40px;
        margin: 5px 0;
        background: ${({ correct, userClicked }) =>
            correct
                ? 'linear-gradient(90deg, #56FFA4, #59BC86)'
                : !correct && userClicked
                ? 'linear-gradient(90deg, #FF5656, #C16868)'
                : 'linear-gradient(90deg, #3f9ce8, #6eafb4)'};
        border: 3px solid #ffffff;
        box-shadow: 1px 2px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        color: #fff;
        text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25);
    }
`;
