import { useState } from "react"

export default function RandomColor(){
    const[typeOfColor, setTypeOfColor] = useState('HEX');
    const[color, setColor] = useState('#000000');

    const hex = [0,1,2,3,4,5,6,7,8,9,'A', 'B', 'C','D','E','F'];
    let hexColor = '#';

    function generateRandomElement(length){
        return Math.floor(Math.random()* length);
    }

    function generateRandomHexColor(){
        for(let i =0; i<6; i++){
            hexColor += hex[generateRandomElement(hex.length)];
        }
        setColor(hexColor)

    }

    function generateRandomRgbColor(){
        const r = generateRandomElement(256);
        const g = generateRandomElement(256);
        const b = generateRandomElement(256);

        setColor(`rgb(${r},${g},${b})`)

    }



    return(
        <div>
        <button onClick = {()=> setTypeOfColor('RGB')}>Generate Random RGB Color</button>
        <button onClick = {()=> setTypeOfColor('HEX')}>Generate Random HEX Color</button>
        <button onClick= {typeOfColor === 'HEX'? generateRandomHexColor: generateRandomRgbColor}>Generate Random Color</button>
        <div style = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            fontSize: '60px',
            background : color,
            color: 'white'
        }}>
            <h3>{typeOfColor}</h3>
            <h1>{color}</h1>
        </div>
        </div>
    )
}