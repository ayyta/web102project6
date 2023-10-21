import { useState } from 'react'

const Card = (props) => {
  return (
    <div className='jsx-card-container'>
      <div className='jsx-card-text'>{props.attr}</div>
      <div className='jsx-card-text'>{props.data}</div>
    </div>
  )
}


export default Card
