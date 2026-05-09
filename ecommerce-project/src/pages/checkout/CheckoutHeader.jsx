import { NavLink } from 'react-router'
import Logo from '../../assets/images/logo.png'
import MobileLogo from '../../assets/images/mobile-logo.png'
import CheckoutLockIcon from '../../assets/images/icons/checkout-lock-icon.png'
import './CheckoutHeader.css'

export function CheckoutHeader({ cart }) {
    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    })

    return (
        <div className="checkout-header">
            <div className="header-content">
                <div className="checkout-header-left-section">
                    <NavLink to="/">
                        <img className="logo" src={Logo} data-testid="logo" />
                        <img className="mobile-logo" src={MobileLogo} data-testid="mobile-logo" />
                    </NavLink>
                </div>

                <div className="checkout-header-middle-section">
                    Checkout (<NavLink className="return-to-home-link"
                        to="/" data-testid="total-quantity">{totalQuantity} items</NavLink>)
                </div>

                <div className="checkout-header-right-section">
                    <img src={CheckoutLockIcon} data-testid="checkout-lock-icon" />
                </div>
            </div>
        </div>
    );
}