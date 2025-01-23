import React from 'react'
import NavBar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import heroimg from '../../images/about1.jpg'
import Footer from '../Footer/Footer'
import About from '../About/About'
function Aboutus(){
    return(
        <div>
            <NavBar/>
            <Hero cName="hero-mid"
            heroimg={heroimg}
            title="About us"
            description="Welcome to ArtSphere, Where the brilliance of creativity meets the artistry of expression. With a dedication to bringing inspiring masterpieces into every aspect of your life."
            btnClass='hide'
            />
            <About/>
            <Footer/>
           
        </div>
    )

}

export default Aboutus
