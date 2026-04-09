
import { CartItemDetails } from './CartItemDetails';
import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({ cart, deliveryOptions }) {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cart.map((cartItem) => {
                return (
                    <div className="cart-item-container" key={cartItem.productId}>
                        <DeliveryDate deliveryOptions={deliveryOptions} cartItem={cartItem} />

                        <div className="cart-item-details-grid">
                            <CartItemDetails cartItem={cartItem} />

                            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
