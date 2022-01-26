import React ,{useContext} from 'react'
import {Link} from 'react-router-dom'
import AppContext from '../context/AppContext'

export default function RestaurantCard({data}) {
   const {setRestaurant} = useContext(AppContext)

   const handleClick= () => {
        setRestaurant(data)
   }

    return (
        <div className="col-md-4 btn btn-outline-light flex-column p-0 border">
            <div className="cart">
                <Link to={`/id/${data._id}`} onClick={handleClick} className='text-decoration-none text-body' >
                    <h4 className="card-header text-center">{data.name}</h4>
                    <div className="card-body">
                        <p className="card-text">{data.cuisine}</p>
                        <address>
                        {data.address[0].building} - {data.address[0].street}<br/>
                        {data.borough}
                        </address>
                    </div>
                </Link>
            </div>
        </div>
    )
}
            