// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./SingleProduct.css";

// function SingleProduct({selectedProductId}) {

//     const [selectedProduct, setSelectedProduct ] = useState([]);

//     async function getProductHandler(){
//         const data = await axios.post("http://localhost:4000/api/v1/getProductById", {productId : selectedProductId});
//         console.log(data.data.data[0]);
//         setSelectedProduct(data.data.data[0]);   
//     }

//     useState(()=>{
//         getProductHandler();
//     },[selectedProductId])

//     return (
//         <div>
//         {
//             (!selectedProductId) ?  
//               <div className="loading">Loading product...</div>
//             :
//             <div className="single-product">
//                 <div className="product-image-container">
//                     <img src={selectedProduct.image} alt={selectedProduct.productName} className="product-image" />
//                 </div>
//                 <div className="product-details">
//                     <h1 className="product-title">{selectedProduct.productName}</h1>
//                     <p className="product-description">{selectedProduct.description}</p>
//                     <p className="product-price">${selectedProduct.price}</p>
//                     <button className="add-to-cart">Add to Cart</button>
//                 </div>
//             </div>
//         }
//         </div>
//     );
// }

// export default SingleProduct;



import { useEffect, useState } from "react";
import axios from "axios";
import "./singleProduct.css";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function SingleProduct({user, selectedProductId, setSelectedProductId}) {
    const [product, setProduct]= useState(null);
    const [similarBrandProducts, setSimilarBrandProducts] = useState([]);
    const [similarCategoryProducts, setSimilarCategoryProducts] = useState([]);
    const navigate = useNavigate();

    async function fetchProductData() {
        try {
            const res = await axios.post("http://localhost:4000/api/v1/getProductById", {productId: selectedProductId});
            setProduct(res.data.data[0]);

            const productData = res.data.data[0];

            const res1 = await axios.post("http://localhost:4000/api/v1/getProductByBrand", {brandId: productData.brand._id});
            setSimilarBrandProducts(res1.data.data);

            const res2 = await axios.post("http://localhost:4000/api/v1/getProductByCategory", {categoryId: productData.category._id});
            setSimilarCategoryProducts(res2.data.data);

        } catch (error) {
            console.error("Error loading product data", error);
        }
    }

    function singleProductHandler(id){
        setSelectedProductId(id);
        navigate(`/singlePage/${id}`)        
    }

    useEffect(() => {
        if (!selectedProductId) return;
        fetchProductData();
    }, [selectedProductId]);

    return (
        <div className="singleProduct-Container">
            <NavBar user={user}></NavBar>
            {
            (!product) ?
            <div className="loading">Loading product...</div>
            :
            <div className="product-page">
                <div className="product-main">
                    <img src={product.image} alt={product.productName} className="main-image" />
                    <div className="main-details">
                        <h1>{product.productName}</h1>
                        <p className="description">{product.description}</p>
                        <p className="price">${product.price}</p>
                        <button className="add-to-cart">Add to Cart</button>
                    </div>
                </div>

                <div className="sidebar">
                    <div className="sidebar-section">
                        <h3>Similar by Brand</h3>
                        {similarBrandProducts.map(p => (
                            <div key={p._id} className="sidebar-product" onClick={()=>{singleProductHandler(p._id)}}>
                                <img src={p.image} alt={p.productName} />
                                <div>
                                    <p className="title">{p.productName}</p>
                                    <p className="price">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="sidebar-section">
                        <h3>Similar by Category</h3>
                        {similarCategoryProducts.map(p => (
                            <div key={p._id} className="sidebar-product" onClick={()=>{singleProductHandler(p._id)}}>
                                <img src={p.image} alt={p.productName} />
                                <div>
                                    <p className="title">{p.productName}</p>
                                    <p className="price">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
        </div>
    );
}

export default SingleProduct;
