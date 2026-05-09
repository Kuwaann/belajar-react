import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OrderHeader } from './OrderHeader';

describe('OrderHeader component', () => {
    let order;

    beforeEach(() => {
        order = {
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
        };
    });

    it('displays the correct component details', () => {
        render(<OrderHeader order={order} />)
        expect(screen.getByTestId('order-date')).toHaveTextContent('April 28');
        expect(screen.getByTestId('order-total')).toHaveTextContent('$64.50');
        expect(screen.getByTestId('order-header-right-section')).toHaveTextContent('593e23e5-7d8e-447e-85c0-d3034efe7c1d');
    })
})