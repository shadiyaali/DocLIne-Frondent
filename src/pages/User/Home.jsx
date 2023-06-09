import React from 'react'
import Navbar from "../../components/User/Navbar"
import Banner from "../../components/User/Banner"
 
import Card from "../../components/User/Card"
import Card1 from "../../components/User/Card1"
 

function Home() {
  return (
    <div>
      <Navbar />
      
      <Banner/>
       
      <Card/>
      <Card1/>
    </div>
  )
}

export default Home
