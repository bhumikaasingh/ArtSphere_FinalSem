import React from "react";
import CategoriesData from "./CategoriesData";
import "./PopularProducts.css";
import product1 from "../../images/product1.jpg";
import product2 from "../../images/product3.jpg"
import glass1 from "../../images/Wall Sculpture 1.jpg";
import glass2 from "../../images/Wall sculptures 2.jpg";
import culture1 from "../../images/Folk Cultural1.jpg";
import culture2 from "../../images/Traditional Cultural2.jpg";

const Popular=({products})=>{
    return(
        <div className="popular">
            <h1>Popular Categories</h1>
        <p>Discover the brilliance of talented artists through our curated art collections. Each piece is a testament to creativity and skill, offering a platform for artists to share their stories with the world.</p>
            <CategoriesData
            className="popular-products"
            heading="Paintings"
        text="Explore a captivating collection of paintings that bring life to any space. From bold abstracts to serene landscapes and detailed portraits, each piece reflects the unique talent and vision of our artists. Discover art that inspires and tells a story, perfect for adding beauty and character to your home or office."
            img1={product1}
            img2={product2}/>
            <CategoriesData
            className="popular-products-reverse"
        heading="Sculptures"
        text="Discover the beauty of three-dimensional art with our unique sculpture collection. From modern designs to timeless classics, each piece is a masterpiece crafted to add character and depth to any space. Perfect for making a bold statement or creating a serene atmosphere, these sculptures are a testament to creativity and craftsmanship."
            img1={glass1}
            img2={glass2}/>
             <CategoriesData
            className="popular-products"
            heading="Cultural Arts"
        text="Celebrate the beauty of traditions and heritage through our collection of cultural art. Each piece reflects the soul of a community, telling stories of history, identity, and craftsmanship. Perfect for adding a touch of global charm to your space."
            img1={culture1}
            img2={culture2}/>
        </div>

    )
}
export default Popular