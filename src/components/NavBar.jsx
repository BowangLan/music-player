import React from 'react'
import { HiMenu, HiArrowLeft } from 'react-icons/hi';

export default function NavBar() {
  const handleClick = () => {
    document.querySelector('aside').classList.toggle('-translate-x-full')
  }
  return (
    <nav className="relative w-full h-20 flex justify-center items-center bg-white">
      <span className="inline-block text-xl font-bold">Music App</span>
      <HiMenu size={28} className="lg:hidden absolute right-8 cursor-pointer" onClick={handleClick} />
      <HiArrowLeft size={28} className="invisible lg:hidden absolute left-8 cursor-pointer" />
    </nav>
  )
}
