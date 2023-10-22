import { Link, Route, Routes } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <Link className='link-title'to={"/"}>
        <p className='link-title-text'>
          Irvine Weather
        </p>
      </Link>

    </>
  )
}


export default Header
