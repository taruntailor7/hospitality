import React, { useEffect, useState } from 'react'
import './Form.css'
import { Hotels } from './Hotels';

let initState = {
  hotelName:"",
  hotelImage:"",
  rating:""
}

export const Form = () => {
  const [hotel, setHotel] = useState(initState);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(0);

  useEffect(()=>{
    getHotels();
  },[load])

  const getHotels = async () =>{
    setLoading(true);
    let res = await fetch('https://visualization-dashboard.onrender.com/hotels')
    let res2 = await res.json();
    setHotels(res2.data);
    setLoading(false);
  }
  const handleChange = (e) =>{
    let {name, value} = e.target;
    setHotel({...hotel,[name]:value});
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    fetch('https://visualization-dashboard.onrender.com/hotels/addHotel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hotel)
    })
    .then(response => response.json())
    .then(data => {
      setLoad((prev)=>prev+1)
      setHotel(initState)
      alert(data.message)
    })
    .catch(error => console.error(error));
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter Hotel Name" name='hotelName' value={hotel.hotelName} onChange={handleChange} required/>
        <input type="text" placeholder="Enter Hotel Image URL" name='hotelImage' value={hotel.hotelImage} onChange={handleChange} required/>
        <input type="text" placeholder="Enter Rating By Coustmer" name='rating' value={hotel.rating} onChange={handleChange} required/>
        <button>Add</button>
      </form>
      <Hotels hotels={hotels} loading={loading}/>
    </>
  )
}
