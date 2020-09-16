import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
            <Link className="navbar-brand" to="/"><i className="fas fa-bars"></i>CRUD APP</Link>
             </nav>
        </div>
    )
}
