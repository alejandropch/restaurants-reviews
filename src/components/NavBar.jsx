import React from 'react';
import { Link} from 'react-router-dom';

function NavBar ({user, path}){
  return  ( 
    <ul className="nav nav-tabs justify-content-end flex-nowrap"> 
        <Link className="nav-link" to="/">Home</Link>
        {user?
            <li className="nav-item">
                <Link className="nav-link" to="/profile">{user}</Link>
            </li>
        :
            path=="login" || path=="register"?
                <>
                </>
            :
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </>
        }
    </ul>
)
}
export default React.memo(NavBar)