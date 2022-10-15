import cookie from 'react-cookies'
import { Button } from "react-bootstrap";




export default function Signout(props) {


    const handleSignout = ()=>{
       cookie.remove('token')
        cookie.remove("userID")
       window.location.reload()
    }
    return(
        <>
         <Button className='mx-4' variant="danger" onClick={handleSignout} >Logout</Button>{' '}
        </>
    )
}