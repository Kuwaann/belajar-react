
import { OrderProduct } from './OrderProduct';

export function OrderDetailsGrid({ order, loadCart }) {
    return (
        <div className="order-details-grid">
            {order.products.map((orderProduct) => {
                return <OrderProduct order={order} orderProduct={orderProduct} loadCart={loadCart} key={orderProduct.productId} />
            })}
        </div>
    )
}