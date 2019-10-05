import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ title }) => <h2>{title}</h2>

const Button = ({ label, handler }) => <button onClick={handler} >{ label }</button>

const Statistic = ({ label, value }) => <tr><td>{ label }</td><td>{ value }</td></tr>

const Statistics = ({ title, good, neutral, bad }) => {
    const sum = good + neutral + bad
    if (sum === 0) {
        return (
            <div>
                <Header title={title} />
                <p>No feedback given</p>
            </div>
        )
    }
    const avg = sum ? (good - bad) / sum : ''
    const positive = sum ? good / sum * 100 + ' %' : ''
    return (
        <>
        <Header title={title} />
        <table>
            <tbody>
                <Statistic label="good" value={good} />
                <Statistic label="neutral" value={neutral} />
                <Statistic label="bad" value={bad} />
                <Statistic label="all" value={sum} />
                <Statistic label="average" value={avg} />
                <Statistic label="positive" value={positive} />
            </tbody>
        </table>
        </>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValue = (counter, handler) => () => handler(counter + 1)

  return (
    <div>
      <Header title="give feedback" />
      <Button label="good" handler={setValue(good, setGood)} />
      <Button label="neutral" handler={setValue(neutral, setNeutral)} />
      <Button label="bad" handler={setValue(bad, setBad)} />
      <Statistics title="statistics" good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)