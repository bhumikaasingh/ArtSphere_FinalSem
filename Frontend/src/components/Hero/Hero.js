import React from 'react';
import "./Hero.css";
function Hero(props){
    return (
       <>
       <div className={props.cName}>
                <img alt="Herosection" src={props.heroimg} />
                <div className='hero-text'>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                    <button className={props.btnClass} onClick={() => window.location.href = props.url}>
                        {props.buttontext}
                    </button>
                </div>
            </div>
       </>
    )

}
export default Hero