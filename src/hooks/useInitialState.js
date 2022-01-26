import React,{useState, useEffect} from 'react'

import axios from '../http-common'

import jwtDecode from 'jwt-decode';

export default function useInitialState() {
    const http = axios()
    const [userToken, setUserToken] = useState(localStorage.getItem('token')|| '')
    const [reviews,setReviews] = useState([])
    const [restaurant,setRestaurant] = useState()

    const [user, setUser] = useState()
    useEffect(()=>{

        if(!userToken || userToken=="undefined") {
            return 
        }
        const {payload:{user}} = jwtDecode(userToken)
        setUser(user)
    },[])
    const createUser = async (data) => {
        const userCreated = await http.post('/users/register',data )

        const {data:{token, user}} = userCreated

        setUserToken(`Bearer ${token}`)
        setUser(user)
       localStorage.setItem('token',`Bearer ${token}`)
       return token
    }
    const deleteReview =  async(reviewID,restaurantID) => {
        await http.delete(`/restaurants/review/${reviewID}`)
       return await http.get(`/restaurants/${restaurantID}`).then(({data: {restaurant: _restaurant}})=>{
                //its gonna return an array 'cause the agregate method
                const restaurant = _restaurant[0]
                return restaurant.reviews
        })
    }
    const authUser = async (data) => {
        let userAuth = await http.post('/users/login',data)
        const {data:{token, user}} = userAuth
        setUserToken(`Bearer ${token}`)
        setUser(user)
       localStorage.setItem('token',`Bearer ${token}`)
        return token
    }
    const logout = async()=>{
        localStorage.removeItem('token')
        setUser(null)
    }
    const deleteUser = async()=>{
        await http.delete(`/users/${user._id}`)
        localStorage.removeItem('token')
        setUser(null)
    }
    const setRestaurantData = () =>{
        useEffect(()=>{
            http.get('/restaurants').then(({data:{restaurants}})=>{
                if(isComponent.current){
                    setData(restaurants)
                }
            })
            //cleaning when the component is unmounted
            return ()=>{
                isComponent.current=false
            }
        },[])
    }

    return {
        createUser, authUser, user,logout,reviews,setReviews, deleteReview,restaurant,setRestaurant,setRestaurantData,
        deleteUser
    }
}
