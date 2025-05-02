import { useEffect, useState } from "react";
import Products from "../components/Products";
import "./HomePage.css";
import NavBar from "../components/NavBar";
import axios from "axios";

function HomePage({user}){

    const [data, setData] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brandFilterData, setBrandFilterData] = useState([]);
    const [categoryFilterData, setCategoryFilterData] = useState([]);
    
    async function fetchData() {
        try{
            let res = await axios.get("http://localhost:4000/api/v1/getProduct");
            let brandResponse = await axios.get("http://localhost:4000/api/v1/getBrands")
            let categoryResponse = await axios.get("http://localhost:4000/api/v1/getCategory")

            setData(res.data.data);
            setBrands(brandResponse.data.data);
            setCategories(categoryResponse.data.data);
        }
        catch(error){
            console.log(error);
        }
    }

    function brandFilterDataHandler(id, event){
        if(event.target.checked){
            setBrandFilterData((prev)=>{
                return [...prev, id]
            })
        }
        if(!event.target.checked){
            setBrandFilterData(prev => prev.filter(item => item !== id));
        }
    }

    function categoryFilterDataHandler(id, event){
        if(event.target.checked){
            setCategoryFilterData((prev)=>{
                return [...prev, id]
            })
        }
        if(!event.target.checked){
            setCategoryFilterData(prev => prev.filter(item => item !== id));
        }
    }

    async function brandFilterHandler(){
        console.log(brandFilterData)
        const res = await axios.post("http://localhost:4000/api/v1/getProductByBrand",{brandId : brandFilterData});
        setData(res.data.data);
    }
    async function categoryfilterHandler(){
        console.log(categoryFilterData)
        const res = await axios.post("http://localhost:4000/api/v1/getProductByCategory",{categoryId : categoryFilterData});
        setData(res.data.data);
    }
    
    useEffect(()=>{
        fetchData();
    },[])

    return(
        <div>
            <NavBar user={user}></NavBar>
            <div className="homepageContainer">
                <div className="otherSection">
                    <h3>Brands</h3>
                    {
                        brands.map((brand)=>{
                            return (
                                <div key={brand._id}>
                                    <input type="checkbox" onChange={(event)=>{brandFilterDataHandler(brand._id,event)}}/>
                                    <label >{brand.brandName}</label>
                                </div>
                            )
                            
                        })
                    }
                    <button onClick={brandFilterHandler}>Apply</button>

                    <h3>Category</h3>
                    {
                        categories.map((category)=>{
                            return (
                                <div key={category._id}>
                                    <input type="checkbox" onChange={(event)=>{categoryFilterDataHandler(category._id,event)}}/>
                                    <label >{category.categoryName}</label>
                                </div>
                            )
                        })
                    }

                    <button onClick={categoryfilterHandler}>Apply</button>
                </div>
                {
                    (!data||data.length === 0) ? 
                    <div className="noProductContainer">
                        <div>No Product</div>
                    </div>
                    : 
                    <div className="productSection">
                        <Products data={data}/>
                    </div>
                    
                }
            </div>
        </div>
    )
}

export default HomePage;