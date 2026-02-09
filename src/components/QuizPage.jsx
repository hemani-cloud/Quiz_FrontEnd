import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function QuizPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/quiz/${id}/`)
      .then(res => setQuestions(res.data))
  }, [id])

  const handleChange = (qid, ans) => {
    setAnswers({ ...answers, [qid]: ans })
  }

  const submitQuiz = () => {
    const payload = Object.keys(answers).map(qid => ({
      question_id: qid,
      answer: answers[qid]
    }))

    axios.post("http://127.0.0.1:8000/api/submit/", payload)
      .then(res => navigate("/result", { state: res.data }))
  }

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map(q => (
        <div key={q.id}>
          <h4>{q.question}</h4>
          {[q.option1, q.option2, q.option3, q.option4].map(opt => (
            <div key={opt}>
              <input
                type="radio"
                name={q.id}
                onChange={() => handleChange(q.id, opt)}
              /> {opt}
            </div>
          ))}
        </div>
      ))}
      <button onClick={submitQuiz}>Submit</button>
    </div>
  )
}

export default QuizPage
