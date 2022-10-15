
import { Link } from 'react-router-dom';
import Signout from '../Auth/Signout/Signout';
import './Header.css'
export default function Header(props) {
    return(
     <div className='header-container'>
      <nav className='nav'>
        <div className='header-nva'>
          <h3>Online Shopping</h3>
       <Link to={'/new-comm'} style={{textDecoration:'none'}}>  <p >Home</p></Link> 
       <Link to={'/new-comm/favorite'} style={{textDecoration:'none'}}><p href="#features">favorite</p></Link>
     <Link to={'/new-comm/cart'} style={{textDecoration:'none'}}><p >Cart</p></Link>

        </div>
        <Signout/>
      </nav>

     </div>
    )
}
