import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import './styles.css'


export default function ImagesSlider({url, page= 1, limit = 10}){
    // declaring useStata
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);



    //step-1 fetch data using async function
    async function fetchImages (getUrl){
        try{
            setLoading(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if(data){
                setImages(data);
            }


        }catch (e){
            setErrorMsg(e.message);

        }finally{
            setLoading(false);
        }
    }

    //step-2 connect compoent to async function using useEffect
    useEffect(()=>{
        if(url !== ''){
            fetchImages(url);
        }
    }, [url, page, limit])

    //step-3 status update

    if(loading){
        return <div>Loading Data! Please wait....</div>
    }

    if(errorMsg !== ''){
        return <div>Error Occured! {errorMsg}</div>
    }

    //step-5 create handlePrevious and handleNext functions

    function handlePrevious(){
        setCurrentSlide(currentSlide === 0? images.length -1 : currentSlide -1);

    }

    function handleNext(){
        setCurrentSlide(currentSlide === images.length -1 ? 0 : currentSlide + 1);
    }

    //step-4 return data

    return(
        <div className = "container">
            <BsArrowLeftCircleFill
            onClick = {handlePrevious}
            className = "arrow arrow-left"
            />
            <BsArrowRightCircleFill
            onClick = {handleNext}
            className = "arrow arrow-right"
            />
            {
               images.length > 0 ?
               images.map((imageItem, index)=>(
                <img
                key={index}
                alt = {imageItem.download_url}
                src = {imageItem.download_url}
                className = {currentSlide === index? "current-image" : "current-image hide-current-image"}
                />
               ))
               :null
            }
            <span>
                {
                    images.length > 0? 
                    images.map((_, index)=>(
                        <button
                        key = {index}
                        className = { currentSlide === index? "current-indicator" : "current-indicator inactive-current-indicator"}
                        onClick = {()=>setCurrentSlide(index)}
                        ></button>

                    ))
                    :null
                }
            </span>

        </div>
    )


}