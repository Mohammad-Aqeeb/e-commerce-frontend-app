import { useNavigate } from "react-router-dom";
import "./CartPage.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function CartPage({ user }) {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const total = items.reduce((acc, item) => acc + item.price, 0);

    function redirectedHandler() {
        navigate("/login");
    }

    async function getCartItem() {
        try {
            const res = await axios.post("http://localhost:4000/api/v1/getCartItem", { userId: user._id });
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
        <div className="cartItemMainContainer">
            {items.length === 0 ? (
                <div className="empty-cart">Your cart is empty.</div>
            ) : 
            (
                <div className="cartItemContainer">
                    <div className="checkItems">
                    {
                        items.map((item)=>{
                            return(
                                <div key={item._id} className="itemContainer">
                                    <div>
                                        <img src={item.image} className="itemImage"></img>
                                    </div>
                                    
                                    <div className="itemDescriptionContainer">
                                        <div className="itemTitle">{item.productName}</div>
                                        <div className="itemDescription">{item.description}</div>
                                        <div className="priceButtonContainer">
                                            <div className="itemPrice">${item.price}</div>
                                            <button className="itemDeleteButton"><MdDelete /></button>
                                        </div>
                                    </div>
                                </div>
                            )
                            
                        })
                    }
                    </div>
                    <div className="totalItemContainer">
                        <div className="totalItemTexts">
                            <div className="yourCartText">Your Cart</div>
                            <div className="summaryText">summary</div>
                            <div className="totalItemText">Total Items : {items.length}</div>
                        </div>
                        
                        <div className="amountContainer">
                            <div className="totalAmountText">Total Amount:<span className="amountText">${total}</span></div>
                            <button className="checkOutButton">Checkout Now</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;






// <div className="cartItemMainContainer">
//     <div className="cartItemContainer">
        

        
//     </div>
// </div>