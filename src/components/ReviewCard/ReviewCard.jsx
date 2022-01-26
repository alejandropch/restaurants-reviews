import React, { useContext } from 'react';
import {Card} from './styles'

export default function Review({content:review, isOwner, handleClick}) {
    const {name, text, _id: reviewID} = review;
 
  return (
    <Card className="card border-info p-2">
        <h4 className="card-title m-2 text-center">{name}</h4>
        <p className="card-text">{text}</p>
        {isOwner && <div className="d-grid gap-1">
                    <button className="btn btn-dark mt-3" onClick={()=>handleClick("update")}>Update</button>
                    <button className="btn btn-danger" onClick={()=>handleClick("delete", reviewID)}>Delete</button>
                    </div>
        }
    </Card>
    )
}