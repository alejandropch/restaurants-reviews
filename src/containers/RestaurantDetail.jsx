import React, {useContext, useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import ReviewsList from '../components/ReviewsList'
import AppContext from '../context/AppContext'
import useRestaurantDetails from '../hooks/useRestaurantDetails'
import Spin from '../styles/loadingSpin'

export default function RestaurantDetail() {

    const {user} = useContext(AppContext)
    const {id:restaurantID} = useParams()

    const navigate = useNavigate()
    const handleClick = () => { 
        //if the user don't exist, he will go to the login page, otherwise it will be allowed the review one
        user?navigate(`/review/post/${restaurantID}`):navigate('/login')
    }
    const {reviews,loading, setReviews, restaurant} = useRestaurantDetails()
 
    if(loading){
          return (<Spin>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Spin>)
        
    }
    reviews.sort((a,b)=>{
    const newer = new Date(b.createdAt).getTime() //value will be smaller than the older
    const older = new Date(a.createdAt).getTime() //value will be greater than the newer 
    return newer - older //this will return an negative value, then the sort will be ascending
    })
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="d-flex flex-column align-items-center col-md mb-5">
                    <h2>{restaurant.name}</h2>
                    <p className="card-text font-monospace">{restaurant.cuisine}</p>
                        <address>
                    <p className="card-text fw-bold m-0 ">Address</p>
                        {restaurant.address.building} - {restaurant.address.street}<br/>
                        {restaurant.borough}
                        </address>
                </div>
                <div className="d-flex flex-column align-items-center col-md">
                    <div className="d-flex flex-column align-items-start col-md">
                    <ReviewsList reviews={reviews} setReviews={setReviews} /> 
                    </div>
                    <button className="btn btn-outline-primary my-4" onClick={handleClick}>Write a Review</button>
                </div>
            </div>

        </div>
    )
}
