import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
      <h1>{props.course}</h1>
  )
}

const Part = (props) => {
    return (
        <p key={props.index}>{props.label} {props.amount}</p>
    )
}

const Content = (props) => {
    return (
        <div>
        {props.parts.map((item, index) => <Part key={index} label={item.name} amount={item.exercises} />)}
        </div>
    )
}

const Total = (props) => {
    return (
        <p>Number of exercises {props.parts}</p>
    )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))