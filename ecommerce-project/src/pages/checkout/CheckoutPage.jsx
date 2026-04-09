import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';

export function CheckoutPage({ cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime').then((response) => {
            setDeliveryOptions(response.data);
        });

        axios.get('http://localhost:3000/api/payment-summary').then((response) => {
            setPaymentSummary(response.data);
        })
    }, [])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/png" href="/cart-favicon.png" />

            <CheckoutHeader />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    );
}