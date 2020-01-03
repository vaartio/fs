import React from 'react'

import { CountryListItem } from './Country'

const Countries = (props) => {
    return (
        <ul>
            {props.items.map((item, index) =>
                <CountryListItem key={index} name={item.name} onClick={props.onItemClick(item.name)} />
            )}
        </ul>
    )
}

export default Countries
