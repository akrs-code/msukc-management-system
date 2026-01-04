import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Office from '../components/Office'
import AboutSection from '../components/AboutSection'
import Programs from '../components/Programs'
import Instructors from '../components/Instructors'
import PostSection from '../components/PostSection'
import Footer from '../components/Footer'
import Testimonials from '../components/Testimonials'

const Landing = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Office />
      <AboutSection />
      <Programs />
      <Instructors />
      <PostSection />
      <Testimonials />
      <Footer />
      
    </div>
  )
}

export default Landing