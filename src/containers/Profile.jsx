import React, {useContext} from 'react';
import AppContext from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import Spin from '../styles/loadingSpin'

export default function Profile() {
    const {logout, user,deleteUser} = useContext(AppContext)
    const navigate = useNavigate()
  
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    const handleDelete = () => {
        deleteUser()
    }
    if(!user){
        return (<Spin>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Spin>)
    }
  return (
  
  <>
  <div className="container">
      <div className="d-flex flex-column align-items-center my-5">
        <div className="align-items-left">
            <h3 className="mb-4">{user.name}</h3>
            <p className="fw-bold m-0">Email:</p> 
            <p className="font-monospace">{user.email}</p>
        </div>
      <button className="btn btn-secondary my-3"onClick={handleLogout}>Log out</button>
        <p className="form-text fs-6">If you want to delete your account, click here: <Link to="/" className="text-decoration-none" onClick={handleDelete}>Delete accout</Link></p>
      </div>

  </div>
  </>)
}
