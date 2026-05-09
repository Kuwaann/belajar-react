import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import axios from 'axios'
import { OrdersPage } from './OrdersPage';
import { MemoryRouter } from 'react-router';

vi.mock('axios');

describe('OrdersPage component', () => {
    let cart;
    let loadCart;

    beforeEach(() => {
        loadCart = vi.fn();

        cart = [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1',
                product: {
                    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    rating: {
                        stars: 4.5,
                        count: 87
                    },
                    priceCents: 1090,
                    keywords: ["socks", "sports", "apparel"]
                }
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '1',
                product: {
                    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    image: "images/products/intermediate-composite-basketball.jpg",
                    name: "Intermediate Size Basketball",
                    rating: {
                        stars: 4,
                        count: 127
                    },
                    priceCents: 2095,
                    keywords: ["sports", "basketballs"]
                }
            },
        ];

        axios.get.mockResolvedValue(() => {
            return { data: {} };
        });
    });

    it('should be able to get data from the API', () => {
        render(
            <MemoryRouter>
                <OrdersPage cart={cart} loadCart={loadCart} />
            </MemoryRouter >
        );

        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/orders?expand=products');
    })
})