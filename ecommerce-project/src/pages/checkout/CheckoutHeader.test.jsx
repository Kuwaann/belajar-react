import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutHeader } from './CheckoutHeader';
import Logo from '../../assets/images/logo.png'
import MobileLogo from '../../assets/images/mobile-logo.png'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'

describe('CheckoutHeader component', () => {
    let cart;

    beforeEach(() => {
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
    })

    it('displays the header correctly', () => {
        render(
            <MemoryRouter>
                <CheckoutHeader cart={cart} />
            </MemoryRouter>
        );

        expect(screen.getByTestId('logo')).toHaveAttribute('src', Logo);
        expect(screen.getByTestId('mobile-logo')).toHaveAttribute('src', MobileLogo);
        expect(screen.getByTestId('total-quantity')).toHaveTextContent('2 items');
        expect(screen.getByTestId('checkout-lock-icon')).toHaveAttribute('src', CheckoutLockIcon);
    })
})