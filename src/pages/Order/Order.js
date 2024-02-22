import React, {useContext, useEffect} from 'react'
import OrderItemList from '../../components/OrderItemList'
import OrderItemContext from '../../context/OrderItemContext'

const Order = () => {

    let {getOrderItems, orderItems} = useContext(OrderItemContext)
    useEffect(()=>{
        getOrderItems()
    }, [])

    let totalPrice = 0
    orderItems.map((item)=>(
            totalPrice += item.quantity * item.product_price
        ))
    let username = localStorage.getItem('username')

  return (
    <div>
        <div className='order_table wrapper'>
        <div className='ordered_items'>
          <h3 style={{textAlign: 'center', padding: 30}}>Ordered Item of {username}</h3>
          <div className='order_header'>
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

          <p style={{padding:20}} className='total_order_price'><strong>Total Price: </strong> {totalPrice} </p>

        </div>
      </div>
    </div>
  )
}

export default Order