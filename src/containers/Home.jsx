import React,{useEffect, useRef, useState} from 'react'
import axios from "../http-common"

import Restaurants from '../components/Restaurants'
import HomeNav from '../components/HomeNav'

export default function Home() {
    const isComponent = useRef(true)

    const [restaurants, setRestaurants]= useState([])
    const [page, setPage]= useState(1)

    useEffect(async ()=>{
        const http = axios()
        await http.get('/restaurants', {
            params:{
                page
            }
        }).then(({data:{restaurants: res}})=>{
            if(isComponent.current){
                setRestaurants(res)
            }

        })
        //cleaning when the component is unmounted
        return ()=>{
            isComponent.current=false
            setRestaurants([])
        }
    },[page])
    const handleClick = (side) => {
        if(page<1){
            page=1
        }
        side=="right"? setPage(page+1) : setPage(page-1)
    
    }
    return (
        <div className="container">
                <h1 className="fw-bolder text-center my-5" >Restaurants Review</h1>
                <HomeNav go={handleClick} />
                <Restaurants restaurants={restaurants}/>
        </div>
    )
}
