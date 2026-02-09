import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function QuizList() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/quizzes/")
      .then(res => setQuizzes(res.data))
  }, [])

  return (
    <div>
      <h2>Available Quizzes</h2>
      {quizzes.map(q => (
        <div key={q.id}>
          <Link to={`/quiz/${q.id}`}>{q.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default QuizList
