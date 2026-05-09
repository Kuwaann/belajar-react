import axios from 'axios';
import { Fragment } from 'react';
import { Link } from 'react-router';
import dayjs from 'dayjs';
import BuyAgain from '../../assets/images/icons/buy-again.png';

export function OrderProduct({ order, orderProduct, loadCart }) {
    const addToCart = async () => {
        await axios.post('http://localhost:3000/api/cart-items', {
            productId: orderProduct.productId,
            quantity: 1
        });
        loadCart();
    }

    return <Fragment>
        <div className="product-image-container">
            <img src={orderProduct.product.image} data-testid="product-image" />
        </div>

        <div className="product-details">
            <div className="product-name">
                {orderProduct.product.name}
            </div>
            <div className="product-delivery-date" data-testid="product-delivery-date">
                Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
            </div>
            <div className="product-quantity">
                Quantity: {orderProduct.quantity}
            </div>
            <button className="buy-again-button button-primary" onClick={addToCart} data-testid="buy-again-button">
                <img className="buy-again-icon" src={BuyAgain} data-testid="buy-again-icon" />
                <span className="buy-again-message">Add to Cart</span>
            </button>
        </div>

        <div className="product-actions">
            <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
                <button className="track-package-button button-secondary">
                    Track package
                </button>
            </Link>
        </div>
    </Fragment>
}