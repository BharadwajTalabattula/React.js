import MenuList from './menu-list';

export default function NavBar({menus = []}){

    return(
        <div className="navbar-container">
            <MenuList list = {menus}/>
        </div>
    )
}