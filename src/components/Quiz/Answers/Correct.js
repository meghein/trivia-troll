import React from 'react';
import { useStateContext, useDispatchContext } from 'context/Provider';
import { ACTION } from 'reducer/reducer';
import { generateCorrect } from 'helpers/generators';
import './style.scss';

export default function Correct() {
  const { currentQ, resultsKey, answersKey, choice } = useStateContext();
  const dispatch = useDispatchContext();

  function handleNext() {
    dispatch({type: ACTION.CURRENT_Q, payload: 1})
    dispatch({type: ACTION.SCORE, payload: 1})
    dispatch({type: ACTION.RESULTS, payload: 'pending'})
  };

  const results = generateCorrect(resultsKey, answersKey, choice).map(option => {
    return option;
  })

  return (
    <div className='results'>
      <h1>CORRECT!</h1>
      <ul>{results}</ul>
      {currentQ <= 8 &&
        <button onClick={handleNext}>Ready for the next question?</button>
      }
      {currentQ === 9 &&
        <button onClick={handleNext}>View Score!</button>
      }
    </div>
  )
};
