import { FaStar } from "react-icons/fa";
import { useState } from "react";
import './styles.css'

export default function StarRating({noOfStars = 10}){
    const  [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    function handleClick(getCurrentIndex){
        setRating(getCurrentIndex)

    }

    function handleMouseEnter(getCurrentIndex){
        setHover(getCurrentIndex)

    }

    function handleMouseLeave(){
        setHover(rating)

    }

    return (
        <div>
            {
                [...Array(noOfStars)].map((_, index)=>{
                    const incIndex = index+1;

                    return <FaStar
                    key = {incIndex}
                    className= {incIndex <= (hover||rating)? "active" : "inactive"}
                    onClick = {()=> handleClick(incIndex)}
                    onMouseEnter={()=> handleMouseEnter(incIndex)}
                    onMouseLeave={ ()=> handleMouseLeave(incIndex)}
                    size = {40}
                    />
                })
            }
        </div>
    )
}