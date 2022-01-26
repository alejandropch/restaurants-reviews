import React, {useState, useRef, useContext} from 'react';
import AppContext from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
export default function Login() {
    const form = useRef(null)
    const {authUser} = useContext(AppContext)
    const [message, setMessage]  = useState("")
    const navigate = useNavigate()
    const onSumbit = async()=>{
        let formData = new FormData(form.current)
            formData = Object.fromEntries(formData)
        try{
             await authUser(formData)
             setMessage("Logged in")
             navigate('/')
        } catch(err) {
                setMessage(err.response.data.message)
        }
    }
        
    return (
        <div className="container-md">
            <h2 className="text-center">Login</h2>
            
            <form ref={form} className="form-group">
                <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control form-control-md" name="email" placeholder="Email"/>      
                </div>
                <div className="mb-3">
                <label className="form-label">Password</label>

                <input type="password" className="form-control form-control-md"  name="password" placeholder="Password" /> 
                </div>
                <button type="button" className="btn btn-primary" onClick={onSumbit}>Submit</button>
            </form>
            <p className="form-text">{message}</p>
            <p className="form-text fs-6 text-center">Don't you have an account yet? <Link to="/register">Sign up</Link></p>

        </div>
    )
}
