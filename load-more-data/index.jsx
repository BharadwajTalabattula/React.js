import { useEffect, useState } from "react";
import './styles.css'


export default function LoadMoreData(){
    const[loading, setLoading] = useState(false);
    const[products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);


    async function fetchProducts(){
        try{
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0? 0: count*20}&select=title,price,thumbnail`);
            const result = await response.json();

            if(result && result.products && result.products.length){
                setProducts((prevProducts)=>[...prevProducts, ...result.products]);
                setLoading(false);

            }

            if (products.length >= 100) {
                setDisableButton(true);
            }

        }
        catch(e){
            console.log(e);
            setLoading(false);
        }

    }

    useEffect(()=>{
        fetchProducts()
    }, [count]);

   
    return(
        <div className="container">
            <div className="products-container">
           {
            products.map((item)=>(
                <div className="products">
                    <img
                key = {item.id}
                alt = {item.title}
                src = {item.thumbnail}
                />
                <p>{item.title}</p>
                <p>${item.price}</p>
                </div>

            ))

           }
            </div>
            <div className="bottom">
                <button disabled = {disableButton}  onClick = {()=>setCount(count+1)}>Load More Data</button>
                { disableButton && <p>you have reached 100 items</p>}
            </div>

        </div>
    )

}