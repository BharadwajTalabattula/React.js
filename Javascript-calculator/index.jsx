import "./styles.css";
import { useState } from "react";

export default function JavaScriptCalculator(){

    const[answer, setAnswer] = useState("");
    const[expression, setExpression] = useState("");
    const et = expression.trim();

    function isOperator(symbol){
        return /[*/+-]/.test(symbol);
    };



    function buttonPress(symbol){
        if(symbol === "clear"){
            setAnswer("");
            setExpression("");
        }else if(symbol === "negative"){
            if(answer === " ") return;
            setAnswer(
              answer.toString().charAt(0) === '-' ? answer.slice(1) : "-" + answer  
            );
        }else if(symbol === "percent"){
            if(answer === "") return;
            setAnswer((parseFloat(answer) / 100).toString());
        } else if (isOperator(symbol)){
            setExpression(et + " " + symbol + " ");
        } else if (symbol === "="){
            calculate();
        } else if( symbol === "0"){
            if(expression.charAt(0) !== "0"){
                setExpression(expression + symbol);
            }
        } else if( symbol === "."){
            const lastNumber = expression.split(/[-+/*]/g).pop();
            if(!lastNumber) return;
            console.log("lastNumber :>>", lastNumber);
            if(lastNumber?.includes(".")) return;
            setExpression(expression + symbol);
        }else{
            if(expression.charAt(0) === "0"){
                setExpression(expression.slice(1) + symbol);
            } else{
                setExpression(expression + symbol);
            }
        }
    };

    function calculate(){
        if(isOperator(et.charAt(et.length - 1))) return;
        const parts =et.split(" ");
        const newParts = [];
        for(let i = parts.length - 1; i>=0; i--){
            if(["*", "/", "+"].includes(parts[i]) && isOperator(parts[i-1])){
                newParts.unshift(parts[i]);
                let j = 0;
                let k = i - 1;
                while(isOperator(parts[k])){
                    k--;
                    j++;
                }
                i -= j;
            }else{
                newParts.unshift(parts[i]);
            }
        }
        const newExpression = newParts.join(" ");
        if(isOperator(newExpression.charAt(0))){
            setAnswer(eval(answer + newExpression).toString());
        }else{
            setAnswer(eval(newExpression).toString());
        }
        setExpression(" ");

    };







    return(
        <div className = "container">
            <div id= "calculator">
                <div id = "display">
                    <div id = "answer">{answer}</div>
                    <div id = "expression">{expression}</div>
                </div>
                <button id = "clear" className="btn light-gray" onClick={(e)=> buttonPress("clear")}>AC</button>
                <button id = "negative" className="btn light-gray" onClick={(e)=> buttonPress("negative")}>+/-</button>
                <button id = "percentage" className="btn light-gray" onClick={(e)=> buttonPress(e.target.innerText)}>%</button>
                <button id = "divide" className="btn orange" onClick={(e)=> buttonPress(e.target.innerText)}>/</button>
                <button id = "seven" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>7</button>
                <button id = "eight" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>8</button>
                <button id = "nine" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>9</button>
                <button id = "multiply" className="btn orange" onClick={(e)=> buttonPress(e.target.innerText)}>*</button>
                <button id = "four" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>4</button>
                <button id = "five" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>5</button>
                <button id = "six" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>6</button>
                <button id = "subtract" className="btn orange" onClick={(e)=> buttonPress(e.target.innerText)}>-</button>
                <button id = "one" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>1</button>
                <button id = "two" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>2</button>
                <button id = "three" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>3</button>
                <button id = "add" className="btn orange" onClick={(e)=> buttonPress(e.target.innerText)}>+</button>
                <button id = "zero" className="btn zero" onClick={(e)=> buttonPress(e.target.innerText)}>0</button>
                <button id = "decimal" className="btn" onClick={(e)=> buttonPress(e.target.innerText)}>.</button>
                <button id = "equals" className="btn orange" onClick={(e)=> buttonPress(e.target.innerText)}>=</button>
            </div>
        </div>
    )

}