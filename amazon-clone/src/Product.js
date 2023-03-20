import React from 'react';
import './Product.css';
import { useStateValue } from './StateProvider';


function Product({id, title, image, price, rating}) {
    
    const [{basket}, dispatch] = useStateValue();

    const addToBasket = () => {
        // dispatch: action을 reducer로 넘긴다.
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className='product'>
            <div className='product_info'>
                <p>{title}</p>
                <p className='product_price'>
                    <small>가격</small>
                    <strong>{price}</strong>
                    <small>원</small>
                </p>

                <div className='product_rating'>
                    {
                        // rating 크기만큼의 Array가 생성되고 fill 메서드에 의해 정의됨
                        // 즉 rating 이 5일경우 5개의 공간을 가진 Array가 생성되고 fill의 인자가 비어있으므로 각각의 공간은 정의되지 않은 빈 공간이 된다.
                        // map 메서드는 새로운 배열을 만드는데, 내부의 메서드와 매핑하여 각 빈공간에 별을 넣어서 배열을 만들게 된다.
                        Array(rating).fill().map(() => (
                            <p>★</p>
                        ))
                    }
                </div>
            </div>
            <img src={image} alt='' />
            <button onClick={addToBasket}>장바구니에 담기</button>
        </div>
    );
}
export default Product;