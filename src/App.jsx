import { useEffect, useState } from 'react';
import './App.css';
import questiondata from './questions.json';

function App() {
  const [currentquestion, setCurrentquestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  const handlechangeoption = (selected_option) => {
    // Update score if the selected option is correct
    if (selected_option === questiondata[currentquestion].correctOption) {
      setScore((prevScore) => prevScore + 1);
    }
    // Check if it’s the last question
    if (currentquestion === questiondata.length - 1) {
      setShowScore(true);
    } else {
      setCurrentquestion((prevQuestion) => prevQuestion + 1);
      setTimer(10); // Reset timer for the next question
    }
  };

  const handleRestartQuiz = () => {
    setCurrentquestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  };

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      if (currentquestion === questiondata.length - 1) {
        setShowScore(true);
      } else {
        setCurrentquestion((prevQuestion) => prevQuestion + 1);
        setTimer(10);
      }
    }
    return () => clearInterval(interval);
  }, [timer, showScore, currentquestion]);

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="scoresection">
          <h3>Your Score: <span>{score}</span> / {questiondata.length}</h3>
          <button onClick={handleRestartQuiz}>Restart</button>
        </div>
      ) : (
        <div className="questionsection">
          <h1>Question: {currentquestion + 1}</h1>
          <h3>{questiondata[currentquestion].question}</h3>
          <div className="btn-style">
            {questiondata[currentquestion].options.map((option, index) => (
              <button key={index} onClick={() => handlechangeoption(option)}>
                {option}
              </button>
            ))}
          </div>
          <div className="timeleft">
            <h4>Time Left: <span>{timer}S</span></h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
