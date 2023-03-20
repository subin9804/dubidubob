import React from 'react';
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Header from './Header';

function Checkout() {
    const [{basket, user}, dispatch] = useStateValue();

    return (
        <>
        <Header />
        <div className='checkout'>
            <div className='checkout_left'>
                <img className='checkout_ad' src="img/amazon-banner.jpg" alt="" />
                <div>
                    <h2 className='checkout_title'>
                        {user?.email}의 장바구니입니다.
                    </h2>
                    
                    {basket.map(item => (
                        <CheckoutProduct 
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            />
                            ))}

                </div>
            </div>
            <div className='checkout_right'>
                <Subtotal />
            </div>
        </div>
        </>
    )   
}

export default Checkout;