import React,{useContext} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard/ReviewCard'
import AppContext from '../context/AppContext'
export default function ReviewsList({reviews, setReviews,}) {
    const {user,deleteReview}=useContext(AppContext)
    let userID = user? user._id : ""
    const navigate = useNavigate()
    const {id:restaurantID} = useParams()

   async function handleClick (action, reviewID){
        //update
        if(action=="update"){
           return navigate(`/review/update/${restaurantID}`)
        }
        //delete
        if(action=="delete"){
           const data = await deleteReview(reviewID,restaurantID)
            return setReviews(data)
        }
    }
        



  return (
    <>
    { 
    reviews.length? 
        reviews.map(item => <ReviewCard content ={item} handleClick={handleClick} isOwner ={item.user_id == userID} key ={item._id} />)
    : <p className="form-text">There's no reviews</p>
    }
    </>
      )
};
