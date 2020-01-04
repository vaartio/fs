import React from 'react'

import Person from './Person'

const Persons = (props) => {
    return (
        <ul>
            {props.items.map((item, index) =>
                <Person key={index} data={item} onClick={props.onItemClick(item)} />
            )}
        </ul>
    )
}

export default Persons
