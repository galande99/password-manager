import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 flex justify-between items-center px-4  h-14 text-white'>
        <div className="mycontainer flex justify-between items-center px-4  h-14">

        <div className="logo font-bold text-white text-2xl mx-auto">
            <span className='text-green-700'>  &lt;</span>
            
            Pass
            <span className='text-green-700'>OP / &gt;</span>
           
            </div>
      <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="">About</a>
            <a className='hover:font-bold' href="">Home</a>
            <a className='hover:font-bold' href="">Contact</a>
        </li>
      </ul>
      <button className='text-white '> 
        <img className='invert p-5 w-24' src="/images/git-logo.png" alt="github logo" />
      </button>
        </div>
    </nav>
  )
}

export default Navbar 
