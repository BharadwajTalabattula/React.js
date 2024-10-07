import data from './data'
import React from 'react'
import { useState } from "react";
import './styles.css'

function Accordian() {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([])

    function handleSingleSelection(getEleId) {
        setSelected(getEleId)
    }

    function handleMultiSelection(getEleId) {
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getEleId);
        if (findIndexOfCurrentId === -1) cpyMultiple.push(getEleId)
        else cpyMultiple.splice(findIndexOfCurrentId, 1);
        setMultiple(cpyMultiple);

    }

    console.log(selected)


    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
            <div className="accordian">
                {data && data.length > 0 ?
                    data.map((dataItem) =>
                        <div className="item">
                            <div onClick={
                                enableMultiSelection ?
                                    () => handleMultiSelection(dataItem.id)
                                    : () => handleSingleSelection(dataItem.id)} className="title">
                                <h3>{dataItem.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                enableMultiSelection ?

                                    multiple.indexOf(dataItem.id) !== -1 && <div className="content">{dataItem.answer}</div>
                                    : selected === dataItem.id && <div className="content">{dataItem.answer}</div>
                            }
                        </div>
                    )
                    : <div>No Data Available!</div>
                }
            </div>
        </div>
    )

}

export default Accordian