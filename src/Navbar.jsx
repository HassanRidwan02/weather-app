import logo from './assets/logo.svg'
import units from './assets/icon-units.svg'
import dropdown from './assets/icon-dropdown.svg'

import Dropdown from './Dropdown'

export default function Navbar(){
    return(
        <div className="navbar">
            <img src={logo} alt="" />
            <Dropdown />
        </div>
    )
}