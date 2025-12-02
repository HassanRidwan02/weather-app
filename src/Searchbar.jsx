import {useState} from 'react'


import searchIcon from './assets/icon-search.svg'


export default function Searchbar(){
    const [query, setQuery] = useState('')
    const [results, setResults] = useState(['Berlin', 'Niger', 'Nigeria', 'Saudi Arabia'])

    async function handleSearch(e) {
        e.preventDefault()

        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`)

        const data = await res.json()
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <div className='search-category'>
                    <div className="search">
                        <img src={searchIcon} alt="" />
                        <input 
                        type="text" 
                        value={query}
                        onChange={(e)=> setQuery(e.target.value)}/>
                    </div>
                    <button>Search</button>
                </div>
            </form>
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