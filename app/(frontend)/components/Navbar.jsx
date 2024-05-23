"use client"
import { Input } from '@/components/ui/input'
import { Heart, Menu, Search, ShoppingCart, User2Icon, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='bg-white w-full px-[20px] md:px-[70px] pb-3 sticky top-0 shadow-md z-[99]'>
      <div className='flex items-center justify-between gap-4 md:gap-7 pt-[10px]'>
        <img src="/logo.png" alt="image" className='w-[80px] md:w-[100px] object-cover' />
        <div className='hidden md:flex items-center justify-between text-black shrink-0 gap-2'>
          <Link href="/" className='px-3 py-2 rounded hover:bg-zinc-200'>Home</Link>
          <Link href="/" className='px-3 py-2 rounded hover:bg-zinc-200'>Categories</Link>
          <Link href="/" className='px-3 py-2 rounded  hover:bg-zinc-200'>Brands</Link>
          <Link href="/" className='px-3 py-2 rounded  hover:bg-zinc-200'>About Us</Link>
        </div>
        <div className='hidden md:flex w-full relative text-black'>
          <Input type="text" placeholder="Search..." className="w-full px-3 md:px-5 bg-gray-200" />
          <button className='absolute right-0 top-[9px] mr-[10px] bg-gray-200'>
            <Search className='text-black' />
          </button>
        </div>

        <div className="flex items-center justify-between text-black gap-5 md:gap-3">
          <Search className='block md:hidden cursor-pointer' onClick={toggleSearch} />
          <Heart />
          <ShoppingCart />
          <User2Icon />
          <Menu
            className="block md:hidden h-[35px] bg-blue-400 w-[35px] p-1.5 rounded cursor-pointer text-black"
            onClick={toggleMenu}
          />
        </div>
      </div>

      {isSearchOpen && (
        <div className='md:hidden w-full relative text-black'>
          <button className='absolute right-0 top-[9px] mr-[10px] bg-gray-200'>
            <Search className='text-black' />
          </button>
          <Input type="text" placeholder="Search..." className="w-full px-3 md:px-5 bg-gray-200" />
        </div>
      )}

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-end">
          <div className="bg-[#a038b8] w-[300px] h-full flex flex-col justify-between">
            <div className="pt-6 px-6">
              <div className="flex justify-between">
              <img src="/logo.png" alt="image" className='w-[80px] md:w-[100px] object-cover text-white' />
                <button onClick={closeMenu}>
                  <X className="w-[30px] h-[30px] rounded  text-gray-700 bg-blue-400" />
                  
                </button>
              </div>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/">
                    <button className="text-gray-800 bg-[#a6c63b] text-lg px-4 py-2 w-full rounded-md hover:text-blue-600">Home</button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="text-gray-800 bg-[#a6c63b]  text-lg px-4 py-2 w-full rounded-md hover:text-blue-600">Categories</button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="text-gray-800 bg-[#a6c63b]  text-lg px-4 py-2 w-full rounded-md hover:text-blue-600">Brands</button>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <button className="text-gray-800 bg-[#a6c63b] text-lg px-4 py-2 w-full rounded-md hover:text-blue-600">About Us</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
