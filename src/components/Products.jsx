import Product from "./Product";
import "./Products.css"
function Products({products, setSelectedProduct}){

    return(
        <div className="productsContainer">
            {
                products.map((product)=>{
                    return <Product product={product} key={product._id} setSelectedProduct={setSelectedProduct}></Product>
                })
            }
        </div>
    )
}

export default Products;