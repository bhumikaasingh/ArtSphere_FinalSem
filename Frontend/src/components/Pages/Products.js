import React  from "react";
import NavBar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import heroimg from "../../images/product.jpg";
import Footer from "../Footer/Footer";
import ProductsContainer from "../Products/ProductsContainer";
import { useEffect } from "react";
import ProductService from "../../services/productService";

function Products({products,setProducts}){
    useEffect(()=>{
        ProductService.getAll()
        .then(response => {
            setProducts(response.data.data)
        }).catch(err => console.log(err))
}, [])


    return(
        <div>
            <NavBar/>
            <Hero cName="hero-mid"
            heroimg={heroimg}
            title="Our Products"
            description="Over 100 products to choose from"
            btnClass='hide'
            />
            
            <ProductsContainer products={products}/>
            <Footer/>
        </div>


    )
}

export default Products