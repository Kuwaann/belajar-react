import { OrderHeader } from "./OrderHeader"
import { OrderDetailsGrid } from "./OrderDetailsGrid"

export function OrdersGrid({ orders, loadCart }) {
    return (
        <div className="orders-grid">
            {orders.map((order) => {
                return <div className="order-container" key={order.id}>
                    <OrderHeader order={order} />
                    <OrderDetailsGrid order={order} loadCart={loadCart} />
                </div>
            })}
        </div>
    )
}