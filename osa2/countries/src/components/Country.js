import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
  return (
    <div>
      <div><strong>temperature:</strong> {props.weather.temperature}</div>
      <div><img src={props.weather.icon} /></div>
      <div><strong>wind:</strong> {props.weather.wind}</div>
    </div>
  )
}

export const Country = (props) => {
  const data = props.details

  const [ weather, setWeather ] = useState({
    temperature: null,
    icon: '',
    wind: null,
  })

  useEffect(() => {
    console.log('effect')
    axios
    .get(`http://api.weatherstack.com/current?access_key=27a166cc7615c1881c8c4bc55aa889f7&query=${data.capital}`)
    .then(response => {
      console.log(response.data)
      setWeather({
        temperature: `${response.data.current.temperature} °C`,
        icon: response.data.current.weather_icons[0],
        wind: `${response.data.current.wind_speed} kph direction ${response.data.current.wind_dir}`,
      })
    })
  }, [])

  return (
    <div>
      <h2>{data.name}</h2>
      <div>
        capital: {data.capital}
      </div>
      <div>
        population {data.population}
      </div>
      <h3>languages</h3>
      <ul>
        {data.languages.map((item, index) => <li key={index}>{item.name}</li>)}
      </ul>
      <p>
        <img src={data.flag} width="100" height="100" alt={`The flag of ${data.name}`} />
      </p>
      <h3>Weather in {data.capital}</h3>
      <Weather key="weather" weather={weather} />
    </div>
  )
}

export const CountryListItem = (props) => {
  return (
    <li>{props.name} <button onClick={props.onClick}>show</button></li>
  )
}

export default Country
