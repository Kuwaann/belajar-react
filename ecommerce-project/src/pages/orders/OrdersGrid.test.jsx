import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { OrdersGrid } from './OrdersGrid';

describe('OrdersGrid component', () => {
    let orders;
    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();

        orders = [
            {
                "id": "593e23e5-7d8e-447e-85c0-d3034efe7c1d",
                "orderTimeMs": 1777385060109,
                "totalCostCents": 6450,
                "products": [
                    {
                        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        "quantity": 3,
                        "estimatedDeliveryTimeMs": 1777989860109,
                        "product": {
                            "keywords": [
                                "socks",
                                "sports",
                                "apparel"
                            ],
                            "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
                            "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            "rating": {
                                "stars": 4.5,
                                "count": 87
                            },
                            "priceCents": 1090,
                            "createdAt": "2026-04-21T11:37:26.821Z",
                            "updatedAt": "2026-04-21T11:37:26.821Z"
                        }
                    },
                    {
                        "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        "quantity": 1,
                        "estimatedDeliveryTimeMs": 1777644260109,
                        "product": {
                            "keywords": [
                                "sports",
                                "basketballs"
                            ],
                            "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            "image": "images/products/intermediate-composite-basketball.jpg",
                            "name": "Intermediate Size Basketball",
                            "rating": {
                                "stars": 4,
                                "count": 127
                            },
                            "priceCents": 2095,
                            "createdAt": "2026-04-21T11:37:26.822Z",
                            "updatedAt": "2026-04-21T11:37:26.822Z"
                        }
                    }
                ],
                "createdAt": "2026-04-28T14:04:20.110Z",
                "updatedAt": "2026-04-28T14:04:20.110Z"
            },
            {
                "id": "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
                "orderTimeMs": 1723456800000,
                "totalCostCents": 3506,
                "products": [
                    {
                        "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        "quantity": 1,
                        "estimatedDeliveryTimeMs": 1723716000000,
                        "product": {
                            "keywords": [
                                "socks",
                                "sports",
                                "apparel"
                            ],
                            "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
                            "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            "rating": {
                                "stars": 4.5,
                                "count": 87
                            },
                            "priceCents": 1090,
                            "createdAt": "2026-04-21T11:37:26.821Z",
                            "updatedAt": "2026-04-21T11:37:26.821Z"
                        }
                    },
                    {
                        "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                        "quantity": 2,
                        "estimatedDeliveryTimeMs": 1723456800000,
                        "product": {
                            "keywords": [
                                "tshirts",
                                "apparel",
                                "mens"
                            ],
                            "id": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
                            "image": "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
                            "name": "Adults Plain Cotton T-Shirt - 2 Pack",
                            "rating": {
                                "stars": 4.5,
                                "count": 56
                            },
                            "priceCents": 799,
                            "createdAt": "2026-04-21T11:37:26.823Z",
                            "updatedAt": "2026-04-21T11:37:26.823Z"
                        }
                    }
                ],
                "createdAt": "2026-04-21T11:37:26.821Z",
                "updatedAt": "2026-04-21T11:37:26.821Z"
            },
            {
                "id": "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
                "orderTimeMs": 1718013600000,
                "totalCostCents": 4190,
                "products": [
                    {
                        "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        "quantity": 2,
                        "estimatedDeliveryTimeMs": 1718618400000,
                        "product": {
                            "keywords": [
                                "sports",
                                "basketballs"
                            ],
                            "id": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            "image": "images/products/intermediate-composite-basketball.jpg",
                            "name": "Intermediate Size Basketball",
                            "rating": {
                                "stars": 4,
                                "count": 127
                            },
                            "priceCents": 2095,
                            "createdAt": "2026-04-21T11:37:26.822Z",
                            "updatedAt": "2026-04-21T11:37:26.822Z"
                        }
                    }
                ],
                "createdAt": "2026-04-21T11:37:26.822Z",
                "updatedAt": "2026-04-21T11:37:26.822Z"
            }
        ];
    });

    it('displays the correct elements', () => {
        render(
            <MemoryRouter>
                <OrdersGrid orders={orders} loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('orders-grid')).toBeInTheDocument();
    })

    it('displays the right amount of order item', () => {
        render(
            <MemoryRouter>
                <OrdersGrid orders={orders} loadCart={loadCart} />
            </MemoryRouter>
        );

        const orderContainers = screen.getAllByTestId('order-container');
        expect(orderContainers).toHaveLength(3);
    })
})