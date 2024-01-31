import './header.css'
import Searchbar from '../searchbar/searchbar';

const Header = ({setMovies,setIsLoading}) => {
    return (
        <header>
            <Searchbar setIsLoading = {setIsLoading} setMovies = {setMovies}/>
        </header>
    )
}

export default Header;