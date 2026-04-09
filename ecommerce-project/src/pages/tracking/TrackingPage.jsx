import dayjs from 'dayjs';
import { Link, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import './TrackingPage.css';
import axios from 'axios';

export function TrackingPage({ cart }) {
    const [order, setOrder] = useState(null);
    const { orderId, productId } = useParams();
    console.log(orderId + productId);

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`http://localhost:3000/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
        }

        fetchTrackingData();
    }, [orderId])

    if (!order) return null;

    const orderProduct = order.products.find((product) => {
        return product.productId === productId;
    })

    return (
        <>
            <title>Tracking</title>
            <link rel="icon" type="image/png" href="/tracking-favicon.png" />

            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    );
}