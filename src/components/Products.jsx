import Product from "./Product";
import "./Products.css"
function Products({user, products, setSelectedProductId}){

    return(
        <div className="productsContainer">
            {
                products.map((product)=>{
                    return <Product user={user} product={product} key={product._id} setSelectedProductId={setSelectedProductId}></Product>
                })
            }
        </div>
    )
}

export default Products;