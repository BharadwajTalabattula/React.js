import MenuList from './menu-list'
import { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import './styles.css'

export default function MenuItem({item}){

    const [currentItem, setCurrentItem] = useState({});

    function handleToggleDisplay(getCurrentlabel){

        setCurrentItem({
            [getCurrentlabel] : !currentItem[getCurrentlabel]
        })

    }



    return(
        <li>
            <div className = "menu-item">
                <p>{item.label}</p>
                {
                    item && item.children && item.children.length > 0?
                    <span onClick = {()=> handleToggleDisplay(item.label)}>
                        {currentItem[item.label]? <FaMinus/> : <FaPlus/>}
                    </span>
                    :null
                }
            </div>
            {
                item && item.children && item.children.length > 0  && currentItem[item.label] ? 
                <MenuList list = {item.children}/>
                :null
            }
        </li>
    )

}