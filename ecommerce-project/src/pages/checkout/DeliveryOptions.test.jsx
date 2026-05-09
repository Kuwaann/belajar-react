import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { DeliveryOptions } from './DeliveryOptions';

vi.mock('axios');

describe('DeliveryOptions component', () => {
    let deliveryOptions;
    let cartItem;
    let loadCart;
    let user;

    beforeEach(() => {
        user = userEvent.setup();
        loadCart = vi.fn();

        deliveryOptions = [{
            id: '1',
            deliveryDays: 7,
            priceCents: 0,
            estimatedDeliveryTimeMs: 1747597994451,
        }, {
            id: '2',
            deliveryDays: 3,
            priceCents: 499,
            estimatedDeliveryTimeMs: 1747252394451,
        }, {
            id: '3',
            deliveryDays: 1,
            priceCents: 999,
            estimatedDeliveryTimeMs: 1747079594451,
        }];

        cartItem = {
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


        };

        axios.put.mockResolvedValue(() => {
            return {
                data: cartItem
            };
        });
    });

    it('displays the correct component details', async () => {
        render(<DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />);

        const deliveryOptionsContainer = screen.getAllByTestId('delivery-option-container');
        expect(within(deliveryOptionsContainer[0]).getByText('FREE Shipping')).toBeInTheDocument();
        expect(within(deliveryOptionsContainer[1]).getByText('$4.99 - Shipping')).toBeInTheDocument();
        expect(within(deliveryOptionsContainer[2]).getByText('$9.99 - Shipping')).toBeInTheDocument();

        expect(within(deliveryOptionsContainer[0]).getByTestId('delivery-option-input').checked).toBe(true);
        expect(within(deliveryOptionsContainer[1]).getByTestId('delivery-option-input').checked).toBe(false);
        expect(within(deliveryOptionsContainer[2]).getByTestId('delivery-option-input').checked).toBe(false);
        await user.click(deliveryOptionsContainer[1]);
        expect(axios.put).toHaveBeenCalled();
        expect(loadCart).toHaveBeenCalled();
    })
})