import{ useEffect, useState} from "react";
import { NumericFormat } from "react-number-format";

export default function JavaScriptCalc(){

const[preState, setPreState] = useState("");
const[curState, setCurState] = useState("");
const[input, setInput] = useState("0");
const[operator, setOperator] = useState(null);
const[total, setTotal] = useState(false);

     function inputNum(e){
        if(curState.includes(".") && e.target.innerText === ".") return;
        if(total){
            setPreState("");
        }
        curState ? setCurState(pre => pre + e.target.innerText) : setCurState(e.target.innerText);
        setTotal(false);
     }

     useEffect(()=>{
        setInput(curState);
     },[curState]);

     useEffect(()=>{
        setInput("0");
     },[]);

     function operatorType(e){
        setTotal(false);
        setOperator(e.target.innerText);
    
        if(curState === "") return;
        if(preState !== ""){
            equals()
        }else{
            setPreState(curState);
            setCurState("");
        }

     }

     function equals(e){
        if(e?.taget.innerText === "="){
            setTotal(true);
        }

        let cal;
        switch(operator){
            case "/":
                cal = String(parseFloat(preState) / parseFloat(curState));
            break;
            case "+":
                cal = String(parseFloat(preState) + parseFloat(curState));
            break;
            case "x":
                cal = String(parseFloat(preState) * parseFloat(curState));
            break;
            case "-":
                cal = String(parseFloat(preState) - parseFloat(curState));
            break;
            default:
                return;
        }

        setInput("");
        setPreState(cal);
        setCurState("");
     }

     function percent(){
        preState? setCurState(String(parseFloat(curState)/ 100 * preState))
        :setCurState(String(parseFloat(curState)/100));
     }

     function reset(){
        setPreState("");
        setCurState("");
        setInput("0");
     }



    return(
        <div className="container">
            <div className= "wrapper">
                <div className="screen">{input}</div>
                 <div className="btn light-gray" onClick = {reset}>AC</div>
                 <div className="btn light-gray" onClick = {percent}>%</div>
                 <div className="btn light-gray" onClick = {minusPlus}>+-</div>
                 <div className="btn orange" onClick = {operatorType}>/</div>
                 <div className="btn" onClick = {inputNum}>7</div>
                 <div className="btn" onClick = {inputNum}>8</div>
                 <div className="btn" onClick = {inputNum}>9</div>
                 <div className="btn orange" onClick = {operatorType}>x</div>
                 <div className="btn" onClick = {inputNum}>4</div>
                 <div className="btn" onClick = {inputNum}>5</div>
                 <div className="btn" onClick = {inputNum}>6</div>
                 <div className="btn orange" onClick = {operatorType}>+</div>
                 <div className="btn" onClick = {inputNum}>1</div>
                 <div className="btn" onClick = {inputNum}>2</div>
                 <div className="btn" onClick = {inputNum}>3</div>
                 <div className="btn orange" onClick = {operatorType}>-</div>
                 <div className="btn zero" onClick = {inputNum}>0</div>
                 <div className="btn" onClick = {inputNum}>.</div>
                 <div className="btn" onClick = {equals}>=</div>
            </div>
        </div>
    )

}