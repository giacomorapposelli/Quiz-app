import React from 'react';
import spinner from '../images/spinner.svg';

const Loading: React.FC = () => (
    <div className='loading'>
        <h2>Loading...</h2>
        <img src={spinner} alt='loading' className='spinner' />
    </div>
);

export default Loading;
