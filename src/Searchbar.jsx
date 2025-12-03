import {useState, useEffect} from 'react'


import searchIcon from './assets/icon-search.svg'


export default function Searchbar(){
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(()=>{
        if (query.trim() === '') {
            setResults([])
            return
        }

        async function fetchData(){
            const response = await fetch(                `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`)

            const data = await response.json()
            const resultsArray = data.results || []
            const names = resultsArray.map(result => result.name)
            const unique = Array.from(new Set(names))
            setResults(unique)

        }

        fetchData()

    },[query])

    return (
        <div>
                <div className='search-category'>
                    <div className="search">
                        <img src={searchIcon} alt="" />
                        <input 
                        type="text" 
                        value={query}
                        placeholder = 'Search for a place'
                        onChange={(e)=> setQuery(e.target.value)}/>
                    </div>
                    <button>Search</button>
                </div>
            <div className='suggestions'>
                {results.length > 0 ? (
                    results.map((result, index) => {
                        return(
                            <p key={index}>{result}</p>
                        )
                    })
                ) : null}
            </div>
        </div>
    )
}