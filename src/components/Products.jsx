import Product from "./Product";
import "./Products.css"
function Products({data}){

    return(
        <div className="productsContainer">
            {
                data.map((product)=>{
                    return <Product product={product} key={product._id}></Product>
                })
            }
        </div>
    )
}

export default Products;