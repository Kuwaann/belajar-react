import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import { OrderProduct } from './OrderProduct';
import BuyAgain from '../../assets/images/icons/buy-again.png';

vi.mock('axios');

describe('OrderProduct component', () => {
    let user;
    let orderProduct;
    let loadCart;

    beforeEach(() => {
        user = userEvent.setup();

        loadCart = vi.fn();

        orderProduct = {
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
        };

        axios.post.mockResolvedValue(() => {
            return { data: {} }
        });
    });

    it('displays the correct details', () => {
        render(
            <MemoryRouter>
                <OrderProduct order={[]} orderProduct={orderProduct} loadCart={loadCart} />
            </MemoryRouter>
        );

        const productImage = screen.getByTestId('product-image');
        expect(productImage).toBeInTheDocument();
        expect(productImage).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
        expect(screen.getByTestId('product-delivery-date')).toHaveTextContent(`Arriving on: ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}`);
        expect(screen.getByText('Quantity: 3')).toBeInTheDocument();

        const buyAgainIcon = screen.getByTestId('buy-again-icon');
        expect(buyAgainIcon).toBeInTheDocument();
        expect(buyAgainIcon).toHaveAttribute('src', BuyAgain);
    })

    it('should post the data after a button click', async () => {
        render(
            <MemoryRouter>
                <OrderProduct order={[]} orderProduct={orderProduct} loadCart={loadCart} />
            </MemoryRouter>
        );

        const buyAgainButton = screen.getByTestId('buy-again-button');
        expect(buyAgainButton).toBeInTheDocument();

        await user.click(buyAgainButton)
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
        });
    })
})
