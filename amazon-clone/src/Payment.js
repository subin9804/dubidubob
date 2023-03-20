import React, {useEffect, useState} from 'react';
import './Payment.css';
import Header from './Header';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import { Link, useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import axios from './axios';
import { db } from './firebase';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const [disable, setDisable] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'POST',
                url: "/payments/create?total=" + getBasketTotal(basket) * 100
            });
            setClientSecret(response.clientSecret)
        }
        getClientSecret();
    }, [basket])

    console.log(clientSecret)

    const handleSubmit = async(event) => {
        event.preventDefault();
        setProcessing(true);

        // 결제
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        // 결제 후
        .then(({paymentIntent}) => {

            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })


            setSucceeded(true)
            setError(null)
            setProcessing("")

            dispatch({
                type: 'ENPTY_BASKET'
            })

            console.log(dispatch)

            navigate('/orders',{replace:false});
        })
    }

    const handleChange = (event) => {
        setDisable(event.empty);
        setError(event.error ? event.error.message: "");
    }


    return (
        <>
            <Header />
            <div className='payment'>
                <div classname='payment_container'>
                    <Link to="/checkout" className='checkoutlink'>
                        <h1>장바구니로 돌아가기  ({basket?.length}개의 상품목록이 존재합니다.)</h1>
                    </Link>

                    <div className='payment_section'>
                        <div className='payment_title'>
                            <h3>배달 받을 곳</h3>
                        </div>
                        <div className='payment_address'>
                            <p>{user?.email} 님의 주소</p>
                            <p>강원도</p>
                            <p>철원</p>
                        </div>
                    </div>

                    <div className='payment_section'>
                        <div className='payment_title'>
                            <h3>상품목록</h3>
                        </div>
                        <div className='payment_items'>
                            {
                                basket.map(item => (
                                    <CheckoutProduct id={item.id} title={item.title} image={item.image} price={item.price} rating={item.rating} />
                                ))
                            }
                        </div>
                    </div>

                    <div className='payment_section'>

                        <div className='payment_title'>
                            <h3>결제</h3>
                        </div>

                        <div className='payment_details'>

                            <form onSubmit={handleSubmit}>

                                <CardElement onChange={handleChange} />

                                <div className='payment_priceContainer'>
                                <CurrencyFormat 
                                    renderText = {(value) => (
                                        <>
                                            <p>
                                                총액 ({basket.length} items) : <strong>{value}원</strong>
                                            </p>
                                            <small className="subtotal_gift">
                                                <input type="checkbox" />
                                                체크박스입니다
                                            </small>
                                        </>
                                    )}

                                    decimalScale={2}    // 소숫점 둘째자리까지
                                    value={getBasketTotal(basket)}   // 값
                                    displayType={"text"}
                                    thousandSeparator={true}    // 천의자리 콤마
                                    prefix={"￦"}
                                />

                                    <button disabled={processing || disable || succeeded}><span>{processing ? <p>결제중입니다</p> : "결제하기"}</span></button>
                                </div>
                                {error && <div>{error}</div>}
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Payment;