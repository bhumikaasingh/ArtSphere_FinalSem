import React from 'react'
import NavBar from '../Navbar/Navbar'
import Hero from '../Hero/Hero'
import heroimg from '../../images/ContactPage.jpg'
import ContactForm from '../Contact/ContactForm'
import Footer from '../Footer/Footer'
function Contactus() {
    return (
        <div>
            <NavBar/>
            <Hero cName="hero-mid"
            heroimg={heroimg}
            title="Contact us"
            btnClass='hide'
            url='/products'
            />
            <ContactForm/>
            <Footer/>
            
            
        </div>
    )
}

export default Contactus
