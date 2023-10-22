import { Link, Route, Routes } from 'react-router-dom'

const NavBar = () => {
  return (
    <div class='navbar-container'>
      <div className='navbar-text-container'>
        <Link className='link-title'to={"/"}>
          <p className='navbar-text'>
            DashBoard
          </p>
        </Link>
      </div>

      <div className='navbar-text-container'>
        <Link className='link-title'to={"/"}>
          <p className='navbar-text'>
            Search
          </p>
        </Link>
      </div>
      
      <div className='navbar-text-container'>
        <Link className='link-title'to={"/"}>
          <p className='navbar-text'>
            About
          </p>
        </Link>
      </div>
    </div>
  )
}


export default NavBar