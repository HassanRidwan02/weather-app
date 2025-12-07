import { useState, useEffect } from 'react';
import searchIcon from './assets/icon-search.svg';

import WeatherDisplay from './WeatherDisplay'

export default function Searchbar() {
    const [query, setQuery] = useState(''); //this is the name of the country being typed in the search bar
    const [results, setResults] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);


async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?` +
            `latitude=${location.latitude}&` +
            `longitude=${location.longitude}&` +
            `current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&` +
            `hourly=temperature_2m,precipitation,weather_code&` +
            `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
            `timezone=auto`
        );
        const data = await response.json();
        setWeatherData(data);
    } catch (error) {
        console.error(error);
    }
}


function handleSelectLocation(location) {
    setSelectedLocation(location);
    fetchWeather(location);
    setResults([]); // Clear suggestions
    setQuery(''); // Clear search input
    console.log(weatherData)
}

// async function fetchData(q) {
//         try {
//             const response = await fetch(
//                 `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=10&language=en&format=json`
//             );

//             const data = await response.json();
//             const locations = (data.results || []).map(r => ({
//                 name: r.name,
//                 country: r.country,
//                 latitude: r.latitude,
//                 longitude: r.longitude,
//                 admin1: r.admin1
//             }));
//             // setResults(Array.from(new Set(names)));
//         } catch (error) {
//             console.error(error);
//             setResults(locations);
//         }
//     }



// query is the name of the city to be searched
async function fetchData(q) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=10&language=en&format=json`
        );
        //call the api with the name and store basic
        // info about the city in 'locations'
        const data = await response.json();
        const locations = (data.results || []).map(r => ({
            name: r.name,
            country: r.country,
            latitude: r.latitude,  // Fixed typo
            longitude: r.longitude,
            admin1: r.admin1
        }));
        setResults(locations);  // Fixed variable name
    } catch (error) {
        console.error(error);
        setResults([]);  // Fixed error handling
    }
}

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (query.trim() === '') {
                setResults([]);
                return;
            }
            fetchData(query);
        }, 400);

        return () => clearTimeout(timeout);
    }, [query]);

    return (
        <div>
            <div className="search-category">
                <div className="search">
                    <img src={searchIcon} alt="" />
                    <input
                        type="text"
                        value={query}
                        placeholder="Search for a place"
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
                <button onClick={() => fetchData(query)} >Search</button>  
            </div>

           <div className="suggestions">
                {results.map((result, index) => (
                    <p 
                        key={index}
                        onClick={() => handleSelectLocation(result)}
                        style={{ cursor: 'pointer' }}
                    >
                        {result.name}
                        {result.admin1 && `, ${result.admin1}`}
                        {result.country && `, ${result.country}`}
                    </p>
                ))}
            </div>

            <WeatherDisplay 
                location={selectedLocation}
                weather={weatherData}
            />

        </div>

    );
}
