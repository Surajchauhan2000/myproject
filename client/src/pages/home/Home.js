import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import "./home.css";
import PropertyList from '../../components/propertyList/PropertyList';
import Featuredproperties from '../../components/featuredproperties/Featuredproperties';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
// import Hotel from '../hotel/Hotel';
// import Navbar from '../../components/navbar/navbar';
// import Navbar from '../../components/navbar/Navbar';
const Home = () => {
  return (
    <div> 
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse By properties Type </h1>
        <PropertyList/>
        <h1 className="homeTitle">Home guest Love </h1>
        <Featuredproperties/>
        <MailList/>
        <Footer/>

      {/* <Hotel/> */}
      </div>
    </div>
  )
}

export default Home
