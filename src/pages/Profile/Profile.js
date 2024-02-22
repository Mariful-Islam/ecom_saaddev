import React, {useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import user from '../../icon/user.webp'
import OrderItemList from '../../components/OrderItemList'
import OrderItemContext from '../../context/OrderItemContext'


const Profile = () => {

  const params = useParams()

  let {getOrderItems, orderItems} = useContext(OrderItemContext)
  useEffect(()=>{
    getOrderItems()
  }, [])
  
  let username = localStorage.getItem('username')

  let [user, setUser] = useState("")

  useEffect(()=>{
    getUser()
  }, [])

  let getUser = async() => {
    let response = await fetch(`http://saaddev.pythonanywhere.com/ecom/user_info/${username}/`)
    let data = await response.json()
    setUser(data)
  }

  let totalPrice = 0
  orderItems.map((item)=>(
    totalPrice += item.quantity * item.product_price
    ))

  return (
    <div className='wrapper'>
      <div className='user_info'>
        <img src={user.image} alt={user} />
        
        <span className='username'>{username}</span>

        <span>Balance: 4332$</span>
      </div>
      <div className='order_table'>
        <div className='ordered_items'>
          <h3 style={{textAlign: 'center', padding: 30}}>Ordered Item of {username}</h3>
          <div className='order_header' style={{display:'grid', gridTemplateColumns:"1fr 1fr 1fr 1fr 1fr 1fr", justifyItems: 'center', alignItems: 'center'}}>
            <h4>Product Name</h4>
            <h4>Product Quantity</h4>
            <h4>Product Price</h4>
            <h4>Total Price</h4>
            <h4>Order Time</h4>
            <h4>Order Delivery</h4>
          </div>
          {orderItems.map((orderItem, index)=>(
            <OrderItemList orderItem={orderItem} key={index}/>
          ))}

          <p style={{padding:20}}><strong>Total Price: </strong> {totalPrice} </p>

        </div>
      </div>
    </div>
  )
}

export default Profile