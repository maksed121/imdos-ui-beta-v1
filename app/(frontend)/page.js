"use client"
import React from 'react'
import HeroSection from './components/HeroSection'
import Product from './components/Product'


const Home = () => {
  return (
    <div className='bg-white'>
    <HeroSection/>
    <Product/>
    </div>
  )
}

export default Home