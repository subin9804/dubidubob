import React from 'react';
import './Order.css';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

function Order({order}) {
    return (
        <div className='order'>
            <h2>주문</h2>
            <p>{moment.unix(order.data.created).format()}</p>

            <p className='order_id'>
                <small>{order.id}</small>
            </p>

            {order.data.basket?.map(item => (
                <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                hideButton
                />
            ))}
            <CurrencyFormat 
                renderText = {(value) => (
                    <>
                        <h3 className='order_total'>최종주문 총액: {value} 원</h3>
                    </>
                )}

                decimalScale={2}    // 소숫점 둘째자리까지
                value={order.data.amount/100}   // 값
                displayType={"text"}
                thousandSeparator={true}    // 천의자리 콤마
                prefix={"￦"}
            />
        </div>
    )
}

export default Order;