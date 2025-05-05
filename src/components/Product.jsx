import { useNavigate } from "react-router-dom";
import "./Product.css";
import axios from "axios";

function Product({user, product, setSelectedProductId}) {

    const navigate = useNavigate();

    function singleProductHandler(){
        setSelectedProductId(product._id);
        navigate(`/singlePage/${product._id}`);
    }

    async function addToCartHandler(){
        try{
            console.log(user);
            console.log(user._id);
            console.log(product._id);
            
            const data = await axios.post("http://localhost:4000/api/v1/addProductToCart",{UserId : user._id, productId : product._id});
            console.log("AAAAAAaaaaaa");
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }

    let description = `${product.description.substring(0,200)}...`
    return (
        <div className="productCard" onClick={singleProductHandler}>
            <img className="productImage" src={product.image} alt={product.productName} />

            <div className="productInfo">
                <h2 className="productName">{product.productName}</h2>
                <p className="productPrice">${product.price}</p>
                <p className="productDescription">{description}</p>

                <div className="productMeta">
                    <span className="productBrand">{product.brand.brandName}</span>
                    <span className="productCategory">{product.category.categoryName}</span>
                </div>

                <button className="AddToCartButton" onClick={addToCartHandler}>Add To Cart</button>
            </div>
        </div>
    );
}

export default Product;