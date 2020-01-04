import React from 'react'

const Person = (props) => {
  return (
    <li>{props.data.name} {props.data.number} <button onClick={props.onClick}>delete</button></li>
  )
}

export default Person
