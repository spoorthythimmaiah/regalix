import React from 'react'
import { NavLink } from 'react-router-dom'

const toolBar = () => {
    return (
        <ul className="toolbar" basename="/dashboard/pitch">
            <li>
                <NavLink exact activeClassName="active" to="/">
                    overview
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/reports">
                    reports
                </NavLink>
            </li>
        </ul>
    )
}

export default toolBar;