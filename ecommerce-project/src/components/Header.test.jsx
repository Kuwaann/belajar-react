import { it, expect, describe, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Header } from './Header';

describe('Header component', () => {
    let cart;

    beforeEach(() => {
        cart = [
            {
                "id": 3,
                "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                "quantity": 1,
                "deliveryOptionId": "1",
                "createdAt": "2026-04-29T15:44:16.892Z",
                "updatedAt": "2026-04-29T15:44:16.892Z",
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
                "id": 4,
                "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                "quantity": 1,
                "deliveryOptionId": "1",
                "createdAt": "2026-04-29T15:44:17.539Z",
                "updatedAt": "2026-04-29T15:44:17.539Z",
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
        ];
    })

    it('displays the header correctly', () => {
        render(
            <MemoryRouter>
                <Header cart={cart} />
            </MemoryRouter>
        );

        const logo = screen.getByTestId('logo');
        const mobileLogo = screen.getByTestId('mobile-logo');
        expect(logo).toHaveAttribute('src', '/src/assets/images/logo-white.png');
        expect(mobileLogo).toHaveAttribute('src', '/src/assets/images/mobile-logo-white.png');

        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByTestId('search-button')).toBeInTheDocument();
        expect(within(screen.getByTestId('search-button')).getByTestId('search-icon')).toHaveAttribute('src', '/src/assets/images/icons/search-icon.png')

        const ordersLink = screen.getByTestId('header-orders-link');
        expect(ordersLink).toBeInTheDocument();
        expect(ordersLink).toHaveTextContent('Orders');
        expect(ordersLink).toHaveAttribute('href', '/orders');

        const cartLink = screen.getByTestId('header-cart-link');
        expect(cartLink).toBeInTheDocument();
        expect(cartLink).toHaveTextContent('Cart');
        expect(cartLink).toHaveTextContent('2');
        expect(cartLink).toHaveAttribute('href', '/checkout');
    })
})