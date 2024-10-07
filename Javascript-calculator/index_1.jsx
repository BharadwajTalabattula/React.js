import "./styles.css";
import { useState } from "react";



export default function JavaScriptCalculator() {
    
    const [answer, setAnswer] = useState("");
    const [expression, setExpression] = useState("");
    const et = expression.trim();
  
    const isOperator = (symbol) => {
      return /[*/+-]/.test(symbol);
    };
  
    const buttonPress = (symbol) => {
      if (symbol === "clear") {
        setAnswer("");
        setExpression("0");
      } else if (symbol === "negative") {
        if (answer === "") return;
        setAnswer(
          answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
        );
      } else if (symbol === "percent") {
        if (answer === "") return;
        setAnswer((parseFloat(answer) / 100).toString());
      } else if (isOperator(symbol)) {
        setExpression(et + " " + symbol + " ");
      } else if (symbol === "=") {
        calculate();
      } else if (symbol === "0") {
        if (expression.charAt(0) !== "0") {
          setExpression(expression + symbol);
        }
      } else if (symbol === ".") {
        // split by operators and get last number
        const lastNumber = expression.split(/[-+/*]/g).pop();
        if (!lastNumber) return;
        console.log("lastNumber :>> ", lastNumber);
        // if last number already has a decimal, don't add another
        if (lastNumber?.includes(".")) return;
        setExpression(expression + symbol);
      } else {
        if (expression.charAt(0) === "0") {
          setExpression(expression.slice(1) + symbol);
        } else {
          setExpression(expression + symbol);
        }
      }
    };
  
    const calculate = () => {
      // if last char is an operator, do nothing
      if (isOperator(et.charAt(et.length - 1))) return;
      // clean the expression so that two operators in a row uses the last operator
      // 5 * - + 5 = 10
      const parts = et.split(" ");
      const newParts = [];
  
      // go through parts backwards
      for (let i = parts.length - 1; i >= 0; i--) {
        if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
          newParts.unshift(parts[i]);
          let j = 0;
          let k = i - 1;
          while (isOperator(parts[k])) {
            k--;
            j++;
          }
          i -= j;
        } else {
          newParts.unshift(parts[i]);
        }
      }
      const newExpression = newParts.join(" ");
      if (isOperator(newExpression.charAt(0))) {
        setAnswer(eval(answer + newExpression).toString());
      } else {
        setAnswer(eval(newExpression).toString());
      }
      setExpression("");
    };


    return (
        <div className="container">
            <div id="calculator">
                <div id="display">
                    <div id="answer">{answer}</div>
                    <div id="expression">{expression}</div>
                </div>
                <button id= "clear" onClick = {()=> buttonPress("clear")}className="btn light-gray">AC</button>
                <button id= "negative" onClick = {()=> buttonPress("negative")}className="btn light-gray">+/-</button>
                <button id= "percentage" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn light-gray">%</button>
                <button id= "divide" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn orange">/</button>
                <button id= "seven" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">7</button>
                <button id= "eight" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">8</button>
                <button id= "nine" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">9</button>
                <button id= "multiply" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn orange">*</button>
                <button id= "four" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">4</button>
                <button id= "five" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">5</button>
                <button id= "six" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">6</button>
                <button id= "subtract" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn orange">-</button>
                <button id= "one" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">1</button>
                <button id= "two" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">2</button>
                <button id= "three" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">3</button>
                <button id= "add" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn orange">+</button>
                <button id= "zero" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn zero">0</button>
                <button id= "decimal" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn">.</button>
                <button id= "equals" onClick = {(e)=> buttonPress(e.target.innerText)}className="btn orange">=</button>
            </div>
        </div>
    )
}