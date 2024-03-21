import { useContext, useState } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "./store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import UserProgressContext from "./store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            {cartCtx.items.length > 0 ?
                <div>
                    <ul>
                        {cartCtx.items.map(item =>
                            <CartItem onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)} key={item.id} name={item.name} quantity={item.quantity} price={item.price} />
                        )}
                    </ul>
                    <p className="cart-total">Total: {currencyFormatter.format(cartTotal)}</p>
                    <p className="modal-actions">
                        <Button textOnly onClick={handleCloseCart}>Close</Button>
                        <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
                    </p>
                </div>
                : <div className="cart-empty">
                    <p>Cart is Empty. Add items to checkout for purchase.</p>
                    <Button onClick={handleCloseCart}>Close</Button>
                </div>
            }
        </Modal>
    )
}
