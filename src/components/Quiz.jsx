import { useEffect, useState } from "react";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/questions/")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const submitQuiz = () => {
    let total = 0;

    questions.forEach(q => {
      const correct = q.options.find(o => o.is_correct);
      if (answers[q.id] === correct?.id) {
        total++;
      }
    });

    setScore(total);

    fetch("http://127.0.0.1:8000/api/submit-result/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        score: total
      })
    });
  };

  return (
    <div>
      <h1>Quiz Application</h1>

      <input
        placeholder="Enter your name"
        onChange={e => setUsername(e.target.value)}
      />

      {questions.map(q => (
        <div key={q.id}>
          <h3>{q.question_text}</h3>
          {q.options.map(opt => (
            <label key={opt.id}>
              <input
                type="radio"
                name={`q-${q.id}`}
                onChange={() =>
                  setAnswers({ ...answers, [q.id]: opt.id })
                }
              />
              {opt.text}
            </label>
          ))}
        </div>
      ))}

      <button onClick={submitQuiz}>Submit Quiz</button>

      {score !== null && (
        <h2>{username}, Your Score: {score}</h2>
      )}
    </div>
  );
}

export default Quiz;
