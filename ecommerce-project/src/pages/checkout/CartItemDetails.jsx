import axios from 'axios';
import { formatMoney } from "../../utils/money"
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
    const [isBeingUpdated, setIsBeingUpdated] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        await loadCart();
    }

    const updateQuantity = async () => {
        if (isBeingUpdated) {
            await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`, {
                quantity
            })
            setIsBeingUpdated(false);
            await loadCart();
        }
        else {
            setIsBeingUpdated(true);
        }
    }

    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} data-testid="product-image" />

            <div className="cart-item-details">
                <div className="product-name" data-testid="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price" data-testid="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity" data-testid="product-quantity">
                    <span>
                        Quantity: <input type="text"
                            className="quantity-textbox"
                            style={{ opacity: isBeingUpdated ? 1 : 0 }}
                            value={quantity}
                            onChange={(event) => {
                                setQuantity(Number(event.target.value));
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    updateQuantity();
                                }
                                else if (event.key === 'Escape') {
                                    setQuantity(cartItem.quantity);
                                    setIsBeingUpdated(false);
                                }
                            }}
                            data-testid="quantity-textbox"
                        /><span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity} data-testid="update-quantity-button"
                    >
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary" onClick={deleteCartItem} data-testid="delete-cart-button">
                        Delete
                    </span>
                </div>
            </div>
        </>
    )
}