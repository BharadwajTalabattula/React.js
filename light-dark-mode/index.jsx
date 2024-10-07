import useLocalStorage from "./useLocalStorage"
import "./theme.css"

export default function ChangeColorTheme(){

    const[theme, setTheme] = useLocalStorage( 'theme', 'dark');

    function handleToggleTheme(){
        setTheme(theme === 'light'? "dark" : "light");

    }

    return(
        <div className = 'light-dark-mode'  dark-theme ={theme}>
            <div className = 'container'>
                <p>Hello world!</p>
                <button
                onClick = {()=>handleToggleTheme()}
                >
                    Change Theme!
                </button>
            </div>
        </div>
    )

}