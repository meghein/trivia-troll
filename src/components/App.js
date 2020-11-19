import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizProvider from 'context/Provider';
// import questions from 'data/questions.json';
import { generateRandomArr } from 'helpers/generators';
import Quiz from './Quiz';
import Footer from './Footer';
import './App.scss';

export default function App() {
  const [database, setDatabase] = useState('')
  const [page, setPage] = useState('initial');
  const [questionsArr, setQuestionsArr] = useState([]);

  useEffect(() => {
    const animal = axios.get(`https://opentdb.com/api.php?amount=50&category=27&type=multiple`);
    const general = axios.get(`https://opentdb.com/api.php?amount=50&category=9&type=multiple`);
    const myth = axios.get(`https://opentdb.com/api.php?amount=50&type=multiple`);
    Promise.all([animal, general, myth]).then(all => {
      console.log("categories:", all)
      setDatabase({animal: all[0].data.results, general: all[1].data.results, myth: all[2].data.results})
      setPage('splash')
    });
  }, [])

  function handleSplash(e) {
    // toggle splash-page/quiz components:
    setPage('quiz');

    // create round of 10 question from data store:
    setQuestionsArr(generateRandomArr(database[e.target.value], 10));
  }

  return (
    <div className='App'>
      <QuizProvider>
        {page === 'initial' &&
          <div>
            <h1>Welcome to Trivia Troll...</h1>
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        }
        {page === 'splash' && 
          <div className='splash-page' data-testid='splash'>
            <h1>Welcome to Trivia Troll</h1>
            <button data-testid='splash-button' onClick={handleSplash} value='animal'>Animal Kingdom</button>
            <button data-testid='splash-button' onClick={handleSplash} value='general'>General Knowledge</button>
            <button data-testid='splash-button' onClick={handleSplash} value='myth'>Mythology</button>
          </div>
        }
        {page === 'quiz' &&
          <Quiz
            questions={questionsArr}
            setQuestions={setQuestionsArr}
            database={database}
          />
        }
        <Footer/>
      </QuizProvider>
    </div>
  );
}