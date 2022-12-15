import React from "react";
import CartItem from "../components/CartItem"
import { useProductContext } from "../components/context/ProductContext";

export default function Cart({ cart, numberOfItems, removeFromCart, total, checkout, }) {
    
   function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function multipleItemCheck() {
        if (numberOfItems) {
            if (numberOfItems === 1) {
                return " item"
            } else {
                return " items"
            }
        } else {
            return 0
        }
    }
    
   return(
    <>
    <div className="title-container">
        <h4 className="page-title">Cart</h4>
    </div>
    <div className="cart-container">
        <div className="cartitems">
            <div className="cartitem-list">
                <div className="cart-categories">
                    <p>Product</p>
                    <p className="category-price">Price</p>
                </div>
            {cart && cart.length ? (
                cart.map((product, index) => (
                        <CartItem
                            product={product}
                            key={index}
                            removeFromCart={removeFromCart}
                        />
                    ))
            ) : (
                <div className="column">
                    <div className="title has-text-grey-light">No item in cart!</div>
                </div>
            )}
            </div>
        </div>
        <div className="total-container">
            <h3 className="total-text">Total ({numberOfItems + multipleItemCheck()}):</h3>
            <h3 className="total-amount" id="total-amount">${numberWithCommas(total)}</h3>
            <button
                className="checkout-button"
                onClick={checkout}
            >
                Checkout
            </button>
        </div>
    </div>
    </>
   ) 
}

export async function getStaticProps() {
    const { cart, numberOfItems, removeFromCart, total, checkout, } = useProductContext()
    return {
        props: {
            cart: cart,
            numberOfItems: numberOfItems,
            removeFromCart: removeFromCart,
            total: total,
            checkout: checkout
        },
    };
}