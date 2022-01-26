import React,{useRef, useState, useContext} from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext'
import useRestaurantDetails from '../hooks/useRestaurantDetails'
import axios from '../http-common'
import Spin from '../styles/loadingSpin'

export default function Review() {
    const [message, setMessage]  = useState("")
    const {loading, restaurant} = useRestaurantDetails()
    const {pathname} = useLocation()
    const inComponent = useRef(true)
    const form = useRef()
    const http = axios()
    const {id:restaurantID} = useParams()
    const {user} = useContext(AppContext)

    const navigate = useNavigate()
    //this exprection is gonna find if the url have this 2 words
    const regEx= /(update|post)\b/
    //and is gonna return a character
    const action = pathname[pathname.search(regEx)]
    const handleClick = async() => {
        let formData = new FormData(form.current)
            formData = Object.fromEntries(formData)
            formData = {
            ...formData,
            user_id:user._id,
            name:user.name
        }
        try{
            action =='p' && await http.post(`/restaurants/review/${restaurantID}`, formData),
                            setMessage("Review posted")

            action=='u'&& await http.patch(`/restaurants/review/${restaurantID}`, formData),
                            setMessage("Review updated")
            navigate(`/id/${restaurantID}`)
        }catch(err){
            if(inComponent.current){
             setMessage(err.response.data.message)
            }
        }

    }

        if(loading){
            return (<Spin>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </Spin>)
      }


      const comment = restaurant.reviews.filter((item)=>item.user_id==user._id)[0]
      let text =""
      if(comment){
          text=comment.text
      }
      console.log(text);
  return <div className="container-md">
      <div className="my-5">
        <h2 className="text-center fs-1 fw-bold m-0">{restaurant.name}</h2>
        <p className="text-center fs-2">Review</p>
      </div>

    <form ref={form} className="form-group">
        <div className="mb-3">
            <label className="form-label">What is your opinion about this place?</label>
            <input type="text" className="form-control form-control-md" name="text" placeholder="I think..." defaultValue={text}/>      
        </div>
        <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </div>
    </form>
    <p className="form-text">{message}</p>



  </div>}
