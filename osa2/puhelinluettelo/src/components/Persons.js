import React from 'react'

import Person from './Person'

const Persons = (props) => {
    return (
        <ul>
            {props.items.map((item, index) =>
                <Person key={index} name={item.name} />
            )}
        </ul>
    )
}

export default Persons
