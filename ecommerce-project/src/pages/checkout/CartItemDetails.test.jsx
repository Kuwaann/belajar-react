import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { CartItemDetails } from './CartItemDetails';

vi.mock('axios');

describe('CartItemDetails component', () => {
    let cartItem;
    let loadCart;
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        loadCart = vi.fn();

        cartItem = {
            id: 3,
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1,
            deliveryOptionId: "1",
            createdAt: "2026-04-29T15:44:16.892Z",
            updatedAt: "2026-05-01T07:16:50.835Z",
            product: {
                keywords: [
                    "socks",
                    "sports",
                    "apparel"
                ],
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090,
                createdAt: "2026-04-21T11:37:26.821Z",
                updatedAt: "2026-04-21T11:37:26.821Z"
            }
        };

        axios.delete.mockResolvedValue(() => { return { data: {} } });
        axios.put.mockResolvedValue(() => { return { data: {} } });

    });

    it('displays the component correctly', () => {
        render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />)

        const productImage = screen.getByTestId('product-image');
        expect(productImage).toBeInTheDocument();
        expect(productImage).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        const productName = screen.getByTestId('product-name');
        expect(productName).toBeInTheDocument();
        expect(productName).toHaveTextContent('Black and Gray Athletic Cotton Socks - 6 Pairs');

        const productPrice = screen.getByTestId('product-price');
        expect(productPrice).toBeInTheDocument();
        expect(productPrice).toHaveTextContent('$10.90');
    });

    it('enables user to update and delete a cart item', async () => {
        render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />)

        const updateQuantityButton = screen.getByTestId('update-quantity-button');
        const quantityTextbox = screen.getByTestId('quantity-textbox');
        expect(quantityTextbox).toHaveStyle({ opacity: 0 });
        await user.click(updateQuantityButton);
        expect(quantityTextbox).toHaveStyle({ opacity: 1 });
        await user.click(updateQuantityButton);
        expect(axios.put).toHaveBeenCalledWith(`http://localhost:3000/api/cart-items/e43638ce-6aa0-4b85-b27f-e1d07eb678c6`, {
            quantity: 1
        });
        expect(quantityTextbox).toHaveStyle({ opacity: 0 });

        const deleteCartItemButton = screen.getByTestId('delete-cart-button');
        await user.click(deleteCartItemButton);
        expect(axios.delete).toHaveBeenCalled();


    })
})

