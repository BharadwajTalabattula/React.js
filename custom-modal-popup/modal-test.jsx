import { useState } from "react"
import Modal from "./modal"
import "./modal.css"


export default function ModalTest(){
    const[showModalPopup, setShowModalPopup] = useState(false);

    function handleToggelModalPopup(){
        setShowModalPopup(!showModalPopup)
    }

    function onClose(){
        setShowModalPopup(false);
    }

    return(
        <div>
            <button
            onClick = {handleToggelModalPopup}
            >Open Modal popup</button>
            {
                showModalPopup && < Modal
                close = {onClose}
                id = {"Custom-modal"}
                header= {"Custom-Header"}
                body = {"I'm Modal body"}
                footer = {"Custom-Footer"}
                />
            }
        </div>
    )
}