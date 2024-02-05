import React from 'react'
import './Header.css';
import headerImg from '../assets/currencyHeader.png'
const Header = () => {
  return (
    <div  class="max-w-2xl cover mb-24 shadow-[0px_6px_20px_0px] shadow-sky-300 rounded overflow-hidden shadow-lg m-auto " >
      <img src={headerImg} alt='headerimage'/>
    </div>
  )
}

export default Header