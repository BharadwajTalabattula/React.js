import MenuItem from './menu-item';

export default function MenuList({list = []}){

    return(
        <ul className = "menu-list">
            {
                list && list.length > 0?
                list.map((listItem)=>
                <MenuItem item = {listItem}/>
                )
                :null
            }
        </ul>
    )

}