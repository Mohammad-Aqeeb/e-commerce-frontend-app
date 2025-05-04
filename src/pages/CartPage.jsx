import { useNavigate } from "react-router-dom";
import "./CartPage.css"
import { useEffect, useState } from "react";
import axios from "axios";

function CartPage({ user }) {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const total = items.reduce((acc, item) => acc + item.price, 0);


    console.log(items.ProductId);
    function redirectedHandler() {
        navigate("/login");
    }

    async function getCartItem() {
        try {
            const res = await axios.post("http://localhost:4000/api/v1/getCartItem", { userId: user._id });
            console.log(res.data.data);
            setItems(res.data.data[0].ProductId);
        } catch (error) {
            console.error("Failed to fetch cart items", error);
        }
    }

    useEffect(() => {
        if(user) {
            getCartItem();
        }
    }, [user]);

    if (!user) {
        return (
            <div className="loginCart">
                <div>Login to see the items you added previously</div>
                <button onClick={redirectedHandler}>Login</button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Your Shopping Cart</h2>
            {items.length === 0 ? (
                <div className="empty-cart">Your cart is empty.</div>
            ) : 
            (
                <div className="cart-items">
                    {
                    items.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3>{item.productName}</h3>
                                <p>Price: ${item.price}</p> 
                            </div>
                        </div>
                    ))
                    }
                    <div className="cart-total">
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <button className="checkout-btn">Proceed to Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
