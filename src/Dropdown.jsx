import {useState} from 'react'

import unitIcon from './assets/icon-units.svg'
import iconDropDown from './assets/icon-dropdown.svg'
import markIcon from './assets/icon-checkmark.svg'

export default function Dropdown(){

    const [open, setOpen] = useState(false)

    const [tempUnit, setTempUnit] = useState('Celsius')
    const [speedUnit, setSpeedUnit] = useState('km/h')
    const [precipUnit, setPrecipUnit] = useState('millimeters')

    return(
        <div className="dropdown-wrapper">
            <button className='btn' onClick={()=>setOpen(prevState => !prevState)}>
                <img src={unitIcon} alt="" />
                Units
                <img src={iconDropDown} alt="" />
            </button>


            {
                open &&
                (   <div className='unit-lists'>
                        <div className="unit-category">
                            <p>Temperature</p>
                        </div>
                        <div className="temp-category">
                            <div className="temperature-lists">
                                <p onClick={()=>setTempUnit('temperature')}>Celsius &#8451;</p>
                                <span>{tempUnit === 'temperature' ? 
                                <img src={markIcon} alt="" />:
                                "" }
                                </span>
                            </div>

                            <div className="temperature-lists">
                                <p onClick={()=>setTempUnit('fahrenheit')}>Fahrenheit &#8457;</p>
                                <span>{tempUnit === 'fahrenheit' ? 
                                <img src={markIcon} alt="" />:
                                "" }
                                </span>
                            </div>
                        </div>

                        <div className="wind-category">
                            <div className="unit-category">
                                <p>Wind Speed</p>
                            </div>
                            <div className="wind-lists">
                                <p onClick={()=>setSpeedUnit('km/h')}>Km/h</p>
                                <span>{speedUnit === 'km/h' ? 
                                <img src={markIcon} alt="" />:
                                "" }
                                </span>
                            </div>

                            <div className="wind-lists">
                                <p onClick={()=>setSpeedUnit('mph')}>mph</p>
                                <span>{speedUnit === 'mph' ? 
                                <img src={markIcon} alt="" />:
                                "" }
                                </span>
                            </div>
                        </div>

                        <div className="prec-category">
                            <div className="unit-category">
                                <p>Precipitation</p>
                            </div>
                            <div className="prec-lists">
                                <p onClick={()=>setPrecipUnit('mm')}>Millimeters (mm)</p>
                                <span>{precipUnit === 'mm' ? 
                                <img src={markIcon} alt="" />:
                                "" }
                                </span>
                            </div>

                            <div className="prec-lists">
                                <p onClick={()=>setPrecipUnit('in')}>Inches (in)</p>
                                <span>{precipUnit === 'in' ? 
                                <img src={markIcon} alt="" />:
                                "" }
                                </span>
                            </div>
                        </div>
                        
                    </div>

                )
            }

        </div>
    )
}