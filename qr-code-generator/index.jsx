
import { useState } from "react";
import QRCode from "react-qr-code";


export default function QRCodeGenerator(){

    const[input, setInput] = useState("")
    const [qrCode, setQrCode] = useState("");


    function handleGeneratorQrCode(){
        setQrCode(input);
        setInput("");

    }

    return(
        <div className="container">
            <div>
                <input
                onChange = {(e)=> setInput(e.target.value)}
                type= "text"
                placeholder= "Enter your data..."
                value = {input}
                />
                <button 
                disabled = {input && input.trim() !== ""? false : true}
                onClick = {()=>handleGeneratorQrCode()}>
                    Generator
                </button>
            </div>
            <div>
               <QRCode
               id = "qr-code"
               value = {qrCode}
               size = {400}
               bgColor="#fff"
               />
            </div>

        </div>
    )

}
