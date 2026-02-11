import { useEffect, useState } from "react";
import axios from "axios";

function Quiz() {
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get("https://quiz-backend.onrender.com/api/questions/")
      .then(res => setQuestions(res.data));
  }, []);

  const handleOptionChange = (qId, isCorrect) => {
    setAnswers({
      ...answers,
      [qId]: isCorrect
    });
  };

  const submitQuiz = () => {
    let score = 0;
    Object.values(answers).forEach(val => {
      if (val) score++;
    });

    axios.post("https://quiz-backend.onrender.com/api/submit-result/", {
      username: username,
      score: score,
      total_questions: questions.length
    })
    .then(res => setResult(res.data));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Quiz Application</h1>

      {!result && (
        <>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          {questions.map((q, index) => (
            <div key={q.id}>
              <h3>{index + 1}. {q.question}</h3>
              {q.options.map(opt => (
                <label key={opt.id}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    onChange={() =>
                      handleOptionChange(q.id, opt.is_correct)
                    }
                  />
                  {opt.text}
                  <br />
                </label>
              ))}
            </div>
          ))}

          <button onClick={submitQuiz}>Submit Quiz</button>
        </>
      )}

      {result && (
        <div>
          <h2>🎉 Result</h2>
          <p><b>User:</b> {result.username}</p>
          <p><b>Score:</b> {result.score} / {result.total_questions}</p>
          <p><b>Date:</b> {new Date(result.submitted_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
