import React from 'react'
import './Hotels.css'

export const Hotels = ({hotels,loading}) => {
    if(loading) {
        return <img className="loader" src="https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b9521m5xc7jftrwflxskviw6ni8boilpi79kdio941sp&rid=200w.gif&ct=g" alt="" />
    }
    return (
        <div className="hotels">
            {hotels.map((hotel)=>(
                <div key={hotel.hotelName} className="hotel">
                    <img src={hotel.hotelImage} alt="" />
                    <div className='nameAndRating'>
                        <p className="name">{hotel.hotelName}</p>
                        <p className="rating">Rating : {hotel.rating} Star</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
