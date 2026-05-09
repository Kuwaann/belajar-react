import { it, expect, describe, beforeEach, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { PaymentSummary } from './PaymentSummary';

vi.mock('axios');

describe('PaymentSummary component', () => {
    let paymentSummary;
    let loadCart;
    let user;

    beforeEach(() => {
        paymentSummary = {
            totalItems: 4,
            productCostCents: 5365,
            shippingCostCents: 499,
            totalCostBeforeTaxCents: 5864,
            taxCents: 586,
            totalCostCents: 6450
        }

        loadCart = vi.fn();

        user = userEvent.setup();
    });

    it('displays the correct details', () => {
        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        );

        expect(screen.getByText('Items (4):')).toBeInTheDocument();
        expect(within(screen.getByTestId('payment-summary-product-cost')).getByText('$53.65')).toBeInTheDocument();
        expect(screen.getByTestId('payment-summary-shipping-cost')).toHaveTextContent('$4.99');
        expect(screen.getByTestId('payment-summary-total-before-tax')).toHaveTextContent('$58.64');
        expect(screen.getByTestId('payment-summary-tax-cents')).toHaveTextContent('$5.86');
        expect(screen.getByTestId('payment-summary-total-cents')).toHaveTextContent('$64.50');
    });

    it('Place order button works perfectly', async () => {
        function Location() {
            const location = useLocation();

            return (
                <div data-testid="url-path">{location.pathname}</div>
            )
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );

        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/orders');
        expect(loadCart).toHaveBeenCalled();

    })
})