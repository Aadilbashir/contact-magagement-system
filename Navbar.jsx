import React from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
const Navbar = () => {
  return (
    <>

      <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand ">
            <i class="bi bi-phone-fill text-warning"></i>
            CONTACT MANAGER
            <span className='text-warning mx-2'>APP</span> </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar