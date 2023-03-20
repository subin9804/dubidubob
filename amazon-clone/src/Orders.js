import React from "react";
import './Orders.css';
import Order from "./Order";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { db } from './firebase';

function Orders() {
    const [{basket, user}, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user) {
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([])
        }
    }, [user])

    return (
        <>
            <Header/>
            <div className="orders">
                <h1>주문내역</h1>
                <div className="orders_roder">
                    {orders?.map(order => (
                        <Order order={order} />
                        ))}
                </div>
            </div>
        </>
    )
}

export default Orders;