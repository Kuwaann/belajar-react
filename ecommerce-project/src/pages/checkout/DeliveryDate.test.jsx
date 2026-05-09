import dayjs from 'dayjs';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react'
import { DeliveryDate } from './DeliveryDate';

describe('DeliveryDate component', () => {
    let deliveryOptions;
    let cartItem;

    beforeEach(() => {
        deliveryOptions = [{
            id: '1',
            deliveryDays: 7,
            priceCents: 0,
            estimatedDeliveryTimeMs: 1747597994451,
        },
        {
            id: '2',
            deliveryDays: 3,
            priceCents: 499,
            estimatedDeliveryTimeMs: 1747252394451,
        },
        {
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
    });

    it('displays the component correctly', () => {
        render(
            <DeliveryDate cartItem={cartItem} deliveryOptions={deliveryOptions} />
        );

        const deliveryDate = screen.getByTestId('delivery-date');
        expect(deliveryDate).toHaveTextContent(`Delivery date: ${dayjs(1747597994451).format('dddd, MMMM D')}`)
    })
})