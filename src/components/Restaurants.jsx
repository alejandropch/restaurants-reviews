import React,{useEffect, useRef, useState} from 'react'
import Restaurant from './RestaurantCard'
import Spin from '../styles/loadingSpin'
export default function Restaurants({restaurants}) {
    
    
    if(!restaurants.length){
        return (<Spin>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Spin>)
    }
    return (

            <div className="row">
                
            {
            restaurants.map((item)=>(
                <Restaurant data = {item} key={item._id} />
            ))
            }
            </div>

    )
}
