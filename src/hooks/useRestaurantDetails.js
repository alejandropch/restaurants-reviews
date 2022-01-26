import React, {useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../http-common'


export default function useRestaurantDetails() {
    
    const [restaurant,setRestaurant] = useState()
    const [reviews,setReviews] = useState([])
    const [loading,setLoading] = useState(true)

    const {id:restaurantID} = useParams()
    const inComponent = useRef(true)
    const http = axios()
    
    useEffect(()=>{
        http.get(`/restaurants/${restaurantID}`).then(({data: {restaurant: _restaurant}})=>{
            if (inComponent.current){
                //its gonna return an array 'cause the agregate method
                const restaurant = _restaurant[0]
                setRestaurant(restaurant)
                setReviews(restaurant.reviews)
                setLoading(false)
            }
        })
        return ()=>{
            inComponent.current=false
        }
    },[])
  return {reviews, setReviews,loading, restaurant}
}
