import React from 'react'

const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
  }
  
  const Part = (props) => {
      return (
          <p id={props.id} key={props.index}>{props.label} {props.amount}</p>
      )
  }
  
  const Content = (props) => {
      return (
          <div>
          {props.parts.map((item, index) => <Part id={item.id} key={index} label={item.name} amount={item.exercises} />)}
          </div>
      )
  }
  
  const Total = (props) => {
      return (
          <p><strong>Number of exercises {props.parts}</strong></p>
      )
  }
  
  const Course = (props) => {
    const course =props.course
    return (
      <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} />
      </>
    )
  }

  export default Course
  