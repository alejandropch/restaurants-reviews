import React, { useRef, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
export default function Register() {
    const [message, setMessage]  = useState("")

    const form = useRef(null)
    const {createUser} = useContext(AppContext)
    const navigate = useNavigate()

    const onSumbit = async() => {
        let formData = new FormData(form.current)
            formData = Object.fromEntries(formData)
        try{
            const data= await createUser(formData)
            console.log(data)
            navigate('/')
        } catch(err) {
            const { response: { status, data: { message } }} = err
            if(status==409){
                return setMessage("User with this email already exists ")
            }
            return setMessage(message)
        }
    }
  return (
    <div className="container-md">
        <h2 className="text-center">Sign Up</h2>
        
        <form ref={form} className="form-group">
            <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control form-control-md" name="name" placeholder="Name"/>      
            </div>
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
    </div>
  )
}



// export default function Register() {

//     const ref = useRef(null)
//     const ond = (e)=> {
//         e.preventDefault();
//         const d = new FormData(ref.current)
//         const a = Object.fromEntries(d)
//         console.log(a)
//     }  
//   return (
  
//   <div>
//       <h2>Register</h2>
//       <form ref={ref}>

//       <input type="text" placeholder="name"/>      
//       <input type="email" placeholder="email"/>      
//       <input type="password" placeholder="password"/> 
//       <button type ="submit" >send</button>

//       </form>

//       </div>

