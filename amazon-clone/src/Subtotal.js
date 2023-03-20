import React from "react";
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./Reducer";
import { useNavigate } from "react-router-dom";

function Subtotal() {
    const [{basket}, dispatch] = useStateValue();
    const navigate = useNavigate();

    return(
        <div className="subtotal">
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

            <button onClick={e => navigate("/payment")}>결제하기</button>
        </div>
    )
}

export default Subtotal;