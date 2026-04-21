import axios from 'axios';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import './CheckoutPage.css';

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const fetchCheckoutData = async () => {
            const response = await axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);
        };
        fetchCheckoutData();
    }, [cart])

    useEffect(() => {
        const fetchPaymentSummaryData = async () => {
            const response = await axios.get('http://localhost:3000/api/payment-summary');
            setPaymentSummary(response.data);
        }

        fetchPaymentSummaryData();
    }, [paymentSummary])

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/png" href="/cart-favicon.png" />

            <CheckoutHeader cart={cart} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                </div>
            </div>
        </>
    );
}