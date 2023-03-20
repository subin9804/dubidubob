import React from 'react';
import './Home.css';
import Product from './Product';
import Header from './Header';

function Home() {
    
    return (
        <>
        <Header />
        <div className='home'>
            <div className='home-container'>
                <img className='home_image' src='img/amazon-main.jpg' alt='' />
                    
                <div className="home_row">
                    <Product id="2323" title="제품1" price={3000} image="img/diamond.jpg" rating={2}/>
                    <Product id="2320" title="제품2" price={1000} image="img/bg2.png" rating={5}/>
                </div>

                <div className="home_row">
                    <Product id="2321" title="제품3" price={1500} image="img/img11.jpg" rating={3}/>
                    <Product id="2322" title="제품4" price={500} image="img/img8.jpg" rating={3}/>
                </div>
                
                <div className="home_row">
                    <Product id="2326" title="제품5" price={5200} image="img/img3.jpg" rating={4}/>
                </div>
            
            </div>
        </div>
        </>
    )
}

export default Home;