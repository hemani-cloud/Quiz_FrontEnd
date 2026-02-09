import { BrowserRouter, Routes, Route } from "react-router-dom"
import QuizList from "./components/QuizList"
import QuizPage from "./components/QuizPage"
import Result from "./components/Result"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
