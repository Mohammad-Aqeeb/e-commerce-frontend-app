import { useNavigate } from "react-router-dom";
import "./Product.css";

function Product({ product, setSelectedProduct}) {

    const navigate = useNavigate();

    function singleProductHandler(){
        setSelectedProduct(product);
        navigate("/singlePage");
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

                <button className="AddToCartButton">Add To Cart</button>
            </div>
        </div>
    );
}

export default Product;