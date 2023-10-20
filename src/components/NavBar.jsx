import { useState } from 'react'

const NavBar = () => {
  return (
    <div class='navbar-container'>
      <div className='navbar-text-container'>
        <img></img>
        <p className='navbar-text'>DashBoard</p>
      </div>

      <div className='navbar-text-container'>
        <img></img>
        <p className='navbar-text'>Search</p>
      </div>
      
      <div className='navbar-text-container'>
        <img></img>
        <p className='navbar-text'>About</p>
      </div>
    </div>
  )
}


export default NavBar