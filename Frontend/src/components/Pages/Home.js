import React, { useState, useEffect } from "react";
import NavBar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import heroimg from "../../images/painting1.jpg";
import Popular from "../PopularProducts/PopularProducts";
import Footer from "../Footer/Footer";

function Home() {
    const [userIsActive, setUserIsActive] = useState(true);

  
    const handleUserInactivity = () => {
        setUserIsActive(false);
    };

    useEffect(() => {
        let inactivityTimer;

        if (userIsActive) {
            inactivityTimer = setTimeout(() => {
                console.log("User logged out due to inactivity");
            }, 50000); 
        }

        return () => clearTimeout(inactivityTimer);
    }, [userIsActive]);

    useEffect(() => {
        const activityListener = () => {
            setUserIsActive(true);
        };

        window.addEventListener("mousemove", activityListener);
        window.addEventListener("keydown", activityListener);

        return () => {
            window.removeEventListener("mousemove", activityListener);
            window.removeEventListener("keydown", activityListener);
        };
    }, []);

    return (
        <>
            <NavBar />
            <Hero
                cName="hero"
                heroimg={heroimg}
                title="Welcome to ArtSphere"
                description="Welcome to ArtSphere, where nature's beauty meets artistic imagination."
                buttontext="Explore"
                btnClass="show"
                url="http://localhost:3000/products"
            />
            <Popular />
            <Footer />
        </>
    );
}

export default Home;
