import todayBackground from './assets/bg-today-large.svg'

export default function WeatherDisplay({ location, weather }) {
    if (!location || !weather) return null; // don’t render until selected

    const current = weather.current;
    const daily = weather.daily;

    const daysOfWeek = daily.time.map(dateString => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const maxTemps = daily.temperature_2m_max;
    const minTemps = daily.temperature_2m_min;


const hourlyTimes = weather.hourly.time.slice(0, 7).map(t => {
    const date = new Date(t);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
});

const hourlyTemps = weather.hourly.temperature_2m.slice(0, 7);



    const style = {
        backgroundImage: `url(${todayBackground})`,
        backgroundSize: 'cover',
        height: '200px',
        width: '100%',
        borderRadius: '5px',
        padding: '40px'
    }

    return (
        <div className="weather-container">
            <div className="left-container">
                
                <div className="top-banner" style={style}>
                    <div className="name">
                        <h1>{location.name}, {location.country}</h1>
                        <p className='date'>
                            {new Date().toDateString()}
                        </p>
                    </div>
                    <div className="temp">
                        <h1 className='large'>{current.temperature_2m}°</h1>
                    </div>
                </div>

                <div className="weather-extra">
                    <div className='child'>
                        <h2>Feels like</h2>
                        <p>{current.apparent_temperature}°</p>
                    </div>

                    <div className='child'>
                        <h2>Humidity</h2>
                        <p>{current.relative_humidity_2m}%</p>
                    </div>

                    <div className='child'>
                        <h2>Wind</h2>
                        <p>{current.wind_speed_10m} km/h</p>
                    </div>

                    <div className='child'>
                        <h2>Precipitation</h2>
                        <p>{current.precipitation} mm</p>
                    </div>
                </div>
                <div className="daily-weather">
                    <h2>Daily Forecast</h2>
                    <div className="daily-update">
                        {
                            daysOfWeek.map((day, index) => {
                                return (
                                    <div className="daily-item" key={index}>
                                        <div className="top">
                                            <p>{day}</p>
                                        </div>
                                        <div className="bottom">
                                            <p>{maxTemps[index]}°</p>
                                            <p>{minTemps[index]}°</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="right-container">
                <h2>Hourly Forecast</h2>
                <div className="hourly-weather">
                    {hourlyTimes.map((time, index) => (
                        <div className="hour-item" key={index}>
                            <p>{time}</p>
                            <p>{hourlyTemps[index]}°</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
