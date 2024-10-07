import { useEffect, useState} from "react";
import "./scroll.css"


export default function ScrollIndicator({url}){

    const[loading, setLoading] = useState(false);
    const[data, setData] = useState([]);
    const[error, setError] = useState('');
    const[scrollPercentage, setScrollPercentage] = useState(0);

    async function fetchData(getUrl){
        try{
            setLoading(true);
            const response = await fetch(getUrl);
            const fetchData = await response.json();

          if(fetchData && fetchData.products && fetchData.products.length > 0){
            setData(fetchData.products);
            setLoading(false);
          }

        }
        catch(error){
            console.log(error);
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData(url)
    }, [url])

    function handleScrollPercentage(){

        console.log(document.documentElement.scrollTop,
            document.documentElement.scrollHeight,
            document.documentElement.clientHeight
            )

            const scrollData = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight -  document.documentElement.clientHeight;

            setScrollPercentage((scrollData / height) * 100)

    }

    useEffect(()=>{
        window.addEventListener('scroll', handleScrollPercentage)
        return ()=>{
            window.removeEventListener('scroll', handleScrollPercentage)
        }
    },[])

    if(loading){
        return<div>
            Loading Data!...
        </div>
    }

    if(error){
        return<div>
            Error ...
        </div>
    }

    console.log(scrollPercentage)

    return(
        <div>
            <div className="top-container">
                <h1>Custom Scroll bar</h1>
                <div className="scroll-container">
                    <div className="current-scroll-position" style={{width: `${scrollPercentage}%`}}></div>
                </div>
            </div>
            <div className="data-container">
                {
                    data && data.length > 0?
                    data.map((dataItem)=>
                        <p>{dataItem.title}</p>
                    )
                    :null
                }
            </div>
        </div>
    )



}