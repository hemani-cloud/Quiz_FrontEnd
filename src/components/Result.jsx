import { useLocation } from "react-router-dom"

function Result() {
  const { state } = useLocation()

  return (
    <div>
      <h2>Result</h2>
      <h3>Your Score: {state?.score}</h3>
    </div>
  )
}

export default Result
